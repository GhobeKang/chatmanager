import React from 'react';
import Axios from 'axios';

class Header_main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            default_info: [],
            chat_photo: [],
            isOpen: false
        }
    }

    componentWillMount() {
        const chat_id = window.localStorage.getItem('chat_id');
        
        Axios.post(`https://api.telegram.org/bot${this.props.botId}/getChat`, {chat_id : chat_id})
            .then((res) => {
                this.setState({default_info: res.data.result})
                if (res.data.result.photo) {
                    Axios.get(`https://api.telegram.org/bot${this.props.botId}/getFile?file_id=`+res.data.result.photo.small_file_id)
                    .then((res_photo) => {
                        this.setState({chat_photo: res_photo.data.result})
                    })
                }
            })
    }
    
    getHeaderPhoto() {
        if (this.state.chat_photo.file_path !== undefined) {
            return (
                <img src={`https://api.telegram.org/file/bot${this.props.botId}/` + this.state.chat_photo.file_path}></img>
            )
        } else {
            return ''
        }
    }

    toggleDropbox() {
        if (this.state.isOpen) {
            this.setState({isOpen: false})
        } else {
            this.setState({isOpen: true})
        }
    }

    logout() {
        // 스토리지 chat_id, cookie living delete
        window.localStorage.removeItem('chat_id')
        document.cookie = "living=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = '/';
    }

    render() {
        return (
            <div className="section_header">
                <div className="header_logo">
                    
                </div>
                <div className="header_infos">
                    <div className="header_name" onClick={() => this.toggleDropbox()}>
                        <span>{this.state.default_info.title}</span>
                        <span className="icon icon-down"></span>
                    </div>
                    <ul className={this.state.isOpen ? 'header_drop open' : 'header_drop'}>
                        <li>{this.state.default_info.title}</li>
                        <li style={{color:'#2F2F2F'}} onClick={() => this.logout()}>LOG OUT</li>
                    </ul>
                    <div className="header_photo">
                        {this.getHeaderPhoto()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Header_main;