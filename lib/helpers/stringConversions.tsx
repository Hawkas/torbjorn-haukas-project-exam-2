export function capsFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function pluralCheck(str: string, num: number) {
  return str + (num > 1 || num === 0 ? 's' : '');
}

// https://www.30secondsofcode.org/js/s/slugify
export const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

// https://stackoverflow.com/a/15764763 from comment by user Ore4444
export function getFormattedDate(date: Date) {
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${month}/${day}/${year}`;
}
/**
 * Convert an integer to its words representation
 *
 * @author McShaman (http://stackoverflow.com/users/788657/mcshaman)
 * @source http://stackoverflow.com/questions/14766951/convert-digits-into-words-with-javascript
 */
export function toEnglish(
  n: number,
  capitalize?: boolean | string,
  joinCharacter?: string
): string {
  const string = n.toString();
  const and = joinCharacter || '';
  let start;
  let end;
  let chunk;
  let ints;
  let i;
  let word;
  let finalWord;

  /* Is number zero? */
  if (parseInt(string, 10) === 0) {
    return 'zero';
  }

  /* Array of units as words */
  const units = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];

  /* Array of tens as words */
  const tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  /* Array of scales as words */
  const scales = [
    '',
    'thousand',
    'million',
    'billion',
    'trillion',
    'quadrillion',
    'quintillion',
    'sextillion',
    'septillion',
    'octillion',
    'nonillion',
    'decillion',
    'undecillion',
    'duodecillion',
    'tredecillion',
    'quatttuor-decillion',
    'quindecillion',
    'sexdecillion',
    'septen-decillion',
    'octodecillion',
    'novemdecillion',
    'vigintillion',
    'centillion',
  ];

  /* Split user arguemnt into 3 digit chunks from right to left */
  start = string.length;
  const chunks = [];
  while (start > 0) {
    end = start;
    chunks.push(string.slice((start = Math.max(0, start - 3)), end));
  }

  /* Check if function has enough scale words to be able to stringify the user argument */
  const chunksLen = chunks.length;
  if (chunksLen > scales.length) {
    return '';
  }

  /* Stringify each integer in each chunk */
  const words = [];
  for (i = 0; i < chunksLen; i += 1) {
    chunk = parseInt(chunks[i], 10);

    if (chunk) {
      /* Split chunk into array of individual integers */
      ints = chunks[i].split('').reverse().map(parseFloat);

      /* If tens integer is 1, i.e. 10, then add 10 to units integer */
      if (ints[1] === 1) {
        ints[0] += 10;
      }

      /* Add scale word if chunk is not zero and array item exists */
      if (scales[i]) {
        word = scales[i];
        words.push(word);
      }

      /* Add unit word if array item exists */
      if (units[ints[0]]) {
        word = units[ints[0]];
        words.push(word);
      }

      /* Add tens word if array item exists */
      if (tens[ints[1]]) {
        word = tens[ints[1]];
        words.push(word);
      }

      /* Add 'and' string after units or tens integer if: */
      if (ints[0] || ints[1]) {
        /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
        if (ints[2] || (!i && chunksLen)) {
          words.push(and);
        }
      }

      /* Add hundreds word if array item exists */
      if (units[ints[2]]) {
        word = units[ints[2]];
        words.push(`${word} hundred`);
      }
    }
  }
  finalWord = words.reverse().join(' ').trim();
  if (capitalize) finalWord = capsFirstLetter(finalWord);
  return finalWord;
}
