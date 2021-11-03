import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, ListResponse } from 'models';
import { RootState } from '../../app/store';

export interface CityState {
    loading: boolean;
    list: City[];
}

const initialState: CityState = {
    loading: false,
    list: [],
};

const citySlice = createSlice({
    name: 'city',
    initialState: initialState,
    reducers: {
        fetchCityList(state) {
            state.loading = true;
        },
        fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
            state.list = action.payload.data;
            state.loading = false;
        },
        fetchCityListFailed(state) {
            state.loading = false;
        },
    },
});

//Actions
export const cityActions = citySlice.actions;
//Selectors
export const selecCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selecCityList, (cityList) => 
    cityList.reduce((map: { [key: string]: City }, city: City) => {
        map[city.code] = city;
        return map;
    }, {})
);

//Reducers
const cityReducer = citySlice.reducer;
export default cityReducer;
