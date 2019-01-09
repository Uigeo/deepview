import { combineReducers } from "redux";

import slide from "./slides";
import modal from "./modal";
import user from "./user";

export default combineReducers({
  slide,
  modal,
  user
});
