import React from 'react';
import WordManager from './WordManager'
import Whitelist from './Whitelist_URL'
import Log from './Log'

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
    }else {
        return (
            <div className="content_container">
                <p>invalid path</p>
            </div>
        )
    }
    
}

export default Contents;