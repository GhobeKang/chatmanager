import React from 'react';
import WordManager from './WordManager'

function Contents (props) {
    if (props.nav === 'word') {
        return (
            <div className="content_container">
                <WordManager></WordManager>
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