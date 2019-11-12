import React from 'react';
import Axios from 'axios';
import Title from './Section_title';
import '../css/Whitelist_URL.css';

class Whitelist_URL extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            whitelist: [],
            value: ''
        }
    }

    submit_whitelist (ev) {
        if (this.state.value.length !== 0) {
            const val = this.state.value
            const validation = this.checkValidation(val)
            if (validation) {
                const chat_id = window.localStorage.getItem('chat_id')
                if (chat_id.length !== 0) {
                    Axios.post('pushWhitelist', {pattern: val, chat_id: chat_id})
                    .then((res) => {
                        if (res.data) {
                            this.getWhitelist()
                            this.setState({value: ''})
                        }
                    })
                } else {
                    alert('There is any valid key of chatting information')
                    return false
                }
            } else {
                alert('Invalid URL address, please check it again')
            }
        }
    }
    
    checkValidation (val) {
        if (typeof val === 'string') {
            const regx_test = /^\/[\s\S]*\/$/
            const regx = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,})/
            if (regx.test(val) || regx_test.test(val)) {
                return true
            } else {
                return false
            }
        }    
    }

    changeValues (event) {
        this.setState({value: event.target.value})
    }

    deleteWhitelist(url) {
        var check = window.confirm('Are you sure to Delete this Item?')
        if (check) {
            Axios.post('delWhitelist', {
                url: url,
                chat_id: window.localStorage.getItem('chat_id')
            }).then((res) => {
                if (res.status === 200 && res.data === true) {
                    alert(`delete '${url}' successfully `)
                    this.getWhitelist()
                }
            })
        }
        
    }

    changeStateWhitelist(is_active, id) {
        if (is_active) {
            Axios.post('updateWhitelist', {
                chat_id: window.localStorage.getItem('chat_id'),
                content: 0,
                type: 'status',
                id: id
            })
        } else {
            Axios.post('updateWhitelist', {
                chat_id: window.localStorage.getItem('chat_id'),
                content: 1,
                type: 'status',
                id: id
            })
        }

        return false;
    }

    getWhitelist () {
        const chat_id = window.localStorage.getItem('chat_id')

        if (chat_id.length !== 0) {
            Axios.post('getWhitelist', {chat_id: chat_id})
            .then((res) => {
                const listup = res.data;
                let result = [];
                
                for (var item of listup) {
                    result.push(item)
                }
                
                this.setState({whitelist: result.map((data, index) => 
                    <tr key={index}>
                        <td>
                            {data.url_pattern}
                        </td>
                        <td>
                            {new Date(data.created_date).toUTCString()}
                        </td>
                        <td>
                            <span className="delete_icon icon" onClick={(e) => this.deleteWhitelist(data.url_pattern)}></span>
                            <span> Delete</span>
                        </td>
                        <td>
                            <div className="disable_btn_wrap">
                                <label className="filter_group" htmlFor={index + '_whitelist'}>
                                    <input
                                    type="checkbox"
                                    className="option_item"
                                    id={index + '_whitelist'}
                                    onChange={(ev) => this.changeStateWhitelist(data.is_active, data.id)}
                                    defaultChecked={data.is_active ? true : false}
                                    ></input>
                                    <span className="filter_label"></span>
                                    <span className="filter_circle"></span>
                                </label>
                            </div>
                        </td>
                    </tr> 
                )})

                return
            })
        }
    }

    componentDidMount () {
        this.getWhitelist();
    }

    render () {
        return (
            <div className="section_whitelist">
                <div className="module_path">
                    <p><span>Modules  /  </span>Whitelist</p>
                </div>
                <Title title={'Manage Whitelist'}></Title>
                <div className="whitelist_input_wrap">
                    <label htmlFor="whitelist_input" className="whitelist_label">Enter URL you want to ban</label>
                    <div className="input_wrap">
                        <input id="whitelist_input" className="whitelist_input" onChange={(ev) => this.changeValues(ev)} onKeyUp={(ev)=> {if(ev.which === 13) {this.submit_whitelist(ev)}}} value={this.state.value}></input>
                        <button type="button" className="whitelist_register" onClick={(ev) => this.submit_whitelist(ev)}>ADD</button>
                    </div>
                </div>
                
                <p className="table_title">
                    Whitelist
                </p>
                <table className="whitelist_tb">
                    <thead>
                        <tr>
                            <th width="35%">URL</th>
                            <th width="45%">Date Added</th>
                            <th width="10%">Action</th>
                            <th width="10%">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.whitelist.length === 0 
                        ?
                            <tr><td colSpan="3" className="empty_item">No Items</td></tr>
                        :
                            this.state.whitelist
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Whitelist_URL;