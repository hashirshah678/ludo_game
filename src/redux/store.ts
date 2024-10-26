import { configureStore } from '@reduxjs/toolkit'
import { reduxStorage } from './storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

const persistConfig = {
    key: "root",
    storage: reduxStorage,
    whitelisr: ['game'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);



export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // @ts-ignore
                ignoreActions: ["persist/FLUSH", "persist/REGISTER","persist/PERSIST", "persist/REHYDRATE", "persist/PAUSE", "persist/PURGE"],
            },
        })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);