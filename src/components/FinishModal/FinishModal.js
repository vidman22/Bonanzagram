import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import "../StartModal/StartModal.css";

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
            <h1>You Lost</h1>
            <button className="Start" onClick={props.clicked}>
              Home
            </button>
            <button className="Start" onClick={props.click}>
              Play Again
            </button>
          </div>
    </CSSTransition>
  );
};

export default finish;