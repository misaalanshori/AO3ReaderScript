import { useState, useEffect } from 'preact/hooks';
import { Library } from './library';

import './shared.css';
import './detailsApp.css'

import exitIcon from './assets/exit.svg';
import arrowLeftIcon from './assets/arrow-left.svg';


export function DetailsApp({ closeApp, work, setLoadedEpub, setCurrentApp }) {

  useEffect(() => {
  }, []);

  function back() {
    setCurrentApp("");
  }

  return (
    <div class="container">
      <div className="appbar">
        <div className="left">
          <button class="button" onClick={back}>
            <img class="icons white" src={arrowLeftIcon} alt="back" />
          </button>
        </div>
        <div className="right">
          <button class="button" onClick={closeApp}>
            <img class="icons white" src={exitIcon} alt="close" />
          </button>
        </div>
      </div>

      <div className="contents">
        <div className="workDetails">
          <div className="headers">
            <h4><strong>{work.getLatest().title}</strong></h4>
            <h5>by {work.getLatest().authors.map(e => e.name).join(" ,")}</h5>
          </div>
          <div className="actions">
            <div className="buttons">
              <div className='row'>
                <button type="button">Read in Reader</button>
                <button type="button">Read in AO3</button>
              </div>
              <div className='row'>
                <button type="button">Update Work</button>
              </div>
            </div>
          </div>
          <div className="info"></div>
        </div>
        

        
      </div>
    </div>
  );
}
