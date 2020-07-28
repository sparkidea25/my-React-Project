import React from 'react';
import {
  Provider
} from 'react-redux';
import {
  PersistGate
} from 'redux-persist/lib/integration/react';

const {
  defaultConfig: {
    VERSION,
  }
} = require(`./config/default`);

const {
  store,
  persistor
} = require(`./redux/store`);

const {
  RootRouter
} = require(`./routes/${VERSION}/root-router`);


function App() {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <RootRouter />
      </Provider>
    </PersistGate>
  );
}

export default App;