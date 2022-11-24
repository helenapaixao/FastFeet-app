import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {Container, Icon, Line, TextInput} from './styles'
import {TextInputProps} from 'react-native'


interface InputProps extends TextInputProps{
  name: string;
  icon: string;
}

type InputValueReference = {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({name, icon, ...rest}, refsd) => {
  const inputElementRef = useRef<InputValueReference>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputElementRef.current?.value);
  }, []);

  return (
    <Container 
    isErrored={isFocused}
    isFocused={isFocused}>
      <Icon name={icon} size={20} color={isFocused || isFilled ? '#ff9000' : '#4C33CC'} />
      <Line />
      <TextInput      
        ref={inputElementRef}
        name={name}
        icon={icon}
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </Container>
  );
};

export default forwardRef(Input);

// Path: src/components/input/styles.ts
// Compare this snippet from src/components/Header/styles.ts:
// import styled from 'styled-components/native'
// import {RectButton} from 'react-native-gesture-handler'
//
// export const Container = styled.View`
//   flex: 1;
