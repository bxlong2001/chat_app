import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "./components/auth/Auth/Auth";
import ProtectedRoute from "./components/auth/ProtectedRoute/ProtectedRoute";
import Chat from "./components/Chat/Chat";
import Landing from "./components/landing/Landing";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Auth authRoute="login" />} />
        <Route path="/register" element={<Auth authRoute="register" />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout/>}>
            <Route path="/messages" element={<Chat/>}/>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
