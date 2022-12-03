
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import SignIn from '../screens/ForgotPassword';
import ForgotPassword from '../screens/ForgotPassword';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
    <NavigationContainer>
        <App.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {backgroundColor: '#312e38'},
            }}
        >
            <App.Screen name="SignIn" component={SignIn} />
            <App.Screen name="ForgotPassword" component={ForgotPassword} />
        </App.Navigator>
    </NavigationContainer>
);

export default AppRoutes;