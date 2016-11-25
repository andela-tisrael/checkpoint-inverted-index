/*
 * Unit tests for src/inverted-index.js
 */
//
var books = [{
        "title": "Alice in Wonderland",
        "text": "Alice falls into a rabbit hole and enters a world full of imagination."
    },

    {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
    }
];
describe('Inverted Index',() => {
    beforeEach(() => {
        this.invertedIndex = new InvertedIndex();
        this.index = this.invertedIndex.createIndex(books);
        this.getIndexMap = this.invertedIndex.getIndex();

    });
    describe('Constructor', () => {
        it('should create an object once the class is declared', () => {
        expect(this.invertedIndex).toEqual(jasmine.any(Object));    
    });
        it('constructor should declare an empty indexMap', () => {
        expect(typeof this.invertedIndex.indexMap).toEqual('object');
    });
    });
    

    describe('Read book data',() => {

        it('should return tokenized data as an array of strings in small letters', () => {
            expect(InvertedIndex.token(books[0].title)).toEqual(['alice', 'in', 'wonderland']);
        });
        it('should filter out unwanted symbols', () => {
            expect(InvertedIndex.token('alice # in* Wonderland')).toEqual(['alice', 'in', 'wonderland']);
        });
        it('should be able to show the index of a particular data', () => {
            expect(this.getIndexMap.a).toEqual([1, 2]);
            expect(this.getIndexMap.alice).toEqual([1]);
        });

    });

    describe('Populate Index', () => {
        it('should populate indexMap once the createIndex button is clicked', () => {
            let populateIndex = new InvertedIndex();
            populateIndex.createIndex(books);
            expect(this.getIndexMap).toEqual(populateIndex.indexMap);
        });
        it('should return an array after strings of words is tokenized', () => {
            expect(InvertedIndex.token('alice is @#$ in wonderland$%')).toEqual(['alice','is','in','wonderland']);
            expect(InvertedIndex.token(books[0].title)).toEqual(['alice', 'in', 'wonderland']);
        });
    });
    describe('Search Index',() => {
        it('should be able to search through the indexMap and output an object', () => {
            expect(this.invertedIndex.search('alice in wonderland')).toEqual({ alice: [ 1 ], in: [ 1 ], wonderland: [ 1 ] });
            
         });

    });
});
