import './modal.css'; // Import your CSS file for styling

export function Modal({ isOpen, children }) {
    if (!isOpen) return (<></>);

    return (
        <div className="modal">
            <div className="box">
            {children}
            </div>
            
        </div>
    );
}

export function ModalContents({ children }) {
    return (
        <div className="contents">
            {children}
        </div>
    );
}

export function ModalActions({ children }) {
    return (
        <div className="actions">
            {children}
        </div>
    );
}

export function ModalButton({ onClick, children }) {
    return (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    );
}
