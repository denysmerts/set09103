import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Home, Shop, About, Checkout } from "./pages";
import "./App.css";
import { Basket } from "./pages/Basket/Basket";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
