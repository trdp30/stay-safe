import { createStore, compose, applyMiddleware } from "redux";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
// import logger from "redux-logger";

const sagaMiddleware = createSagaMiddleware();

let composeEnhancers = compose;

composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore(initialState) {
  const middlewares = [sagaMiddleware];
  let sessionDetails = localStorage.getItem("stay-safe-session")
    ? JSON.parse(localStorage.getItem("stay-safe-session"))
    : null;
  if (sessionDetails) {
    initialState = {
      session: {
        isAuthenticated: true,
        expiresIn: sessionDetails.expiresIn,
        refreshToken: sessionDetails.refreshToken,
        token: sessionDetails.token
      }
    };
  }
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
export default configureStore();
