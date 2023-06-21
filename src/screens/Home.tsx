import { Text, VStack, Box } from "native-base";

import { useNavigation } from '@react-navigation/native'

import { Button } from "@components/Button";

import { useAuth } from '@hooks/auth';


export function Home() {
    const navigation = useNavigation();
    const { signOut } = useAuth()



    function handleSignOut() {
        console.log('Saindo do app...')
        signOut()
    }

    return (
        <>
            <VStack
                w={'100%'}
                height={32}
                justifyContent={'flex-end'}
                alignItems={'center'}
                bg={{
                    linearGradient: {
                        colors: ['purple.600', 'purple.700'],
                        start: [0, 0],
                        end: [0, 1]
                    }
                }}
                shadow={7}
            >
                <Text mt={2} fontSize={'xl'} bold color={'gray.100'}>Bom dia, Fellipe</Text>
                <Text fontSize={'md'} color={'gray.200'} mb={4} mt={1}>Colegio X</Text>
            </VStack>
            <VStack mt={10} flex={1} px={12} pb={16}>

                <Text>Home</Text>
                <Button
                    title='Sair'
                    mt={10}
                    onPress={handleSignOut}
                />
            </VStack>
        </>
    );
}