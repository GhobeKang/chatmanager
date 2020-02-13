import React from "react";
import Axios from "axios";
import Title from "./Section_title";
import "../style/css/StartMenu_reg.min.css";

class FAQ_register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      faqlist: [],
      isImage: false,
      uploadImage: "",
      imageType: "",
      preview_img: "",
      preview_txt: "",
      isEditable: false
    };
  }

  changeResponse(event) {
    return this.setState({ response: event.target.value });
  }

  changeToEdit() {
    this.setState({ isEditable: true });
  }
  toggleRespType(type) {
    if (type === "text") {
      this.setState({ isImage: false });
    } else if (type === "pic") {
      this.setState({ isImage: true });
    }
  }

  uploadedImage(event) {
    const file = event.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return false;
    }
    this.makePreview(file);
    this.setState({ imageType: file.type.split("/")[1], uploadImage: file });
  }

  makePreview(file) {
    const fr = new FileReader();

    fr.onload = function(e) {
      const img_el = document.createElement("img");
      img_el.setAttribute("src", e.target.result);

      const target_el = document.querySelector(".input_file_preview");
      while (target_el.firstChild) {
        target_el.removeChild(target_el.firstChild);
      }

      document.querySelector(".input_file_preview").appendChild(img_el);
    };

    fr.readAsDataURL(file);
  }

  removeImagePreview() {
    const target_el = document.querySelector(".input_file_preview");
    while (target_el.firstChild) {
      target_el.removeChild(target_el.firstChild);
    }
  }

  clearTexts() {
    if (!this.state.isImage) {
      document.querySelector("textarea#start_response_input").value = "";
    } else {
      this.removeImagePreview();
    }

    return true;
  }

  submit_startmenu(event) {
    var form_data = new FormData();

    form_data.append("chat_id", window.localStorage.getItem("chat_id"));
    form_data.append("content_text", this.state.response);
    form_data.append("content_img", this.state.uploadImage);
    form_data.append("content_type", this.state.isImage ? "img" : "txt");
    form_data.append("img_type", this.state.imageType);

    if (form_data.get("chat_id")) {
      Axios.post("pushStartMenu", form_data).then(res => {
        if (res.data) {
          this.getStartMenu();
          this.clearTexts();
        }
      });
    }
  }

  deleteStartMenu() {
    var check = window.confirm("Are you sure to Delete this Item?");
    if (check) {
      const data = {
        chat_id: window.localStorage.getItem("chat_id")
      };

      Axios.post("delStartMenu", data).then(res => {
        if (res.data) {
          this.getStartMenu();
        }
      });
    }
  }

  convertToBase64(img, type, targetid) {
    if (img !== null) {
      var blob = new Blob([img], { type: "image/" + type });
      var reader = new FileReader();

      reader.onload = function(file) {
        var img_tag = document.querySelector("#" + targetid);
        img_tag.src = file.target.result;
      };
      reader.readAsDataURL(blob);
    }
  }

  getStartMenu() {
    Axios.post("getStartMenu", {
      chat_id: window.localStorage.getItem("chat_id")
    }).then(res => {
      this.setState({
        preview_img: res.data[0]["content_img"],
        preview_txt: res.data[0]["content_txt"]
      });
    });
  }

  componentDidMount() {
    this.getStartMenu();
  }

  render() {
    return (
      <div className="startmenu_section">
        <div className="module_path">
          <p>
            <span>Modules / </span>start command responder
          </p>
        </div>
        <Title title={"Manage automatic response for /start command"}></Title>
        <div className="start_input_wrap">
          <div className="start_content_wrap">
            <label htmlFor="start_response_input">
              If the user types /start
            </label>
            {this.state.isImage ? (
              <div className="input_file_preview"></div>
            ) : (
              <textarea
                id="start_response_input"
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
        </div>
        <button
          type="button"
          className="start_register"
          onClick={ev => this.submit_startmenu(ev)}
        >
          ADD
        </button>

        <p className="table_title">Responds</p>
        <div className="preview_wrap">
          <div className="preview_contents">
            {this.state.preview_img !== 'undefined' ? (
              <div className="preview_img">
                <img
                  src={this.state.preview_img}
                  alt="preview of start menu"
                ></img>
              </div>
            ) : (
              <div className="preview_txt">{this.state.preview_txt}</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default FAQ_register;
