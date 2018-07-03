import { call, put, select } from "redux-saga/effects";
import api from "../../services/api";

import { Creators as UserActions } from "../ducks/users";

export function* addUser(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.repository}`);

    const isDuplicated = yield select(state =>
      state.users.data.find(user => user.id === data.id)
    );

    if (isDuplicated) {
      yield put(UserActions.addUserFailure("Repositório duplicado!"));
    } else {
      const repositoryData = {
        id: data.id,
        name: data.full_name,
        description: data.description,
        url: data.html_url
      };

      yield put(UserActions.addUserSuccess(repositoryData));
    }
  } catch (error) {
    yield put(UserActions.addUserFailure("Erro ao adicionar repositório!"));
  }
}
