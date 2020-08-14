/* eslint-disable import/prefer-default-export */
import 'lodash.combinations';
import _ from 'lodash';

import { findAllOperatorsFromGameData } from './operator.service';
import { getRecruitmentListFromString } from '../utils/operator.utils';
import {
  readGachaTableGameDataJsonFile,
  capitalizeString,
  operatorsOnlyObtainableByRecruitment,
  robotTagIds,
} from '../utils/shared.utils';

export const findOperatorsByGroupOfTagsFromGameData = async (locale, tags) => {
  const combs = _.flatMap([1, 2, 3], (v) =>
    _.combinations(tags, v),
  ).map((comb) => comb.map((tag) => parseInt(tag, 10)));
  let operators = await findAllOperatorsFromGameData(locale);

  const gachaData = await readGachaTableGameDataJsonFile(locale);
  const availableOperatorsForRecruitment = getRecruitmentListFromString(
    gachaData.recruitDetail,
  );

  operators = operators
    .filter((op) => {
      return availableOperatorsForRecruitment.some((a) => a === op.name);
    })
    .map((operator) => {
      const auxOperator = operator;
      if (robotTagIds.includes(operator.id) && !combs.includes(28)) {
        auxOperator.tags.push({ id: 28, name: '' });
      }

      auxOperator.onlyObtainableByRecruitment = operatorsOnlyObtainableByRecruitment.includes(
        operator.id,
      );

      auxOperator.profession.name = capitalizeString(
        operator.profession.name.toLowerCase(),
      );
      // add profession and position to tags...
      auxOperator.tags = [
        ...operator.tags,
        operator.position,
        operator.profession,
      ];
      return auxOperator;
    });
  // add other tags to operators...

  const result = {
    tags,
    groups: [],
  };
  const tagsFlatten = _.flatMap(tags);
  const charTagSum = 512;
  const tagCount = _.size(tagsFlatten);

  const avgCharTag = charTagSum / tagCount;
  const rares = [1, 2, 3, 4, 5, 6];
  combs.sort((a, b) => b.length - a.length);
  combs.forEach((comb) => {
    const resultComb = {
      comb,
      operators: [],
    };
    operators.forEach((operator) => {
      if (comb.length > 1) {
        // check all tags in a operator
        const tagsOperator = _.intersectionWith(
          comb,
          operator.tags,
          (a, b) => a === b.id,
        );
        if (tagsOperator.length === comb.length && operator.stars !== 6) {
          resultComb.operators.push(operator);
        } else if (
          comb.includes(11) &&
          !comb.includes(14) &&
          operator.stars === 6 &&
          tagsOperator.length > 0
        ) {
          resultComb.operators.push(operator);
        } else if (
          comb.includes(14) &&
          !comb.includes(11) &&
          operator.stars === 5 &&
          tagsOperator.length > 0
        ) {
          resultComb.operators.push(operator);
        }
      } else {
        comb.forEach((combTag) => {
          if (
            operator.tags.find((t) => t.id === combTag) &&
            operator.stars !== 6
          ) {
            // 6 stars
            resultComb.operators.push(operator);
          }
          if (combTag === 11 && operator.stars === 6) {
            resultComb.operators.push(operator);
          }
          if (combTag === 14 && operator.stars === 5) {
            resultComb.operators.push(operator);
          }
        });
      }
    });
    let scoreChars = _.filter(resultComb.operators, ({ stars }) => stars >= 3);
    if (scoreChars.length === 0) scoreChars = resultComb.operators;
    const score =
      _.sumBy(scoreChars, ({ stars }) => stars) / scoreChars.length -
      comb.length / 10 -
      scoreChars.length / avgCharTag;

    _.remove(resultComb.operators, ({ stars }) => !rares.includes(stars));
    resultComb.operators.sort((a, b) => b.stars - a.stars);
    result.groups.push({ ...resultComb, score });
  });
  // sort by number of operators
  result.groups.sort((a, b) => a.operators.length - b.operators.length);

  return result;
};
