import { Text, VStack } from "native-base";

import { useNavigation } from '@react-navigation/native'

import { Button } from "@components/Button";

import { useAuth } from '@hooks/auth';


export function Home() {
    const navigation = useNavigation();
    const { signOut } = useAuth()



    function handleSignOut(){
        console.log('Saindo do app...')
        signOut()
    }

    return (
        <VStack mt={10} flex={1} px={12} pb={16} alignItems='center' justifyContent='center'>
            <Text>Home</Text>
            <Button
                title='Sair'
                mt={10}
                onPress={handleSignOut}
            />
        </VStack>
    );
}