import "./index.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./pages/Main";
import Reservation from "./pages/Reservation";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <Header />}
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/about"></Route>
        <Route path="/reservation" element={<Reservation />}></Route>
      </Routes>
      {location.pathname !== "/" && <Footer />}
    </>
  );
}

export default App;
