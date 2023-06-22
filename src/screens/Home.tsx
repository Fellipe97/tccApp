import {useState, useEffect} from 'react'
import { Text, VStack, Box } from "native-base";

import { useNavigation } from '@react-navigation/native'

import { Button } from "@components/Button";
import { HeaderHome } from "@components/HeaderHome";

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
            <HeaderHome
                nameUser='Fellipe'
                nameSchool='Colegio X'
            />

            <VStack mt={10} flex={1} px={12} pb={16}>

                <Button
                    title='Sair'
                    mt={10}
                    onPress={handleSignOut}
                />
            </VStack>
        </>
    );
}