import React, {} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
    token: string;
    user: object;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    loading: boolean;
  }


const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
    const [data, setData] = React.useState<AuthState>({} as AuthState);

    React.useEffect(() => {
        async function loadStorageData(): Promise<void> {
            const [token, user] = await AsyncStorage.multiGet([
                '@FastFeet:token',
                '@FastFeet:user',
            ]);

            if (token[1] && user[1]) {
                setData({token: token[1], user: JSON.parse(user[1])});
            }
        }

        loadStorageData();
    }, []);

    const signIn = React.useCallback(async ({email, password}: SignInCredentials) => {
        const response = await fetch('http://localhost:3333/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const {token, user} = await response.json();

        await AsyncStorage.multiSet([
            ['@FastFeet:token', token],
            ['@FastFeet:user', JSON.stringify(user)],
        ]);

        setData({token, user});
    }, []);

    const signOut = React.useCallback(async () => {
        await AsyncStorage.multiRemove(['@FastFeet:token', '@FastFeet:user']);

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{user: data.user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export {AuthProvider, useAuth};

// Path: src/hooks/index.tsx



