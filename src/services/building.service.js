import flatMap from 'lodash/flatMap';

import { cleanBuffRawObject } from '../utils/buff.utils';
import { readBuildingDataGameDataJsonFile } from '../utils/shared.utils';
import { cleanRoomRawObject } from '../utils/room.util';

export const findAllBuffsFromGameData = async (locale) => {
  const buffsData = await readBuildingDataGameDataJsonFile(locale);
  const buffsObject = buffsData.buffs;
  const buffs = [];
  Object.entries(buffsObject).forEach(([key, value]) =>
    buffs.push(cleanBuffRawObject({ id: key, ...value })),
  );
  return buffs;
};

export const findAllRoomsFromGameData = async (locale) => {
  const roomsData = await readBuildingDataGameDataJsonFile(locale);
  const roomsObject = roomsData.rooms;
  const rooms = [];
  Object.entries(roomsObject).forEach(([key, value]) =>
    rooms.push(cleanRoomRawObject({ id: key, ...value })),
  );
  return rooms;
};

export const findBuffByOperatorFromGameData = async (id, locale) => {
  const buffsData = await readBuildingDataGameDataJsonFile(locale);
  const buffsObject = buffsData.buffs;
  const characterObject = buffsData.chars[id];
  const buffs = flatMap(
    characterObject.buffChar.map((buff) => buff.buffData),
  ).map((buffFlat) =>
    cleanBuffRawObject({
      id: buffFlat.buffId,
      ...buffsObject[buffFlat.buffId],
    }),
  );
  return buffs;
};

export const findAllBuffsByOperatorFromGameData = async (locale) => {
  const buffsData = await readBuildingDataGameDataJsonFile(locale);
  const buffsObject = buffsData.buffs;
  const charactersObject = buffsData.chars;
  const operators = [];
  Object.entries(charactersObject).forEach(([key, value]) => {
    const buffs = flatMap(value.buffChar.map((buff) => buff.buffData)).map(
      (buffFlat) =>
        cleanBuffRawObject({
          id: buffFlat.buffId,
          ...buffsObject[buffFlat.buffId],
          conditions: buffFlat.cond,
        }),
    );
    operators.push({ id: key, buffs });
  });
  return operators;
};
