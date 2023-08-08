import { render } from 'preact';
import { useState, useEffect} from 'preact/hooks';
import { App } from './app';
import { DetailsApp } from './detailsApp';
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

const AppController = ({closeApp}) => {
  const [currentApp, setCurrentApp] = useState("");
  const [loadedWork, setLoadedWork] = useState(null);
  const [loadedEpub, setLoadedEpub] = useState(null);
  switch (currentApp) {
    case "workDetails":
      if (!loadedWork) {
        setCurrentApp("");
      }
      return (<DetailsApp closeApp={closeApp} work={loadedWork} setLoadedEpub={setLoadedEpub} setCurrentApp={setCurrentApp}/>)
    case "workReader":
      setCurrentApp("workDetails");
      // if (!loadedEpub) {
      //   setCurrentApp("workDetails");
      // }
      // return (<App closeApp={closeApp}/>)
    default:
      return (<App closeApp={closeApp} setLoadedWork={setLoadedWork} setCurrentApp={setCurrentApp}/>)
  }
}


const AppWrapper = () => {
  const [isAppVisible, setIsAppVisible] = useState(false);
  const openApp = () => {
    document.body.style.overflow = "hidden"
    setIsAppVisible(true);
  }
  const closeApp = () => {
    document.body.style.overflow = "visible"
    setIsAppVisible(false);
  }





  return (
    <>
      <a href="#" onClick={openApp}>AO3 Reader</a>
      <div className='a3r' style={{display: isAppVisible ? "block" : "none"}}>
        <AppController closeApp={closeApp}/>
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
  navItem.className = "dropdown";
  nav.append(navItem);
  render(<AppWrapper />, navItem);
}
