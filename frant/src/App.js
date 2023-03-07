import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Allgmail from "./Components/Allgmail";
import Googleform from "./Components/Googleform";
import Login from "./Components/Login";
import Facebook from "./Components/Facebook";
import Facebookform from "./Components/Facebookform";
import Addproductform from "./Components/Addproductform";
import Productmanage from "./Components/Productmanage";
import Order from "./Components/Order";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/gotogoogle" element={<Allgmail />} />
          <Route exact path="/googleform" element={<Googleform />} />
          <Route exact path="/gotofacebook" element={<Facebook />} />
          <Route exact path="/facebookform" element={<Facebookform />} />
          <Route exact path="/addproduct" element={<Addproductform />} />
          <Route exact path="/manage" element={<Productmanage />} />
          <Route exact path="/order" element={<Order />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
