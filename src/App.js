import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";

import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000}/>
      <Routes>
        <Route path="/" element={ <Home/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
