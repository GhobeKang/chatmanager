import React from 'react';
import Axios from 'axios';
import Title from './Section_title';
import Question_reply from './Question_reply';
import '../style/css/Questions.min.css'

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        Axios.post('getQuestions', {chat_id: window.localStorage.getItem('chat_id')})
            .then((res) => {
                let dataset = [];

                for (var data of res.data) {
                    if (!data.is_bot) {
                        dataset.push(data);
                    }
                }
                
                this.setState({messages: dataset.map((data, index) => 
                    <div className="questions_content_wrap" key={index}>
                        <div className="questions_content">
                            <p>{data.text}</p>
                        </div>
                        <div className="questions_username">
                            {`${data.first_name} ${data.last_name}`}
                        </div>
                        <div className="questions_info">
                            <div className="questions_received_time">
                                <p>{this.convertDateFormat(data.date)}</p>
                            </div>
                            <Question_reply data={data} botId={this.props.botId} convertDateFormat={this.convertDateFormat}></Question_reply>
                            
                        </div>
                    </div>
                )})
            }).catch(function(err) {
                console.log(err);
            })
    }

    convertDateFormat(date) {
        const day = new Date(date);
        return day.toDateString() + ' ' + day.toTimeString().split(' ')[0];
    }

    render() {
        return (
            <div className="section_questions">
                <div className="module_path">
                    <p><span>Modules  /  </span>Collect Questions</p>
                </div>
                <Title title={"Manage all of questions"}></Title>
                {this.state.messages.length === 0 ? 
                            <div className="empty_item">There's any questions yet</div>
                            : this.state.messages}
            </div>
        )
    }
}

export default Questions;