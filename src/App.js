import React, { useState } from "react";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import "./App.css";

import RegisterChat from "./components/Register_chat";
import Signin from './components/Signin';
import Features from './components/Features';
import LeftNav from "./components/LeftNav";
import Header from './components/Header_main';
import LandingFooter from './components/LandingFooter';
import LandingHeader from './components/LandingHeader';

import Messages from './components/Pages/Messages';
import WordManager from "./components/WordManager";
import Whitelist from "./components/Whitelist_URL";
import Log from "./components/Log";
import Faq from "./components/FAQ_register";
import Start from "./components/StartMenu";
import Users from "./components/Pages/UserManager";
import User from './components/Pages/User';
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
  const [botName, setBotName] = useState('aqoom_bot')
  // const [botId, setBotId] = useState('822428347:AAGXao7qTxCL5MoqQyeSqPc7opK607fA51I');
  // const [botName, setBotName] = useState('aqoom_test_bot')
  
  const isLiving = getCookie("living") == 'true';
  const inConsole = getCookie('STAY_C') == 'true';

  function getCookie(id) {
    const cookies = document.cookie.split(";");
    
    for (var cookie of cookies) {
      var parse = cookie.split("=");
      if (parse[0].trim() === id) {
        return parse[1];
      }
    }
  }
  
  if (isValid || inConsole) {
    return (
      <Router basename="/chatmanager">
        <Header botId={botId}></Header>
        <div className="main_container">
          <LeftNav setStatus={setStatusNav} statusNav={statusNav} setChatInfo={setChatInfo} botId={botId}></LeftNav>
          <section className="section_content">
            <Switch>
              <Route path="/" exact render={() => <Users botId={botId}></Users>}></Route>

              <Route path="/members" render={() => <Users botId={botId}></Users>}></Route>
              <Route path="/messages" render={() => <Messages botId={botId}></Messages>}></Route>
              <Route path="/user" render={() => <User botId={botId}></User>}></Route>

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
    return (
      <Router>
        <div className="App">
          <LandingHeader onLogin={isLiving} setValid={setIsValid}></LandingHeader>
          <Switch>
            <Route path="/" exact render={() => <RegisterChat></RegisterChat>}></Route>
            <Route path="/features" render={() => <Features></Features>}></Route>
            <Route path="/signin" render={() => <Signin botName={botName}></Signin>}></Route>
          </Switch>
          <LandingFooter></LandingFooter>
        </div>
      </Router>
    )
  }
}

export default App;
