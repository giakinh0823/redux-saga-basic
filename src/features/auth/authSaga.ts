import { call, delay, fork, put, take } from 'redux-saga/effects';
import { LogginPayload, authActions } from './authSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';

function* handleLogin(payload: LogginPayload) {
    try {
        yield delay(1000);
        localStorage.setItem('access_token', 'fake_token');
        yield put(
            authActions.loginSuccess({
                id: 1,
                name: 'Gia Kính',
            })
        );
        yield put(push('/admin/dashboard'));
    } catch (error: any) {
        yield put(authActions.loginFailed(error.message));
    }
}

function* handleLogout() {
    yield delay(500);
    localStorage.removeItem('access_token');
    yield put(push('/login'));
}

function* watchLoginFlow() {
    while (true) {
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));
        if (!isLoggedIn) {
            //lắng nghe login. đứng đây đợi chờ login.. logout không ảnh hưởng
            const action: PayloadAction<LogginPayload> = yield take(authActions.login.type);
            //xử lý login
            yield fork(handleLogin, action.payload);
        }
        //Khi đã login thì đừng đây đợi lắng nghe logout
        yield take(authActions.logout.type);
        //xử lý logout
        yield call(handleLogout);
    }
}

export default function* authSaga() {
    yield fork(watchLoginFlow);
}
