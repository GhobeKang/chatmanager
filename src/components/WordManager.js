import React from 'react';
import Axios from 'axios';
import Title from './Section_title';
import '../css/WordManager.css';

class WordManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          wordlist: [],
          value: ''
        };
    }

    componentDidMount() {
        this.getWordData();
    }

    changeValues (event) {
        this.setState({value: event.target.value})
    }

    submit_blacklist (ev) {
        if (this.state.value.length !== 0) {
            const val = this.state.value
            
            const chat_id = window.localStorage.getItem('chat_id')
            if (chat_id.length !== 0) {
                Axios.post('pushWordData', {word: val, chat_id: chat_id})
                .then((res) => {
                    if (res.data) {
                        this.getWordData()
                        this.setState({value: ''})
                    }
                })
            } else {
                alert('There is any valid key of chatting information')
                return false
            }
        
        }
    }
    
    changeStateWordlist(is_active, id) {
        if (is_active) {
            Axios.post('editWordData', {
                chat_id: window.localStorage.getItem('chat_id'),
                content: 0,
                type: 'status',
                id: id
            })
        } else {
            Axios.post('editWordData', {
                chat_id: window.localStorage.getItem('chat_id'),
                content: 1,
                type: 'status',
                id: id
            })
        }

        return false;
    }

    getWordData() {
        Axios.post('getWordData', {chat_id: window.localStorage.getItem('chat_id')})
        .then((res) => {
            if (res.data && res.status === 200) {
                let dataset = res.data;
                
                this.setState({wordlist: dataset.map((data, index) => 
                    <tr key={index}>
                        <td>
                            {data.word_name}
                        </td>
                        <td>
                            {data.created_time}
                        </td>
                        <td>
                            <span className="delete_icon icon" onClick={(e) => this.deleteWord(data.word_name)}></span>
                            <span> Delete</span>
                        </td>
                        <td>
                        <div className="disable_btn_wrap">
                                <label className="filter_group" htmlFor={index + '_whitelist'}>
                                    <input
                                    type="checkbox"
                                    className="option_item"
                                    id={index + '_whitelist'}
                                    onChange={(ev) => this.changeStateWordlist(data.is_active, data.idx)}
                                    defaultChecked={data.is_active ? true : false}
                                    ></input>
                                    <span className="filter_label"></span>
                                    <span className="filter_circle"></span>
                                </label>
                            </div>
                        </td>
                    </tr> 
                )})
            }
        })
    }

    deleteWord(word) {
        var check = window.confirm('Are you sure to Delete this Item?')
        if (check) {
            Axios.post('delWordData', {
                word: word,
                chat_id: window.localStorage.getItem('chat_id')
            }).then((res) => {
                if (res.status === 200 && res.data === true) {
                    alert(`delete '${word}' successfully `)
                    this.getWordData()
                }
            })
        }
        
    }

    render() {
        return (
            <div className="section_wordmanager">
                <div className="module_path">
                    <p><span>Modules  /  </span>Blacklist</p>
                </div>
                <Title title={'Manage Blacklist'}></Title>
                <div className="blacklist_input_wrap">
                    <label htmlFor="blacklist_input" className="blacklist_label">Enter words you want to ban</label>
                    <div className="input_wrap">
                        <input id="blacklist_input" className="blacklist_input" onChange={(ev) => this.changeValues(ev)} onKeyUp={(ev)=> {if(ev.which === 13) {this.submit_blacklist(ev)}}} value={this.state.value}></input>
                        <button type="button" className="blacklist_register" onClick={(ev) => this.submit_blacklist(ev)}>ADD</button>
                    </div>
                </div>
                
                <p className="table_title">
                    Blacklist
                </p>
                <table className="blacklist_tb">
                    <thead>
                        <tr>
                            <th width="35%">Words</th>
                            <th width="45%">Date Added</th>
                            <th width="10%">Action</th>
                            <th width="10%">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.wordlist.length === 0 
                        ?
                            <tr><td colSpan="3" className="empty_item">No Items</td></tr>
                        :
                            this.state.wordlist
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}


export default WordManager;