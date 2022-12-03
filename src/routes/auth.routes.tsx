import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../screens/SignIn'
//import SignUp from '../screens/SignUp'
import ForgotPassword from '../screens/ForgotPassword'
//import Dashboard from '../screens/Dashboard'

const Auth = createStackNavigator()

const AuthRoutes: React.FC = () => (
    <Auth.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#312e38' },
        }}
    >
        <Auth.Screen name="SignIn" component={SignIn} />
        <Auth.Screen name="ForgotPassword" component={ForgotPassword} />
    </Auth.Navigator>
)

export default AuthRoutes
