import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import frendsNavReducer from "./frendsNav-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import { reducer as fromReducer } from "redux-form";
import appReducers from "./app-reducer "
let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  frendsNav: frendsNavReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: fromReducer,
  app: appReducers,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunkMiddleware)
));


export default store;
