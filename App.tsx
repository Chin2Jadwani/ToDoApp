import React from 'react'
import Routes from './src/routes/Routes'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';

Ionicons.loadFont().catch(error => {
  console.info(error);
});
const App = () => {
  const scheme = useColorScheme()
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: scheme === 'dark' ? '#1B2A41' : '#E3F2FD',
        }}>
        <StatusBar
          animated={true}
          backgroundColor={scheme === 'dark' ? '#1B2A41' : '#E3F2FD'}
          barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
          showHideTransition={'fade'}
          hidden={false}
        />
        <Routes />
      </SafeAreaView>
    </>
  )
}

export default App