import { useState, useEffect } from 'react'
import { Text, VStack, Box } from "native-base";

import { useNavigation } from '@react-navigation/native'

import { Button } from "@components/Button";
import { HeaderHome } from "@components/HeaderHome";

import { useAuth } from '@hooks/auth';


export function Home() {
    const navigation = useNavigation();
    const { user } = useAuth()


    return (
        <>
            <HeaderHome
                nameUser={user!.name.split(" ")[0]}
                nameSchool='Colegio X'
            />

            <VStack mt={10} flex={1} px={12} pb={16}>

                <VStack>
                    <Text
                        fontFamily={'heading'}
                        fontSize={'2xl'}
                    >Carteirinhas</Text>
                </VStack>

                <VStack>
                    <Text
                        fontFamily={'heading'}
                        fontSize={'2xl'}
                    >Menu</Text>
                </VStack>

            </VStack>
        </>
    );
}