import React from 'react';
import Title from './Section_title';
import '../css/Log.css';
import Axios from 'axios';

class Log extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            loglist: []
        }
    }

    componentDidMount() {
        Axios.post('getLogs', {'chat_id' : window.localStorage.getItem('chat_id')})
            .then((res) => {
                const listup = res.data;
                let result = [];
                
                for (var item of listup) {
                    result.push(item)
                }
                
                this.setState({loglist: result.map((data, index) => 
                    <tr key={index}>
                        <td>
                            {index}
                        </td>
                        <td>
                            {this.getContent(data)}
                        </td>
                        <td>
                            {data.type}
                        </td>
                        <td>
                            {new Date(data.del_date).toUTCString()}
                        </td>
                        <td>
                            {this.render_resend_icon(data)}
                        </td>
                    </tr>
                )})

                return
            })
    }

    getContent(data) {
        if (data.type !== 'photo') {
            return data.msg;
        } else {
            if (data.photo_base64) {
                const img_sr = "data:image/jpg;base64," + data.photo_base64;
            
                return (
                    <img src={img_sr} alt="result of log" ></img>
                )
            }
        }
    }

    restoreMsg(data) {
        const dataset = {
            chat_id: window.localStorage.getItem('chat_id'),
            text: `<i> -> ${data.msg_from}</i>
            
            origin msg : <b>${data.msg}</b>`,
            parse_mode: 'html'
        }
        Axios.post(`https://api.telegram.org/bot847825836:AAFv02ESsTVjnrzIomgdiVjBGWVw7CpN_Cg/sendMessage`, dataset)
    }

    render_resend_icon(data) {
        if (data.type === 'text') {
            return (
                <span className="icon resend_icon" onClick={(ev) => this.restoreMsg(data)}></span>
            )
        } else {
            return ''
        }
    }

    render () {
        return (
            <div className="section_log">
                 <div className="module_path">
                <p>
                    <span>Modules / </span>Logs
                </p>
                </div>
                <Title title={'Logs about blocked words or pictures'}></Title>
                <table className="log_tb">
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                content
                            </th>
                            <th width="5%">
                                type
                            </th>
                            <th width="20%">
                                date
                            </th>
                            <th width="8%">
                                re-send
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.loglist}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Log;