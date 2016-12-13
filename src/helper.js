/*  eslint-disable no-unused-vars*/
/*  eslint-disable no-undef */
/* jshint esnext: true */
/**
* helper class for InvertedIndex
* @class
*/
class Utility {
  /**
     * Get tokens in a string of text.
     * @function
     * @param {String} combineWords concatenated title and texts to be tokenize.
     * @return {Array} array of tokens
     */
  static token(combineWords) {
    return combineWords.toLowerCase()
      .match(/\w+/g);
  }
  /**
   * validates the file type using regEXP
   * @param  {file} file   file that is being uploaded
   * @return {string}      error message
   */
  static fileIsValid(file) {
    if (!file.name.toLowerCase().match(/\.json$/)) {
      return false;
    }
    return true;
  }
  /**
   * check if the file content is a valid object
   * @param  {object} content file content which can be a valid json object
   * @return {string}         error message
   */
  static contentIsValid(content) {
    if (typeof (content) !== 'object') {
      return false;
    }
    return true;
  }
  /**
   * Checks if the file content is in a standard array format
   * @return {string}         error message
   */
  static contentIsEmpty() {
    if (InvertedIndex.docCount === undefined) {
      return 'JSON file should be an array of objects';
    }
  }
}
