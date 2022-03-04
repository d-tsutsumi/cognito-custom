import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import FirstCosutom from "./FirstCostom";
import SecondCustom from "./SecondCostom";
const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/first" element={<FirstCosutom />} />
        <Route path="/second" element={<SecondCustom />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
