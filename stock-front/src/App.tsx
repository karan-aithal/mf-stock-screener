import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import logo from './logo.svg';

import './App.css';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

console.log("Google Client ID:", process.env.REACT_APP_GOOGLE_CLIENT_ID);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<h2>Dashboard</h2>} />
      </Routes>
    </Router>
  );
};

export default App;


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
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
// }

//export default App;
