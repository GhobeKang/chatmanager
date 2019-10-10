import React from 'react';
import Axios from 'axios';
import Title from './Section_title';
import '../css/StartMenu_reg.css';

class StartMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            response: '',
            isImage: false,
            uploadImage: '',
            imageType : '',
            preview_img: '',
            preview_txt: ''
        }
    }

    changeResponse(event) {
        return this.setState({response: event.target.value})
    }

    toggleRespType(event) {
        if (event.target.value === 'Text') {
            this.setState({isImage: false})
        } else if (event.target.value === 'Image') {
            this.setState({isImage: true})
        }
    }

    uploadedImage(event) {
        const file = event.target.files[0];
        if (file.size > 2 * 1024 * 1024) {
            alert('File size should be less than 2MB')
            return false
        }
        this.setState({imageType: file.type.split('/')[1], uploadImage: file})
    }

    clearContents() {
        if (!this.state.isImage) {
            document.querySelector('textarea.faq_response').value = '';
        } 

        this.setState({
            response: '',
            isImage: false,
            uploadImage: '',
            imageType : ''
        })

        return true;
    }

    submit_faqlist(event) {
        var form_data = new FormData();
        
        form_data.append('chat_id', window.localStorage.getItem('chat_id'))
        form_data.append('content_text', this.state.response)
        form_data.append('content_img', this.state.uploadImage ? this.state.uploadImage : '')
        form_data.append('content_type', this.state.isImage ? 'img' : 'txt')
        form_data.append('img_type', this.state.imageType)

        if (form_data.get('chat_id') && form_data.get('content') !== '') {
            Axios.post('http://localhost:4000/api/pushStartMenu', form_data)
                .then((res) => {
                    if (res.data) {
                        this.clearContents();
                    }
                })
        } 
    }

    deleteFaqList(content) {
        var check = window.confirm('Are you sure to Delete this Item?')
        if (check) {
            const data = {
                content: content,
                chat_id : window.localStorage.getItem('chat_id')
            }
    
            Axios.post('http://localhost:4000/api/delFaqlist', data)
                .then((res) => {
                    if (res.data) {
                        this.getFaqList();
                    }
                })
        }
    }

    convertToBase64 ( img, type, targetid ) {
        if (img !== null) {
            var blob = new Blob( [ img ], { type: "image/" + type } );
            var reader = new FileReader()
            
            reader.onload = function (file) {
                var img_tag = document.querySelector('#' + targetid)
                img_tag.src = file.target.result;
            }
            reader.readAsDataURL(blob);
        }
    }

    getStartMenu () {
        Axios.post('http://localhost:4000/api/getStartMenu', {'chat_id': window.localStorage.getItem('chat_id')})
            .then((res) => {
                this.setState({
                    preview_img: res.data[0]['content_img'],
                    preview_txt: res.data[0]['content_txt']
                })
            })
    }
    
    componentDidMount () {
        this.getStartMenu()
    }

    render () {
        return (
            <div className="startmenu_section">
                <Title title={"Register a response of command \'\/start\'"}></Title>
                <div className="start_input_wrap">
                    <div className="start_content_wrap">
                        <label htmlFor="response_text">Text</label>
                        <input type="radio" id="response_text" name="response_type" value="Text" onChange={(ev) => this.toggleRespType(ev)}></input>

                        <label for="response_image">Image</label>
                        <input type="radio" id="response_image" name="response_type" value="Image" onChange={(ev) => this.toggleRespType(ev)}></input>
                        {!this.state.isImage 
                        ? 
                            <textarea id="start_response" className="start_response" placeholder="Input a answer for FAQ question" onChange={(ev) => this.changeResponse(ev)}></textarea>    
                        : 
                            <input type="file" className="start_response_img" onChange={(ev) => this.uploadedImage(ev)}></input>
                        }
                    </div>
                    <button type="button" className="start_register" onClick={(ev) => this.submit_faqlist(ev)}>submit</button>
                </div>
                <div className="preview_wrap">
                    {this.state.preview_img !== 'undefined' ? 
                        <div className="preview_img">
                            <img src={this.state.preview_img}></img>    
                        </div>
                    :
                        <div className="preview_txt">
                            {this.state.preview_txt}
                        </div>    
                    }
                    
                    
                </div>
            </div>
        )
    }
}

export default StartMenu