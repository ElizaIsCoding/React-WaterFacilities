import React, { Component } from "react";

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
  }

  render() {
    return (
      <div>
          <div className="modal-content">
            <h4>Case has been successfully created</h4>
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
    );
  }
}

export default Modal;