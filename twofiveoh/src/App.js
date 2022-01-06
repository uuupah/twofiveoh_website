import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { ReactComponent as TfoLogo } from "./assets/logo2.svg";

// function App() {`
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }`

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
      <Episode tfoindex={"150"} />
      <Episode tfoindex={"149"} />
      <Episode tfoindex={"148"} />
      <Episode tfoindex={"147"} />
      <Episode tfoindex={"146"} />
    </div>
  );
}

function Episode(props) {
  return (
    <div className="episode">
      <span className="tfoindex">{props.tfoindex}</span>
      <img src="https://m.media-amazon.com/images/M/MV5BZWM1MTdhM2YtNjgwZS00YjQ3LTk3NTQtMzQ1NDE3YzZlODFlXkEyXkFqcGdeQXVyMTI3ODAyMzE2._V1_.jpg" className="poster"/>
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
