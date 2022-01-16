// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { ReactComponent as TfoLogo } from "./assets/logo2.svg";
import { ReactComponent as StarSVG } from "./assets/star.svg";
import { ReactComponent as IMDBSVG } from "./assets/imdb.svg";

let epdata = require("./data/list.json");

function WhooshkaEmbed(props) {
  return (
    <div>
      <div
        className="whooshkaa-widget-player"
        data-episode-id="543356"
        data-theme="light"
        data-height="75"
        data-button-color="#333333"
        data-background-color="#CCCCCC"
        data-description-color="#333333"
        data-waveform-base-color="#999999"
        data-waveform-progress-color="#333333"
      ></div>
      
    </div>
  );
}

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
          rating={parseFloat(ep.rating).toFixed(1)}
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
      <div className="episodecontents">
        <img src={props.coverurl} className="poster" />
        <div>
          <p className="episodetitle">
            {props.epindex} / {props.title}
          </p>
          <p className="episodesubtitle">
            {props.releasedate} <StarSVG height="1em" className="svg" />{" "}
            {props.rating}/10{" "}
            <a href={"https://www.imdb.com/title/tt" + props.imdbid}>
              <IMDBSVG height="1em" className="svg" />
            </a>
          </p>
          <p className="episodedesc">{props.plotoutline}</p>
          <WhooshkaEmbed />
        </div>
      </div>
      <span className="tfoindex">{props.tfoindex}</span>
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
