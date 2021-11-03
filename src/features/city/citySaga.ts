import cityApi from "api/cityApi";
import { City, ListResponse } from "models";
import { call, put, takeLatest } from "redux-saga/effects";
import { cityActions } from './citySlice';


function* fetchCityList() {
    try {
        const responsive: ListResponse<City> = yield call(cityApi.getAll)
        yield put(cityActions.fetchCityListSuccess(responsive))
    } catch (error) {
        yield put(cityActions.fetchCityListFailed());
    }
}

export default function* citySaga() {
    yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}