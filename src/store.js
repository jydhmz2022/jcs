import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; 
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import languageReducer from "./slices/languageSlice"

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  whitelist: [ "language"],
};

const rootReducer = combineReducers({
  language: languageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);









// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage"; 

// import languageReducer from "./slices/languageSlice";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
//   whitelist: ["user", "language"],
// };

// const rootReducer = combineReducers({
//   language: languageReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });

// const persistor = persistStore(store);

// export { store, persistor };



// import { configureStore } from "@reduxjs/toolkit";
// import languageReducer from "./slices/languageSlice";

// const store = configureStore({
//   reducer: {
//     language: languageReducer,
//   },
// });

// export default store;

