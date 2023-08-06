import { render } from 'preact';
import { useState, useEffect} from 'preact/hooks';
import { App } from './app';
import './index.css';
import { unsafeWindow } from '$';
import { Library } from './library';



const AddButton = ({ workID }) => {
  const [buttonText, setButtonText] = useState('Add to Library');
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleClick = async () => {
    try {
      setButtonDisabled(true);
      setButtonText('Adding Work...');
      await Library.addWork(workID);
      setButtonText('Work Added!');
    } catch (error) {
      console.log("AO3 Reader Error: ", error, workID);
      setButtonText('Failed, Retry?');
      setButtonDisabled(false);
    } finally {
      
    }
  };

  useEffect(() => {
    if (Library.ids.includes(workID)) {
      setButtonText('Work Already in Library');
      setButtonDisabled(true);
    }
  },[]);

  return (
    <button
      onClick={!isButtonDisabled ? handleClick : undefined}
      disabled={isButtonDisabled}
      type="button"
      class="action"
      style={{ marginTop: '1em' }}
    >
      {buttonText}
    </button>
  );
};

const AppWrapper = () => {
  const [isAppVisible, setIsAppVisible] = useState(false);
  const openApp = () => {
    setIsAppVisible(true);
  }
  const closeApp = () => {
    setIsAppVisible(false);
  }
  return (
    <>
      <a href="#" onClick={openApp}>AO3 Reader</a>
      <div className='AppWrapper' style={{display: isAppVisible ? "block" : "none"}}>
        <App CloseApp={closeApp}/>
      </div>
    </>
  )
}

try {
  console.log("=== AO3 Reader Starting! ===")
  unsafeWindow.library = Library;
  await Library.refresh();
} catch (error) {
  console.log("AO3 Reader Error: ", error);
} finally {

  // Add buttons to works
  for (const work of document.querySelectorAll("li.blurb.group")) {
    const id = work.querySelector("h4.heading > a").attributes.href.value.split("/")[2];
    const header = work.querySelector("div.header.module")
    const buttonDiv = document.createElement("div");
    header.append(buttonDiv);
    render(<AddButton workID={id} />, buttonDiv);
  }

  // Add AO3 Reader to nav
  const nav = document.querySelector("ul.primary.navigation.actions");
  const navItem = document.createElement("li");
  nav.append(navItem);
  render(<AppWrapper />, navItem);
}
