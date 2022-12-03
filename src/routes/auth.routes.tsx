import React from 'react'

import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login'
import ForgotPassword from '../screens/ForgotPassword'

const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false
        }
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            headerShown: false
        }
    }
})

export default AuthStack
