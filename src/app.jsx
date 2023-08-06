import { useState, useEffect } from 'preact/hooks';
import preactLogo from './assets/preact.svg';
import './app.css';
import viteLogo from './assets/vite.svg';

import {GM} from '$';

export function App({ CloseApp }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function init() {
      const count = await GM.getValue('count');
      setCount(count||0);
    }
    init();
  }, []);

  return (
    <>
      <button onClick={CloseApp}>
          CLOSE
        </button>
      <br></br>
      <h1>Vite + Preact</h1>
      <div class="card">
        <button onClick={() => setCount((count) => {GM.setValue('count', count+1); return count + 1})}>
          count is {count}
        </button>
        <p>
          Edit <code>src/app.jsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p>
    </>
  );
}
