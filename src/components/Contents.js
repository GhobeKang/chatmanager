import React from 'react';
import WordManager from './WordManager'
import Whitelist from './Whitelist_URL'
import Log from './Log'
import Faq from './FAQ_register'
import Start from './StartMenu'
import Users from './UserManager'

function Contents (props) {
    if (props.nav === 'word') {
        return (
            <div className="content_container">
                <WordManager></WordManager>
            </div>
        )   
    } else if (props.nav === 'wlist') {
        return (
            <div className="content_container">
                <Whitelist></Whitelist>
            </div>
        )
    } else if (props.nav === 'log') {
        return (
            <div className="content_container">
                <Log></Log>
            </div>
        )
    } else if (props.nav === 'faq') {
        return (
            <div className="content_container">
                <Faq></Faq>
            </div>
        ) 
    } else if (props.nav === 'start') {
        return (
            <div className="content_container">
                <Start></Start>
            </div>
        )
    } else if (props.nav === 'users') {
        return (
            <div className="content_container">
                <Users></Users>
            </div>
        )
    } else {
        return (
            <div className="content_container">
                <p>invalid path</p>
            </div>
        )
    }
    
}

export default Contents;