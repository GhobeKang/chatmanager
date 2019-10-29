import React from 'react';
import Axios from 'axios';
import Title from './Section_title';
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

    clearTexts() {
        document.querySelector('input.faq_input').value = '';
        if (!this.state.isImage) {
            document.querySelector('textarea.faq_response').value = '';
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

    deleteFaqList(content) {
        var check = window.confirm('Are you sure to Delete this Item?')
        if (check) {
            const data = {
                content: content,
                chat_id : window.localStorage.getItem('chat_id')
            }
    
            Axios.post('delFaqlist', data)
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
                    <tr>
                        <td>
                            {index + 1}
                        </td>
                        <td>
                            {data.faq_content}
                        </td>
                        <td>
                            {data.response_type === 'txt' ? data.faq_response : <img id={'faq_img' + index} src={data.faq_response_img} alt="registerd for FAQ"></img>}
                        </td>
                        <td>
                            <span className="delete_icon icon" onClick={(e) => this.deleteFaqList(data.faq_content)}></span>
                        </td>
                        <td>
                            {new Date(data.created_date).toUTCString()}
                        </td>
                    </tr> 
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
                <Title title={'Register automatic response of FAQ'}></Title>
                <div className="faq_input_wrap">
                    <div className="faq_content_wrap">
                        <input id="faq_input" className="faq_input" placeholder="Input a pattern of FAQ" onChange={(ev) => this.changeValues(ev)}></input>
                        <label for="response_text">Text</label>
                        <input type="radio" id="response_text" name="response_type" value="Text" onChange={(ev) => this.toggleRespType(ev)}></input>

                        <label for="response_image">Image</label>
                        <input type="radio" id="response_image" name="response_type" value="Image" onChange={(ev) => this.toggleRespType(ev)}></input>
                        {!this.state.isImage 
                        ? 
                            <textarea id="faq_response" className="faq_response" placeholder="Input a answer for FAQ question" onChange={(ev) => this.changeResponse(ev)}></textarea>    
                        : 
                            <input type="file" className="faq_response_img" onChange={(ev) => this.uploadedImage(ev)}></input>
                        }
                    </div>
                    <button type="button" className="faq_register" onClick={(ev) => this.submit_faqlist(ev)}>submit</button>
                </div>
                
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