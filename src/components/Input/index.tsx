import React, { InputHTMLAttributes, useRef, useCallback, useState} from "react";
import { View, Text, TextInputProps } from "react-native";
import { Container, Line, TextInput } from "./styles";



interface InputProps extends TextInputProps {
  name: string;

}

export default function Input({ name,  ...rest }: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!inputRef.current?.value);
    }, []);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);


  return (
    <Container >
   
      <Line />
      <TextInput 
    

        {...rest}

      />

    </Container>
  );
}
