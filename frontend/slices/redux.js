import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

// Initial states
const initialRequestTabState = false;
const initialAssetTabState = false;
const initialHistoryRequestTabState = false;
const initialUserTabState = false;
const initialPlanTabState = false;
const initialDashboardTabState = false;
const initialUserInfoState = {
  _id: '',
  email: '',
  role: '',
  name: '',
  password: '',
  position: '',
  department: ''
};
const initialLoggedInState = false;

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

const historyRequestTabSlice = createSlice({
  name: 'historyRequestTab',
  initialState: initialHistoryRequestTabState,
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

const logInSlice = createSlice({
  name: 'loginState',
  initialState: initialLoggedInState,
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
      state.department = payload.department;
      state.position = payload.position;
      state.password = payload.password;
    },
    clearUserInfo: (state) => {
      state._id = '';
      state.email = '';
      state.role = '';
      state.name = '';
      state.department = '';
      state.position = '';
      state.password = '';
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
  setActive: setActiveHistoryReuqestTab,
} = historyRequestTabSlice.actions;

export const {
  setActive: setActiveUserTab,
} = userTabSlice.actions;

export const {
  setActive: setActiveDashboardTab,
} = dashboardTabSlice.actions;

export const {
  setActive: setActivePlanTab,
} = planTabSlice.actions;

export const {
  setActive: setActiveLoggedIn,
} = planTabSlice.actions;

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;

// Export selectors
export const getRequestTab = (state) => state?.requestTab;
export const getAssetTab = (state) => state?.assetTab;
export const getHistoryReuqestTab = (state) => state?.historyRequestTab;
export const getUserTab = (state) => state?.userTab;
export const getDashboardTab = (state) => state?.dashboardTab;
export const getPlanTab = (state) => state?.planTab;
export const getLoggedIn = (state) => state?.logInState;
export const getUserInfo = (state) => state?.userInfo;

export const getUserInfoId = createSelector(getUserInfo, (state) => state._id);
export const getUserInfoEmail = createSelector(getUserInfo, (state) => state.email);
export const getUserInfoRole = createSelector(getUserInfo, (state) => state.role);
export const getUserInfoName = createSelector(getUserInfo, (state) => state.name);
export const getUserInfoPassword = createSelector(getUserInfo, (state) => state.password);
export const getUserInfoDepartment = createSelector(getUserInfo, (state) => state.department);
export const getUserInfoPosition = createSelector(getUserInfo, (state) => state.position);

// Export reducers
export const requestTabReducer = requestTabSlice.reducer;
export const assetTabReducer = assetTabSlice.reducer;
export const historyRequestTabReducer = historyRequestTabSlice.reducer;
export const userTabReducer = userTabSlice.reducer;
export const dashboardTabReducer = dashboardTabSlice.reducer;
export const planTabReducer = planTabSlice.reducer;
export const logInReducer = logInSlice.reducer;
export const userInfoReducer = userInfoSlice.reducer;
