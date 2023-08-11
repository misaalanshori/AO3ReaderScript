import { useState, useEffect, useRef } from 'preact/hooks';
import ePub from 'epubjs';
import { Library } from './library';
import { unsafeWindow } from '$';
import './shared.css';
import './readerApp.css'

import exitIcon from './assets/exit.svg';
import arrowLeftIcon from './assets/arrow-left.svg';
import angleRightIcon from './assets/angle-right.svg';
import angleLeftIcon from './assets/angle-left.svg';


// readBlobAsArrayBuffer = (blob) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.addEventListener('load', (e) => {
//       resolve(e.result);
//     });
//     reader.addEventListener('error', reject);
//     reader.readAsArrayBuffer(blob);
//   });
// }

const getChapter = (href, rendition) => {
  href = href.replace(" ", "%20");
  function flatten(items) {
    return [].concat.apply(
      [],
      items.map((item) => [].concat.apply([item], flatten(item.subitems)))
    );
  };
  console.log(href, rendition)
  var matches = flatten(rendition.book.navigation.toc).filter(
    (item) => rendition.book.canonical(item.href) == rendition.book.canonical(href)
  );

  if (matches.length != 1) {
    console.log("Unable to get chapter title", event, matches);
    return null;
  }
  return matches[0].label.trim();
};

const EpubViewer = ({epub, location, onLocationChange, getRendition}) => {
  async function initReader() {
    const bookData = await epub.arrayBuffer()
    console.log("Epub Loaded, byte length: ", bookData.byteLength)
    const book = ePub(bookData);
    console.log("Initializing epub viewer")
    const rendition = book.renderTo('a3r-epub-viewer', {
      width: '100%',
      height: '100%',
    });

    unsafeWindow.epubrendition = rendition;
    
    rendition.display();
    console.log("Epub Displayed")
    if (location) {
      rendition.display(location);
    }
    getRendition(rendition)
    rendition.on('relocated', (location) => {onLocationChange(location);})
    return () => {
      book.destroy();
      unsafeWindow.epubrendition = null;
    };
  }
  useEffect(() => {
    initReader();
  }, []);

  return (
    <div id="a3r-epub-viewer" style={{  width: '100%', height: '100%' }}>
      {/* The EPUB content will be rendered here */}
    </div>
  );
};


export function ReaderApp({ closeApp, work, epub, setCurrentApp }) {
  const [chapterTitle, setChapterTitle] = useState("");
  const [epubLocation, setEpubLocation] = useState(0);
  const renditionRef = useRef(null);
  useEffect(() => {
    return () => {
    }
  }, []);

  function back() {
    setCurrentApp("workDetails");
  }

  function updateLocation(location) {
    work.setReadingLocation(location);
    setEpubLocation(location);
  }

  function nextPage() {
    renditionRef.current.next();
  }

  function prevPage() {
    renditionRef.current.prev();
  }


  function loadRendition(rendition) {
    renditionRef.current = rendition;
    renditionRef.current.on('relocated', (location) => {
      const chapter = getChapter(location.start.href, renditionRef.current) || "";
      setChapterTitle(chapter);
    })
  }

  return (
    <div class="container">

      <div className="contents">
        <EpubViewer
          epub={epub}
          location={epubLocation}
          onLocationChange={updateLocation}
          getRendition={loadRendition}
        ></EpubViewer>
      </div>
      <div className="appbar">
        <div className="left">
          <h4>{chapterTitle}</h4>
          
        </div>
        <div className="right">
          <button class="button" onClick={back}>
            <img class="icons white" src={arrowLeftIcon} alt="back" />
          </button>
          <button class="button" onClick={prevPage}>
            <img class="icons white" src={angleLeftIcon} alt="back" />
          </button>
          <button class="button" onClick={nextPage}>
            <img class="icons white" src={angleRightIcon} alt="back" />
          </button>
        </div>
      </div>
    </div>
  );
}
