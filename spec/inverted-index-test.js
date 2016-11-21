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
describe('Inverted Index', function() {
    beforeEach(function() {
        this.invertedIndex = new InvertedIndex();
        this.index = this.invertedIndex.createIndex(books);
        this.getIndexMap = this.invertedIndex.getIndex();

    });

    it('constructor should declare an empty indexMap', function() {
        expect(typeof this.invertedIndex.indexMap).toEqual('object');
    });

    describe('Read book data', function() {

        it('should return tokenized data as an array of strings in small letters', function() {
            expect(InvertedIndex.token(books[0].title)).toEqual(['alice', 'in', 'wonderland']);
        });
        it('should filter out unwanted symbols', function() {
            expect(InvertedIndex.token('alice # in* Wonderland')).toEqual(['alice', 'in', 'wonderland']);
        });
        it('should be able to show the index of a particular data', function() {
            expect(this.getIndexMap.a).toEqual([1, 2]);
            expect(this.getIndexMap.alice).toEqual([1])
        });

    });

    describe('Populate Index', function() {
        it('should populate indexMap once the createIndex button is clicked',function(){
            let populateIndex = new InvertedIndex();
            populateIndex.createIndex(books);
            expect(this.getIndexMap).toEqual(populateIndex.indexMap);

        });
    });
    describe('Search Index',function(){
        it('should be able to search through the indexMap', function() {
            
        });

    });
});
