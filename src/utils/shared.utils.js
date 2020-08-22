import path from 'path';
import { promisify } from 'util';
import fs from 'fs';
import isEmpty from 'lodash/isEmpty';
import { cleanTagRawObject } from './tag.utils';

const readFile = promisify(fs.readFile);

const dataCharacterTablePathEN =
  './../data/en_US/gamedata/excel/character_table.json';
const dataCharacterTablePathCN =
  './../data/zh_CN/gamedata/excel/character_table.json';
const dataCharacterTablePathJP =
  './../data/ja_JP/gamedata/excel/character_table.json';
const dataCharacterTablePathKR =
  './../data/ko_KR/gamedata/excel/character_table.json';
const dataCharacterTablePathTW =
  './../data/zh_TW/gamedata/excel/character_table.json';
const dataBuildingDataPathEN =
  './../data/en_US/gamedata/excel/building_data.json';
const dataBuildingDataPathCN =
  './../data/zh_CN/gamedata/excel/building_data.json';
const dataBuildingDataPathJP =
  './../data/ja_JP/gamedata/excel/building_data.json';
const dataBuildingDataPathKR =
  './../data/ko_KR/gamedata/excel/building_data.json';
const dataBuildingDataPathTW =
  './../data/zh_TW/gamedata/excel/building_data.json';
const dataGachaTablePathEN = './../data/en_US/gamedata/excel/gacha_table.json';
const dataGachaTablePathCN = './../data/zh_CN/gamedata/excel/gacha_table.json';
const dataGachaTablePathJP = './../data/ja_JP/gamedata/excel/gacha_table.json';
const dataGachaTablePathKR = './../data/ko_KR/gamedata/excel/gacha_table.json';
const dataGachaTablePathTW = './../data/zh_TW/gamedata/excel/gacha_table.json';

export const readCharacterTableGameDataJsonFile = async (locale) => {
  if (!isEmpty(global.gameData[locale].characters)) {
    return global.gameData[locale].characters;
  }
  let operatorsFromGameData;
  switch (locale) {
    case 'en':
      operatorsFromGameData = await readFile(
        path.join(__dirname, dataCharacterTablePathEN),
      );
      break;
    case 'cn':
      operatorsFromGameData = await readFile(
        path.join(__dirname, dataCharacterTablePathCN),
      );
      break;
    case 'jp':
      operatorsFromGameData = await readFile(
        path.join(__dirname, dataCharacterTablePathJP),
      );
      break;
    case 'kr':
      operatorsFromGameData = await readFile(
        path.join(__dirname, dataCharacterTablePathKR),
      );
      break;
    case 'tw':
      operatorsFromGameData = await readFile(
        path.join(__dirname, dataCharacterTablePathTW),
      );
      break;
    default:
      operatorsFromGameData = await readFile(
        path.join(__dirname, dataCharacterTablePathEN),
      );
      break;
  }

  global.gameData[locale].characters = JSON.parse(operatorsFromGameData);
  return global.gameData[locale].characters;
};

export const readBuildingDataGameDataJsonFile = async (locale) => {
  if (!isEmpty(global.gameData[locale].building)) {
    return global.gameData[locale].building;
  }
  let buildingDataFromGameData;
  switch (locale) {
    case 'en':
      buildingDataFromGameData = await readFile(
        path.join(__dirname, dataBuildingDataPathEN),
      );
      break;
    case 'cn':
      buildingDataFromGameData = await readFile(
        path.join(__dirname, dataBuildingDataPathCN),
      );
      break;
    case 'jp':
      buildingDataFromGameData = await readFile(
        path.join(__dirname, dataBuildingDataPathJP),
      );
      break;
    case 'kr':
      buildingDataFromGameData = await readFile(
        path.join(__dirname, dataBuildingDataPathKR),
      );
      break;
    case 'tw':
      buildingDataFromGameData = await readFile(
        path.join(__dirname, dataBuildingDataPathTW),
      );
      break;
    default:
      buildingDataFromGameData = await readFile(
        path.join(__dirname, dataBuildingDataPathEN),
      );
      break;
  }
  global.gameData[locale].building = JSON.parse(buildingDataFromGameData);
  return global.gameData[locale].building;
};

export const readGachaTableGameDataJsonFile = async (locale) => {
  if (!isEmpty(global.gameData[locale].gacha)) {
    return global.gameData[locale].gacha;
  }
  let gachaTableFromGameData;
  switch (locale) {
    case 'en':
      gachaTableFromGameData = await readFile(
        path.join(__dirname, dataGachaTablePathEN),
      );
      break;
    case 'cn':
      gachaTableFromGameData = await readFile(
        path.join(__dirname, dataGachaTablePathCN),
      );
      break;
    case 'jp':
      gachaTableFromGameData = await readFile(
        path.join(__dirname, dataGachaTablePathJP),
      );
      break;
    case 'kr':
      gachaTableFromGameData = await readFile(
        path.join(__dirname, dataGachaTablePathKR),
      );
      break;
    case 'tw':
      gachaTableFromGameData = await readFile(
        path.join(__dirname, dataGachaTablePathTW),
      );
      break;
    default:
      gachaTableFromGameData = await readFile(
        path.join(__dirname, dataGachaTablePathEN),
      );
      break;
  }
  global.gameData[locale].gacha = JSON.parse(gachaTableFromGameData);
  return global.gameData[locale].gacha;
};

export const capitalizeString = (s) => {
  if (typeof s !== 'string') {
    return '';
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const createGlobalVariableForGameData = () => {
  global.gameData = {
    en: {
      characters: {},
      building: {},
      gacha: {},
    },
    cn: {
      characters: {},
      building: {},
      gacha: {},
    },
    jp: {
      characters: {},
      building: {},
      gacha: {},
    },
    kr: {
      characters: {},
      building: {},
      gacha: {},
    },
    tw: {
      characters: {},
      building: {},
      gacha: {},
    },
  };
};

export const findAllTagsFromGameData = async (locale) => {
  const gachaData = await readGachaTableGameDataJsonFile(locale);
  const tags = gachaData.gachaTags
    .map((tag) => cleanTagRawObject(tag))
    .filter((tag) => tag.id <= 28);
  return tags;
};

export const operatorsOnlyObtainableByRecruitment = [
  'char_127_estell',
  'char_155_tiger',
  'char_163_hpsts',
];

export const robotTagIds = [
  'char_285_medic2',
  'char_286_cast3',
  'char_376_therex',
];
