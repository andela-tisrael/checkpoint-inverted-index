/*jshint esnext: true */
/*
 * Unit tests for src/inverted-index.js
 */
//

describe('Inverted Index', () => {
    beforeEach(function() {
        this.invertedIndex = new InvertedIndex();
        this.index = this.invertedIndex.createIndex(books);
        this.getIndexMap = this.invertedIndex.getIndex();
    });
    it('should create an object once the class is declared', function() {
        expect(this.invertedIndex).toEqual(jasmine.any(Object));
    });

    describe('Read book data', () => {
        it('should ensure the file content is actually a valid JSON Array', function() {
            expect(InvertedIndex.fileIsValid(filename)).toEqual(true);
            expect(InvertedIndex.fileIsValid(filename2)).toEqual(false);
        });
        it('should ensure JSON array is not empty', function(){
            expect(InvertedIndex.contentIsValid(file2[0])).toEqual(false);
            expect(InvertedIndex.contentIsValid(books[0])).toEqual(true);
            expect(InvertedIndex.contentIsEmpty(file2)).toEqual('JSON file should be an array of objects');
        });
        it('should return tokenized data as an array of strings in small letters', function() {
            expect(InvertedIndex.token(books[0].title)).toEqual(['alice', 'in', 'wonderland']);
        });
        it('should filter out unwanted symbols', function() {
            expect(InvertedIndex.token('alice # in* Wonderland')).toEqual(['alice', 'in', 'wonderland']);
        });
        it('should be able to show the index of a particular data', function() {
            expect(this.getIndexMap.a).toEqual([1, 2]);
            expect(this.getIndexMap.alice).toEqual([1]);
        });
    });

    describe('Get Index', () => {
        it('returns an object that is an accurate index of the content of the JSON file', function() {
            expect(this.invertedIndex.getIndex()).toEqual(jasmine.any(Object));
        });
    });

    describe('Tokenize', () => {
        it('Removes special characters', function() {
            expect(InvertedIndex.token('alice !!!!, hello, world')).toEqual(['alice', 'hello', 'world']);
            expect(InvertedIndex.token('Today is **!! , a good!. day to smile')).toEqual(['today', 'is', 'a', 'good', 'day', 'to', 'smile']);
        });

        it('Creates an array of tokens', function() {
            expect(InvertedIndex.token(books[0].title)).toEqual(['alice', 'in', 'wonderland']);
        });
    });

    describe('Populate Index', () => {
        it('should populate indexMap once the createIndex button is clicked', function() {
            let populateIndex = new InvertedIndex();
            populateIndex.createIndex(books);
            expect(this.getIndexMap).toEqual(populateIndex.indexMap);
        });
        it('should return an array after strings of words is tokenized', function() {
            expect(InvertedIndex.token('alice is @#$ in wonderland$%')).toEqual(['alice', 'is', 'in', 'wonderland']);
        });
    });

    describe('Search Index', () => {
        const query = 'alice lord';
        let index = new InvertedIndex();
        index.fileMap['books.json'] = books;
        index.createIndex(books,'books.json');
        index.createIndex(files,'files.json');
        let result = index.search(query,'books.json');
        it(' should verify that searching the index returns an object of the indices', () => {
            expect(result = index.search(query,'books.json')).toEqual({ alice: [1], lord: [2] });
        });
        it('should return an empty object if no search word is given', () => {
            expect(result = index.search('', 'books.json')).toEqual(index.fileMap['books.json']);
        });
        it('should be able to search through the indexMap and output an object', function() {
            expect(this.invertedIndex.search('alice in wonderland')).toEqual({ alice: [1], in : [1], wonderland: [1] });
        });
        it('should be able to search through all files', () => {
            expect(result = index.search('alice lord', 'all')).toEqual(({ 'books.json':{ alice: [ 1 ], lord: [ 2 ] }, 'files.json':{ alice: [ 1 ], lord: [ 2 ] } }));
        });
        it('returns an Array of numbers', function () {
            expect(this.invertedIndex.search('of').of).toEqual([1,2]);
            expect(this.invertedIndex.search('alice').alice).toEqual([1]);
        });
        it('should filter out words or numbers that are irrelevant ato index', function() {
            expect(this.invertedIndex.search('of 54276525475663')).toEqual({of: [1,2]});
            expect(this.invertedIndex.search('alice in @#434 word')).toEqual({ alice: [ 1 ], in: [ 1 ] });
        });

    });
});
