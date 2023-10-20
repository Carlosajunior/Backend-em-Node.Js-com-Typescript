import { SearchFields } from '../services/elastic.service';

const excludedWords = [
  'de',
  'da',
  'do',
  'das',
  'dos',
  'a',
  'o',
  'e',
  'os',
  'as'
];

export const generateWordsBySearchString = (orignalSearchString) => {
  const words = orignalSearchString.split(' ');
  const newWords = [];
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    if (i + 1 < words.length) {
      const middleWord = words[i + 1];
      if (excludedWords.includes(middleWord)) {
        if (i + 2 < words.length) {
          const nextWord = words[i + 2];
          i = i + 2;
          word = word + ' ' + middleWord + ' ' + nextWord;
        }
      }
    }
    newWords.push(word);
  }
  return newWords;
};

export const generateSearchFilter = (fields: SearchFields[]) => {
  const outFields: string[] = [];
  fields.forEach((f) => {
    outFields.push(`${f.name}^${f.weight}`);
    if (f.keyword) outFields.push(`${f.name}.keyword^${f.weight}`);
  });
  return outFields;
};

export const getWordsCombination = (phrase: string) => {
  const str = phrase.split(' ');
  let tempArr = [];
  let resultArr = [];
  for (let i = 0; i < str.length; i++) {
    tempArr = [str[i]];
    let index = 0;
    while (resultArr[index]) {
      tempArr.push('' + resultArr[index] + ' ' + str[i]);
      index++;
    }
    resultArr = resultArr.concat(tempArr);
  }
  return resultArr;
};

export const generateMutipleWordsBySearchString = (orignalSearchString) => {
  const words = orignalSearchString.split(' ');

  const newWords = [];
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    if (i + 1 < words.length) {
      const middleWord = words[i + 1];
      if (excludedWords.includes(middleWord)) {
        if (i + 2 < words.length) {
          const nextWord = words[i + 2];
          i = i + 2;
          word = word + ' ' + middleWord + ' ' + nextWord;
        }
      }
    }
    newWords.push(word);
  }
  return newWords;
};
