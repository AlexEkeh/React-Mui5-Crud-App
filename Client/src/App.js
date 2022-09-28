import Home from "./pages/Home";
import AllUsers from "./pages/AllUsers";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<AllUsers />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
