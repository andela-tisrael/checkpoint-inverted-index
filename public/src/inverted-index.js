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
   * @param {Array} fileContent [json array]
   * @return
   */
  createIndex(fileContent) {
    this.docCount = [];
    this.count = 0;
    for (const documents in fileContent) {
      this.docCount.push(parseInt(documents, 10));
    }
    fileContent.forEach((content) => {
      this.count += 1;
      const bookTitle = InvertedIndex.token((content.title));
      const bookText = InvertedIndex.token((content.text));
      const removeDuplicates = new Set(bookTitle.concat(bookText));
      this.mapWords(removeDuplicates, this.count);
    });
  }
  /**
   * Get tokens in a string of text.
   * @function
   * @param {String} fileContent [word to be tokenize.]
   * @return {Array} [array of tokens]
   */
  static token(fileContent) {
    return fileContent.toLowerCase()
    .match(/\w+/g);
  }
  /**
   * Map Array of words to indexMap.
   * @function
   * @param {String} words [array of unique words to be mapped.]
   * @param {Integer} tag [the document number the word exists.]
   * @return
   */
  mapWords(words, tag) {
    words.forEach((word) => {
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
