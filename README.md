angular-feedparser
==================
This provides an Angular service `feedparser` that will parse ATOM, RSS and RDF files.
Uses encapsulation for library x2js provided by https://github.com/abdmob/x2js

### Install

`bower install josepo/angular-feedparser`

### Use

Just include the module in your app dependencies

`angular.module('myApp', ['angular-feedparser'])`

The available service `feedparser` has one method only called `parse`. It
can be used like this

`var feedData = feedparser.parse(xmlData);`

where `xmlData` should be a string containing the feed information in ATOM,
RSS or RDF format.

### Test

You can run the tests with
`karma start karma.conf.js`

### License

The MIT License (MIT)

Copyright (c) 2015 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
