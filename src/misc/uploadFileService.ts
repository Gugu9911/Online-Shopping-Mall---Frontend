import axios from "axios";

async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post('http://localhost:3001/api/v1/images/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });

    if (response.data && response.data.imageUrl) {
      return response.data.imageUrl;
    } else {
      throw new Error('Image URL not found in response');
    }
  } catch (error) {
    console.error('Error uploading the image:', error);
    throw new Error('Failed to upload image');
  }
}

export { uploadImage };