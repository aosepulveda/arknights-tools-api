/* eslint-disable import/prefer-default-export */
export const cleanRoomRawObject = (rawData) => ({
  id: rawData.id,
  name: rawData.name,
  category: rawData.category,
  description: rawData.description,
});
