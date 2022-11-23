import React from 'react'
import {Image} from 'react-native'
import { Container } from './styles'
import Logo from '../../assets/logo.png'
import TextLogo from '../../assets/logo_text.png'
 


export default function Header() {
  return (
    <Container>
        <Image source={
            Logo
        } />
        <Image source={
            TextLogo
        } />
    </Container>

  )
}

