'use strict';
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
        var invertedIndex = new InvertedIndex();
        var index = invertedIndex.createIndex(books);
         var getIndexMap =  invertedIndex.getIndex();

    });
     console.log(getIndexMap);
});