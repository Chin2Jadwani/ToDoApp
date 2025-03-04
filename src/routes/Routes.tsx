import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../Screens/Dashboard';
const Stack = createNativeStackNavigator();
const homeScreens = () => {
    return (
        <Stack.Navigator initialRouteName="Dashboard">
            <Stack.Screen
                name="Dashboard"
                options={{ headerShown: false }}
                component={Dashboard}
            />
        </Stack.Navigator>
    );
}
const Routes = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {homeScreens()}
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default Routes