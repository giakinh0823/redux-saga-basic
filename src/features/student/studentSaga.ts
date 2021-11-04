import { PayloadAction } from "@reduxjs/toolkit";
import { studentActions } from "./studentSlice";
import { ListParams, ListResponse, Student } from 'models';
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import studentApi from "api/studentApi";




function* fetchStudentList(action: PayloadAction<ListParams>){
    try {
        const responsive: ListResponse<Student>= yield call(studentApi.getAll, action.payload);
        yield put(studentActions.fetchStudentListSuccess(responsive));
    } catch (error: any) {
        yield put(studentActions.fetchStudentListFailed());
    }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>){
    yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
    //watch fetch student action
    yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);

    yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchDebounce);
}