import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Header from "./Components/Header";
import Home from "./Components/Home"
import Exchanges from "./Components/Exchanges";
import CoinDetails from "./Components/CoinDetails";
import Coins from "./Components/Coins"
import Footer from "./Components/Footer";


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins" element={<Coins />} />
          <Route path="/exchanges" element={<Exchanges />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
