import logo from './logo.svg';
import './App.css';
import MainPageContainer from './components/MainPageContainer';
import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Redirect } from "react-router-dom";
import LoginFormContainer from './../src/components/LoginFormContainer/LoginFormContainer'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginFormContainer />}
        />
        <Route
          path="/mainpage"
          element={<MainPageContainer />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
