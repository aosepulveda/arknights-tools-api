import {
  findAllOperatorsFromGameData,
  findOperatorFromGameData,
} from '../services/operator.service';
import { findBuffByOperatorFromGameData } from '../services/building.service';

const findAllOperators = async (locale, showBuffs) => {
  const operators = await findAllOperatorsFromGameData(locale, showBuffs);
  return operators;
};

const findOperator = async (id, locale) => {
  const operator = await findOperatorFromGameData(id, locale);
  return operator;
};

const findBuffsByOperator = async (id, locale) => {
  const operator = await findBuffByOperatorFromGameData(id, locale);
  return operator;
};

export { findAllOperators, findOperator, findBuffsByOperator };
