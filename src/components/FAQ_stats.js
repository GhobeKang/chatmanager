import React from 'react';
import Axios from 'axios';
import Title from './Section_title';
import '../css/FAQ_stats.css';

class FAQ_stats extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            faq_stats: []
        }
    }

    componentDidMount() {
        Axios.post('/getFaqlist', {chat_id: window.localStorage.getItem('chat_id')})
            .then((res) => {
                const dataset = res.data;

                this.setState({faq_stats: dataset.map((data, index) => 
                    <tr className="faqstats_member" key={index}>
                        <td>
                            {data.faq_response}
                        </td>
                        <td>
                            {data.helpful + ' votes'}
                        </td>
                        <td>
                            {data.notenough + ' votes'}
                        </td>            
                        <td>
                            {data.wrong_answer + ' votes'}
                        </td>            
                    </tr>
                )})
            })
    }

    convertDateFormat(date) {
        const day = new Date(date);
        return day.toDateString() + ' ' + day.toTimeString().split(' ')[0];
    }

    render() {
        return (
            <div className="section_faqstats">
                <div className="module_path">
                    <p><span>Modules  /  </span>FAQ Stats</p>
                </div>
                <Title title={"Figure a stat of your answers out more clear"}></Title>
                <table className="faqstats_wrap">
                    <thead>
                        <tr>
                            <th>FAQ</th>
                            <th width="15%">Useful</th>
                            <th width="15%">Not Enough Info</th>
                            <th width="15%">Wrong Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.faq_stats}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default FAQ_stats;