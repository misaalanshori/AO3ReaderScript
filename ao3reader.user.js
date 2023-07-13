// ==UserScript==
// @name         AO3 Reader
// @namespace    pw.misa
// @version      0.1
// @description  UI
// @author       misa.pw
// @match        https://archiveofourown.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=archiveofourown.org
// @connect      download.archiveofourown.org
// @grant        GM_xmlhttpRequest
// @run-at       document-idle
// @require      https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js
// ==/UserScript==

(function() {
    'use strict';

    class AO3Tag {
        /**
         * @param {string} name Name of the tag
         * @param {string} url URL of the tag
         */
        constructor(name, url) {
            /** @type {string} */ this.name = name;
            /** @type {string} */ this.url = url; 
        }
    }

    class AO3Author {
        /**
         * @param {string} name Name of the author/pseud
         * @param {string} url URL of the author/pseud
         */
        constructor(name, url) {
            /** @type {string} */ this.name = name;
            /** @type {string} */ this.url = url; 
        }
    }

    class AO3Collection {
        /**
         * @param {string} name Title of the collection
         * @param {string} url URL of the collection
         */
        constructor(name, url) {
            /** @type {string} */ this.name = name;
            /** @type {string} */ this.url = url; 
        }
    }

    class AO3Series {
        /**
         * @param {string} name Title of the series
         * @param {string} url URL of the series
         */
        constructor(name, url) {
            /** @type {string} */ this.name = name;
            /** @type {string} */ this.url = url; 
        }
    }
    
    class AO3WorkSeries {
        /**
         * @constructor
         * @param {AO3Series} series Series of the work
         * @param {number} position Position of the work in the series
         * @param {string} nextWork URL of the next work in the series
         * @param {string} previousWork URL of the previous work in the series
         */
        constructor(series, position, nextWork, previousWork) {
            /** @type {AO3Series} */ this.series = series;
            /** @type {number} */ this.position = position;
            /** @type {string} */ this.nextWork = nextWork;
            /** @type {string} */ this.previousWork = previousWork;
        }

    }

    /**
     * @class Contains all information about a work
     */
    class AO3Work {
        /**
         * @constructor
         * @param {string} id ID of the work;
         * @param {string} title Title of the work
         * @param {AO3Author[]} authors Authors of the work
         * @param {AO3Tag[]} ratings ratings of the work
         * @param {AO3Tag[]} warnings Warnings of the work
         * @param {AO3Tag[]} relationships Relationships of the work
         * @param {AO3Tag[]} characters Characters of the work
         * @param {AO3Tag[]} tags Tags of the work
         * @param {string} summary Summary of the work
         * @param {number} chapters Number of chapters
         * @param {?number} totalChapters Total number of chapters, undefined if unknown
         * @param {date} published Date of work published
         * @param {date} updated Date of work updated
         * @param {number} wordCount Number of words in work
         * @param {number} commentCount Number of comments
         * @param {number} kudosCount Number of kudos
         * @param {number} bookmarkCount Number of bookmarks
         * @param {number} hitCount Number of hits
         * @param {string} language Language of the work
         * @param {AO3Collection[]} collections Collections the work is in
         * @param {?AO3WorkSeries} series Series the work is in
         */
        constructor(id, title, author, ratings, warnings, relationships, characters, tags, summary, chapters, totalChapters, published, updated, wordCount, commentCount, kudosCount, bookmarkCount, hitCount, language, collections, series) {
            /**@type {string}*/ this.id = id;
            /**@type {string}*/ this.title = title;
            /**@type {AO3Author[]}*/ this.authors = author;
            /**@type {AO3Tag[]}*/ this.ratings = ratings;
            /**@type {AO3Tag[]}*/ this.warnings = warnings;
            /**@type {AO3Tag[]}*/ this.relationships = relationships;
            /**@type {AO3Tag[]}*/ this.characters = characters;
            /**@type {AO3Tag[]}*/ this.tags = tags;
            /**@type {string}*/ this.summary = summary;
            /**@type {number}*/ this.chapterCount = chapters;
            /**@type {?number}*/ this.totalChapters = totalChapters;
            /**@type {date}*/ this.published = published;
            /**@type {date}*/ this.updated = updated;
            /**@type {number}*/ this.wordCount = wordCount;
            /**@type {number}*/ this.commentCount = commentCount;
            /**@type {number}*/ this.kudosCount = kudosCount;
            /**@type {number}*/ this.bookmarkCount = bookmarkCount;
            /**@type {number}*/ this.hitCount = hitCount;
            /**@type {string}*/ this.language = language;
            /**@type {AO3Collection[]}*/ this.collections = collections;
            /**@type {?AO3WorkSeries}*/ this.series = series;
        }
    }
    
    class AO3Parser {
        /**
         * @constructor
         */
        constructor() {

        }

        /**
         * @param {HTMLElement} html 
         * @returns {?AO3Work}
         */
        parseWorkPage(html) {
        }
    } 

    /**
     * @class Contains methods used to access AO3
     */
    class AO3AccessObject {
        /**
         * @constructor
         */
        constructor() {

        }

        /**
         * @param {string} id
         * @returns {Promise<AO3Work>}
         */

        /**
         * 
         * @param {string} id 
         * @returns {Promise<Blob>} The epub file
         */
        getEpub(id) {
        }
    }

    /**
     * @class Contains methods to store and retrieve data from the library storage (via localForage)
     */
    class LibraryStorageObject {
        constructor() {
            this.libraryStore = localforage.createInstance({
                name: "libraryStore"
            });
            this.epubStore = localforage.createInstance({
                name: "epubStore"
            });
        }

        /**
         * 
         * @param {LibraryWork} work 
         */
        storeWork(work) {

        }

        /**
         * 
         * @param {string} id 
         */
        getWork(id) {

        }

        /**
         * 
         * @param {LibraryWork} work 
         */
        deleteWork(work) {

        }

        /**
         * 
         * @param {string} id 
         */
        deleteWorkById(id) {

        }

        storeEpub(id, date, blob) {

        }

        getEpub(id, date) {

        }

        deleteEpub(id, date) {

        }
    }

    /**
     * @class Contains metadata of the work stored in the library
     */
    class LibraryWork {
        /**
         * @constructor
         * @param {string} id ID of the work
         * @param {date} lastChecked Date and Time of last check
         * @param {AO3Work[]} works Array of all versions of a work
         */
        constructor(id, lastChecked, works) {
            /**@type {string}*/ this.id = id;
            /**@type {date}*/ this.lastChecked = lastChecked;
            /**@type {AO3Work[]}*/ this.works = works;
        }

        /** 
         * Checks for the latest version of the work and adds it to the works array. Also gets the epub and stores it
         * @returns {boolean} True if the work was updated, false if not
         */
        update() {

        }

        /**
         * Removes all versions of the work except the latest
         */
        purge() {

        }

        /**
         * Gets the latest version of the work
         * @returns {AO3Work}
         */
        getLatest() {

        }
    }

    class Library {
        /**
         * @constructor
         */
        constructor() {
            
        }
    }
    // Your code here...
})();