import Container from "react-bootstrap/cjs/Container";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';
import store from 'store';
import {Provider} from 'react-redux';

import QA from 'components/QA';

const App = () => {
	return (
			<Provider store={store}>
				<div>
					<Container className={"App"}>
						<header data-testid={"page_title"} className={"header"}>
							<h1>
								<b>The awesome Q/A tool</b>
							</h1>
						</header>
						<div className={"main"}>
							<QA/>
						</div>
					</Container>
				</div>
			</Provider>

	);
}

export default App;
