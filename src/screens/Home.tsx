import { useState, useEffect } from 'react'
import { Text, VStack, Box, HStack, Avatar, ScrollView, Pressable } from "native-base";

import { useNavigation } from '@react-navigation/native'

import { Button } from "@components/Button";
import { HeaderHome } from "@components/HeaderHome";

import { useAuth } from '@hooks/auth';


export function Home() {
    const navigation = useNavigation();
    const { user } = useAuth()
    const school = 'Coégio X'

    const children = [
        {
            name: 'Maria Laura da Silva Oliveira',
            birth: '02/09/2010',
            registration: '1713332034',
            bloodType: 'O+',
            photograph: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        },
        {
            name: 'Pedro Henrique da Silva Oliveira',
            birth: '12/09/1997',
            registration: '1913332134',
            bloodType: 'A+',
            photograph: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        },
        {
            name: 'Luíz Fellipe Oliveira',
            birth: '12/09/1997',
            registration: '1724442134',
            bloodType: 'A+',
            photograph: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        },
    ]

    //tratamento do nome da carteirinha
    /*      
    function formatName(fullName: string): string {
        const names = fullName.split(" ");
        const firstName = names[0];
        let lastName = names[names.length - 1];

        if (lastName.length > 10) {
            lastName = lastName.substring(0, 1) + ".";
        }

        return firstName + " " + lastName;
    }

    const nome1 = "Ana Maria de Silva";
    const nome2 = "Pedro Henrique de Sousa";
    const nome3 = "Luiz Fellipe de Almeda";

    console.log(formatName(nome1)); // Output: Ana Maria
    console.log(formatName(nome2)); // Output: Pedro H.
    console.log(formatName(nome3)); // Output: Luiz Fellipe
    */

    useEffect(()=>{

    },[])

    return (
        <>
            <HeaderHome
                nameUser={user!.name.split(" ")[0]}
                nameSchool={school}
            />

            <VStack mt={10} flex={1} px={7} pb={16}>

                <VStack>
                    <Text
                        fontFamily={'heading'}
                        fontSize={'2xl'}
                        mb={5}
                    >Carteirinhas</Text>

                    <ScrollView
                        h={110}
                        //bg={'pink.100'}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            children.map((item, index) => (
                                <Pressable
                                    width={190}
                                    height={100}
                                    bg={'white'}
                                    rounded={10}
                                    shadow={7}
                                    mt={1}
                                    ml={2}
                                    mr={2}
                                    key={index}
                                >
                                    <HStack h={'full'}>

                                        <VStack w={'60%'} p={3} justifyContent={'center'}>
                                            <Text
                                                fontFamily={'heading'}
                                                fontSize={'md'}
                                            >{item.name.split(" ")[0] + '\n' + item.name.split(" ")[1]}</Text>
                                            <Text
                                                fontFamily={'body'}
                                                color={'gray.500'}
                                            >{item.registration}</Text>

                                        </VStack>

                                        <VStack w={'40%'} /* bg={'green.100'} w={'30%'} */
                                            justifyContent={'center'}
                                            alignItems={'center'}
                                        >

                                            <Avatar bg="gray.500" size={'lg'} shadow={7} source={{
                                                uri: item.photograph
                                            }}>
                                                ...
                                            </Avatar>

                                        </VStack>

                                    </HStack>
                                </Pressable>
                            ))
                        }



                    </ScrollView>
                </VStack>

                <VStack mt={7}>
                    <Text
                        fontFamily={'heading'}
                        fontSize={'2xl'}
                    >Menu</Text>
                </VStack>


                <Button
                    title='Teste'
                    mt={10}
                //onPress={handleSignOut}
                />
            </VStack>
        </>
    );
}