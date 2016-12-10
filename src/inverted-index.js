/*  eslint-disable no-unused-vars*/
/*  eslint-disable no-undef */
/* eslint-disable no-lonely-if*/
/* jshint esnext: true */
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
    this.fileMap = {};
    this.indexMap = {};
    this.docNumber = {};
    this.uploadedFiles = {};
  }
  /**
   * Create index
   * @function
   * @param {Array} fileContent
   * @param {string} fileName Name of the file being indexed
   * @return {void}
   */
  createIndex(fileContent, fileName) {
    this.docCount = [];
    this.count = 0;
    fileContent.forEach((content, index) => {
      this.docCount.push(parseInt(index, 10));
      this.count += 1;
      const combineWords = `${content.title} ${content.text}`;
      const tokenizedWords = Utility.token(combineWords);
      const wordIndex = new Set(tokenizedWords);
      this.mapWords(wordIndex, this.count);
    });
    this.fileMap[fileName] = this.indexMap;
    this.docNumber[fileName] = this.docCount;
  }
  /**
   * Map Array of words to indexMap.
   * @function
   * @param {String} words unique word to be mapped.
   * @param {Integer} tag the document number the word exists.
   * @return {void}
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
   * @param {string} title title of the file to be searched
   * @return {object} all the words that exists in the documents with their tag
   */
  getIndex(title) {
    return this.fileMap[title];
  }
  /**
   * searches through the index map
   * @param  {string} query the set of string being input in search box
   * @param {string} title    the file title selected to be searched
   * @return {object} result     the search result is returned
   */
  search(title, ...query) {
    let searchQuery = [];
    if (query.length > 1) {
      query.forEach((word) => {
        searchQuery.push(word);
      });
    } else {
      if (Array.isArray(query[0])) {
        query[0].forEach((word) => {
          const terms = word.match(/\w+/g);
          terms.forEach((term) => {
            searchQuery.push(term);
          });
        });
      } else if (query[0] !== '') {
        searchQuery = query[0].match(/\w+/g);
      }
    }
    if (title === 'all') {
      const result = {};
      Object.keys(this.fileMap).forEach((book) => {
        const searchResult = {};
        const dictionary = this.fileMap[book];
        searchQuery.forEach((word) => {
          if (word in dictionary) {
            searchResult[word] = dictionary[word];
          }
        });
        result[book] = searchResult;
      });
      return query === '' ? this.fileMap : result;
    }
    const dictionary = this.fileMap[title];
    const result = {};
    searchQuery.forEach((word) => {
      if (word in dictionary) {
        result[word] = dictionary[word];
      }
    });
    return Object.keys(result).length > 0 ? result : dictionary;
  }
}
