import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "models";
import { RootState } from '../../app/store';

export interface DashboardStaticstics {
    maleCount: number;
    femaleCount: number;
    highMarkCount: number;
    lowMarkCount: number;
}

export interface RankingByCity{
    cityId: string;
    rankingList: Student[];
}

export interface DashboardState {
    loading: boolean;
    statstics: DashboardStaticstics;
    highestStudentList: Student[];
    lowStudentList: Student[];
    rankingByCityList: RankingByCity[];
}

const initialState: DashboardState = {
    loading: false,
    statstics: {
        maleCount: 0,
        femaleCount: 0,
        highMarkCount: 0,
        lowMarkCount: 0
    },
    highestStudentList: [],
    lowStudentList: [],
    rankingByCityList: [],
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {
        fetchData(state){
            state.loading = true;
        },
        fetchDataSuccess(state){
            state.loading = false;
        },
        fetchDataFailed(state){
            state.loading = false;
        },

        
        setStaticstics(state, action: PayloadAction<DashboardStaticstics>){
            state.statstics = action.payload;
        },
        setHighestStudentList(state, action: PayloadAction<Student[]>){
            state.highestStudentList = action.payload;
        },
        setLowStudentList(state, action: PayloadAction<Student[]>){
            state.lowStudentList = action.payload;
        },
        setRankingByCityList(state, action: PayloadAction<RankingByCity[]>){
            state.rankingByCityList = action.payload;
        }
    }
});

//Actions
export const dashboardActions = dashboardSlice.actions;
//Selectors
export const selectDashboardStaticstics = (state: RootState) => state.dashboard.statstics;
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectHighestStudentList = (state: RootState) => state.dashboard.highestStudentList;
export const selectLowStudentList = (state: RootState) => state.dashboard.lowStudentList;
export const selectRankingByCityList= (state: RootState) => state.dashboard.rankingByCityList;

//Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
