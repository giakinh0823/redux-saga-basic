import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, takeEvery } from 'redux-saga/effects';
import { incrementSaga, incrementSagaSuccess } from './counterSlice';

function* handleIncrementSaga(action: PayloadAction<number>) {
    console.log('Waiting 1s');
    yield delay(1000);
    console.log('Waiting done, dispatch action');
    yield put(incrementSagaSuccess(action.payload));
}

export default function* counterSaga() {
    console.log('counterSaga');
    yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
}
