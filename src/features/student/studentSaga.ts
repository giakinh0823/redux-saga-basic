import { PayloadAction } from "@reduxjs/toolkit";
import { studentActions } from "./studentSlice";
import { ListParams, ListResponse, Student } from 'models';
import { call, put, takeLatest } from "redux-saga/effects";
import studentApi from "api/productApi";




function* fetchStudentList(action: PayloadAction<ListParams>){
    try {
        const responsive: ListResponse<Student>= yield call(studentApi.getAll, action.payload);
        yield put(studentActions.fetchStudentListSuccess(responsive));
    } catch (error: any) {
        yield put(studentActions.fetchStudentListFailed());
    }
}



export default function* studentSaga() {
    //watch fetch student action
    yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);
}