import { findOperatorsByGroupOfTagsFromGameData } from '../services/tag.service';
import { findAllTagsFromGameData } from '../utils/shared.utils';

const findAllTags = async (locale) => {
  const tags = await findAllTagsFromGameData(locale);
  return tags;
};

const findOperatorsByGroupOfTags = async (locale, tags) => {
  const groupedOperators = await findOperatorsByGroupOfTagsFromGameData(
    locale,
    tags,
  );
  return groupedOperators;
};

export { findAllTags, findOperatorsByGroupOfTags };
