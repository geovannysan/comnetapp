// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import reducers from './reducers';
import { api } from './reducers/fetchBaseQuery ';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(api.middleware),
});

const { dispatch } = store;

export { store, dispatch };
