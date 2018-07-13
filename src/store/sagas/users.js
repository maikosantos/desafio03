import { call, put, select } from "redux-saga/effects";
import api from "../../services/api";

import { Creators as UserActions } from "../ducks/users";

export function* addUser(action) {
  try {
    //const { data } = yield call(api.get, `/users/${action.payload.repository}`);

    const { data } = yield call(
      api
        .get(`/users/${action.payload.repository}`)
        .then(response => this.getSuccessful(response))
        .catch(error => this.getFailed(error))
    );

    /*

        axios.post('/formulas/create', {
          name: "",
          parts: ""
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
            console.log(error)
        });


    */

    const isDuplicated = yield select(state =>
      state.users.data.find(user => user.id === data.id)
    );

    if (isDuplicated) {
      yield put(UserActions.addUserFailure("Usuário duplicado!"));
    } else {
      const repositoryData = {
        id: data.id,
        name: data.name,
        login: data.login,
        avatar: data.avatar_url,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude
      };

      yield put(UserActions.addUserSuccess(repositoryData));
    }
  } catch (error) {
    yield put(UserActions.addUserFailure("Erro ao adicionar repositório!"));
  }
}

export function* removeUser(action) {
  try {
    yield put(UserActions.removeUserRequest(action.payload.id));
  } catch (error) {
    //yield put(UserActions.removeUserFailure("Erro ao remover repositório!"));
  }
}
