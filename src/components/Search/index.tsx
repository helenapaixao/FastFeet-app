import React, { useState, useRef, useEffect } from 'react';
import { TextInput } from 'react-native';


import { Container, Title, Input, InputContainer, ItemsContainer, Item, ItemText, NoResultsContainer } from './styles';
import Icon from '../Icon';

export interface OptionProps {
  id: string;
  title: string;
}

export interface SearchProps {
  title: string;
  placeholder: string;
  noResultMessage: string;
  searchText: string;
  options: OptionProps[];
  disabled?: boolean;
  onSelectOption: (option: OptionProps) => void;
  onChangeSearchText: (searchText: string) => void;
}

export default function Search({
  title,
  placeholder,
  noResultMessage,
  searchText,
  options,
  disabled,
  onSelectOption,
  onChangeSearchText,
}: SearchProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showItems, setShowItems] = useState(false);

  const inputRef = useRef<TextInput>();

  function renderItem({ title, id }: OptionProps) {
    const textSlited = title.toLowerCase().split(searchText.toLowerCase()).toString().split('');

    return (
      <Item key={id} onPress={() => handleSelectItem({ title, id })}>
        {textSlited.map((char, index) => {
          const isLikeSearchText = char === ',';
          const previousLetter = textSlited[index - 1];
          const isFirstLetter = !index;
          const isUpperCase = isFirstLetter || previousLetter === ' ';

          const textFormated = isLikeSearchText
            ? `${
                isUpperCase
                  ? `${searchText.charAt(0).toUpperCase()}${searchText.slice(1).toLowerCase()}`
                  : searchText.toLowerCase()
              }`
            : `${isUpperCase ? char.toUpperCase() : char.toLowerCase()}`;

          return (
            <ItemText key={char + index} isBold={isLikeSearchText}>
              {textFormated}
            </ItemText>
          );
        })}
      </Item>
    );
  }

  function handleSelectItem({ title, id }: OptionProps) {
    onChangeSearchText(title);
    onSelectOption({ title, id });
    setIsFocused(false);
    inputRef.current.blur();
  }

  function handleOnClose() {
    onChangeSearchText('');
    setIsFocused(false);
    inputRef.current.blur();
    onSelectOption(null);
  }

  useEffect(() => {
    setShowItems(!!searchText && isFocused);
  }, [searchText, isFocused]);

  return (
    <Container isFocused={isFocused && !!options.length}>
      <Title>{title}:</Title>
      <InputContainer
        onStartShouldSetResponder={() => inputRef.current.focus()}
        isFocused={isFocused && !!options.length}
      >
        <Icon
          name="search"
          size="16px"
          color={disabled ? #434 : #545}
          hidden={isFocused}
          onPress={() => inputRef.current.focus()}
        />
        <Input
          editable={!disabled}
          disabled={disabled}
          onChangeText={onChangeSearchText}
          value={searchText}
          ref={inputRef}
          placeholder={placeholder}
          placeholderTextColor={#6554}
          onFocus={() => setIsFocused(true)}
        />
        <Icon name="close" onPress={handleOnClose} size="16px" color={#6554} hidden={!isFocused} />
      </InputContainer>

      {showItems && options && <ItemsContainer>{options.map((item) => renderItem(item))}</ItemsContainer>}
      {showItems && !options.length && (
        <NoResultsContainer>
          <TextInput>{noResultMessage}</TextInput>
        </NoResultsContainer>
      )}
    </Container>
  );
}
