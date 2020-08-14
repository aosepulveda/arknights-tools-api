/* eslint-disable implicit-arrow-linebreak */
import get from 'lodash/get';
import flatten from 'lodash/flatten';

export const cleanOperatorRawObject = (rawData) => ({
  id: rawData.id,
  name: rawData.name,
  description: rawData.description,
  stars: rawData.rarity + 1,
  potential: rawData.maxPotentialLevel,
  tags: rawData.tagList !== null ? get(rawData, 'tagList', []) : [],
  profession: rawData.profession,
  position: rawData.position,
  obtainableBy: rawData.itemObtainApproach,
});

export const getRecruitmentListFromString = (recruitDetail) =>
  flatten(
    recruitDetail
      .replace(/<.+?>(.+?)<\/>/g, '$1')
      .replace(/\\n/g, '\n')
      .split(/\n?[-★]+\n/)
      .splice(1)
      .filter((line) => line)
      .map((line) => line.split('/').map((name) => name.trim())),
  );
