import React, { useEffect } from 'react'
import Routes from './src/routes/Routes'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import PushNotification, { Importance } from 'react-native-push-notification';


Ionicons.loadFont().catch(error => {
  console.info(error);
});
const App = () => {
  const scheme = useColorScheme();
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: "task-channel",
        channelName: "Task Notifications",
        channelDescription: 'A channel to show your notifications',
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      created => { },
    );
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  )
}

export default App