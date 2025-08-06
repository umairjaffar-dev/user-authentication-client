import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthWrapper from "./component/auth/AuthWrapper";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<AuthWrapper />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
