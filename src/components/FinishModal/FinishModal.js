import React  from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import "./FinishModal.css";


const animationTiming = {
    enter: 400,
    exit: 1000
};

const finish = props => {
  return (
    <CSSTransition 
        mountOnEnter 
        unmountOnExit 
        in={props.show} 
        timeout={animationTiming}
        classNames={{
            enter: '',
            enterActive: 'ModalOpen',
            exit: '',
            exitActive: 'ModalClosed'
        }}>
          <div className="Modal">
            <h1>{props.message}</h1>
            <button onClick={props.closed}>
              Home
            </button>
          </div>
    </CSSTransition>
  );
};

export default finish;