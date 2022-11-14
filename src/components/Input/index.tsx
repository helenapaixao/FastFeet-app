import React from 'react'
import { View, Text } from 'react-native'
import {Container} from './styles'

interface InputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
}


export default function Input() {

    return (
        <Container
            placeholder="Email"
            placeholderTextColor="#6F6C80"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={() => {}}
        />
        
    )
}