// ==UserScript==
// @name       AO3 Reader - Vite
// @namespace  https://misa.pw
// @version    0.0.0
// @author     monkey
// @icon       https://www.google.com/s2/favicons?sz=64&domain=archiveofourown.org
// @match      https://archiveofourown.org/*
// @require    https://cdn.jsdelivr.net/npm/preact@10.16.0/dist/preact.min.js
// @connect    download.archiveofourown.org
// @grant      GM.deleteValue
// @grant      GM.getValue
// @grant      GM.listValues
// @grant      GM.setValue
// @grant      GM_xmlhttpRequest
// @grant      unsafeWindow
// @run-at     document-idle
// ==/UserScript==

(i=>{const r=document.createElement("style");r.dataset.source="vite-plugin-monkey",r.textContent=i,document.head.append(r)})(" div.a3r .modal{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:flex;justify-content:center;align-items:center;z-index:1000}div.a3r .modal>.box{background-color:#fff;padding:20px;border-radius:8px;box-shadow:0 0 10px #0003}div.a3r .modal>.box>.contents{display:flex;flex-direction:column}div.a3r .modal>.box>.actions{margin-top:20px;display:flex;flex-direction:row;justify-content:center;gap:4px}div.a3r .modal>.box>.actions>.button{background:initial;color:#fff;padding:8px 16px;border:1px solid #bdbdbd;border-radius:12px;cursor:pointer}div.a3r .modal>.box>.actions>.button:hover{background-color:#0003}div.a3r .workList{display:flex;flex-direction:column;width:100%;height:100%}div.a3r .workItem *{transition:all .1s linear}div.a3r .workItem{display:flex;flex-direction:column;border-bottom:var(--divider-color) 1px solid;margin:8px 0;padding-bottom:16px;align-items:stretch;text-align:start;white-space:pre-line}div.a3r .workItem>*{padding:0 16px}div.a3r .workItem .header{display:flex;flex-direction:row;align-items:center}div.a3r .workItem .header>.title{display:flex;flex-direction:column;font-size:large;padding-top:8px;padding-bottom:8px;width:100%}div.a3r .workItem .header>.title>*{margin:0}div.a3r .workItem .header:hover{background-color:#0000001a}div.a3r .workItem .tags{display:flex;flex-direction:column}div.a3r .workItem .tags:hover{background-color:#0000001a}div.a3r .workItem .tags .main,div.a3r .workItem .tags .expanded{display:flex;flex-direction:column}div.a3r .workItem .tags .main h5{margin:1px}div.a3r .workItem .summary{display:flex;flex-direction:column;padding-bottom:8px}div.a3r .workItem .summary:hover{background-color:#0000001a}div.a3r .workItem .trash{display:flex;flex-direction:column;align-items:center;justify-content:center}div.a3r .workItem .trash>.button{all:initial;display:flex;align-items:center;justify-content:center;height:56px;width:56px;border-radius:64px}div.a3r .workItem .trash>.button:hover{background-color:#0000001a}div.a3r .container{--dark-primary-color: #512da8;--light-primary-color: #d1c4e9;--primary-color: #673ab7;--text-color: #ffffff;--accent-color: #e040fb;--primary-text-color: #212121;--secondary-text-color: #757575;--divider-color: #bdbdbd;--background-color: #f5f5f5}div.a3r .container{display:flex;flex-direction:column;height:100%;color:var(--primary-text-color)}div.a3r .appbar{display:flex;flex-direction:row;height:56px;justify-content:center;background-color:var(--primary-color);color:var(--background-color);align-items:center;filter:drop-shadow(0px 0px 4px rgba(0,0,0,.5))}div.a3r .appbar .left{width:100%;display:flex;flex-direction:row;justify-content:flex-start;align-items:flex-start;align-items:stretch;padding:0 16px}div.a3r .appbar .right{width:100%;display:flex;flex-direction:row;justify-content:flex-end;align-items:flex-end;align-items:stretch;padding:0 16px}div.a3r .appbar h3{margin:0;padding:0;font-size:x-large}div.a3r .contents{display:flex;flex-direction:column;overflow:scroll;height:100%;width:100%}div.a3r .contents *{color:var(--primary-text-color)!important}div.a3r .icons{fill:var(--text-color);width:24px}div.a3r .icons.white{filter:invert(100%)}div.a3r .appbar .button{all:initial;display:flex;justify-content:center;height:56px;width:56px}div.a3r .appbar .button:hover{background-color:#0000001a}div.a3r .workDetails{display:flex;flex-direction:column;padding:16px 32px;height:100%;gap:16px}div.a3r .workDetails .headers{display:flex;flex-direction:column;text-align:left}div.a3r .workDetails .headers>*{margin:0}div.a3r .workDetails .headers>h4{font-size:xx-large}div.a3r .workDetails .headers>h5{font-size:medium}div.a3r .buttons{display:flex;flex-direction:column}div.a3r .buttons>.row{width:100%;display:flex;flex-direction:row;justify-content:center}div.a3r .buttons>.row>a{all:initial;display:block;text-decoration:none;width:100%;height:100%;padding:4px 12px;margin:2px!important;border:none;border-radius:2em!important;text-align:center!important;font-size:medium!important;background-color:var(--primary-color)!important;color:var(--text-color)!important}div.a3r .buttons>.row>a:hover{filter:brightness(85%)!important}div.a3r{all:revert;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#fff;z-index:100}div.a3r *{font-family:Arial,Helvetica,sans-serif!important}div.a3r *:after{all:unset} ");

(async function (preact) {
  'use strict';

  var _a;
  var t, r, u, i, o$1 = 0, f = [], c = [], e = preact.options.__b, a = preact.options.__r, v = preact.options.diffed, l = preact.options.__c, m = preact.options.unmount;
  function d(t2, u2) {
    preact.options.__h && preact.options.__h(r, t2, o$1 || u2), o$1 = 0;
    var i2 = r.__H || (r.__H = { __: [], __h: [] });
    return t2 >= i2.__.length && i2.__.push({ __V: c }), i2.__[t2];
  }
  function h(n) {
    return o$1 = 1, s(B, n);
  }
  function s(n, u2, i2) {
    var o2 = d(t++, 2);
    if (o2.t = n, !o2.__c && (o2.__ = [i2 ? i2(u2) : B(void 0, u2), function(n2) {
      var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n2);
      t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
    }], o2.__c = r, !r.u)) {
      var f2 = function(n2, t2, r2) {
        if (!o2.__c.__H)
          return true;
        var u3 = o2.__c.__H.__.filter(function(n3) {
          return n3.__c;
        });
        if (u3.every(function(n3) {
          return !n3.__N;
        }))
          return !c2 || c2.call(this, n2, t2, r2);
        var i3 = false;
        return u3.forEach(function(n3) {
          if (n3.__N) {
            var t3 = n3.__[0];
            n3.__ = n3.__N, n3.__N = void 0, t3 !== n3.__[0] && (i3 = true);
          }
        }), !(!i3 && o2.__c.props === n2) && (!c2 || c2.call(this, n2, t2, r2));
      };
      r.u = true;
      var c2 = r.shouldComponentUpdate, e2 = r.componentWillUpdate;
      r.componentWillUpdate = function(n2, t2, r2) {
        if (this.__e) {
          var u3 = c2;
          c2 = void 0, f2(n2, t2, r2), c2 = u3;
        }
        e2 && e2.call(this, n2, t2, r2);
      }, r.shouldComponentUpdate = f2;
    }
    return o2.__N || o2.__;
  }
  function p(u2, i2) {
    var o2 = d(t++, 3);
    !preact.options.__s && z(o2.__H, i2) && (o2.__ = u2, o2.i = i2, r.__H.__h.push(o2));
  }
  function b() {
    for (var t2; t2 = f.shift(); )
      if (t2.__P && t2.__H)
        try {
          t2.__H.__h.forEach(k), t2.__H.__h.forEach(w), t2.__H.__h = [];
        } catch (r2) {
          t2.__H.__h = [], preact.options.__e(r2, t2.__v);
        }
  }
  preact.options.__b = function(n) {
    r = null, e && e(n);
  }, preact.options.__r = function(n) {
    a && a(n), t = 0;
    var i2 = (r = n.__c).__H;
    i2 && (u === r ? (i2.__h = [], r.__h = [], i2.__.forEach(function(n2) {
      n2.__N && (n2.__ = n2.__N), n2.__V = c, n2.__N = n2.i = void 0;
    })) : (i2.__h.forEach(k), i2.__h.forEach(w), i2.__h = [], t = 0)), u = r;
  }, preact.options.diffed = function(t2) {
    v && v(t2);
    var o2 = t2.__c;
    o2 && o2.__H && (o2.__H.__h.length && (1 !== f.push(o2) && i === preact.options.requestAnimationFrame || ((i = preact.options.requestAnimationFrame) || j)(b)), o2.__H.__.forEach(function(n) {
      n.i && (n.__H = n.i), n.__V !== c && (n.__ = n.__V), n.i = void 0, n.__V = c;
    })), u = r = null;
  }, preact.options.__c = function(t2, r2) {
    r2.some(function(t3) {
      try {
        t3.__h.forEach(k), t3.__h = t3.__h.filter(function(n) {
          return !n.__ || w(n);
        });
      } catch (u2) {
        r2.some(function(n) {
          n.__h && (n.__h = []);
        }), r2 = [], preact.options.__e(u2, t3.__v);
      }
    }), l && l(t2, r2);
  }, preact.options.unmount = function(t2) {
    m && m(t2);
    var r2, u2 = t2.__c;
    u2 && u2.__H && (u2.__H.__.forEach(function(n) {
      try {
        k(n);
      } catch (n2) {
        r2 = n2;
      }
    }), u2.__H = void 0, r2 && preact.options.__e(r2, u2.__v));
  };
  var g = "function" == typeof requestAnimationFrame;
  function j(n) {
    var t2, r2 = function() {
      clearTimeout(u2), g && cancelAnimationFrame(t2), setTimeout(n);
    }, u2 = setTimeout(r2, 100);
    g && (t2 = requestAnimationFrame(r2));
  }
  function k(n) {
    var t2 = r, u2 = n.__c;
    "function" == typeof u2 && (n.__c = void 0, u2()), r = t2;
  }
  function w(n) {
    var t2 = r;
    n.__c = n.__(), r = t2;
  }
  function z(n, t2) {
    return !n || n.length !== t2.length || t2.some(function(t3, r2) {
      return t3 !== n[r2];
    });
  }
  function B(n, t2) {
    return "function" == typeof t2 ? t2(n) : t2;
  }
  var _GM = /* @__PURE__ */ (() => typeof GM != "undefined" ? GM : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
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
      return _GM.setValue(`${this.storageSpace}.${key}`, value);
    }
    get(key) {
      return _GM.getValue(`${this.storageSpace}.${key}`);
    }
    delete(key) {
      return _GM.deleteValue(`${this.storageSpace}.${key}`);
    }
    list() {
      return _GM.listValues().then((values) => {
        return values.filter((value) => {
          return value.startsWith(this.storageSpace);
        }).map((value) => {
          return value.slice((this.storageSpace + ".").length);
        });
      });
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
    }
  };
  const objectSerializer = {
    serialize(classInstance) {
      return JSON.stringify(classInstance, (key, value) => {
        if (value && typeof value === "object") {
          value.__type = value.constructor.name;
        }
        return value;
      });
    },
    deserialize(jsonString) {
      return JSON.parse(jsonString, (key, value) => {
        if (value && typeof value === "object" && value.__type) {
          const DynamicClass = classes[value.__type] || Object;
          value = Object.assign(new DynamicClass(), value);
          delete value.__type;
        }
        return value;
      });
    }
  };
  const AO3Parser = {
    /**
     * @param {HTMLElement} html 
     * @returns {?AO3Work}
     */
    parseWorkPage(html) {
      if (!html.querySelector("div.wrapper > dl.work.meta.group")) {
        return null;
      }
      return new AO3Work(html.querySelector("li.share > a").attributes.href.value.split("/")[2].split("?")[0], html.querySelector("h2.title.heading").textContent.trim(), Array.from(html.querySelectorAll("h3.byline.heading > a")).map((e2) => {
        return new AO3Author(e2.textContent.trim(), e2.attributes.href.value);
      }), Array.from(html.querySelectorAll("dd.rating.tags > ul > li > a")).map((e2) => {
        return new AO3Tag(e2.textContent.trim(), e2.attributes.href.value);
      }), Array.from(html.querySelectorAll("dd.warning.tags > ul > li > a")).map((e2) => {
        return new AO3Tag(e2.textContent.trim(), e2.attributes.href.value);
      }), Array.from(html.querySelectorAll("dd.fandom.tags > ul > li > a")).map((e2) => {
        return new AO3Tag(e2.textContent.trim(), e2.attributes.href.value);
      }), Array.from(html.querySelectorAll("dd.relationship.tags > ul > li > a")).map((e2) => {
        return new AO3Tag(e2.textContent.trim(), e2.attributes.href.value);
      }), Array.from(html.querySelectorAll("dd.character.tags > ul > li > a")).map((e2) => {
        return new AO3Tag(e2.textContent.trim(), e2.attributes.href.value);
      }), Array.from(html.querySelectorAll("dd.freeform.tags > ul > li > a")).map((e2) => {
        return new AO3Tag(e2.textContent.trim(), e2.attributes.href.value);
      }), html.querySelector("div.summary.module > blockquote.userstuff") ? Array.from(html.querySelector("div.summary.module > blockquote.userstuff").childNodes).map((e2) => Array.from(e2.childNodes).map((v2) => v2.nodeName != "BR" ? v2.textContent : "\n").join("")).join("\n\n").trim() : "", parseInt(html.querySelector("dd.chapters").textContent.split("/")[0].trim()), parseInt(html.querySelector("dd.chapters").textContent.split("/")[1].trim()) || null, new Date(html.querySelector("dd.published").textContent.trim()), new Date((html.querySelector("dd.status") || html.querySelector("dd.published")).textContent.trim()), html.querySelector("dd.words") ? parseInt(html.querySelector("dd.words").textContent.trim()) : 0, html.querySelector("dd.comments") ? parseInt(html.querySelector("dd.comments").textContent.trim()) : 0, html.querySelector("dd.kudos") ? parseInt(html.querySelector("dd.kudos").textContent.trim()) : 0, html.querySelector("dd.bookmarks") ? parseInt(html.querySelector("dd.bookmarks").textContent.trim()) : 0, html.querySelector("dd.hits") ? parseInt(html.querySelector("dd.hits").textContent.trim()) : 0, html.querySelector("dd.language") ? html.querySelector("dd.language").textContent.trim() : "", Array.from(html.querySelectorAll("dd.collections > ul > li > a")).map((e2) => {
        return new AO3Collection(e2.textContent.trim(), e2.attributes.href.value);
      }), html.querySelector("div.series.module") ? new AO3WorkSeries(new AO3Series(html.querySelector("div.series.module > ul > li > span.series > span.position > a").textContent.trim(), html.querySelector("div.series.module > ul > li > span.series > span.position > a").attributes.href.value), parseInt(html.querySelector("div.series.module > ul > li > span.series > span.position").textContent.split(" ")[1]), Array.from(document.body.querySelectorAll("div.series.module > ul > li > span.series > a.next")).map((e2) => e2.attributes.href.value)[0] || "", Array.from(document.body.querySelectorAll("div.series.module > ul > li > span.series > a.previous")).map((e2) => e2.attributes.href.value)[0] || "") : null);
    }
  };
  const AO3AccessObject = {
    /**
     * fetches the html of the work page for the given id using fetch and calls the parser to parse it. 
     * set fetch to send all cookies, so it should work for logged in users.
     * @param {string} id
     * @returns {Promise<AO3Work>}
     */
    async getWork(id) {
      var response = await fetch(`https://archiveofourown.org/works/${id}?view_adult=true`, {
        credentials: "include"
      });
      var html = await response.text();
      return AO3Parser.parseWorkPage(new DOMParser().parseFromString(html, "text/html"));
    },
    /**
     * 
     * @param {string} id 
     * @returns {Promise<Blob>} The epub file
     */
    getWorkEpub(id) {
      return new Promise((resolve, reject) => {
        _GM_xmlhttpRequest({
          method: "GET",
          url: `https://archiveofourown.org/downloads/${id}/book.epub?updated_at=${Math.floor(Date.now() / 1e3)}`,
          responseType: "blob",
          redirect: "follow",
          fetch: true,
          onload: (response) => {
            resolve(response.response);
          },
          onerror: (err) => {
            reject(err);
          }
        });
      });
    }
  };
  const LibraryStorageObject = {
    libraryStore: new StorageWrapper("libraryStore"),
    epubStore: new StorageWrapper("epubStore"),
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
        return epubs.filter((e2) => e2.startsWith(id));
      } else {
        return epubs;
      }
    }
  };
  class AO3Tag {
    /**
     * @param {string} name Name of the tag
     * @param {string} url URL of the tag
     */
    constructor(name, url) {
      this.name = name;
      this.url = url;
    }
  }
  class AO3Author {
    /**
     * @param {string} name Name of the author/pseud
     * @param {string} url URL of the author/pseud
     */
    constructor(name, url) {
      this.name = name;
      this.url = url;
    }
  }
  class AO3Collection {
    /**
     * @param {string} name Title of the collection
     * @param {string} url URL of the collection
     */
    constructor(name, url) {
      this.name = name;
      this.url = url;
    }
  }
  class AO3Series {
    /**
     * @param {string} name Title of the series
     * @param {string} url URL of the series
     */
    constructor(name, url) {
      this.name = name;
      this.url = url;
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
      this.series = series;
      this.position = position;
      this.nextWork = nextWork;
      this.previousWork = previousWork;
    }
  }
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
      this.id = id;
      this.title = title;
      this.authors = author;
      this.ratings = ratings;
      this.warnings = warnings;
      this.fandoms = fandoms;
      this.relationships = relationships;
      this.characters = characters;
      this.tags = tags;
      this.summary = summary;
      this.chapterCount = chapters;
      this.totalChapters = totalChapters;
      this.published = published;
      this.updated = updated;
      this.wordCount = wordCount;
      this.commentCount = commentCount;
      this.kudosCount = kudosCount;
      this.bookmarkCount = bookmarkCount;
      this.hitCount = hitCount;
      this.language = language;
      this.collections = collections;
      this.series = series;
    }
    getEpub() {
      return LibraryStorageObject.getEpub(this.id, this.updated);
    }
  }
  class LibraryWork {
    /**
     * @constructor
     * @param {string} id ID of the work
     * @param {date} lastChecked Date and Time of last check
     * @param {date} lastAccessed Date and Time of last read/access
     * @param {AO3Work[]} works Array of all versions of a work
     */
    constructor(id, lastChecked, lastAccessed, works) {
      this.id = id;
      this.lastChecked = lastChecked;
      this.lastAccessed = lastAccessed;
      this.works = works || [];
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
        this.lastChecked = /* @__PURE__ */ new Date();
        return true;
      } else if (force) {
        this.works[this.works.length - 1] = newWork;
        await LibraryStorageObject.storeEpub(this.id, newWork.updated, await AO3AccessObject.getWorkEpub(this.id));
        this.lastChecked = /* @__PURE__ */ new Date();
        return true;
      }
      return false;
    }
    deleteWorkVersion(date) {
      var index2 = this.works.findIndex((work) => work.updated == date);
      if (index2 != -1) {
        this.works.splice(index2, 1);
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
      return this.works[this.works.length - 1];
    }
    updateLastAccessed() {
      this.lastAccessed = /* @__PURE__ */ new Date();
    }
  }
  const Library = {
    /**@type {string[]} */
    ids: [],
    /**@type {LibraryWork[]} */
    works: [],
    /**@type {number} */
    page: 0,
    /**@type {number} */
    pageSize: 20,
    async refresh() {
      this.ids = await LibraryStorageObject.listWorks();
      this.works = await Promise.all(this.ids.slice(this.page * this.pageSize, this.page * this.pageSize + this.pageSize).map((id) => LibraryStorageObject.getWork(id)));
    },
    setPage(num) {
      if (num > 0) {
        this.page = num - 1;
      }
    },
    getPage() {
      return this.page + 1;
    },
    setPageSize(size) {
      this.pageSize = size;
    },
    getPageCount() {
      return Math.ceil(this.ids.length / this.pageSize);
    },
    /**
     * Creates a new Library work, and retrieves latest work from AO3. Returns the new LibraryWork
     * @param {string} id 
     * @returns {Promise<LibraryWork>}
     */
    async addWork(id) {
      var work = new LibraryWork(id, null, null, null);
      await work.updateWork();
      work.lastAccessed = /* @__PURE__ */ new Date(0);
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
    /**
     * Updates the stored library work
     * @param {LibraryWork} work 
     * @returns {Promise<void>}
     */
    async updateWork(work) {
      await LibraryStorageObject.storeWork(work);
    }
  };
  classes = {
    AO3Tag,
    AO3Author,
    AO3Collection,
    AO3Series,
    AO3WorkSeries,
    AO3Work,
    LibraryWork,
    StorageWrapper
  };
  _unsafeWindow.ao3reader = {
    class: classes,
    objects: {
      blobSerializer,
      objectSerializer,
      AO3Parser,
      AO3AccessObject,
      LibraryStorageObject,
      Library
    },
    TM: {
      GM: _GM,
      GM_xmlhttpRequest: _GM_xmlhttpRequest
    }
  };
  var _ = 0;
  function o(o2, e2, n, t2, f2, l2) {
    var s2, u2, a2 = {};
    for (u2 in e2)
      "ref" == u2 ? s2 = e2[u2] : a2[u2] = e2[u2];
    var i2 = { type: o2, props: a2, key: n, ref: s2, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_, __source: f2, __self: l2 };
    if ("function" == typeof o2 && (s2 = o2.defaultProps))
      for (u2 in s2)
        void 0 === a2[u2] && (a2[u2] = s2[u2]);
    return preact.options.vnode && preact.options.vnode(i2), i2;
  }
  function Modal({
    isOpen,
    children
  }) {
    if (!isOpen)
      return o(preact.Fragment, {});
    return o("div", {
      className: "modal",
      children: o("div", {
        className: "box",
        children
      })
    });
  }
  function ModalContents({
    children
  }) {
    return o("div", {
      className: "contents",
      children
    });
  }
  function ModalActions({
    children
  }) {
    return o("div", {
      className: "actions",
      children
    });
  }
  function ModalButton({
    onClick,
    children
  }) {
    return o("button", {
      className: "button",
      onClick,
      children
    });
  }
  const exitIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiPgo8Zz4KCTxwYXRoIGQ9Ik0xNzAuNjk4LDQ0OEg3Mi43NTdjLTQuODE0LTAuMDEyLTguNzE0LTMuOTExLTguNzI1LTguNzI1VjcyLjcyNWMwLjAxMi00LjgxNCwzLjkxMS04LjcxNCw4LjcyNS04LjcyNWg5Ny45NDEgICBjMTcuNjczLDAsMzItMTQuMzI3LDMyLTMycy0xNC4zMjctMzItMzItMzJINzIuNzU3QzMyLjYxMSwwLjA0NywwLjA3OSwzMi41OCwwLjAzMiw3Mi43MjV2MzY2LjU0OSAgIEMwLjA3OSw0NzkuNDIsMzIuNjExLDUxMS45NTMsNzIuNzU3LDUxMmg5Ny45NDFjMTcuNjczLDAsMzItMTQuMzI3LDMyLTMyUzE4OC4zNzEsNDQ4LDE3MC42OTgsNDQ4eiIvPgoJPHBhdGggZD0iTTQ4My45MTQsMTg4LjExN2wtODIuODE2LTgyLjc1MmMtMTIuNTAxLTEyLjQ5NS0zMi43NjQtMTIuNDktNDUuMjU5LDAuMDExcy0xMi40OSwzMi43NjQsMC4wMTEsNDUuMjU5bDcyLjc4OSw3Mi43NjggICBMMTM4LjY5OCwyMjRjLTE3LjY3MywwLTMyLDE0LjMyNy0zMiwzMnMxNC4zMjcsMzIsMzIsMzJsMCwwbDI5MS4xMTUtMC41MzNsLTczLjk2Myw3My45NjMgICBjLTEyLjA0MiwxMi45MzYtMTEuMzE3LDMzLjE4NCwxLjYxOCw0NS4yMjZjMTIuMjk1LDExLjQ0NSwzMS4zNDYsMTEuNDM2LDQzLjYzLTAuMDIxbDgyLjc1Mi04Mi43NTIgICBjMzcuNDkxLTM3LjQ5LDM3LjQ5MS05OC4yNzQsMC4wMDEtMTM1Ljc2NGMwLDAtMC4wMDEtMC4wMDEtMC4wMDEtMC4wMDFMNDgzLjkxNCwxODguMTE3eiIvPgo8L2c+CgoKCgoKCgoKCgoKCgoKCjwvc3ZnPgo=";
  const refreshIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTMuODA2IDUxMy44MDYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMy44MDYgNTEzLjgwNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIj4KPGc+Cgk8cGF0aCBkPSJNNjYuMDc0LDIyOC43MzFDODEuNTc3LDEyMy4zNzksMTc5LjU0OSw1MC41NDIsMjg0LjkwMSw2Ni4wNDVjMzUuOTQ0LDUuMjg5LDY5LjY2MiwyMC42MjYsOTcuMjcsNDQuMjQ0bC0yNC44NTMsMjQuODUzICAgYy04LjMzLDguMzMyLTguMzI4LDIxLjg0LDAuMDA1LDMwLjE3YzMuOTk5LDMuOTk4LDkuNDIzLDYuMjQ1LDE1LjA3OCw2LjI0Nmg5Ny44MzVjMTEuNzgyLDAsMjEuMzMzLTkuNTUxLDIxLjMzMy0yMS4zMzNWNTIuMzkgICBjLTAuMDAzLTExLjc4Mi05LjU1Ni0yMS4zMzEtMjEuMzM4LTIxLjMyOWMtNS42NTUsMC4wMDEtMTEuMDc5LDIuMjQ4LTE1LjA3OCw2LjI0Nkw0MjcuNDE4LDY1LjA0ICAgQzMyMS42NTgtMjkuMjM1LDE1OS40OTctMTkuOTI1LDY1LjIyMiw4NS44MzVjLTMzLjM5OSwzNy40NjctNTUuMDczLDgzLjkwOS02Mi4zMzcsMTMzLjU3MyAgIGMtMi44NjQsMTcuNjA3LDkuMDg3LDM0LjIwMiwyNi42OTMsMzcuMDY2YzEuNTg2LDAuMjU4LDMuMTg4LDAuMzk3LDQuNzk1LDAuNDE3QzUwLjQ4MSwyNTYuNzE3LDY0LjAwMiwyNDQuNzA2LDY2LjA3NCwyMjguNzMxeiIvPgoJPHBhdGggZD0iTTQ3OS40MjksMjU2Ljg5MWMtMTYuMTA4LDAuMTc0LTI5LjYyOSwxMi4xODUtMzEuNzAxLDI4LjE2QzQzMi4yMjUsMzkwLjQwMywzMzQuMjUzLDQ2My4yNCwyMjguOTAxLDQ0Ny43MzggICBjLTM1Ljk0NC01LjI4OS02OS42NjItMjAuNjI2LTk3LjI3LTQ0LjI0NGwyNC44NTMtMjQuODUzYzguMzMtOC4zMzIsOC4zMjgtMjEuODQtMC4wMDUtMzAuMTcgICBjLTMuOTk5LTMuOTk4LTkuNDIzLTYuMjQ1LTE1LjA3OC02LjI0Nkg0My41NjhjLTExLjc4MiwwLTIxLjMzMyw5LjU1MS0yMS4zMzMsMjEuMzMzdjk3LjgzNSAgIGMwLjAwMywxMS43ODIsOS41NTYsMjEuMzMxLDIxLjMzOCwyMS4zMjljNS42NTUtMC4wMDEsMTEuMDc5LTIuMjQ4LDE1LjA3OC02LjI0NmwyNy43MzMtMjcuNzMzICAgYzEwNS43MzUsOTQuMjg1LDI2Ny44ODQsODUuMDA0LDM2Mi4xNy0yMC43MzJjMzMuNDE3LTM3LjQ3NSw1NS4xMDEtODMuOTMzLDYyLjM2My0xMzMuNjE1ICAgYzIuODc2LTE3LjYwNS05LjA2NC0zNC4yMDgtMjYuNjY4LTM3LjA4NEM0ODIuNjU1LDI1Ny4wNTEsNDgxLjA0NCwyNTYuOTEsNDc5LjQyOSwyNTYuODkxeiIvPgo8L2c+CgoKCgoKCgoKCgoKCgoKCjwvc3ZnPgo=";
  const trashIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI1LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiPgo8Zz4KCTxwYXRoIGQ9Ik00OTAuNjY3LDk2YzAtMTcuNjczLTE0LjMyNy0zMi0zMi0zMmgtODAuNTU1QzM2NC42MzIsMjUuNzU3LDMyOC41NDksMC4xMywyODgsMGgtNjQgICBjLTQwLjU0OSwwLjEzLTc2LjYzMiwyNS43NTctOTAuMTEyLDY0SDUzLjMzM2MtMTcuNjczLDAtMzIsMTQuMzI3LTMyLDMybDAsMGMwLDE3LjY3MywxNC4zMjcsMzIsMzIsMzJINjR2MjY2LjY2NyAgIEM2NCw0NTkuNDY4LDExNi41MzIsNTEyLDE4MS4zMzMsNTEyaDE0OS4zMzNDMzk1LjQ2OCw1MTIsNDQ4LDQ1OS40NjgsNDQ4LDM5NC42NjdWMTI4aDEwLjY2NyAgIEM0NzYuMzQsMTI4LDQ5MC42NjcsMTEzLjY3Myw0OTAuNjY3LDk2eiBNMzg0LDM5NC42NjdDMzg0LDQyNC4xMjIsMzYwLjEyMiw0NDgsMzMwLjY2Nyw0NDhIMTgxLjMzMyAgIEMxNTEuODc4LDQ0OCwxMjgsNDI0LjEyMiwxMjgsMzk0LjY2N1YxMjhoMjU2VjM5NC42Njd6Ii8+Cgk8cGF0aCBkPSJNMjAyLjY2NywzODRjMTcuNjczLDAsMzItMTQuMzI3LDMyLTMyVjIyNGMwLTE3LjY3My0xNC4zMjctMzItMzItMzJzLTMyLDE0LjMyNy0zMiwzMnYxMjggICBDMTcwLjY2NywzNjkuNjczLDE4NC45OTQsMzg0LDIwMi42NjcsMzg0eiIvPgoJPHBhdGggZD0iTTMwOS4zMzMsMzg0YzE3LjY3MywwLDMyLTE0LjMyNywzMi0zMlYyMjRjMC0xNy42NzMtMTQuMzI3LTMyLTMyLTMycy0zMiwxNC4zMjctMzIsMzJ2MTI4ICAgQzI3Ny4zMzMsMzY5LjY3MywyOTEuNjYsMzg0LDMwOS4zMzMsMzg0eiIvPgo8L2c+CgoKCgoKCgoKCgoKCgoKCjwvc3ZnPgo=";
  function WorkItemHeader({
    work,
    openWork
  }) {
    return o("div", {
      className: "title",
      onClick: openWork,
      children: [o("h4", {
        children: o("strong", {
          children: work.getLatest().title
        })
      }), o("h5", {
        children: ["by ", work.getLatest().authors.map((e2) => e2.name).join(" ,")]
      })]
    });
  }
  function WorkItemTags({
    work
  }) {
    const [isExpanded, setIsExpanded] = h(false);
    function toggleExpanded() {
      setIsExpanded(!isExpanded);
    }
    return o("div", {
      className: "tags",
      onClick: toggleExpanded,
      children: [o("div", {
        className: "main",
        children: [o("h5", {
          children: work.getLatest().ratings.map((e2) => e2.name).join(", ")
        }), o("h5", {
          children: work.getLatest().fandoms.map((e2) => e2.name).join(", ")
        })]
      }), o("div", {
        className: "expanded",
        style: {
          display: isExpanded ? "flex" : "none"
        },
        children: [o("h5", {
          children: work.getLatest().warnings.map((e2) => e2.name).join(", ")
        }), o("h5", {
          children: work.getLatest().relationships.map((e2) => e2.name).join(", ")
        }), o("h5", {
          children: work.getLatest().characters.map((e2) => e2.name).join(", ")
        }), o("h5", {
          children: work.getLatest().tags.map((e2) => e2.name).join(", ")
        })]
      })]
    });
  }
  function WorkItemSummary({
    work
  }) {
    const [isExpanded, setIsExpanded] = h(false);
    function toggleExpanded() {
      setIsExpanded(!isExpanded);
    }
    return o("div", {
      className: "summary",
      onClick: toggleExpanded,
      children: [o("h5", {
        children: o("strong", {
          children: "Summary:"
        })
      }), o("p", {
        children: isExpanded ? work.getLatest().summary : work.getLatest().summary.split("\n")[0].split(" ").slice(0, 32).join(" ") + "..."
      })]
    });
  }
  function WorkList({
    works,
    openWork,
    deleteWork
  }) {
    const [isOpen, setIsOpen] = h(false);
    const [workDelete, setWorkDelete] = h(null);
    return o("div", {
      className: "workList",
      children: [works.map((work) => o("div", {
        className: "workItem",
        children: [o("div", {
          className: "header",
          children: [o(WorkItemHeader, {
            work,
            openWork: () => {
              openWork(work);
            }
          }), o("div", {
            className: "trash",
            children: o("button", {
              class: "button",
              onClick: () => {
                setWorkDelete(work);
                setIsOpen(true);
              },
              children: o("img", {
                class: "icons",
                src: trashIcon,
                alt: "refresh"
              })
            })
          })]
        }), o(WorkItemTags, {
          work
        }), o(WorkItemSummary, {
          work
        })]
      })), o(Modal, {
        isOpen,
        children: [o(ModalContents, {
          children: [o("h3", {
            children: "Delete Work?"
          }), o("p", {
            children: ["This work and its version history will be deleted. ", o("br", {}), "This action is irreversible! "]
          })]
        }), o(ModalActions, {
          children: [o(ModalButton, {
            onClick: () => {
              deleteWork(workDelete);
              setIsOpen(false);
            },
            children: "Delete"
          }), o(ModalButton, {
            onClick: () => setIsOpen(false),
            children: "Close"
          })]
        })]
      })]
    });
  }
  function App({
    closeApp,
    setLoadedWork,
    setCurrentApp
  }) {
    const [works, setWorks] = h([]);
    async function refresh() {
      await Library.refresh();
      setWorks(Library.works);
    }
    function openWork(work) {
      setLoadedWork(work);
      setCurrentApp("workDetails");
    }
    async function deleteWork(work) {
      await Library.deleteWork(work.id);
      refresh();
    }
    p(() => {
      refresh();
    }, []);
    return o("div", {
      class: "container",
      children: [o("div", {
        className: "appbar",
        children: [o("div", {
          className: "left",
          children: o("h3", {
            children: "AO3 Reader"
          })
        }), o("div", {
          className: "right",
          children: o("button", {
            class: "button",
            onClick: closeApp,
            children: o("img", {
              class: "icons white",
              src: exitIcon,
              alt: "refresh"
            })
          })
        })]
      }), o("div", {
        className: "contents",
        children: o(WorkList, {
          works,
          openWork,
          deleteWork
        })
      }), o("div", {
        className: "appbar",
        children: [o("div", {
          className: "left",
          children: o("h3", {
            children: "Library"
          })
        }), o("div", {
          className: "right",
          children: o("button", {
            class: "button",
            onClick: refresh,
            children: o("img", {
              class: "icons white",
              src: refreshIcon,
              alt: "refresh"
            })
          })
        })]
      })]
    });
  }
  const arrowLeftIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJCb2xkIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIj48cGF0aCBkPSJNNC45NDMsNS42MDYsMS4wMjQsOS41MjVhMy41ODUsMy41ODUsMCwwLDAsMCw0Ljk1bDMuOTE5LDMuOTE5YTEuNSwxLjUsMCwxLDAsMi4xMjEtMi4xMjFMNC4yODUsMTMuNDkybDE4LjI1LS4wMjNhMS41LDEuNSwwLDAsMCwxLjUtMS41djBhMS41LDEuNSwwLDAsMC0xLjUtMS41TDQuMywxMC40OTIsNy4wNjQsNy43MjdBMS41LDEuNSwwLDAsMCw0Ljk0Myw1LjYwNloiLz48L3N2Zz4K";
  function DetailsApp({
    closeApp,
    work,
    setLoadedEpub,
    setCurrentApp
  }) {
    p(() => {
    }, []);
    function back() {
      setCurrentApp("");
    }
    return o("div", {
      class: "container",
      children: [o("div", {
        className: "appbar",
        children: [o("div", {
          className: "left",
          children: o("h3", {
            children: "AO3 Reader"
          })
        }), o("div", {
          className: "right",
          children: o("button", {
            class: "button",
            onClick: closeApp,
            children: o("img", {
              class: "icons white",
              src: exitIcon,
              alt: "refresh"
            })
          })
        })]
      }), o("div", {
        className: "contents",
        children: o("div", {
          className: "workDetails",
          children: [o("div", {
            className: "headers",
            children: [o("h4", {
              children: o("strong", {
                children: work.getLatest().title
              })
            }), o("h5", {
              children: ["by ", work.getLatest().authors.map((e2) => e2.name).join(" ,")]
            })]
          }), o("div", {
            className: "actions",
            children: o("div", {
              className: "buttons",
              children: [o("div", {
                className: "row",
                children: [o("a", {
                  children: "Read in Reader"
                }), o("a", {
                  href: `/works/${work.getLatest().id}`,
                  target: "_blank",
                  children: "Read in AO3"
                })]
              }), o("div", {
                className: "row",
                children: o("a", {
                  children: "Update Work"
                })
              })]
            })
          }), o("div", {
            className: "info"
          })]
        })
      }), o("div", {
        className: "appbar",
        children: [o("div", {
          className: "left",
          children: o("h3", {
            children: "Details"
          })
        }), o("div", {
          className: "right",
          children: o("button", {
            class: "button",
            onClick: back,
            children: o("img", {
              class: "icons white",
              src: arrowLeftIcon,
              alt: "back"
            })
          })
        })]
      })]
    });
  }
  const AddButton = ({
    workID
  }) => {
    const [buttonText, setButtonText] = h("Add to Library");
    const [isButtonDisabled, setButtonDisabled] = h(false);
    const handleClick = async () => {
      try {
        setButtonDisabled(true);
        setButtonText("Adding Work...");
        await Library.addWork(workID);
        setButtonText("Work Added!");
      } catch (error) {
        console.log("AO3 Reader Error: ", error, workID);
        setButtonText("Failed, Retry?");
        setButtonDisabled(false);
      } finally {
      }
    };
    p(() => {
      if (Library.ids.includes(workID)) {
        setButtonText("Work Already in Library");
        setButtonDisabled(true);
      }
    }, []);
    return o("button", {
      onClick: !isButtonDisabled ? handleClick : void 0,
      disabled: isButtonDisabled,
      type: "button",
      class: "action",
      style: {
        marginTop: "1em"
      },
      children: buttonText
    });
  };
  function insertButtons() {
    for (const button of document.querySelectorAll("div.a3r-actions")) {
      button.remove();
    }
    for (const work of document.querySelectorAll("li.blurb.group")) {
      const id = work.querySelector("h4.heading > a").attributes.href.value.split("/")[2];
      const header = work.querySelector("div.header.module");
      const buttonDiv = document.createElement("div");
      buttonDiv.className = "a3r-actions";
      header.append(buttonDiv);
      preact.render(o(AddButton, {
        workID: id
      }), buttonDiv);
    }
  }
  const AppController = ({
    closeApp
  }) => {
    const [currentApp, setCurrentApp] = h("");
    const [loadedWork, setLoadedWork] = h(null);
    const [loadedEpub, setLoadedEpub] = h(null);
    switch (currentApp) {
      case "workDetails":
        if (!loadedWork) {
          setCurrentApp("");
        }
        return o(DetailsApp, {
          closeApp,
          work: loadedWork,
          setLoadedEpub,
          setCurrentApp
        });
      case "workReader":
        setCurrentApp("workDetails");
      default:
        return o(App, {
          closeApp,
          setLoadedWork,
          setCurrentApp
        });
    }
  };
  const AppWrapper = () => {
    const [isAppVisible, setIsAppVisible] = h(false);
    const openApp = () => {
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
      document.querySelector("html").style.overscrollBehavior = "none";
      setIsAppVisible(true);
    };
    const closeApp = () => {
      document.body.style.overflow = "visible";
      document.body.style.overscrollBehavior = "";
      document.querySelector("html").style.overscrollBehavior = "";
      insertButtons();
      setIsAppVisible(false);
    };
    return o(preact.Fragment, {
      children: [o("a", {
        href: "#",
        onClick: openApp,
        children: "AO3 Reader"
      }), o("div", {
        className: "a3r",
        style: {
          display: isAppVisible ? "block" : "none"
        },
        children: o(AppController, {
          closeApp
        })
      })]
    });
  };
  try {
    console.log("=== AO3 Reader Starting! ===");
    _unsafeWindow.library = Library;
    (await Library.refresh());
  } catch (error) {
    console.log("AO3 Reader Error: ", error);
  } finally {
    insertButtons();
    (_a = document.querySelector(".a3r-open")) == null ? void 0 : _a.remove();
    const nav = document.querySelector("ul.primary.navigation.actions");
    const navItem = document.createElement("li");
    navItem.className = "a3r-open dropdown";
    nav.append(navItem);
    preact.render(o(AppWrapper, {}), navItem);
  }

})(preact);
