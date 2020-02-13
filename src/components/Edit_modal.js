import React from 'react';
import Axios from 'axios';
import '../style/css/Edit_modal.min.css';

function Edit_modal (props) {
    
    function edit_word(ev) {
        ev.stopPropagation();
        
        const val = document.querySelector('.edit_modal > input.edit_word').value
        
        Axios.post('editWordData', {
            rep : val,
            ori : props.oriword,
            chat_id: window.localStorage.getItem('chat_id')
        }).then((res) => {
            if (res.status === 200 && res.data === true) {
                props.getWordData()
                props.closeModal()
            }
        })
    }

    if (props.state_edit) {
        return (
            <div className="modal edit_modal">
                <input className="edit_word" placeholder="input a replacement of word"></input>
                <button className="edit_apply" type="button" onClick={(e) => edit_word(e)}>Apply</button>
            </div>
        )
    } else {
        return (
            <div className="modal edit_modal hidden">
    
            </div>
        )
    }
}

export default Edit_modal;