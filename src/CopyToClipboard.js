import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

class CopyToClipboard extends Component {
  copyText = () => {
    const { text, onError, onSuccess } = this.props;
    navigator.clipboard
      .writeText(text)
      .then(onSuccess)
      .catch(onError);
  };

  isCopySupperted = () => {
    return Boolean(navigator.clipboard);
  };

  render() {
    const canCopy = this.isCopySupperted();
    const { text } = this.props;
    if (canCopy) {
      return (
        <div className="input-group mt-3">
          <input
            ref={input => (this.inputRef = input)}
            disabled
            type="text"
            className="form-control"
            value={text}
          />
          <div className="input-group-append">
            <button
              title="Копировать email"
              onClick={this.copyText}
              className="btn btn-dark"
              type="button"
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        </div>
      );
    } else {
      return <p className="h5">{text}</p>;
    }
  }
}

export default CopyToClipboard;
