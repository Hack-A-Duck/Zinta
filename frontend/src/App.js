import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Screens/Home";
import Feedback from "./Screens/Feedback";
import Admin from "./Screens/Admin";
import SingleBlog from "./components/SingleBlog";

const App = () => {
	return (
		<Router>
			<div className="app">

				<Switch>

					<Route exact path="/">
						<Home />
					</Route>
					
					<Route exact path="/feedback">
						<Feedback />
					</Route>
					
					<Route exact path="/admin">
						<Admin />
					</Route>

					<Route exact path="/blog/:id">
						<SingleBlog />
					</Route>
				
				</Switch>
			</div>
		</Router>
	);
}

export default App;
