import logo from "./logo.svg";
import "./App.css";
import React from "react";

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
  return <div className="header">test</div>;
}

function Episodelist(props) {
  return (
    <div className="episodelist">
      <div className="episode">1</div>
      <div className="episode">2</div>
      <div className="episode">3</div>
      <div className="episode">4</div>
      <div className="episode">5</div>
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
