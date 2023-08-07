import { useState, useEffect } from 'preact/hooks';
import { Library } from './library';

import './app.css';

import crossIcon from './assets/cross.svg';
import refreshIcon from './assets/refresh.svg';

import {GM} from '$';

export function App({ closeApp }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function init() {
      const count = await GM.getValue('count');
      setCount(count||0);
    }
    init();
  }, []);

  return (
    <div class="a3r-container">
      <div className="a3r-appbar">
        <div className="left">
          <h5>AO3 Reader</h5>
        </div>
        <div className="right">
          <button class="a3r-button" onClick={Library.refresh}>
            <img class="a3r-icons" src={refreshIcon} alt="refresh" />
          </button>
          <button class="a3r-button" onClick={closeApp}>
            <img class="a3r-icons" src={crossIcon} alt="refresh" />
          </button>
        </div>
      </div>

      <div className="a3r-contents">

      </div>
    </div>
  );
}
