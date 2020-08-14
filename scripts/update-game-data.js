/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');

async function downloadFile({ url, destinationPath, name }) {
  const path = Path.resolve(__dirname, destinationPath, name);
  const writer = Fs.createWriteStream(path);

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

const updateGameData = async () => {
  const DESTINATION_PATHS = {
    EN: './../src/data/en_US/gamedata/excel/',
    CN: './../src/data/zh_CN/gamedata/excel/',
    JP: './../src/data/ja_JP/gamedata/excel/',
    KR: './../src/data/ko_KR/gamedata/excel/',
  };

  const FILES = {
    CHARACTERS: {
      EN: {
        url:
          'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/en_US/gamedata/excel/character_table.json',
        name: 'character_table.json',
      },
      CN: {
        url:
          'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/zh_CN/gamedata/excel/character_table.json',
        name: 'character_table.json',
      },
      JP: {
        url:
          'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/ja_JP/gamedata/excel/character_table.json',
        name: 'character_table.json',
      },
      KR: {
        url:
          'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/ko_KR/gamedata/excel/character_table.json',
        name: 'character_table.json',
      },
    },
    BUILDINGS: {
      EN: {
        url:
          'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/en_US/gamedata/excel/building_data.json',
        name: 'building_data.json',
      },
      CN: {
        url:
          'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/zh_CN/gamedata/excel/building_data.json',
        name: 'building_data.json',
      },
      JP: {
        url:
          'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/ja_JP/gamedata/excel/building_data.json',
        name: 'building_data.json',
      },
      KR: {
        url:
          'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/ko_KR/gamedata/excel/building_data.json',
        name: 'building_data.json',
      },
    },
    TAGS: {
      EN: {
        url:
          'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/en_US/gamedata/excel/gacha_table.json',
        name: 'gacha_table.json',
      },
      CN: {
        url:
          'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/zh_CN/gamedata/excel/gacha_table.json',
        name: 'gacha_table.json',
      },
      JP: {
        url:
          'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/ja_JP/gamedata/excel/gacha_table.json',
        name: 'gacha_table.json',
      },
      KR: {
        url:
          'https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/ko_KR/gamedata/excel/gacha_table.json',
        name: 'gacha_table.json',
      },
    },
  };
  const gameDataFiles = [
    {
      url: FILES.CHARACTERS.EN.url,
      destinationPath: DESTINATION_PATHS.EN,
      name: FILES.CHARACTERS.EN.name,
    },
    {
      url: FILES.BUILDINGS.EN.url,
      destinationPath: DESTINATION_PATHS.EN,
      name: FILES.BUILDINGS.EN.name,
    },
    {
      url: FILES.TAGS.EN.url,
      destinationPath: DESTINATION_PATHS.EN,
      name: FILES.TAGS.EN.name,
    },
    {
      url: FILES.CHARACTERS.CN.url,
      destinationPath: DESTINATION_PATHS.CN,
      name: FILES.CHARACTERS.CN.name,
    },
    {
      url: FILES.BUILDINGS.CN.url,
      destinationPath: DESTINATION_PATHS.CN,
      name: FILES.BUILDINGS.CN.name,
    },
    {
      url: FILES.TAGS.CN.url,
      destinationPath: DESTINATION_PATHS.CN,
      name: FILES.TAGS.CN.name,
    },
    {
      url: FILES.CHARACTERS.JP.url,
      destinationPath: DESTINATION_PATHS.JP,
      name: FILES.CHARACTERS.JP.name,
    },
    {
      url: FILES.BUILDINGS.JP.url,
      destinationPath: DESTINATION_PATHS.JP,
      name: FILES.BUILDINGS.JP.name,
    },
    {
      url: FILES.TAGS.JP.url,
      destinationPath: DESTINATION_PATHS.JP,
      name: FILES.TAGS.JP.name,
    },
    {
      url: FILES.CHARACTERS.KR.url,
      destinationPath: DESTINATION_PATHS.KR,
      name: FILES.CHARACTERS.KR.name,
    },
    {
      url: FILES.BUILDINGS.KR.url,
      destinationPath: DESTINATION_PATHS.KR,
      name: FILES.BUILDINGS.KR.name,
    },
    {
      url: FILES.TAGS.KR.url,
      destinationPath: DESTINATION_PATHS.KR,
      name: FILES.TAGS.KR.name,
    },
  ];

  const promises = gameDataFiles.map((file) => downloadFile({ ...file }));

  Promise.all(promises)
    .then(() => console.log('finished!'))
    .catch(() => console.error('error!'));
};

updateGameData();
