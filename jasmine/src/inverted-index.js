/**
 * InvertedIndex class with constructor
 * @class
 */
class InvertedIndex {
  /**
   * class constructor
   * @constructor
   */
  constructor() {
    this.indexMap = {};
  }
  /**
   * Create index
   * @function
   * @param {Array} jsonArray [json array]
   * @return
   */
  createIndex(jsonArray) {
    this.docCount = [];
    this.count = 0;
    for (const object in jsonArray) {
      this.docCount.push(parseInt(object, 10));
    }
    jsonArray.forEach((object) => {
      this.count += 1;
      const bookTitleArray = InvertedIndex.token((object.title));
      const bookTextArray = InvertedIndex.token((object.text));
      const wordIndex = new Set(bookTitleArray.concat(bookTextArray));
      const formArray = Array.from(wordIndex.values());
      this.mapWords(formArray, this.count);
    });
  }
  /**
   * Get tokens in a string of text.
   * @function
   * @param {String} jsonWord [word to be tokenize.]
   * @return {Array} [array of tokens]
   */
  static token(jsonWord) {
    return jsonWord.toLowerCase()
    .match(/\w+/g);
  }
  /**
   * Map Array of words to indexMap.
   * @function
   * @param {String} wordArray [unique word to be mapped.]
   * @param {Integer} tag [the document number the word exists.]
   * @return
   */
  mapWords(wordArray, tag) {
    wordArray.forEach((word) => {
      if (word in this.indexMap) {
        this.indexMap[word].push(tag);
      } else {
        this.indexMap[word] = [tag];
      }
    });
  }
  /**
   * gets the index map
   * @return {object} [all the words that exists in the documents with their tag]
   */
  getIndex() {
    return this.indexMap;
  }
  /**
   * searches through the index map
   * @param  {string} query [the set of string being input in search box]
   * @return {object} result     [the search result is returned]
   */
  search(query) {
    // console.log(query);
    const dictionary = this.getIndex();
    const result = {};
    const searchQuery = query.split(' ');
    searchQuery.forEach((word) => {
      if (word in dictionary) {
        result[word] = this.indexMap[word];
      }
    });
    return Object.keys(result).length > 0 ? result : this.indexMap;
  }
}
