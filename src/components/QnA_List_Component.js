import React from "react";
import Axios from "axios";

class QnA_List_Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      isImage: false,
      question: this.props.data.faq_content,
      response: this.props.data.faq_response,
      uploadImage: "",
      imageType: ""
    };
  }
  deleteFaqList(content) {
    var check = window.confirm("Are you sure to Delete this Item?");
    if (check) {
      const data = {
        content: content,
        chat_id: window.localStorage.getItem("chat_id")
      };

      Axios.post("delFaqlist", data).then(res => {
        if (res.data) {
            this.props.getFaqList();
        }
      });
    }
  }
  changeToEdit() {
    this.setState({ isEditable: true });
  }
  changeQuestion(event) {
    return this.setState({ question: event.target.value });
  }
  changeResponse(event) {
    return this.setState({ response: event.target.value });
  }
  toggleRespType(type) {
    if (type === "text") {
      this.setState({ isImage: false });
    } else if (type === "pic") {
      this.setState({ isImage: true });
    }
  }
  confirmEdit() {
    var form_data = new FormData();

    form_data.append("chat_id", window.localStorage.getItem("chat_id"));
    form_data.append("question", this.state.question);
    form_data.append("response", this.state.response);
    form_data.append("response_img", this.state.uploadImage);
    form_data.append("response_type", this.state.isImage ? "img" : "txt");
    form_data.append("img_type", this.state.imageType);
    form_data.append("id", this.props.data.id);

    if (form_data.get("chat_id") && form_data.get("question") !== "") {
      Axios.post("updateFaqlist", form_data).then(res => {
        if (res.data) {
          this.props.getFaqList();
          this.setState({isEditable: false})
        }
      });
    }
  }
  uploadedImage(event) {
    const file = event.target.files[0];
    if (file.size > 2 * 1024 * 1024) {
      alert("File size should be less than 2MB");
      return false;
    }
    this.makePreview(file);
    this.setState({ imageType: file.type.split("/")[1], uploadImage: file });
  }

  makePreview(file) {
    const fr = new FileReader();
    const index = this.props.index;

    fr.onload = function(e) {
      const img_el = document.createElement("img");
      img_el.setAttribute("src", e.target.result);

      const target_el = document.querySelector("#input_file_preview_" + index);
      while (target_el.firstChild) {
        target_el.removeChild(target_el.firstChild);
      }

      target_el.appendChild(img_el);
    };

    fr.readAsDataURL(file);
  }
  render() {
    return (
      <tr>
        <td>
          {this.state.isEditable ? (
            <textarea
              className="list_content"
              value={this.state.question}
              onChange={ev => this.changeQuestion(ev)}
            ></textarea>
          ) : (
            <div className="list_content">{this.props.data.faq_content}</div>
          )}
        </td>
        <td>
          {this.state.isEditable ? (
            <div className="faq_content_wrap">
              {this.state.isImage ? (
                <div id={'input_file_preview_' + this.props.index}></div>
              ) : (
                <textarea
                  value={this.state.response}
                  onChange={ev => this.changeResponse(ev)}
                ></textarea>
              )}
              <div className="response_type_btns_wrap">
                {this.state.isImage ? (
                  <span
                    className="icon text-icon-disabled"
                    onClick={ev => this.toggleRespType("text")}
                  ></span>
                ) : (
                  <span
                    className="icon text-icon-active"
                    onClick={ev => this.toggleRespType("text")}
                  ></span>
                )}
                <span> | </span>
                <label>
                  <input
                    type="file"
                    name="faq_img"
                    onChange={ev => this.uploadedImage(ev)}
                  ></input>
                  {this.state.isImage ? (
                    <span
                      className="icon pic-icon-active"
                      onClick={() => this.toggleRespType("pic")}
                    ></span>
                  ) : (
                    <span
                      className="icon pic-icon-disabled"
                      onClick={() => this.toggleRespType("pic")}
                    ></span>
                  )}
                </label>
              </div>
            </div>
          ) : (
            <div className="list_response">
              {this.props.data.response_type === "txt" ? (
                this.props.data.faq_response
              ) : (
                <img
                  id={"faq_img" + this.props.index}
                  src={this.props.data.faq_response_img}
                  alt="registerd for FAQ"
                ></img>
              )}
            </div>
          )}
        </td>
        <td>
          {this.state.isEditable ? (
            <div className="edit_btns_wrap">
              <span
                className="save_icon icon"
                onClick={e => this.confirmEdit()}
              ></span>
              <span
                className="cancle_icon icon"
                onClick={e => this.setState({ isEditable: false })}
              ></span>
            </div>
          ) : (
            <div className="edit_btns_wrap">
              <span
                className="edit_icon icon"
                onClick={e => this.changeToEdit(this.props.index)}
              ></span>
              <span
                className="delete_icon icon"
                onClick={e => this.deleteFaqList(this.props.data.faq_content)}
              ></span>
            </div>
          )}
        </td>
      </tr>
    );
  }
}

export default QnA_List_Component;
