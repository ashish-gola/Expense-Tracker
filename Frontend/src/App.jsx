import Home from "./components/Home/index.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from "./components/Signup/index.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>  
  );
};

export default App;