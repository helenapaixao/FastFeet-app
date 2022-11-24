import React from 'react'
import {Image} from 'react-native'
import { Container,Text,Content } from './styles'
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
        <Content>
        <Text>
        Faça seu login para
        começar suas entregas.
        </Text>
        </Content>
      
    </Container>

  )
}

