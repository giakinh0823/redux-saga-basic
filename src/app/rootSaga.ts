import counterSaga from '../features/counter/counterSaga';
import { all, delay } from 'redux-saga/effects';

function* helloSaga() {
  console.log('Hello Sagas!');
  yield delay(1000)
}

export default function* rootSaga() {
    console.log('rootSaga');
    yield all([helloSaga(), counterSaga()]);
}