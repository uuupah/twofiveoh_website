// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { ReactComponent as TfoLogo } from "./assets/svg/logo2.svg";
import { ReactComponent as StarSVG } from "./assets/svg/star.svg";
import { ReactComponent as IMDBSVG } from "./assets/svg/imdb.svg";
import { ReactComponent as InstaSVG } from "./assets/svg/insta.svg";
import { ReactComponent as SpotifySVG } from "./assets/svg/spotify.svg";
import { ReactComponent as AppleSVG } from "./assets/svg/apple.svg";
import { ReactComponent as MailSVG } from "./assets/svg/mail.svg";
import unknownPoster from "./assets/unknown.png";
import Marquee from "react-fast-marquee";

let epdata = require("./data/list.json");
let sevenjantwenty = new Date(2020, 0, 7);

// viewport hook from https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/
const viewportContext = React.createContext({});

const ViewportProvider = ({ children }) => {
  // This is the exact same logic that we previously had in our hook

  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  /* Now we are dealing with a context instead of a Hook, so instead
     of returning the width and height we store the values in the
     value of the Provider */
  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

/* Rewrite the "useViewport" hook to pull the width and height values
   out of the context instead of calculating them itself */
const useViewport = () => {
  /* We can use the "useContext" Hook to acccess a context from within
     another Hook, remember, Hooks are composable! */
  const { width, height } = React.useContext(viewportContext);
  return { width, height };
}

function addDays(days) {
  const copy = new Date(sevenjantwenty);
  copy.setDate(sevenjantwenty.getDate() + days);
  return copy;
}

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

function HeaderDesktop(props) {
  return (
    <div className="headerdesktop">
      <TfoLogo width="250px" />
      <ul className="links">
        <li>
          <a href="https://www.instagram.com/twofiveohpod/">
            <InstaSVG height="1em" className="svg" />{" "}
            <span className="paddedspan">instagram</span>
          </a>
        </li>
        <li>
          <a href="https://podcasts.apple.com/kz/podcast/twofiveoh/id1493890285">
            <AppleSVG height="1em" className="svg" />{" "}
            <span className="paddedspan">apple</span>
          </a>
        </li>
        <li>
          <a href="https://open.spotify.com/show/39lr9bBUcXgZRXsxTw1axM">
            <SpotifySVG height="1em" className="svg" />{" "}
            <span className="paddedspan">spotify</span>
          </a>
        </li>
        <li>
          <a href="mailto:twofiveohpod@gmail.com">
            <MailSVG height="1em" className="svg" />{" "}
            <span className="paddedspan">mail</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

function HeaderMobile(props) {
  var iconwidth = "40px";
  return (
    <div className="headermobile">
      <a href="https://www.instagram.com/twofiveohpod/">
        <InstaSVG height={iconwidth} className="svg headermobilespacing" />
      </a>
      <a href="https://podcasts.apple.com/kz/podcast/twofiveoh/id1493890285">
        <AppleSVG height={iconwidth} className="svg headermobilespacing" />
      </a>
      <TfoLogo width="100px" />
      <a href="https://open.spotify.com/show/39lr9bBUcXgZRXsxTw1axM">
        <SpotifySVG height={iconwidth} className="svg headermobilespacing" />
      </a>
      <a href="mailto:twofiveohpod@gmail.com">
        <MailSVG height={iconwidth} className="svg headermobilespacing" />
      </a>
    </div>
  );
}

function Episodelist(props) {
  return (
    <div className="episodelist">
      {epdata.map((ep, index) => (
        <Episode
          index={index}
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
      <div
        className={
          "episodecontents" +
          String(new Date() > addDays(props.index * 7) ? "" : " disabled")
        }
      >
        <img
          src={props.coverurl ? props.coverurl : unknownPoster}
          className="poster"
        />

        {/* <img src={props.coverurl != "" ? props.coverurl : "/assets/svg/unknown.svg"} className="poster" /> */}
        <div className="episodedesccontents">
          <Marquee gradient={false} className="episodetitle">
            {props.epindex} / {props.title.trim()}&nbsp;
          </Marquee>
          <p className="episodesubtitle">
            {props.releasedate ? props.releasedate : ""}{" "}
            <StarSVG
              height="1em"
              className={isNaN(props.rating) ? "svg hidden" : "svg"}
            />{" "}
            {!isNaN(props.rating) ? props.rating + "/10" : ""}{" "}
            <a
              href={"https://www.imdb.com/title/tt" + props.imdbid}
              className={!props.imdbid ? "hidden" : ""}
            >
              <IMDBSVG height="1em" className="svg" />
            </a>
          </p>
          <p className="episodedesc">{props.plotoutline}</p>
          {/* <WhooshkaEmbed /> */}
        </div>
      </div>
      <span className="tfoindex">{props.tfoindex}</span>
    </div>
  );
}

const ContentWrapper = () => {
  const { width } = useViewport();
  const breakpoint = 576;

  console.log(width)

  return(

    <div
    className="app"
    style={{ flexDirection: + width > breakpoint ? "row" : "column" }}
  >
    {width > breakpoint ? <HeaderDesktop /> : <HeaderMobile />}
    <Episodelist />
  </div>
  )
}

const App = () => {

  return (
    <ViewportProvider>
      <ContentWrapper />
    </ViewportProvider>
  );
};

export default App;
