
const getImageUrl = (imageData: string) => {
  try {
    const parsedData = JSON.parse(imageData);
    return parsedData[0];
  } catch (error) {
    return imageData;
  }
};

export { getImageUrl };