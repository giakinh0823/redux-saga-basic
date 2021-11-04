import { all, call, put, takeLatest } from 'redux-saga/effects';
import { dashboardActions, RankingByCity } from './dashboardSlice';
import { City, ListResponse, Student } from 'models';
import studentApi from 'api/studentApi';
import cityApi from 'api/cityApi';

function* fetchStaticstics() {
    const responseList: Array<ListResponse<Student>> = yield all([
        call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
        call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
        call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
        call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 })
    ]);

    const staticsticList = responseList.map(x => x.pagination._totalRows)
    const [maleCount, femaleCount, highMarkCount, lowMarkCount] = staticsticList
    yield put(dashboardActions.setStaticstics({maleCount, femaleCount, highMarkCount, lowMarkCount}))
}

function* fetchHighestStudentList() {
    const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'desc',
    });

    yield put(dashboardActions.setHighestStudentList(data));
}

function* fetchLowStudentList() {
    const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: 'mark',
        _order: 'asc',
    });

    yield put(dashboardActions.setLowStudentList(data));
}

function* fetchRankingByCityList() {
    //Fetch city list - lấy data từ api rồi đặt tên cho nó là cityList
    const {data: cityList}: ListResponse<City> = yield call(cityApi.getAll);
    //Fetch per city list
    const callList = cityList.map(city => 
        call(studentApi.getAll, {_page: 1, _limit: 5, city: city.code})
    );

    const responseList: Array<ListResponse<Student>> = yield all(callList);
    const rankingByCityList: Array<RankingByCity> = responseList.map((response, index) => {
        return {
            cityName: cityList[index].name,
            cityId: cityList[index].code,
            rankingList: response.data
        }
    })
    //Update state
    yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}

function* fetchDashboarData() {
    try {
        yield all([
            call(fetchStaticstics),
            call(fetchHighestStudentList),
            call(fetchLowStudentList),
            call(fetchRankingByCityList),
        ]);
        yield put(dashboardActions.fetchDataSuccess());
    } catch (error: any) {
        console.log(error.message);
        yield put(dashboardActions.fetchDataFailed());
    }
}

export default function* dashboardSaga() {
    yield takeLatest(dashboardActions.fetchData.type, fetchDashboarData);
}
