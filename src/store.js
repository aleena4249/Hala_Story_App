import { createStore } from "redux";
import reducer from "./reducer";

const initialState = {
  user_email: "",
  user_password: "",
  top_stories_id: [],
  storyDetail: [],
  storySelected: {}
};
const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
