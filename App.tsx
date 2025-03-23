import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from '~redux/store';
import AppRouters from '~navigators/AppRouters';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize'

const App = () => {

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <StatusBar
            barStyle='dark-content'
            backgroundColor={'transparent'}
            translucent
          />
          <Host>
            <NavigationContainer>
              <AppRouters />
            </NavigationContainer>
          </Host>
        </Provider>
      </GestureHandlerRootView>
    </>
  )
}

export default App