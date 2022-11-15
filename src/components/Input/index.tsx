import React from 'react'
import { View, Text, TextInput, TextInputProps} from 'react-native'
import {Container} from './styles'

interface InputProps {
    label: string;
    text: string;
    onChangeText: (text: string) => void;
}


export default function Input() {

    return (
        <View>
            <Text>Login</Text>
        </View>

        
        
    )
}