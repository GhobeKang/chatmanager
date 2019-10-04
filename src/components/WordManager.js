import React, { useState, useEffect, Component } from 'react';
import Axios from 'axios';
import Append_modal from './Append_modal';
import Edit_modal from './Edit_modal';
import '../css/WordManager.css';

class WordManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          wordlist: [],
          isOpenModal: false,
          isOpenModal_edit : false,
          oriword : ''
        };
    }

    componentDidMount() {
        this.getWordData();
    }

    closeModal() {
        this.setState({isOpenModal: false}) 
        
        document.querySelector('.dim').style = 'display: none'
        document.querySelector('.dim').removeEventListener('click', () => {})   
    }

    closeModal_edit() {
        this.setState({isOpenModal_edit: false}) 
        
        document.querySelector('.dim').style = 'display: none'
        document.querySelector('.dim').removeEventListener('click', () => {})   
    }

    getWordData() {
        Axios.post('http://localhost:4000/api/getWordData', {chat_id: window.localStorage.getItem('chat_id')})
        .then((res) => {
            if (res.data && res.status === 200) {
                let dataset = []

                for (var data of res.data) {
                    dataset.push(data.name)    
                }
                
                this.setState({wordlist: dataset.map((data, index) => 
                    <tr key={index}>
                        <th>
                            {data}
                        </th>
                        <th>
                            <a className="delete_icon icon" onClick={(e) => this.deleteWord(data)}></a>
                        </th>
                        <th>
                            <a className="edit_icon icon" onClick={(e) => this.editWord(data)}></a>
                        </th>
                    </tr> 
                )})
            }
        })
    }

    deleteWord(word) {
        var check = window.confirm('Are you sure to Delete this Item?')
        if (check) {
            Axios.post('http://localhost:4000/api/delWordData', {
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

    dimControl() {
        const _this = this
        document.querySelector('.dim').style = 'display: block'
        document.querySelector('.dim').addEventListener('click', function(ev) {
            ev.stopPropagation()
            
            _this.setState({isOpenModal: false})
            // document.querySelector('.modal.append_modal').classList.add('hidden')
            document.querySelector('.dim').style = 'display: none'
            document.querySelector('.dim').removeEventListener('click', () => {})
        })
    }

    editWord(word) {
        this.dimControl()
        this.setState({isOpenModal_edit: true, oriword: word})
    }

    appendWord() {
        this.dimControl()
        this.setState({isOpenModal : true})
    }

    render() {
        return (
            <div className="section_wordmanager">
                <div className="append_btn_wrap">
                    <button type="button" className="append_btn" onClick={(e) => this.appendWord()}>+</button>
                </div>
                <table className="wordmanager_tb">
                    <thead>
                        <tr>
                            <th>word_name</th>
                            <th>delete</th>
                            <th>edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.wordlist}
                    </tbody>
                </table>
                <Append_modal state={this.state.isOpenModal} closeModal={() => this.closeModal()} getWordData={() => this.getWordData()}></Append_modal>
                <Edit_modal state_edit={this.state.isOpenModal_edit} oriword={this.state.oriword} closeModal={() => this.closeModal_edit()} getWordData={() => this.getWordData()}></Edit_modal>
            </div>
        )
    }
}


export default WordManager;