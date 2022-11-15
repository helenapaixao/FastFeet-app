import styled, {css} from 'styled-components/native'

interface ContainerProps {
    isFocused: boolean
    isErrored: boolean
}


export const Container = styled.View<ContainerProps>`
    width: 100%;
    height: 60px;
    padding: 0 16px;
   background: #F7F5FA;
    border-radius: 4px;
    margin-bottom: 8px;
    border-width: 2px;
    border-color: #6f6c80;

    flex-direction: row;
    align-items: center;
    
    ${(props: { isErrored: any; }) => props.isErrored && css`
        border-color: #c53030;
    `}

    ${(props: { isFocused: any; }) => props.isFocused && css`
        border-color: #FFC042;
    `}

`;


