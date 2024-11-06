const htmlContent = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OpenCV.js Iris Detection</title>
<script src="https://docs.opencv.org/4.x/opencv.js" onload="onOpenCvReady()" async></script>
</head>
<body>
  <h2>Iris Detection</h2>
  <canvas id="canvasOutput"></canvas> <!-- To display the processed image -->

  <script>
  function onOpenCvReady() {
    console.log('OpenCV.js is ready');
  }
    // Listen for messages from the React Native WebView (containing the image data)
  





    // Crop the image to maintain a specific aspect ratio (width: height) before resizing
function cropToAspectRatio(image, width = 640, height = 480) {
    const currentWidth = image.cols;
    const currentHeight = image.rows;
    const desiredRatio = width / height;
    const currentRatio = currentWidth / currentHeight;

    let newImage;
    if (currentRatio > desiredRatio) {
        // Image is too wide
        const newWidth = Math.floor(desiredRatio * currentHeight);
        const offset = Math.floor((currentWidth - newWidth) / 2);
        newImage = image.roi(new cv.Rect(offset, 0, newWidth, currentHeight));
    } else {
        // Image is too tall
        const newHeight = Math.floor(currentWidth / desiredRatio);
        const offset = Math.floor((currentHeight - newHeight) / 2);
        newImage = image.roi(new cv.Rect(0, offset, currentWidth, newHeight));
    }

    let resizedImage = new cv.Mat();
    cv.resize(newImage, resizedImage, new cv.Size(width, height));
    return resizedImage;
}

// Apply thresholding to an image
function applyBinaryThreshold(image, darkestPixelValue, addedThreshold) {
    const threshold = darkestPixelValue + addedThreshold;
    const thresholdedImage = new cv.Mat();
    cv.threshold(image, thresholdedImage, threshold, 255, cv.THRESH_BINARY_INV);
    return thresholdedImage;
}

// Find a square area of dark pixels in the image
function getDarkestArea(image) {
    const ignoreBounds = 20;
    const imageSkipSize = 10;
    const searchArea = 20;
    const internalSkipSize = 5;

    let gray = new cv.Mat();
    cv.cvtColor(image, gray, cv.COLOR_RGBA2GRAY);

    let minSum = Number.POSITIVE_INFINITY;
    let darkestPoint = null;

    for (let y = ignoreBounds; y < gray.rows - ignoreBounds; y += imageSkipSize) {
        for (let x = ignoreBounds; x < gray.cols - ignoreBounds; x += imageSkipSize) {
            let currentSum = 0;
            let numPixels = 0;
            for (let dy = 0; dy < searchArea; dy += internalSkipSize) {
                if (y + dy >= gray.rows) break;
                for (let dx = 0; dx < searchArea; dx += internalSkipSize) {
                    if (x + dx >= gray.cols) break;
                    currentSum += gray.ucharAt(y + dy, x + dx);
                    numPixels++;
                }
            }
            if (currentSum < minSum && numPixels > 0) {
                minSum = currentSum;
                darkestPoint = { x: x + Math.floor(searchArea / 2), y: y + Math.floor(searchArea / 2) };
            }
        }
    }

    gray.delete();
    return darkestPoint;
}

// Mask all pixels outside a square defined by center and size
function maskOutsideSquare(image, center, size) {
    const mask = new cv.Mat.zeros(image.rows, image.cols, cv.CV_8UC1);
    const halfSize = Math.floor(size / 2);
    const { x, y } = center;

    const topLeftX = Math.max(0, x - halfSize);
    const topLeftY = Math.max(0, y - halfSize);
    const bottomRightX = Math.min(image.cols, x + halfSize);
    const bottomRightY = Math.min(image.rows, y + halfSize);

    cv.rectangle(mask, new cv.Point(topLeftX, topLeftY), new cv.Point(bottomRightX, bottomRightY), new cv.Scalar(255), -1);

    const maskedImage = new cv.Mat();
    cv.bitwise_and(image, mask, maskedImage);

    mask.delete();
    return maskedImage;
}

// Mask all pixels outside a circle defined by center and radius
function maskOutsideCircle(image, center, radius) {
    const mask = new cv.Mat.zeros(image.rows, image.cols, cv.CV_8UC1);
    cv.circle(mask, center, radius, new cv.Scalar(255), -1);

    const maskedImage = new cv.Mat();
    cv.bitwise_and(image, mask, maskedImage);

    mask.delete();
    return maskedImage;
}
// Helper function to optimize contours by angle
function optimizeContoursByAngle(contours, image) {
  if (contours.length < 1) {
      return contours;
  }

  // Flatten all the contours into one array
  let allContours = [];
  contours[0].forEach(point => allContours.push(point));

  let spacing = Math.floor(allContours.length / 25);  // Spacing between sampled points

  let filteredPoints = [];
  let centroid = allContours.reduce((acc, curr) => {
      acc.x += curr.x;
      acc.y += curr.y;
      return acc;
  }, { x: 0, y: 0 });

  centroid.x /= allContours.length;
  centroid.y /= allContours.length;

  for (let i = 0; i < allContours.length; i++) {
      let currentPoint = allContours[i];
      let prevPoint = i - spacing >= 0 ? allContours[i - spacing] : allContours[allContours.length - spacing];
      let nextPoint = i + spacing < allContours.length ? allContours[i + spacing] : allContours[spacing];

      // Calculate vectors between points
      let vec1 = { x: prevPoint.x - currentPoint.x, y: prevPoint.y - currentPoint.y };
      let vec2 = { x: nextPoint.x - currentPoint.x, y: nextPoint.y - currentPoint.y };

      let normVec1 = Math.sqrt(vec1.x ** 2 + vec1.y ** 2);
      let normVec2 = Math.sqrt(vec2.x ** 2 + vec2.y ** 2);

      let angle = Math.acos((vec1.x * vec2.x + vec1.y * vec2.y) / (normVec1 * normVec2));

      // Calculate vector from current point to centroid
      let vecToCentroid = { x: centroid.x - currentPoint.x, y: centroid.y - currentPoint.y };

      let dotProduct = (vecToCentroid.x * (vec1.x + vec2.x) / 2 + vecToCentroid.y * (vec1.y + vec2.y) / 2);
      let cosThreshold = Math.cos(Math.PI / 3);  // 60 degrees threshold

      if (dotProduct >= cosThreshold) {
          filteredPoints.push(currentPoint);
      }
  }

  return filteredPoints;
}

// Helper function to filter contours by area and return the largest one
function filterContoursByAreaAndReturnLargest(contours, pixelThresh, ratioThresh) {
  let maxArea = 0;
  let largestContour = null;

  contours.forEach(contour => {
      let area = cv.contourArea(contour);
      if (area >= pixelThresh) {
          let rect = cv.boundingRect(contour);
          let length = Math.max(rect.width, rect.height);
          let width = Math.min(rect.width, rect.height);

          let currentRatio = length / width;

          if (currentRatio <= ratioThresh && area > maxArea) {
              maxArea = area;
              largestContour = contour;
          }
      }
  });

  return largestContour ? [largestContour] : [];
}

// Function to fit and draw ellipses
function fitAndDrawEllipses(image, optimizedContours, color) {
  if (optimizedContours.length >= 5) {
      let contourMat = new cv.Mat(optimizedContours.length, 1, cv.CV_32SC2);
      for (let i = 0; i < optimizedContours.length; i++) {
          contourMat.data32S[i * 2] = optimizedContours[i].x;
          contourMat.data32S[i * 2 + 1] = optimizedContours[i].y;
      }

      let ellipse = cv.fitEllipse(contourMat);
      cv.ellipse(image, ellipse, color, 2);

      return image;
  } else {
      console.log("Not enough points to fit an ellipse.");
      return image;
  }
}

// Function to check how many pixels fall under the ellipse and calculate pixel ratio
function checkContourPixels(contour, imageShape, debugModeOn) {
  if (contour.length < 5) {
      return [0, 0];
  }

  let contourMask = new cv.Mat.zeros(imageShape[0], imageShape[1], cv.CV_8UC1);
  cv.drawContours(contourMask, [contour], -1, new cv.Scalar(255), 1);

  let ellipse = cv.fitEllipse(contour);
  let ellipseMaskThick = new cv.Mat.zeros(imageShape[0], imageShape[1], cv.CV_8UC1);
  let ellipseMaskThin = new cv.Mat.zeros(imageShape[0], imageShape[1], cv.CV_8UC1);

  cv.ellipse(ellipseMaskThick, ellipse, new cv.Scalar(255), 10);
  cv.ellipse(ellipseMaskThin, ellipse, new cv.Scalar(255), 4);

  let overlapThick = new cv.Mat();
  let overlapThin = new cv.Mat();
  cv.bitwise_and(contourMask, ellipseMaskThick, overlapThick);
  cv.bitwise_and(contourMask, ellipseMaskThin, overlapThin);

  let absolutePixelTotalThick = cv.countNonZero(overlapThick);
  let absolutePixelTotalThin = cv.countNonZero(overlapThin);

  let totalBorderPixels = cv.countNonZero(contourMask);
  let ratioUnderEllipse = totalBorderPixels > 0 ? absolutePixelTotalThin / totalBorderPixels : 0;

  return [absolutePixelTotalThick, ratioUnderEllipse, overlapThin];
}

// Function to check ellipse goodness
function checkEllipseGoodness(binaryImage, contour, debugModeOn) {
  let ellipseGoodness = [0, 0, 0];
  if (contour.length < 5) {
      return ellipseGoodness;
  }

  let ellipse = cv.fitEllipse(contour);
  let mask = new cv.Mat.zeros(binaryImage.rows, binaryImage.cols, cv.CV_8UC1);
  cv.ellipse(mask, ellipse, new cv.Scalar(255), -1);

  let coveredPixels = cv.countNonZero(cv.bitwise_and(binaryImage, mask));
  let ellipseArea = cv.countNonZero(mask);

  if (ellipseArea > 0) {
      ellipseGoodness[0] = coveredPixels / ellipseArea;
  }

  let axesLengths = ellipse.size;
  ellipseGoodness[2] = Math.min(axesLengths.width / axesLengths.height, axesLengths.height / axesLengths.width);

  return ellipseGoodness;
}
function processFrames(thresholdedImageStrict, thresholdedImageMedium, thresholdedImageRelaxed, frame, grayFrame, darkestPoint, debugModeOn, renderCvWindow, iris) {
  // Static variables to keep track of the ellipse state
  if (typeof processFrames.centerX === "undefined") processFrames.centerX = 0;
  if (typeof processFrames.centerY === "undefined") processFrames.centerY = 0;
  if (typeof processFrames.MA === "undefined") processFrames.MA = 0;
  if (typeof processFrames.ma === "undefined") processFrames.ma = 0;
  if (typeof processFrames.angle === "undefined") processFrames.angle = 0;

  let finalRotatedRect = { center: { x: 0, y: 0 }, size: { width: 0, height: 0 }, angle: 0 };

  // Image arrays for different thresholding levels
  let imageArray = [thresholdedImageRelaxed, thresholdedImageMedium, thresholdedImageStrict];
  let nameArray = ["relaxed", "medium", "strict"];
  let finalImage = imageArray[0];
  let finalContours = [];
  let ellipseReducedContours = [];
  let goodness = 0;
  let kernel = cv.Mat.ones(5, 5, cv.CV_8U); // Kernel size (5x5)
  let grayCopies = [grayFrame.clone(), grayFrame.clone(), grayFrame.clone()];
  let finalGoodness = 0; // Ensure finalGoodness is declared

  let contoursList = [];

  // Iterate through the images to find the best ellipse
  for (let i = 0; i < 3; i++) {
      let dilatedImage = new cv.Mat();
      if (iris) {
          cv.dilate(imageArray[i], dilatedImage, kernel, new cv.Point(-1, -1), 7);
          cv.erode(dilatedImage, dilatedImage, kernel, new cv.Point(-1, -1), 1);
      } else {
          cv.dilate(imageArray[i], dilatedImage, kernel, new cv.Point(-1, -1), 2);
      }

      // Find contours
      let contours = new cv.MatVector();
      let hierarchy = new cv.Mat();
      cv.findContours(dilatedImage, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
      let reducedContours = filterContoursByAreaAndReturnLargest(contours, 500, 3);

      if (iris) {
          contoursList.push(reducedContours);
      }

      if (reducedContours.length > 0 && reducedContours[0].rows > 5) {
          let currentGoodness = checkEllipseGoodness(dilatedImage, reducedContours[0], debugModeOn);
          cv.drawContours(grayCopies[i], reducedContours, -1, new cv.Scalar(255), 1);
          let ellipse = cv.fitEllipse(reducedContours[0]);

          let totalPixels = checkContourPixels(reducedContours[0], dilatedImage.size(), debugModeOn);

          cv.ellipse(grayCopies[i], ellipse, new cv.Scalar(255, 0, 0), 2);

          let font = cv.FONT_HERSHEY_SIMPLEX;
          finalGoodness = currentGoodness[0] * totalPixels[0] * totalPixels[0] * totalPixels[1];

          // Display text overlay in debug mode
          if (debugModeOn) {
              cv.putText(grayCopies[i], '%filled: ' + currentGoodness[0].toFixed(5) + ' (percentage of filled contour pixels inside ellipse)', new cv.Point(10, 30), font, 0.55, new cv.Scalar(255, 255, 255), 1);
        cv.putText(grayCopies[i], 'abs. pix: ' + totalPixels[0] + ' (total pixels under fit ellipse)', new cv.Point(10, 50), font, 0.55, new cv.Scalar(255, 255, 255), 1);
        cv.putText(grayCopies[i], 'pix ratio: ' + totalPixels[1].toFixed(3) + ' (total pix under fit ellipse / contour border pix)', new cv.Point(10, 70), font, 0.55, new cv.Scalar(255, 255, 255), 1);
        cv.putText(grayCopies[i], 'final: ' + finalGoodness.toFixed(2) + ' (filled * ratio)', new cv.Point(10, 90), font, 0.55, new cv.Scalar(255, 255, 255), 1);
        cv.imshow('canvasOutput', grayCopies[i]); // Display on the canvas
          }

          if (finalGoodness > 0 && finalGoodness > goodness) {
              goodness = finalGoodness;
              ellipseReducedContours = totalPixels[2];
              finalContours = reducedContours;
              finalImage = dilatedImage;
          }
      }
  }

  let testFrame = frame.clone();
  finalContours = [optimizeContoursByAngle(finalContours, grayFrame)];

  if (iris) {
      contoursList[0] = [optimizeContoursByAngle(contoursList[0], grayFrame)];
      contoursList[1] = [optimizeContoursByAngle(contoursList[1], grayFrame)];
      contoursList[2] = [optimizeContoursByAngle(contoursList[2], grayFrame)];
  }

  let detectedIris = false;
  let p = [processFrames.centerX, processFrames.centerY]; // Center point of small circle

  if (finalContours.length > 0 && finalContours[0].rows > 5) {
      let ellipse = cv.fitEllipse(finalContours[0]);
      finalRotatedRect = ellipse;

      if (!iris) {
          cv.ellipse(testFrame, ellipse, new cv.Scalar(55, 255, 0), 2);
          processFrames.centerX = Math.floor(ellipse.center.x);
          processFrames.centerY = Math.floor(ellipse.center.y);
          processFrames.MA = ellipse.size.width;
          processFrames.ma = ellipse.size.height;
          processFrames.angle = ellipse.angle;
      }

      detectedIris = true;
      if (iris) {
          let contourPoints = finalContours[0].data32F;
          let distances = [];
          for (let i = 0; i < contourPoints.length; i += 2) {
              distances.push(Math.hypot(contourPoints[i] - p[0], contourPoints[i + 1] - p[1]));
          }
          let step = 5;
          let size = Math.floor(distances.length / 10);
          let stdDev = [];
          for (let i = 0; i < distances.length; i += step) {
              stdDev.push(calculateStdDev(distances.slice(i, i + size)));
          }
      }
  }

  if (renderCvWindow) {
      cv.imshow('best_thresholded_image_contours_on_frame', testFrame);
  }

  // Return rotated rectangle for ellipse and center point
  return [finalRotatedRect, processFrames.centerX, processFrames.centerY, testFrame];
}

function processFrame(base64Data) {
      console.log('processFrame called with base64 data');

      // Create an image element
      let img = new Image();
      img.src = 'data:image/jpeg;base64,' + base64Data;  // Use the base64 data to set the image source

      img.onload = function() {
        // Create a canvas to draw the image
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);  // Draw the image on the canvas

        // Use OpenCV.js to read the image from the canvas
        let frame = cv.imread(canvas);  // Load the image into OpenCV matrix
        console.log('Image loaded into OpenCV matrix');

        // Crop and resize frame (implement your cropping logic here)
        frame = cropToAspectRatio(frame);

        // Find the darkest point (likely the pupil)
        let darkestPoint = getDarkestArea(frame);

        let debugModeOn = false;
        if (debugModeOn) {
          let darkestImage = frame.clone();
          cv.circle(darkestImage, darkestPoint, 10, new cv.Scalar(0, 0, 255), -1);
          cv.imshow('Darkest image patch', darkestImage);
        }

        // Convert to grayscale to work on pixel values
        let grayFrame = new cv.Mat();
        cv.cvtColor(frame, grayFrame, cv.COLOR_BGR2GRAY);
        let darkestPixelValue = grayFrame.ucharAt(darkestPoint.y, darkestPoint.x);

        // Apply thresholding operations at different levels
        let thresholdedImageStrict = applyBinaryThreshold(grayFrame, darkestPixelValue, 5);
        thresholdedImageStrict = maskOutsideSquare(thresholdedImageStrict, darkestPoint, 250);

        let thresholdedImageMedium = applyBinaryThreshold(grayFrame, darkestPixelValue, 15);
        thresholdedImageMedium = maskOutsideSquare(thresholdedImageMedium, darkestPoint, 250);

        let thresholdedImageRelaxed = applyBinaryThreshold(grayFrame, darkestPixelValue, 25);
        thresholdedImageRelaxed = maskOutsideSquare(thresholdedImageRelaxed, darkestPoint, 250);

        // Process the thresholded images
        let [pupilRotatedRect, centerX, centerY, testFrame] = processFrames(
          thresholdedImageStrict,
          thresholdedImageMedium,
          thresholdedImageRelaxed,
          frame,
          grayFrame,
          darkestPoint,
          debugModeOn,
          true,
          false
        );

        // Fit ellipse and re-apply thresholding at stricter levels
        let radius = Math.floor(10 * (pupilRotatedRect.size.width / 2));

        thresholdedImageStrict = applyBinaryThreshold(grayFrame, darkestPixelValue, 120);
        thresholdedImageStrict = maskOutsideSquare(thresholdedImageStrict, { x: centerX, y: centerY }, radius);

        thresholdedImageMedium = applyBinaryThreshold(grayFrame, darkestPixelValue, 140);
        thresholdedImageMedium = maskOutsideSquare(thresholdedImageMedium, { x: centerX, y: centerY }, radius);

        thresholdedImageRelaxed = applyBinaryThreshold(grayFrame, darkestPixelValue, 160);
        thresholdedImageRelaxed = maskOutsideSquare(thresholdedImageRelaxed, { x: centerX, y: centerY }, radius);

        // Process thresholded images again
        [pupilRotatedRect, centerX, centerY, testFrame] = processFrames(
          thresholdedImageStrict,
          thresholdedImageMedium,
          thresholdedImageRelaxed,
          testFrame,
          grayFrame,
          darkestPoint,
          debugModeOn,
          true,
          true
        );

        // Assuming you have the iris and pupil areas from the ellipse fitting
        let irisArea = Math.PI * (pupilRotatedRect.size.width / 2) * (pupilRotatedRect.size.height / 2);  // Example for iris
        let pupilArea = Math.PI * (radius / 2) * (radius / 2);  // Example for pupil

        // Calculate iris-to-pupil ratio
        let irisPupilRatio = irisArea / pupilArea;
        console.log('Calculated iris-to-pupil ratio:', irisPupilRatio);  // Log the ratio

        // Send the ratio back to React Native through WebView
        const response = JSON.stringify({ irisPupilRatio: irisPupilRatio });
        window.ReactNativeWebView.postMessage(response);  // Send the ratio back to React Native

        // Clean up
        grayFrame.delete();
        frame.delete();
      };

      img.onerror = function(err) {
        console.error('Error loading image:', err);
      };
    }

    document.addEventListener('message', function(event) {
  const imageData = JSON.parse(event.data);
  if (imageData && imageData.uri) {
    console.log('Base64 image data received:', imageData.uri);

    let img = new Image();
    img.src = imageData.uri;

    img.onload = function() {
      console.log('Image loaded successfully in WebView');
      let canvas = document.getElementById('canvasOutput');
      let ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0); // Draw the image onto the canvas

      try {
        let frame = cv.imread(canvas); // Convert the canvas to an OpenCV matrix
        console.log('Frame loaded successfully in OpenCV');
        processFrame(frame);  // Call your image processing function
      } catch (error) {
        console.error('Error during OpenCV frame processing:', error);
      }
    };

    img.onerror = function(err) {
      console.error('Error loading image:', err);
    };
  } else {
    console.error('Invalid or missing image data');
  }
});

function processFrame(frame) {
  // Simple example: show the image in OpenCV.js
  if (frame.empty()) {
    console.error('Frame is empty, cannot process the image.');
    return;
  }

  // Apply some basic OpenCV operations here
  cv.imshow('canvasOutput', frame);  // Display the image on a canvas
}
  function processFrameContinuously() {
  setInterval(() => {
    if (cameraIsActive) {
      // Capture the current frame and process it
      let frame = captureFrameFromCamera(); // Implement this based on your camera setup
      processFrame(frame);  // Call your image processing function here
    }
  }, 100); // Process every 100ms or so (adjust as needed)
}
  let frameCount = 0;
function processRealTimeFrame(frame) {
    frameCount++;
    if (frameCount % 5 === 0) { // Process every 5th frame
        processFrame(frame);
    }
}






    

  </script>
</body>
</html>

  `;
