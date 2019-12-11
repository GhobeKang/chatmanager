import React from 'react';
import Module_item from './module_item';
import Title from './Section_title';
import Axios from 'axios';
import '../css/Modules.css';

class Modules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemlist: []
        }
    }
    
    getEntireModules(status) {
        const all_modules = [{
            id: 1,
            title: 'Whitelist',
            content: 'Auto-delete unauthorized URLS',
            link: '/whitelist',
            is_editable: true
        },{
            id: 2,
            title: 'Blacklist',
            content: 'Auto-delete banned words',
            link: '/blacklist',
            is_editable: true
        },{
            id: 3,
            title: 'FAQ',
            content: 'Set auto-reply messages to frequently asked Questions',
            link: '/faq',
            is_editable: true
        },{
            id: 4,
            title: '/start auto-response',
            content: 'Set an auto-response when user types /start',
            link: '/startmenu',
            is_editable: true
        },{
            id: 5,
            title: 'Users',
            content: 'Manage participated users',
            link: '/users',
            is_editable: false
        },{
            id: 6,
            title: 'Logs',
            content: 'show logs',
            link: '/logs',
            is_editable: false
        },{
            id: 7,
            title: 'Collect Questions',
            content: 'Observe all questions risen up in chat-room',
            link: '/questions',
            is_editable: false
        },{
            id: 8,
            title: 'Interested Users',
            content: 'Focus on user who you are interested in',
            link: '/interest',
            is_editable: false
        }]

        for (const [key, val] of Object.entries(status)) {
            const target_pos = key.split('_')[1];
            if (val) {
                all_modules[target_pos - 1]['is_active'] = 1
            } else {
                all_modules[target_pos - 1]['is_active'] = 0
            }
        }
        return all_modules;
    }

    componentDidMount() {
        Axios.post('/getStateModule', {chat_id: window.localStorage.getItem('chat_id')})
            .then((res) => {
                const status = res.data[0];
                let modules = this.getEntireModules(status);

                const list = modules.map((item, index) => 
                    <Module_item title={item.title} content={item.content} link={item.link} isEditable={item.is_editable} key={index} list_id={item.id} is_active={item.is_active}></Module_item>
                )
                
                this.setState({itemlist: list})    
            })
    }

    render() {
        return (
            <div className="section_modules">
                <Title title="Modules"></Title>
                <div className="modules_list_wrap">
                    {this.state.itemlist}
                </div>
            </div>
        )
    }
}

export default Modules;