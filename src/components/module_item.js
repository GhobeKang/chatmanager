import React from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

class Module_item extends React.Component {
    constructor(props) {
        super(props);
    }
    
    changeModules(event) {
        if (event.currentTarget.checked) {
            Axios.post('/setStateModule', {chat_id: window.localStorage.getItem('chat_id'), target_id: this.props.list_id, status: 1})
        } else {
            Axios.post('/setStateModule', {chat_id: window.localStorage.getItem('chat_id'), target_id: this.props.list_id, status: 0})
        }
        
        return false
    }

    render() {
        return (
            <div className="module_item">
                <div className="module_title">
                    <p>{this.props.title}</p>
                </div>
                <div className="module_content">
                    <p>{this.props.content}</p>
                </div>
                <Link to={this.props.link}>SETTING</Link>
                {this.props.isEditable ? 
                    <div className="disable_btn_wrap">
                        <label className="filter_group" htmlFor={this.props.list_id + '_module'}>
                            <input
                            type="checkbox"
                            className="option_item"
                            id={this.props.list_id + '_module'}
                            onChange={(ev) => this.changeModules(ev)}
                            defaultChecked={this.props.is_active ? true : false}
                            ></input>
                            <span className="filter_label"></span>
                            <span className="filter_circle"></span>
                        </label>
                    </div> : ''}
            </div>
        )
    }
}

export default Module_item;