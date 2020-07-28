import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import {
    persistStore,
    persistReducer
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import dataSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();


const composeEnhancers =
    (process.env.NODE_ENV === "development" ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
        null) || compose;

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['CommonReducer']
}
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...[sagaMiddleware])));
export const persistor = persistStore(store);
sagaMiddleware.run(dataSaga);