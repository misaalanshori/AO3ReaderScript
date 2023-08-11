import { useState, useEffect } from 'preact/hooks';
import { Library } from './library';

import './shared.css';
import './detailsApp.css'

import exitIcon from './assets/exit.svg';
import arrowLeftIcon from './assets/arrow-left.svg';


export function DetailsApp({ closeApp, work, setLoadedEpub, setCurrentApp }) {
  const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(false);
  const [updateButtonText, setUpdateButtonText] = useState("Update Work");

  useEffect(() => {
  }, []);

  function back() {
    setCurrentApp("");
  }

  async function openWork() {
    setLoadedEpub(await work.getLatest().getEpub());
    setCurrentApp("workReader");
  }

  async function updateWork() {
    setUpdateButtonText("Updating...");
    setIsUpdateButtonDisabled(true);
    try {
      await Library.getWorkUpdate(work);
      setUpdateButtonText("Updated!");
      setTimeout(() => {
        setUpdateButtonText("Update Work");
        setIsUpdateButtonDisabled(false);
      }, 1000);
    } catch (error) {
      setUpdateButtonText("Update Work Failed!");
      setIsUpdateButtonDisabled(false);
    }
    
  }

  return (
    <div class="container">
      
      <div className="appbar">
        <div className="left">
          <h3>AO3 Reader</h3>
        </div>
        <div className="right" >
          <button class="button" onClick={closeApp}>
            <img class="icons white" src={exitIcon} alt="refresh" />
          </button>
        </div>
      </div>

      <div className="contents">
        <div className="workInfo">
            <h4><strong>Summary:</strong></h4>
            <p>{work.getLatest().summary}</p>
            <p><strong>Last Updated: </strong>{work.getLatest().updated.toString()}</p>
        </div>
      
        <div className="workDetails">
          <div className="headers">
            <h4><strong>{work.getLatest().title}</strong></h4>
            <h5>by {work.getLatest().authors.map(e => e.name).join(" ,")}</h5>
          </div>
          <div className="actions">
            <div className="buttons">
              <div className='row'>
                <a href="#" onClick={openWork}>Read in Reader</a>
                <a href={`/works/${work.getLatest().id}`} target="_blank">Read in AO3</a>
              </div>
              <div className='row'>
                <a href="#" onClick={isUpdateButtonDisabled ? ()=>{} : updateWork}>{updateButtonText}</a>
              </div>
            </div>
          </div>
          <div className="info"></div>
        </div>
        
        

        
      </div>
      <div className="appbar">
        <div className="left">
          <h3>Details</h3>
          
        </div>
        <div className="right">
          <button class="button" onClick={back}>
            <img class="icons white" src={arrowLeftIcon} alt="back" />
          </button>
        </div>
      </div>
    </div>
  );
}
