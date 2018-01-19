import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import "./StartModal.css";

const animationTiming = {
    enter: 400,
    exit: 1000
};

const Start = props => {
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
            <h1>Wait for Players</h1>
            <button className="Start" onClick={props.clicked}>
              Start
            </button>
          </div>
    </CSSTransition>
  );
};

export default Start;