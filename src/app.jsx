import { useState, useEffect } from 'preact/hooks';
import { Library } from './library';

import './app.css';

import crossIcon from './assets/cross.svg';
import refreshIcon from './assets/refresh.svg';

import {GM} from '$';



function WorkList({ works }) {
  return (
    <div className="a3r-workList">
      {works.map(work => (
        <div className="a3r-workItem">
          <div className="a3r-workItem-header">
            <h4 ><strong>{work.getLatest().title}</strong> by {work.getLatest().authors.map(e => e.name).join(" ,")}</h4>
          </div>
          <div className="a3r-workItem-tags"></div>
          <div className="a3r-workItem-summary">
            <h5><strong>Summary:</strong></h5>
            <p>{work.getLatest().summary}</p>
          </div>

          
        </div>
      ))}
    </div>
  )
}


export function App({ closeApp }) {
  const [works, setWorks] = useState([]);

  async function refresh() {
    await Library.refresh();
    setWorks(Library.works)
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div class="a3r-container">
      <div className="a3r-appbar">
        <div className="left">
          <h3>AO3 Reader</h3>
        </div>
        <div className="right">
          <button class="a3r-button" onClick={refresh}>
            <img class="a3r-icons" src={refreshIcon} alt="refresh" />
          </button>
          <button class="a3r-button" onClick={closeApp}>
            <img class="a3r-icons" src={crossIcon} alt="refresh" />
          </button>
        </div>
      </div>

      <div className="a3r-contents">
        <WorkList works={works}/>
      </div>
    </div>
  );
}
