import {
  findAllBuffsFromGameData,
  findBuffByOperatorFromGameData,
  findAllRoomsFromGameData,
} from '../services/building.service';

const findAllBuffs = async (locale) => {
  const buffs = await findAllBuffsFromGameData(locale);
  return buffs;
};

const findAllRooms = async (locale) => {
  const rooms = await findAllRoomsFromGameData(locale);
  return rooms;
};

const findBuffsByOperator = async (id) => {
  const operator = await findBuffByOperatorFromGameData(id);
  return operator;
};

export { findAllBuffs, findBuffsByOperator, findAllRooms };
