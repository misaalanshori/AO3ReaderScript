import { useState, useEffect } from 'preact/hooks';
import { Library } from './library';
import { Modal, ModalActions, ModalButton, ModalContents} from './modal'


import './app.css';
import './shared.css';

import exitIcon from './assets/exit.svg';
import refreshIcon from './assets/refresh.svg';
import trashIcon from './assets/trash.svg';

function WorkItemHeader({ work, openWork }) {

  return (
    <div className="title" onClick={openWork}>
      <h4><strong>{work.getLatest().title}</strong></h4>
      <h5>by {work.getLatest().authors.map(e => e.name).join(" ,")}</h5>
    </div>
  )
}

function WorkItemTags({ work }) {
  const [isExpanded, setIsExpanded] = useState(false);
  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }
  return (
    <div className="tags" onClick={toggleExpanded}>
      <div className="main">
        <h5>{work.getLatest().ratings.map(e=>e.name).join(", ")}</h5>
        <h5>{work.getLatest().fandoms.map(e=>e.name).join(", ")}</h5>
      </div>
      <div className="expanded" style={{display: isExpanded ? "flex" : "none"}}>
        <h5>{work.getLatest().warnings.map(e=>e.name).join(", ")}</h5>
        <h5>{work.getLatest().relationships.map(e=>e.name).join(", ")}</h5>
        <h5>{work.getLatest().characters.map(e=>e.name).join(", ")}</h5>
        <h5>{work.getLatest().tags.map(e=>e.name).join(", ")}</h5>
      </div>
    </div>
  )
}

function WorkItemSummary({ work }) {
  const [isExpanded, setIsExpanded] = useState(false);
  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }
  return (
    <div className="summary" onClick={toggleExpanded}>
      <h5><strong>Summary:</strong></h5>
      <p>{isExpanded ? work.getLatest().summary : work.getLatest().summary.split("\n")[0].split(" ").slice(0,32).join(" ") + "..."}</p>
    </div>
  )
}

function WorkList({ works, openWork, deleteWork}) {
  const [isOpen, setIsOpen] = useState(false);
  const [workDelete, setWorkDelete] = useState(null);

  return (
    <div className="workList">
      {works.map(work => (
        <div className="workItem">
          <div className="header">
            <WorkItemHeader work={work} openWork={()=>{openWork(work)}}/>
            <div className="trash">
            <button class="button" onClick={()=>{setWorkDelete(work);setIsOpen(true)}}>
              <img class="icons" src={trashIcon} alt="refresh" />
            </button>
            </div>
            
          </div>
          
          
          <WorkItemTags work={work} />
          <WorkItemSummary work={work} />
        </div>
      ))}
      <Modal isOpen={isOpen}>
          <ModalContents>
              <h3>Delete Work?</h3>
              <p>This action is irreversible</p>
          </ModalContents>
          <ModalActions>
              <ModalButton onClick={()=> {deleteWork(workDelete); setIsOpen(false)}}>Delete</ModalButton>
              <ModalButton onClick={() => setIsOpen(false)}>Close</ModalButton>
          </ModalActions>
      </Modal>
    </div>
  )
}


export function App({ closeApp, setLoadedWork, setCurrentApp }) {
  const [works, setWorks] = useState([]);

  async function refresh() {
    await Library.refresh();
    setWorks(Library.works)
  }

  function openWork(work) {
    setLoadedWork(work);
    setCurrentApp("workDetails");
  }

  async function deleteWork(work) {
    await Library.deleteWork(work.id);
    refresh();
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div class="container">
      <div className="appbar">
        <div className="left">
          <h3>AO3 Reader</h3>
        </div>
        <div className="right" >
          <button class="button" onClick={refresh}>
            <img class="icons white" src={refreshIcon} alt="refresh" />
          </button>
          <button class="button" onClick={closeApp}>
            <img class="icons white" src={exitIcon} alt="refresh" />
          </button>
        </div>
      </div>

      <div className="contents">
        <WorkList works={works} openWork={openWork} deleteWork={deleteWork}/>
      </div>
    </div>
  );
}
