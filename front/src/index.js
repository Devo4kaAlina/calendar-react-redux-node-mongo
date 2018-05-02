import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import AppStore from './reducers';
import './index.css';

ReactDOM.render(
	<MuiThemeProvider>
		<Provider store={AppStore}>
			<App />
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('root'));
registerServiceWorker();
