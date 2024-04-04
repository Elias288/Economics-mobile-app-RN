/**
 * Capitalize first letter
 * @param {string} word Word
 * @returns {string}
 */
export default function capitalizeFirstLetter(word) {
  const newWord = word.charAt(0).toUpperCase() + word.slice(1);

  return newWord;
}
