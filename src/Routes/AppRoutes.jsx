import { Routes, Route } from "react-router";
import Home from "../Home/Index";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
