import React from 'react';
import Axios from 'axios';

class Question_reply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modal_content: ''
        }
    }
    
    send_reply_message(event) {
        const dataset = {
            chat_id: window.localStorage.getItem('chat_id'),
            reply_to_message_id: event.currentTarget.dataset.mid,
            text: this.state.modal_content
        }

        Axios.post(`https://api.telegram.org/bot${this.props.botId}/sendMessage`, dataset).then(() => {
            alert('the reply sent to chat successfully')
            this.close_modal();
            Axios.post('/setStateReplied', dataset)
        })
    }

    updateContent(event) {
        this.setState({
            modal_content: event.target.value
        })
    }

    open_modal() {
        this.setState({modal: true});
    }

    close_modal() {
        this.setState({modal: false});
    }

    getModalClass() {
        const id = this.props.data.id;
        let result_str = '';

        if (this.state.modal) {
            result_str = `reply_modal_${id} active_modal`
        } else {
            result_str = `reply_modal_${id}`
        }

        return result_str;
    }

    render() {
        return (
            <div className="questions_state">
                {this.props.data.replied_date === null ? 
                (
                <div className="reply_partion">
                    <a className="reply_btn" data-mid={this.props.data.id} onClick={(ev) => this.open_modal()}>
                        REPLY
                    </a>
                    <div className={this.getModalClass()}>
                        <div className="modal_title">
                            <p>Write a reply</p>
                        </div>
                        <textarea className="reply_content" onChange={(ev) => this.updateContent(ev)} placeholder="reply to.."></textarea>
                        <div className="modal_btn_wrap">
                            <a className="cancle_btn" onClick={() => this.close_modal()}>
                                CANCLE
                            </a>
                            <a className="submit_btn" data-mid={this.props.data.id} onClick={(ev) => this.send_reply_message(ev)}>
                                SUBMIT
                            </a>
                        </div>
                    </div>
                </div>
                ) : 
                (<div className="replied_date">
                    <p>replied time</p>
                    <p>
                        {this.props.convertDateFormat(this.props.data.replied_date)}
                    </p>
                </div>)}
            </div>
        )
    }
}

export default Question_reply;