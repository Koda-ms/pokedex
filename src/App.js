import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Header from "./components/Header";

import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000}/>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/favorite" element={ <Favorite/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
