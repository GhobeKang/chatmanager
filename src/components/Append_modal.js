import React from 'react';
import '../style/css/Append_modal.min.css';
import Axios from 'axios';

function Append_modal (props) {
    function add_word (ev) {
        
        ev.stopPropagation();
        
        const val = document.querySelector('.append_modal > input.append_word').value
        Axios.post('pushWordData', {
            word: val,
            chat_id: window.localStorage.getItem('chat_id')
        }).then((res) => {
            if (res.data === true) {
                props.getWordData()
                props.closeModal()
            }
        })
    }

    if (props.state) {
        return (
            <div className="modal append_modal">
                <input className="append_word" placeholder="input a word to add"></input>
                <button className="append_apply" type="button" onClick={(e) => add_word(e)}>Apply</button>
            </div>
        )
    } else {
        return (
            <div className="modal append_modal hidden">
    
            </div>
        )
    }
}

export default Append_modal;