import React from 'react';
import Axios from 'axios';
import Title from './Section_title';
import '../css/Log.css';

class Log extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            loglist: []
        }
    }

    componentDidMount() {
        Axios.post('http://localhost:4000/api/getLogs', {'chat_id' : window.localStorage.getItem('chat_id')})
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
                    </tr>
                )})

                return
            })
    }

    getContent(data) {
        if (data.type !== 'photo') {
            return data.text;
        } else {
            if (data.photo_base64) {
                const img_sr = "data:image/jpg;base64," + data.photo_base64;
            
                return (
                    <img src={img_sr}></img>
                )
            }
        }
    }

    render () {
        return (
            <div className="section_log">
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