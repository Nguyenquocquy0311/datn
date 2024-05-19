import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

// Initial states
const initialRequestTabState = false;
const initialAssetTabState = false;
const initialUserTabState = false;
const initialPlanTabState = false;
const initialDashboardTabState = false;
const initialUserInfoState = {
  _id: '',
  email: 'quy@gmail.com',
  role: 'manager',
  name: '',
  password: '',
  position: '',
  department: ''
};

// Slices
const requestTabSlice = createSlice({
  name: 'requestTab',
  initialState: initialRequestTabState,
  reducers: {
    setActive: (state, { payload }) => payload,
  },
});

const assetTabSlice = createSlice({
  name: 'assetTab',
  initialState: initialAssetTabState,
  reducers: {
    setActive: (state, { payload }) => payload,
  },
});

const userTabSlice = createSlice({
  name: 'userTab',
  initialState: initialUserTabState,
  reducers: {
    setActive: (state, { payload }) => payload,
  },
});

const dashboardTabSlice = createSlice({
  name: 'dashboardTab',
  initialState: initialDashboardTabState,
  reducers: {
    setActive: (state, { payload }) => payload,
  },
});

const planTabSlice = createSlice({
  name: 'planTab',
  initialState: initialPlanTabState,
  reducers: {
    setActive: (state, { payload }) => payload,
  },
});

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialUserInfoState,  // Fix this line
  reducers: {
    setUserInfo: (state, { payload }) => {
      state._id = payload._id;
      state.email = payload.email;
      state.role = payload.role;
      state.name = payload.name;
    },
    clearUserInfo: (state) => {
      state._id = '';
      state.email = '';
      state.role = '';
      state.name = '';
    },
  },
});

// Export actions
export const {
  setActive: setActiveRequestTab,
} = requestTabSlice.actions;

export const {
  setActive: setActiveAssetTab,
} = assetTabSlice.actions;

export const {
  setActive: setActiveUserTab,
} = userTabSlice.actions;

export const {
  setActive: setActiveDashboardTab,
} = dashboardTabSlice.actions;

export const {
  setActive: setActivePlanTab,
} = planTabSlice.actions;

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;

// Export selectors
export const getRequestTab = (state) => state?.requestTab;
export const getAssetTab = (state) => state?.assetTab;
export const getUserTab = (state) => state?.userTab;
export const getDashboardTab = (state) => state?.dashboardTab;
export const getPlanTab = (state) => state?.planTab;
export const getUserInfo = (state) => state?.userInfo;

export const getUserInfoId = createSelector(getUserInfo, (state) => state._id);
export const getUserInfoEmail = createSelector(getUserInfo, (state) => state.email);
export const getUserInfoRole = createSelector(getUserInfo, (state) => state.role);
export const getUserInfoName = createSelector(getUserInfo, (state) => state.name);

// Export reducers
export const requestTabReducer = requestTabSlice.reducer;
export const assetTabReducer = assetTabSlice.reducer;
export const userTabReducer = userTabSlice.reducer;
export const dashboardTabReducer = dashboardTabSlice.reducer;
export const planTabReducer = planTabSlice.reducer;
export const userInfoReducer = userInfoSlice.reducer;
