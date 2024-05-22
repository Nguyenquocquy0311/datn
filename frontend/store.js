import { configureStore } from '@reduxjs/toolkit';
import {
  requestTabReducer,
  assetTabReducer,
  userTabReducer,
  planTabReducer,
  userInfoReducer,
  dashboardTabReducer,
  logInReducer,
  historyRequestTabReducer
} from './slices/redux';

const store = configureStore({
  reducer: {
    requestTab: requestTabReducer,
    assetTab: assetTabReducer,
    userTab: userTabReducer,
    planTab: planTabReducer,
    dashboardTab: dashboardTabReducer,
    historyRequestTab: historyRequestTabReducer,
    userInfo: userInfoReducer,
    loginState: logInReducer
  },
});

export default store;
