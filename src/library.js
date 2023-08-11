import {GM, GM_xmlhttpRequest, unsafeWindow} from '$';


var classes;


class StorageWrapper {
    /**
     * @constructor
     * @param {string} storageSpace name of the storage space
     */
    constructor(storageSpace) {
        this.storageSpace = storageSpace;
    }

    set(key, value) {
        return GM.setValue(`${this.storageSpace}.${key}`, value);
    }

    get(key) {
        return GM.getValue(`${this.storageSpace}.${key}`);
    }

    delete(key) {
        return GM.deleteValue(`${this.storageSpace}.${key}`);
    }

    list() {
        return GM.listValues().then((values) => {
            return values.filter((value) => {
                return value.startsWith(this.storageSpace);
            }).map((value) => {
                return value.slice((this.storageSpace+".").length);
            })
        })
    }
}

const blobSerializer = {
    toBase64: (blobject) => {
        return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(blobject);
        });
    },
    toBlob: (base64) => {
        return fetch(base64).then((res) => res.blob());
    },
};
  
const objectSerializer = {
    datePattern: /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i,

    serialize(classInstance) {
        return JSON.stringify(classInstance, (key, value) => {
            if (value && typeof(value) === "object") {
                value.__type = value.constructor.name;
            }
            return value;
        });
    },
    deserialize(jsonString) {
        return JSON.parse(jsonString, (key, value) => {
          if (value && typeof (value) === "object" && value.__type) {
            const DynamicClass = classes[value.__type] || Object
            value = Object.assign(new DynamicClass(), value);
            delete value.__type;
          } else if (this.datePattern.test(value)) {
            value = new Date(value);
          }
          return value;
        });
      }
}

    
const AO3Parser = {
    /**
     * @param {HTMLElement} html 
     * @returns {?AO3Work}
     */
    parseWorkPage(html) {
        if (!html.querySelector("div.wrapper > dl.work.meta.group")) {
            return null
        }
        return new AO3Work(
            html.querySelector("li.share > a").attributes.href.value.split("/")[2].split("?")[0],
            html.querySelector("h2.title.heading").textContent.trim(),
            Array.from(html.querySelectorAll("h3.byline.heading > a")).map(e => {return new AO3Author(e.textContent.trim(), e.attributes.href.value)}),
            Array.from(html.querySelectorAll("dd.rating.tags > ul > li > a")).map(e => {return new AO3Tag(e.textContent.trim(), e.attributes.href.value)}),
            Array.from(html.querySelectorAll("dd.warning.tags > ul > li > a")).map(e => {return new AO3Tag(e.textContent.trim(), e.attributes.href.value)}),
            Array.from(html.querySelectorAll("dd.fandom.tags > ul > li > a")).map(e => {return new AO3Tag(e.textContent.trim(), e.attributes.href.value)}),
            Array.from(html.querySelectorAll("dd.relationship.tags > ul > li > a")).map(e => {return new AO3Tag(e.textContent.trim(), e.attributes.href.value)}),
            Array.from(html.querySelectorAll("dd.character.tags > ul > li > a")).map(e => {return new AO3Tag(e.textContent.trim(), e.attributes.href.value)}),
            Array.from(html.querySelectorAll("dd.freeform.tags > ul > li > a")).map(e => {return new AO3Tag(e.textContent.trim(), e.attributes.href.value)}),
            html.querySelector("div.summary.module > blockquote.userstuff") ? Array.from(html.querySelector("div.summary.module > blockquote.userstuff").childNodes).map(e => Array.from(e.childNodes).map(v=>v.nodeName!="BR"?v.textContent:"\n").join("")).join("\n\n").trim()  : "",
            parseInt(html.querySelector("dd.chapters").textContent.split("/")[0].trim()),
            parseInt(html.querySelector("dd.chapters").textContent.split("/")[1].trim()) || null,
            new Date(html.querySelector("dd.published").textContent.trim()),
            new Date((html.querySelector("dd.status") || html.querySelector("dd.published")).textContent.trim()),
            html.querySelector("dd.words") ? parseInt(html.querySelector("dd.words").textContent.trim()) : 0,
            html.querySelector("dd.comments") ? parseInt(html.querySelector("dd.comments").textContent.trim()) : 0,
            html.querySelector("dd.kudos") ? parseInt(html.querySelector("dd.kudos").textContent.trim()) : 0,
            html.querySelector("dd.bookmarks") ? parseInt(html.querySelector("dd.bookmarks").textContent.trim()) : 0,
            html.querySelector("dd.hits") ? parseInt(html.querySelector("dd.hits").textContent.trim()) : 0,
            html.querySelector("dd.language") ? html.querySelector("dd.language").textContent.trim() : "",
            Array.from(html.querySelectorAll("dd.collections > ul > li > a")).map(e => {return new AO3Collection(e.textContent.trim(), e.attributes.href.value)}),
            html.querySelector("div.series.module") ? new AO3WorkSeries(
                new AO3Series(
                    html.querySelector("div.series.module > ul > li > span.series > span.position > a").textContent.trim(),
                    html.querySelector("div.series.module > ul > li > span.series > span.position > a").attributes.href.value
                ),
                parseInt(html.querySelector("div.series.module > ul > li > span.series > span.position").textContent.split(" ")[1]),
                Array.from(document.body.querySelectorAll("div.series.module > ul > li > span.series > a.next")).map(e => e.attributes.href.value)[0] || "",
                Array.from(document.body.querySelectorAll("div.series.module > ul > li > span.series > a.previous")).map(e => e.attributes.href.value)[0] || ""
            ) : null
        );
    }
} 

/**
 * Contains methods used to access AO3
 */
const AO3AccessObject = {
    /**
     * fetches the html of the work page for the given id using fetch and calls the parser to parse it. 
     * set fetch to send all cookies, so it should work for logged in users.
     * @param {string} id
     * @returns {Promise<AO3Work>}
     */
    async getWork(id) {
        var response = await fetch(`https://archiveofourown.org/works/${id}?view_adult=true`, {credentials: "include"})
        var html = await response.text()
        return AO3Parser.parseWorkPage(new DOMParser().parseFromString(html, "text/html"))
    },

    /**
     * 
     * @param {string} id 
     * @returns {Promise<Blob>} The epub file
     */
    getWorkEpub(id) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "GET",
                url: `https://archiveofourown.org/downloads/${id}/book.epub?updated_at=${Math.floor(Date.now()/1000)}`,
                responseType: "blob",
                redirect: "follow",
                fetch: true,
                onload: response => {
                    resolve(response.response);
                },
                onerror: err => {
                    reject(err);
                }
            })
        })
    }
}

/**
 * @class Contains methods to store and retrieve data from the library storage (via localForage)
 */
const LibraryStorageObject = {
    libraryStore: new StorageWrapper("libraryStore"),
    epubStore: new StorageWrapper("epubStore"),
    locationStore: new StorageWrapper("locationStore"),

    /**
     * 
     * @param {LibraryWork} work 
     * @returns {Promise<void>}
     */
    storeWork(work) {
        return this.libraryStore.set(work.id, objectSerializer.serialize(work));
    },

    /**
     * 
     * @param {string} id 
     * @returns {Promise<LibraryWork>}
     */
    async getWork(id) {
        return objectSerializer.deserialize(await this.libraryStore.get(id));
    },

    /**
     * 
     * @param {LibraryWork | string} work id or object
     */
    deleteWork(work) {
        if (typeof work === "string") {
            return this.libraryStore.delete(work);
        } else {
            return this.libraryStore.delete(work.id);
        }
    },

    listWorks() {
        return this.libraryStore.list();
    },

    async storeEpub(id, date, blob) {
        return this.epubStore.set(`${id}_${date.getTime()}`, await blobSerializer.toBase64(blob));
    },

    async getEpub(id, date) {
        return blobSerializer.toBlob(await this.epubStore.get(`${id}_${date.getTime()}`));
    },

    deleteEpub(id, date) {
        return this.epubStore.delete(`${id}_${date.getTime()}`);
    },

    async listEpubs(id) {
        var epubs = await this.epubStore.list();
        if (id) {
            return epubs.filter(e => e.startsWith(id));
        } else {
            return epubs;
        }
    },

    async storeLocation(id, location) {
        return this.locationStore.set(id, location);
    },

    async getLocation(id) {
        return this.locationStore.get(id);
    },

    deleteLocation(id) {
        return this.locationStore.delete(id);
    }


}



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
     * @param {AO3Tag[]} fandoms fandoms of the work
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
    constructor(id, title, author, ratings, warnings, fandoms, relationships, characters, tags, summary, chapters, totalChapters, published, updated, wordCount, commentCount, kudosCount, bookmarkCount, hitCount, language, collections, series) {
        /**@type {string}*/ this.id = id;
        /**@type {string}*/ this.title = title;
        /**@type {AO3Author[]}*/ this.authors = author;
        /**@type {AO3Tag[]}*/ this.ratings = ratings;
        /**@type {AO3Tag[]}*/ this.warnings = warnings;
        /**@type {AO3Tag[]}*/ this.fandoms = fandoms;
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

    getEpub() {
        return LibraryStorageObject.getEpub(this.id, this.updated);
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
     * @param {date} lastAccessed Date and Time of last read/access
     * @param {AO3Work[]} works Array of all versions of a work
     */
    constructor(id, lastChecked, lastAccessed, works) {
        /**@type {string}*/ this.id = id;
        /**@type {date}*/ this.lastChecked = lastChecked;
        /**@type {date}*/ this.lastAccessed = lastAccessed;
        /**@type {AO3Work[]}*/ this.works = works || [];
    }


    /** 
     * Checks for the latest version of the work and adds it to the works array. Also gets the epub and stores it
     * @param {boolean} force force get latest version
     * @returns {Promise<boolean>} True if the work was updated, false if not
     */
    async updateWork(force = false) {
        var newWork;
        newWork = await AO3AccessObject.getWork(this.id);
        if (this.works.length == 0 || newWork.updated > this.getLatest().updated) {
            this.works.push(newWork);
            await LibraryStorageObject.storeEpub(this.id, newWork.updated, await AO3AccessObject.getWorkEpub(this.id));
            this.lastChecked = new Date();
            return true;
        } else if (force) {
            this.works[this.works.length-1] = newWork;
            await LibraryStorageObject.storeEpub(this.id, newWork.updated, await AO3AccessObject.getWorkEpub(this.id));
            this.lastChecked = new Date();
            return true;
        }
        return false;
    }

    deleteWorkVersion(date) {
        var index = this.works.findIndex(work => work.updated == date);
        if (index != -1) {
            this.works.splice(index, 1);
            LibraryStorageObject.deleteEpub(this.id, date);
        }
    }

    /**
     * Removes all versions of the work except the latest
     */
    purge() {
        while (this.works.length > 1) {
            this.deleteWorkVersion(this.works[0].updated);
        }
    }

    /**
     * Gets the latest version of the work
     * @returns {AO3Work}
     */
    getLatest() {
        return this.works[this.works.length-1];
    }

    updateLastAccessed() {
        this.lastAccessed = new Date();
    }

    getReadingLocation() {
        return LibraryStorageObject.getLocation(this.id);
    }

    setReadingLocation(location) {
        LibraryStorageObject.storeLocation(this.id, location);
    }

    resetReadingLocation() {
        LibraryStorageObject.deleteLocation(this.id);
    }
}

export const Library = {
    /**@type {string[]} */ ids: [],
    /**@type {LibraryWork[]} */ works: [],
    /**@type {number} */ page: 0,
    /**@type {number} */ pageSize: 20,
    async refresh() {
        this.ids = await LibraryStorageObject.listWorks();
        this.works = await Promise.all(this.ids.slice(this.page*this.pageSize, this.page*this.pageSize+this.pageSize).map(id => LibraryStorageObject.getWork(id)));
    },
    setPage(num){
        if (num > 0) {
            this.page = num-1
        }

    },
    getPage() {
        return this.page + 1
    },
    setPageSize(size) {
        this.pageSize = size;
    },
    getPageCount() {
        return Math.ceil(this.ids.length/this.pageSize);
    },

    /**
     * Creates a new Library work, and retrieves latest work from AO3. Returns the new LibraryWork
     * @param {string} id 
     * @returns {Promise<LibraryWork>}
     */
    async addWork(id) {
        var work = new LibraryWork(id, null, null, null);
        await work.updateWork();
        work.lastAccessed = new Date(0);
        this.updateWork(work);
        return work;
    },

    
    /**
     * Deletes a library work, deletes all the metadata and epub files.
     * @param {string} id 
     * @returns {Promise<void>}
     */
    async deleteWork(id) {
        var epubs = await LibraryStorageObject.listEpubs(id);
        for (var epub of epubs) {
            await LibraryStorageObject.deleteEpub(id, new Date(parseInt(epub.split("_")[1])));
        }
        await LibraryStorageObject.deleteWork(id);
    },

    async getWorkUpdate(work) {
        var newWork = await AO3AccessObject.getWork(work.id);
        if (work.getLatest().updated.toString() == newWork.updated.toString()) {
            work.works.pop();
        }
        work.works.push(newWork);
        await LibraryStorageObject.storeEpub(work.id, newWork.updated, await AO3AccessObject.getWorkEpub(work.id));
        work.lastChecked = new Date();
        await this.updateWork(work);
    },

    /**
     * Updates the stored library work
     * @param {LibraryWork} work 
     * @returns {Promise<void>}
     */
    async updateWork(work) {
        await LibraryStorageObject.storeWork(work);
    }



}

classes = {
    AO3Tag,
    AO3Author,
    AO3Collection,
    AO3Series,
    AO3WorkSeries,
    AO3Work,
    LibraryWork,
    StorageWrapper
}

unsafeWindow.ao3reader = {
    class: classes,
    objects: {
        blobSerializer,
        objectSerializer,
        AO3Parser,
        AO3AccessObject,
        LibraryStorageObject,
        Library,
    },
    TM: {
        GM,
        GM_xmlhttpRequest
    }
}