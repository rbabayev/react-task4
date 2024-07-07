import { Routes, Route } from "react-router-dom";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import AutoSwitch from "./components/AutoSwitch";
import "./design/header.css";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <AutoSwitch />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signinform" element={<SignInForm />} />
        <Route path="/signupform" element={<SignUpForm />} />
      </Routes>
    </div>
  );
}

export default App;
