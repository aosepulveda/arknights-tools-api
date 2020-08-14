/* eslint-disable import/prefer-default-export */
export const cleanBuffRawObject = (rawData) => ({
  id: rawData.id,
  name: rawData.buffName,
  category: rawData.buffCategory,
  type: rawData.roomType,
  description: rawData.description,
  conditions: rawData.conditions,
});
