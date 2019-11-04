import React from 'react';
import Module_item from './module_item';
import Title from './Section_title';
import Axios from 'axios';
import '../css/Dashboard.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemlist: []
        }
    }
    
    getEntireModules(status) {
        let list = []
        const all_modules = [{
            id: 1,
            title: 'Whitelist',
            content: 'Auto-delete unauthorized URLS',
            link: '/whitelist'
        },{
            id: 2,
            title: 'Blacklist',
            content: 'Auto-delete banned words',
            link: '/blacklist'
        },{
            id: 3,
            title: 'FAQ',
            content: 'Set auto-reply messages to frequently asked Questions',
            link: '/faq'
        },{
            id: 4,
            title: '/start auto-response',
            content: 'Set an auto-response when user types /start',
            link: '/startmenu'
        },{
            id: 6,
            title: 'Users',
            content: 'Manage participated users',
            link: '/users'
        },{
            id: 5,
            title: 'Logs',
            content: 'show logs',
            link: '/logs'
        }]

        for (const [key, val] of Object.entries(status)) {
            const target_pos = key.split('_')[1];
            if (val) {
                list.push(all_modules[target_pos - 1])
            }
        }
        return list;
    }

    componentDidMount() {
        Axios.post('/getStateModule', {chat_id: window.localStorage.getItem('chat_id')})
            .then((res) => {
                const status = res.data[0];
                let modules = this.getEntireModules(status);

                const list = modules.map((item, index) => 
                    <Module_item title={item.title} content={item.content} link={item.link} key={index} isEditable={false}></Module_item>
                )
                
                this.setState({itemlist: list})    
            })
        
    }

    render() {
        return (
            <div className="section_dashboard">
                <Title title="Active Modules"></Title>
                <div className="dashboard_list_wrap">
                    {this.state.itemlist}
                </div>
            </div>
        )
    }
}

export default Dashboard;