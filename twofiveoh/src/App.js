// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { ReactComponent as TfoLogo } from "./assets/logo2.svg";

let epdata = require("./data/list.json");

function Header(props) {
  return (
    <div className="header">
      <TfoLogo width="250px" />
    </div>
  );
}

function Episodelist(props) {
  return (
    <div className="episodelist">
      {epdata.map((ep) => (
        <Episode
          epindex={ep.epindex}
          tfoindex={ep.tfoindex}
          imdbid={ep.imdbid}
          coverurl={ep.coverurl}
          title={ep.title}
          releasedate={ep.releasedate}
          rating={ep.rating}
          plotoutline={ep.plotoutline}
        />
      ))}
    </div>
  );
}

// TODO make poster image fade in on load
function Episode(props) {
  return (
    <div className="episode">
      <span className="tfoindex">{props.tfoindex}</span>
      <img src={props.coverurl} className="poster" />
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Episodelist />
      </div>
    );
  }
}

export default App;
