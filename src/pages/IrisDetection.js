import React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const IrisDetectionScreen = () => {
    const [image, setImage] = React.useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
            uploadImage(result.uri);
        }
    };

    const uploadImage = async (uri) => {
      let formData = new FormData();
      formData.append('image', {
          uri: uri,
          type: 'image/jpeg',
          name: 'eye_image.jpg',  // Name of the image
      });
  
      try {
          const response = await fetch('https://python-iris-backend.onrender.com', {
              method: 'POST',
              body: formData,  // Don't manually set Content-Type; React Native will handle it
          });
  
          const result = await response.json();
          console.log('Iris-to-Pupil Ratio:', result.ratio);
      } catch (error) {
          console.error('Error uploading image:', error);
      }
  };
  
  
  

    return (
        <View>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
};

export default IrisDetectionScreen;
