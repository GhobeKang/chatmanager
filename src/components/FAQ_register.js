import React from 'react';
import Axios from 'axios';
import Title from './Section_title';
import QnA_List from './QnA_List_Component';
import '../css/FAQ_register.css'

class FAQ_register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            val: '',
            response: '',
            faqlist: [],
            isImage: false,
            uploadImage: '',
            imageType : ''
        }
    }
    
    changeValues(event) {
        return this.setState({val: event.target.value})
    }

    changeResponse(event) {
        return this.setState({response: event.target.value})
    }

    toggleRespType(type) {
        if (type === 'text') {
            this.setState({isImage: false})
        } else if (type === 'pic') {
            this.setState({isImage: true})
        }
    }

    uploadedImage(event) {
        const file = event.target.files[0];
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB')
            return false
        }
        this.makePreview(file);
        this.setState({imageType: file.type.split('/')[1], uploadImage: file})
    }

    makePreview(file) {
        const fr = new FileReader();
        
        fr.onload = function(e) {
            const img_el = document.createElement('img');
            img_el.setAttribute('src', e.target.result);
            
            const target_el = document.querySelector('.input_file_preview');
            while (target_el.firstChild) {
                target_el.removeChild(target_el.firstChild);
            }

            document.querySelector('.input_file_preview').appendChild(img_el)
        }

        fr.readAsDataURL(file)
    }

    removeImagePreview() {
        const target_el = document.querySelector('.input_file_preview');
        while (target_el.firstChild) {
            target_el.removeChild(target_el.firstChild);
        }
    }

    clearTexts() {
        document.querySelector('textarea.faq_input').value = '';
        if (!this.state.isImage) {
            document.querySelector('textarea#faq_response_input').value = '';
        } else {
            this.removeImagePreview()
        }

        return true;
    }

    submit_faqlist(event) {
        var form_data = new FormData();
        
        form_data.append('chat_id', window.localStorage.getItem('chat_id'))
        form_data.append('content', this.state.val)
        form_data.append('response', this.state.response)
        form_data.append('response_img', this.state.uploadImage)
        form_data.append('response_type', this.state.isImage ? 'img' : 'txt')
        form_data.append('img_type', this.state.imageType)

        if (form_data.get('chat_id') && form_data.get('content') !== '') {
            Axios.post('pushFaqlist', form_data)
                .then((res) => {
                    if (res.data) {
                        this.getFaqList();
                        this.clearTexts();
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

    getFaqList () {
        const chat_id = window.localStorage.getItem('chat_id')

        if (chat_id.length !== 0) {
            Axios.post('getFaqlist', {chat_id: chat_id})
            .then((res) => {
                const listup = res.data;
                let result = [];
                
                for (var item of listup) {
                    result.push(item)
                }
                
                this.setState({faqlist: result.map((data, index) => 
                    <QnA_List data={data} index={index} getFaqList={() => this.getFaqList()} key={index}></QnA_List>
                )})

                return
            })
        }
    }

    componentDidMount () {
        this.getFaqList();
    }

    render () {
        return (
            <div className="faq_section">
                <div className="module_path">
                    <p><span>Modules  /  </span>FAQ Responder</p>
                </div>
                <Title title={'Manage automatic response for FAQ'}></Title>
                <div className="faq_input_wrap">
                    <div className="faq_content_wrap">
                        <label htmlFor="faq_input">If the user says something similar to</label>
                        <textarea id="faq_input" className="faq_input" onChange={(ev) => this.changeValues(ev)}></textarea>
                    </div>
                    <div className="faq_content_wrap">
                        <label htmlFor="faq_response_input">The bot will reply</label>
                        {this.state.isImage ? <div className="input_file_preview"></div> : <textarea id="faq_response_input" onChange={(ev) => this.changeResponse(ev)}></textarea>}
                        <div className="response_type_btns_wrap">
                            {this.state.isImage ? <span className="icon text-icon-disabled" onClick={(ev) => this.toggleRespType('text')}></span> : <span className="icon text-icon-active" onClick={(ev) => this.toggleRespType('text')}></span>}
                            <span> | </span>
                            <label>
                                <input type="file" name="faq_img" onChange={(ev) => this.uploadedImage(ev)}></input>
                                {this.state.isImage ? <span className="icon pic-icon-active" onClick={() => this.toggleRespType('pic')}></span> : <span className="icon pic-icon-disabled" onClick={() => this.toggleRespType('pic')}></span>}
                            </label>
                            
                        </div>
                    </div>
                </div>
                <button type="button" className="faq_register" onClick={(ev) => this.submit_faqlist(ev)}>ADD</button>
                
                <p className="table_title">
                    Responds
                </p>
                <table className="faq_tb">
                    <tbody>
                        {this.state.faqlist.length === 0 
                        ? 
                            <tr><td colSpan="3" className="empty_item">No Items</td></tr>
                        :
                            this.state.faqlist
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default FAQ_register;