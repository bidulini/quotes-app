import "./index.css";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import QuoteList from "./components/QuoteList";
import { UserContext } from "./components/UserContext";
import { useContext } from "react";

function App() {
  const {isUserLogged} = useContext(UserContext);

  return (
    <BrowserRouter>
    <Switch>
    <div className="test">
      <Navbar />
      <Route path="/about-us" component={AboutUs}/>
      <Route path="/log-in" component={isUserLogged() ? QuoteList : Login}/>
      <Route path="/quote-list" component={isUserLogged() ? QuoteList : Login}/>
      <Route exact path="/" component={Home}/>
    </div>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
