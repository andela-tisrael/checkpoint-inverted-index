# Inverted Index

[![Code Climate](https://codeclimate.com/repos/5834c9de55b1960083003c61/badges/acf3c4d5d7a1c7fd992b/gpa.svg)](https://codeclimate.com/repos/5834c9de55b1960083003c61/feed)
[![Issue Count](https://codeclimate.com/repos/5834c9de55b1960083003c61/badges/acf3c4d5d7a1c7fd992b/issue_count.svg)](https://codeclimate.com/repos/5834c9de55b1960083003c61/feed)
[![Build Status](https://travis-ci.org/andela-tisrael/checkpoint-inverted-index.svg?branch=develop)](https://travis-ci.org/andela-tisrael/checkpoint-inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/andela-tisrael/checkpoint-inverted-index/badge.svg?branch=develop)](https://coveralls.io/github/andela-tisrael/checkpoint-inverted-index?branch=develop)

## Introduction
Inverted index takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words.

## How can I get started with the app
- Upload file to be indexed using the upload button
- Select file to be indexed using the dropdown box
- Click create index button to output the index of the particular file
- Full text search can be made at the top left corner of the page.

## External dependencies for the app
 - Node.js
 - AngularJS 1.5+
 - EcmaScript 6 (JavaScript 2015)

## Testing the app
 - Install npm dependencies `npm install`
 - To test the app run: `gulp watch`
 - To run the tests run: `npm test`

## Limitation 
 - This application can only work for one file at a time.

## Contributing
 1. Fork this repository to your account.
 2. Clone your repositry: `git clone git@github.com:your-username/inverted-index.git`
 3. Create your feature branch: `git checkout -b new-feature`
 4. Commit your changes: `git commit -m "did something"`
 5. Push to the remote branch: `git push origin new-feature`
 6. Open a pull request.