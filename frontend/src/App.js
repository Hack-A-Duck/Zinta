import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Screens/Home";
import Feedback from "./Screens/Feedback";
import NavbarTop from "./components/NavbarTop";
function App() {
	return (
		<Router>
			<div className="app">
				{/* <NavbarTop /> */}
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/feedback">
						<Feedback />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
