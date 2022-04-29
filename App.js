//---------- Imports

// react
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

// redux
import { Provider } from 'react-redux';

// store
import { Store } from './src/Redux/Store/Store';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Navigation/Navigation'

//---------- component

const App = () => {

  //---------- state and veriable

  //---------- life cycles

  //---------- helper : render

  //---------- helper : user's action

  //---------- main view

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={'#000'} />
      <NavigationContainer>
        <Provider store={Store}>
          <Navigation />
        </Provider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

//---------- export component

export default App;
