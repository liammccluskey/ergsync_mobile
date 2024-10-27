import React from 'react'
import { Provider } from './node_modules/react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/store'

import { AuthContainer } from './src/containers/AuthContainer'
import {RootScreen} from './AppNavigator' // Your main navigation component

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthContainer />
      </PersistGate>
    </Provider>
  )
}
