import { BrowserRouter } from "react-router";
import Navbar from "./Components/Layout/Navbar";
import AppRoutes from "./Routes/AppRoutes";
import Footer from "./Components/Layout/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
