import React, {
  useState,
  useRef,
  useCallback,
  forwardRef,
} from 'react';
import {Container, Icon, Line, TextInput} from './styles'
import {TextInputProps} from 'react-native'


interface InputProps extends TextInputProps{
  name: string;
  icon: string;
  password?: boolean;
  iconPassword?: string;
}

type InputValueReference = {
  value: string;
}

interface InputRef {
  focus(): void;
}


const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({name, icon,password = false, ...rest}) => {
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
      <Icon 
      name={icon} size={20} color={isFocused || isFilled ? '#ff9000' : '#4C33CC'} />
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
