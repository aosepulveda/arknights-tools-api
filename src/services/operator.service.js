import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import {
  readCharacterTableGameDataJsonFile,
  findAllTagsFromGameData,
  operatorsOnlyObtainableByRecruitment,
} from '../utils/shared.utils';
import { cleanOperatorRawObject } from '../utils/operator.utils';
import { findAllBuffsByOperatorFromGameData } from './building.service';

export const findAllOperatorsFromGameData = async (locale, showBuffs) => {
  const operatorsObject = await readCharacterTableGameDataJsonFile(locale);
  const allTags = await findAllTagsFromGameData(locale);
  let operators = [];
  const enumPosAndPro = {
    WARRIOR: 1,
    SNIPER: 2,
    TANK: 3,
    MEDIC: 4,
    SUPPORT: 5,
    CASTER: 6,
    SPECIAL: 7,
    PIONEER: 8,
    MELEE: 9,
    RANGED: 10,
  };

  Object.entries(operatorsObject).forEach(([key, value]) =>
    operators.push(cleanOperatorRawObject({ id: key, ...value })),
  );
  operators = operators.filter((operator) => operator.obtainableBy !== null);

  if (showBuffs) {
    // add building buffs by operator
    const buffs = await findAllBuffsByOperatorFromGameData(locale);
    operators = operators.map((operator) => ({
      ...operator,
      buffs: get(
        buffs.find((buff) => buff.id === operator.id),
        'buffs',
        [],
      ),
    }));
  }
  operators = operators.map((operator) => {
    return {
      ...operator,
      position: {
        id: enumPosAndPro[operator.position],
        name: operator.position,
      },
      profession: {
        id: enumPosAndPro[operator.profession],
        name: operator.profession,
      },
      tags: operator.tags.map((tag) => allTags.find((t) => t.name === tag)),
      onlyObtainableByRecruitment: operatorsOnlyObtainableByRecruitment.includes(
        operator.id,
      ),
    };
  });

  return operators;
};

export const findOperatorFromGameData = async (id, locale) => {
  const operatorsObject = await readCharacterTableGameDataJsonFile(locale);
  if (isEmpty(operatorsObject[id])) {
    return {};
  }
  return cleanOperatorRawObject({ id, ...operatorsObject[id] });
};
