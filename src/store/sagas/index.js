import { all, takeLatest } from "redux-saga/effects";

import { Types as UsersTypes } from "../ducks/users";
import { addUser, removeUser } from "./users";

export default function* rootSaga() {
  yield all([takeLatest(UsersTypes.ADD_REQUEST, addUser)]);
  yield all([takeLatest(UsersTypes.REMOVE_REQUEST, removeUser)]);
}
