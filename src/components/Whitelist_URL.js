import React from 'react';
import Axios from 'axios';
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
                    Axios.post('http://localhost:4000/api/pushWhitelist', {pattern: val, chat_id: chat_id})
                    .then((res) => {
                        if (res.data) {
                            this.getWhitelist()
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
            Axios.post('http://localhost:4000/api/delWhitelist', {
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

    getWhitelist () {
        const chat_id = window.localStorage.getItem('chat_id')

        if (chat_id.length !== 0) {
            Axios.post('http://localhost:4000/api/getWhitelist', {chat_id: chat_id})
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
                            <a className="delete_icon icon" onClick={(e) => this.deleteWhitelist(data.url_pattern)}></a>
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
        this.getWhitelist();
    }

    render () {
        return (
            <div className="section_whitelist">
                <div className="whitelist_input_wrap">
                    <label for="whitelist_input" className="whitelist_label">http(s)://</label>
                    <input id="whitelist_input" className="whitelist_input" placeholder="Input a URL to shut down" onChange={(ev) => this.changeValues(ev)} onKeyUp={(ev)=> {if(ev.which === 13) {this.submit_whitelist(ev)}}}></input>
                    <button type="button" className="whitelist_register" onClick={(ev) => this.submit_whitelist(ev)}>submit</button>
                </div>
                
                <table className="whitelist_tb">
                    <tbody>
                        {this.state.whitelist}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Whitelist_URL;