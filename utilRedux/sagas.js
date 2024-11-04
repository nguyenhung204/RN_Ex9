// sagas.js
import { call, put, takeEvery } from 'redux-saga/effects';
import { CREATE_TASK_REQUEST, createTaskFailure, createTaskSuccess, DELETE_TASK_REQUEST, deleteTaskFailure, deleteTaskSuccess, FETCH_DATA_REQUEST, fetchDataFailure, fetchDataSuccess, UPDATE_TASK_REQUEST, updateTaskFailure, updateTaskSuccess } from './action';


function* fetchDataSaga() {
  try {
    const response = yield call(fetch, 'https://671891927fc4c5ff8f49fcac.mockapi.io/test');
    const data = yield response.json();
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error.message));
  }
}

function* createTaskSaga(action) {
    try {
      const response = yield call(fetch, 'https://671891927fc4c5ff8f49fcac.mockapi.io/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload),
      });
      const data = yield response.json();
      yield put(createTaskSuccess(data));
    } catch (error) {
      yield put(createTaskFailure(error.message));
    }
  }

function* updateTaskSaga(action) {
    try {
      const response = yield call(fetch, `https://671891927fc4c5ff8f49fcac.mockapi.io/test/${action.payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload),
      });
      const data = yield response.json();
      yield put(updateTaskSuccess(data));
    } catch (error) {
      yield put(updateTaskFailure(error.message));
    }
  }
  
  function* deleteTaskSaga(action) {
    try {
      yield call(fetch, `https://671891927fc4c5ff8f49fcac.mockapi.io/test/${action.payload}`, {
        method: 'DELETE',
      });
      yield put(deleteTaskSuccess(action.payload));
    } catch (error) {
      yield put(deleteTaskFailure(error.message));
    }
  }

function* rootSaga() {
  yield takeEvery(FETCH_DATA_REQUEST, fetchDataSaga);
    yield takeEvery(CREATE_TASK_REQUEST, createTaskSaga);
    yield takeEvery(UPDATE_TASK_REQUEST, updateTaskSaga);
    yield takeEvery(DELETE_TASK_REQUEST, deleteTaskSaga);
}

export default rootSaga;