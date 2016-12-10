/*jshint esnext: true */
/*
 * Unit tests for src/inverted-index.js
 */

describe('Inverted Index', () => {
    beforeEach(function () {
        this.invertedIndex = new InvertedIndex();
        this.invertedIndex.createIndex(books, 'books.json');
        this.getIndexMap = this.invertedIndex.getIndex('books.json');
        this.invertedIndex.createIndex(files, 'files.json');
    });
    it('should create an object once the class is declared', function () {
        expect(this.invertedIndex).toEqual(jasmine.any(Object));
    });

    describe('Read book data', () => {
        it('should ensure the file content is actually a valid JSON Array', function () {
            expect(InvertedIndex.fileIsValid(filename)).toEqual(true);
            expect(InvertedIndex.fileIsValid(filename2)).toEqual(false);
        });
        it('should ensure JSON array is not empty', function () {
            expect(InvertedIndex.contentIsValid(file2[0])).toEqual(false);
            expect(InvertedIndex.contentIsValid(books[0])).toEqual(true);
            expect(InvertedIndex.contentIsEmpty(file2)).toEqual('JSON file should be an array of objects');
        });
    });

    describe('Get Index', () => {
        it('should be able to show the index of a particular data', function () {
            expect(this.getIndexMap.a).toEqual([1, 2]);
            expect(this.getIndexMap.alice).toEqual([1]);
        });
        it('should ensure ​getIndex​ method takes a string argument that specifies the location of the JSON data.', function () {
            expect(this.invertedIndex.getIndex('books.json')).toEqual(jasmine.any(Object));
        });
    });

    describe('Tokenize', () => {
        it('Removes special characters', function () {
            expect(InvertedIndex.token('alice !!!!, hello, world')).toEqual(['alice', 'hello', 'world']);
            expect(InvertedIndex.token('Today is **!! , a good!. day to smile')).toEqual(['today', 'is', 'a', 'good', 'day', 'to', 'smile']);
        });
        it('Creates an array of tokens', function () {
            expect(InvertedIndex.token(books[0].title)).toEqual(['alice', 'in', 'wonderland']);
        });
        it('should return tokenized data as an array of strings in small letters', function () {
            expect(InvertedIndex.token(books[0].title)).toEqual(['alice', 'in', 'wonderland']);
        });
        it('should filter out unwanted symbols', function () {
            expect(InvertedIndex.token('alice # in* Wonderland')).toEqual(['alice', 'in', 'wonderland']);
        });
        it('should return an array after strings of words is tokenized', function () {
            expect(InvertedIndex.token('alice is @#$ in wonderland$%')).toEqual(['alice', 'is', 'in', 'wonderland']);
        });
    });

    describe('Populate Index', () => {
        it('should ensure index is created once JSON file has been read', function () {
            let populateIndex = new InvertedIndex();
            populateIndex.createIndex(books, 'books.json');
            expect(this.invertedIndex.getIndex('books.json').hasOwnProperty('alice')).toEqual(true);
            expect(this.invertedIndex.getIndex('books.json').hasOwnProperty('in')).toEqual(true);
            expect(this.invertedIndex.getIndex('books.json').hasOwnProperty('wonderland')).toEqual(true);
            expect(this.invertedIndex.getIndex('books.json').hasOwnProperty('lord', 'of')).toEqual(true);
        });
        it('should ensure index is correct', function () {
            expect(typeof this.invertedIndex.getIndex('books.json')).toEqual('object');
            expect(this.invertedIndex.getIndex('books.json').a).toEqual([1,2]);
        });
        it('should ensure index is not overwritten by a new JSON file', function () {
            expect(Object.keys(this.invertedIndex.fileMap)).toEqual([ 'books.json', 'files.json' ]);
        });
    });

    describe('Search Index', function () {
        const query = 'alice';
        const query1 = 'lord';
        const word = ['alice in wonderland', 'lord'];
        it('should be able to search through all files', function () {
            expect(this.invertedIndex.search('all', query, query1)).toEqual(({ 'books.json': { alice: [1], lord: [2] }, 'files.json': { alice: [1], lord: [2] } }));
        });
        it('should ensure ​searchIndex​ can handle a varied number of search terms as arguments', function () {
            expect(this.invertedIndex.search('books.json', query, query1)).toEqual({ alice: [1], lord: [2] });
        });
        it('should return an empty object if no search word is given', function () {
            expect(this.invertedIndex.search('books.json', '')).toEqual(this.invertedIndex.fileMap['books.json']);
        });
        it('should ensure ​searchIndex ​can handle an array of search terms', function () {
            expect(this.invertedIndex.search('books.json', word)).toEqual({ alice:[1], in:[1], wonderland:[1], lord:[2] });
        });
        it('returns an Array of numbers', function () {
            expect(this.invertedIndex.search('books.json', 'of').of).toEqual([1, 2]);
            expect(this.invertedIndex.search('books.json', 'alice').alice).toEqual([1]);
        });
        it('should filter out words or numbers that are irrelevant ato index', function () {
            expect(this.invertedIndex.search('books.json', 'of 54276525475663')).toEqual({ of:[1, 2] });
            expect(this.invertedIndex.search('books.json', 'alice in @#434 word')).toEqual({ alice:[1], in:[1] });
        });

    });
});
