import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from "react";

import { useToast } from 'native-base'
import { auth, db } from '../config/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'


type User = {
    id: string;
    email: string;
    name: string;
    cpf: string;
    rg: string;
    birth: {
        nanoseconds: number;
        seconds: number;
    }
    children: string[];
}

type AuthContextData = {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    redefinePassword: (email: string) => Promise<void>;
    user: User | null;
    isLoadingSigIn: boolean;
    isLoadingStorage: boolean;
    isLoadingRedefinePassword: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
}

const USER_COLLECTION = '@uerjTcc:users';

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const toast = useToast();
    const [user, setUser] = useState<User | null>(null)
    const [isLoadingSigIn, setIsLoadingSigIn] = useState(false)
    const [isLoadingStorage, setIsLoadingStorage] = useState(false)
    const [isLoadingRedefinePassword, setIsLoadingRedefinePassword] = useState(false)

    async function loadUserSorageData() {
        setIsLoadingStorage(true)
        try {
            const storedUser = await AsyncStorage.getItem(USER_COLLECTION)
            if (storedUser) {
                let resp = await validateUserUid(JSON.parse(storedUser).id)
                if (!resp.error) {
                    setUser(resp as User)
                } else {
                    console.log('Error: ', resp.error)
                    setUser(null)
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingStorage(false)
        }
    }

    async function validateUserUid(userUid: string) {
        try {
            //const userRef = doc(db, 'users', userUid);
            const userRef = doc(db, "parents", userUid);
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();
                return {
                    id: userSnapshot.id,
                    ...userData
                };
            } else {
                return {
                    error: 'Não existe usuário.' //provavelmente o usuário foi excluído
                };
            }
        } catch (error) {
            console.error('Erro ao validar UID do usuário:', error);
            return {
                error: 'Errro ao se comunicar com o banco de dados.'
            };
        }
    }

    async function signIn(email: string, password: string) {
        toast.closeAll();
        setIsLoadingSigIn(true)
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                //const userRef = doc(db, "users", userCredential.user.uid);
                const userRef = doc(db, "parents", userCredential.user.uid);
                const userSnapshot = await getDoc(userRef);

                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();

                    const updatedUser = {
                        id: userCredential.user.uid,
                        ...userData
                    };
                    await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(updatedUser))
                    setUser(updatedUser as User)

                } else {
                    return toast.show({
                        title: 'Login',
                        description: 'Não foi possivel buscar os dados do perfil do usuário.',
                        placement: 'top',
                        bgColor: 'red.500'
                    })
                }
            })
            .catch((error) => {
                console.log('\n\nERROOO...')
                let errorTitle = 'Login'
                let errorMessage = ''

                if (error.code == 'auth/network-request-failed') {
                    errorMessage = 'Falha de conexão ao se conectar ao banco de dados.'
                }
                else if (error.code == 'auth/user-not-found') {
                    errorMessage = 'Usuário não cadastrado.'
                }
                else if (error.code == 'auth/wrong-password') {
                    errorMessage = 'Senha incorreta.'
                }
                else if (error.code == 'auth/too-many-requests') {
                    errorMessage = 'Tivemos problemas no banco de dados, tente novamente mais tarde.'
                }
                else {
                    error.message = 'Não foi possível realizar o login.'
                }
                console.log(error.code, error.message)
                return toast.show({
                    title: errorTitle,
                    description: errorMessage,
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }).finally(
                () => setIsLoadingSigIn(false)
            )
    }

    async function signOut() {
        await auth.signOut();
        await AsyncStorage.removeItem(USER_COLLECTION);
        setUser(null)
    }

    async function redefinePassword(email: string) {
        toast.closeAll();
        setIsLoadingRedefinePassword(true)

        sendPasswordResetEmail(auth, email)
            .then(() => {
                return toast.show({
                    title: 'Redefinir senha',
                    description: 'E-mail enviado com sucesso, verifica a caixa de entrada.',
                    placement: 'top',
                    bgColor: 'emerald.500'
                })
            })
            .catch((error) => {
                let errorTitle = 'Redefinir senha'
                let errorMessage = ''

                if (error.code == 'auth/network-request-failed') {
                    errorMessage = 'Falha de conexão ao se conectar ao banco de dados.'
                }
                if (error.code == 'auth/invalid-email') {
                    errorMessage = 'E-mail digitado inválido.'
                }
                else if (error.code == 'auth/user-not-found') {
                    errorMessage = 'Usuário não cadastrado.'
                }
                else{
                    errorMessage = 'Não foi possível enviar e-mail para redefinição de senha.'
                }
                console.log(error)
                return toast.show({
                    title: errorTitle,
                    description: errorMessage,
                    placement: 'top',
                    bgColor: 'red.500'
                })
            }).finally(
                () => setIsLoadingRedefinePassword(false)
            );

    }

    useEffect(() => {
        loadUserSorageData();
    }, [])

    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            redefinePassword,
            isLoadingSigIn,
            isLoadingStorage,
            isLoadingRedefinePassword,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}


function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth }