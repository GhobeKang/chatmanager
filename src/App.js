import React, { useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import RegisterChat from "./components/Register_chat";
import LeftNav from "./components/LeftNav";
import Header from './components/Header_main';

import WordManager from "./components/WordManager";
import Whitelist from "./components/Whitelist_URL";
import Log from "./components/Log";
import Faq from "./components/FAQ_register";
import Start from "./components/StartMenu";
import Users from "./components/UserManager";
import Dashboard from "./components/Dashboard";
import Modules from './components/Modules';
import Settings from './components/Settings';
import Questions from './components/Questions';
import Interests from './components/Interests';
import Keypoint from './components/Interest_words';
import FAQStats from './components/FAQ_stats';

import Axios from "axios";
Axios.defaults.baseURL = "https://chatbot-258301.appspot.com/api/";
// Axios.defaults.baseURL = "http://localhost:4000/api/";

function App() {
  const [isValid, setIsValid] = useState(false);
  const [statusNav, setStatusNav] = useState("word");
  const [chatInfo, setChatInfo] = useState([]);
  const [botId, setBotId] = useState('847825836:AAFv02ESsTVjnrzIomgdiVjBGWVw7CpN_Cg');
  // const [botId, setBotId] = useState('822428347:AAGXao7qTxCL5MoqQyeSqPc7opK607fA51I');
  
  const isLiving = getCookie("living");

  function getCookie(id) {
    const cookies = document.cookie.split(";");
    
    for (var cookie of cookies) {
      var parse = cookie.split("=");
      if (parse[0].trim() === id) {
        return parse[1];
      }
    }
  }
  
  if (isLiving || isValid) {
    return (
      <Router basename="/chatmanager">
        <Header botId={botId}></Header>
        <div className="main_container">
          <LeftNav setStatus={setStatusNav} statusNav={statusNav} setChatInfo={setChatInfo} botId={botId}></LeftNav>
          <section className="section_content">
            <Switch>
              <Route path="/" exact render={() => <Dashboard botId={botId}></Dashboard>}></Route>
              <Route path="/dashboard" render={() => <Dashboard botId={botId}></Dashboard>}></Route>
              <Route path="/modules" render={() => <Modules botId={botId}></Modules>}></Route>
              <Route path="/whitelist" render={() => <Whitelist botId={botId}></Whitelist>}></Route>
              <Route path="/blacklist" render={() => <WordManager botId={botId}></WordManager>}></Route>
              <Route path="/faq" render={() => <Faq botId={botId}></Faq>}></Route>
              <Route path="/startmenu" render={() => <Start botId={botId}></Start>}></Route>
              <Route path="/logs" render={() => <Log botId={botId}></Log>}></Route>
              <Route path="/users" render={() => <Users botId={botId}></Users>}></Route>
              <Route path="/settings" render={() => <Settings botId={botId}></Settings>}></Route>
              <Route path="/questions" render={() => <Questions botId={botId}></Questions>}></Route>
              <Route path="/interest" render={() => <Interests botId={botId}></Interests>}></Route>
              <Route path="/keypoint" render={() => <Keypoint botId={botId}></Keypoint>}></Route>
              <Route path="/faqstats" render={() => <FAQStats botId={botId}></FAQStats>}></Route>
            </Switch>
          </section>
          <div className="dim"></div>
        </div>
      </Router>
    );
  } else {
    return <RegisterChat setValid={setIsValid}></RegisterChat>;
  }
}

export default App;
