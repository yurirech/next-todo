import '../styles/globals.scss';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { isChecked } from '../reducers/todo-item';

const logger = createLogger();
const rootReducer = combineReducers({ isChecked });
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

function App({ Component, pageProps }: AppProps) {
  return  <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
}

export default App;
