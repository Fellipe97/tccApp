import { useState, useEffect } from 'react'
import {
    Text,
    VStack,
    Box,
    HStack,
    Avatar,
    ScrollView,
    Pressable,
    Center,
    Actionsheet,
    useDisclose,
    KeyboardAvoidingView,
    useToast
} from "native-base";


import { useNavigation } from '@react-navigation/native'

import { Button } from "@components/Button";
import { HeaderHome } from "@components/HeaderHome";
import { ButtonCardMenu } from "@components/ButtonCardMenu";

import IconeFrequencia from "@assets/iconeFrequencia.svg"
import IconeNotas from "@assets/iconeNotas.svg"
import IconeComunicados from "@assets/iconeComunicados.svg"
import IconeFinanceiro from "@assets/iconeFinanceiro.svg"

import { useAuth } from '@hooks/auth';
import { ButtonGhost } from '@components/ButtonGhost';

import { StyleSheet } from 'react-native';
import LogoSvg from '@assets/logo.svg'



type propsChildren = {
    name: string;
    birth: string;
    registration: string;
    bloodType: string;
    photograph: string;
}

export function Home() {
    const navigation = useNavigation();
    const { user } = useAuth()
    const school = 'Colégio X'

    const { isOpen, onOpen, onClose } = useDisclose();
    const [childrenSelected, setChildrenSelected] = useState<propsChildren | null>(null)


    const children: propsChildren[] = [
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

    useEffect(() => {

    }, [])

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
                                    ml={2}
                                    mr={2}
                                    key={index}
                                    _pressed={{
                                        opacity: .7
                                    }}
                                    onPress={() => {
                                        console.log('\nCliquei no aluno: ', { item })
                                        setChildrenSelected(item)
                                        onOpen()
                                    }}
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
                        mb={5}
                    >Menu</Text>

                    <HStack justifyContent={'space-between'} mb={5}>
                        <ButtonCardMenu
                            title='Frequência'
                            color={'blueButton'}
                            icone={<IconeFrequencia />}
                            onPress={() => console.log('cliquei Frequência')}
                        />
                        <ButtonCardMenu
                            title='Notas'
                            color={'redButton'}
                            icone={<IconeNotas />}
                            onPress={() => console.log('cliquei Notas')}
                        />
                    </HStack>
                    <HStack justifyContent={'space-between'}>
                        <ButtonCardMenu
                            title='Comunicados'
                            color={'orangeButton'}
                            icone={<IconeComunicados />}
                            onPress={() => console.log('cliquei Comunicados')}
                        />
                        <ButtonCardMenu
                            title='Financeiro'
                            color={'greenButton'}
                            icone={<IconeFinanceiro />}
                            onPress={() => console.log('cliquei Financeiro')}
                        />
                    </HStack>
                </VStack>

            </VStack>

            {/* Pop up carteirinha */}
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <KeyboardAvoidingView
                    behavior="padding"
                    w={'100%'}
                >
                    <Actionsheet.Content>
                        <VStack px={9} mt={2} mb={5} w={'100%'} h={'90%'} alignItems='center'>

                            <HStack
                                justifyContent={'center'}
                                alignItems={'center'}
                                h={50}
                                mb={3}
                            >
                                <LogoSvg width={'50px'} height={'50px'} style={{marginRight:1}}/>
                                <Text color='purple.600' fontFamily='heading' fontSize='2xl'  ml={1}>
                                    {school}
                                </Text>
                            </HStack>

                            <VStack flex={1} alignItems={'center'}>


                                <Avatar bg="gray.500" size={'2xl'} shadow={7} mb={5} source={{
                                    uri: childrenSelected?.photograph
                                }}>
                                    ...
                                </Avatar>


                                <Text>{childrenSelected?.name}</Text>
                                <Text>{childrenSelected?.birth}</Text>
                                <Text>{childrenSelected?.bloodType}</Text>
                                <Text>{childrenSelected?.photograph}</Text>
                                <Text>{childrenSelected?.registration}</Text>
                            </VStack>

                            <Button
                                title='Download em PDF'
                                //mt={3}
                                mb={5}
                                onPress={() => {
                                    console.log('fazendo o download')
                                    onClose()
                                }}
                            //isLoading={isLoadingRedefinePassword}
                            />
                            <ButtonGhost
                                title='Cancelar'
                                colorButton='cancel'
                                onPress={onClose}
                            />
                        </VStack>
                    </Actionsheet.Content>
                </KeyboardAvoidingView>
            </Actionsheet >

        </>
    );
}