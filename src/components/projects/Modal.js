import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Modal extends Component {
  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  }

  render() {
    return (
      <div>
        <div ref={Modal => {
          this.Modal = Modal;
        }}
          id="modal1"
          className="modal">
          <div className="modal-content">
            <h4>Case has been sucessfully created</h4>
          </div>
          <div className="modal-footer">
            <a className="modal-close waves-effect waves-red btn-flat">
              go back
            </a>
            <a href="/" className="modal-close waves-effect waves-green btn-flat">
              ok
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;