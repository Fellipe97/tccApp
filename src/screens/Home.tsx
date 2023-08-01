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
    useToast,
    FlatList
} from "native-base";
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'


import { StackAuthNavigatorRoutesProps } from '@routes/stackApp.routes'
import { useNavigation } from '@react-navigation/native'

import { Button } from "@components/Button";
import { HeaderHome } from "@components/HeaderHome";
import { ButtonCardMenu } from "@components/ButtonCardMenu";
import { ButtonGhost } from '@components/ButtonGhost';
import { ScrollViewChildren } from '@components/ScrollViewChildren';


import IconeFrequencia from "@assets/iconeFrequencia.svg"
import IconeNotas from "@assets/iconeNotas.svg"
import IconeComunicados from "@assets/iconeComunicados.svg"
import IconeFinanceiro from "@assets/iconeFinanceiro.svg"
import LogoSvg from '@assets/logo.svg'

import { useAuth } from '@hooks/auth';

import Api from '../helpers/Api';

import { childrenProps } from '../types/children'




export function Home() {
    const api = Api();
    const navigation = useNavigation<StackAuthNavigatorRoutesProps>();
    const { user } = useAuth()
    const school = 'Colégio X'

    const { isOpen, onOpen, onClose } = useDisclose();
    const [children, setChildren] = useState<childrenProps[] | null>(null)
    const [childrenSelected, setChildrenSelected] = useState<childrenProps | null>(null)

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const validadeCarteirinha = '31/12/' + anoAtual


    /* const children: propsChildren[] = [
        {
            name: 'Maria Laura da Silva Oliveira',
            birth: '02/09/2010',
            registration: '1713332034',
            bloodType: 'O+',
            grade: 'Ensino Fundamental II - 9º ano',
            photograph: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        },
        {
            name: 'Pedro Henrique da Silva Oliveira',
            birth: '12/09/1997',
            registration: '1913332134',
            bloodType: 'A+',
            grade: 'Ensino Fundamental II - 6º ano',
            photograph: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        },
        {
            name: 'Luíz Fellipe Oliveira',
            birth: '12/09/1997',
            registration: '1724442134',
            bloodType: 'A+',
            grade: 'Ensino Fundamental II - 8º ano',
            photograph: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        },
    ] */

    const getGeneralInformationChildren = async (tokens: string[]) => {
        let resp = await api.getGeneralInformationChildren(tokens)
        if (resp) {
            setChildren(resp)
        }
    }

    const handleGeneratePDF = async () => {
        if (!childrenSelected) return onClose()
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                /* Estilos globais */
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin-top: 40px;
                }
        
                /* Estilo para a logo */
                .logo {
                    width: 150px;
                    height: 150px;
                    margin: 0 auto 30px;
                }
        
                /* Estilo para o cabeçalho */
                .header {
                    font-size: 36px;
                    margin-bottom: 20px;
                }
        
                /* Estilo para as informações do aluno */
                .info {
                    font-size: 26px;
                    margin-bottom: 5px;
                }

                .formContent {
                    border-radius: 20px;
                    padding: 15px;
                    width: 80%;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                img{
                    border-radius: 100%;
                }
                </style>
            </head>
            <body>
                    <div class="formContent">
                        <img src=${childrenSelected?.photograph} alt="Logo da Escola" style="width: 250px; height: 250px; margin: 0 auto 30px;">
                        <h1 class="header">Informações da Carteirinha</br></br>Colégio X</h1>
                        <p class="info">Nome: ${childrenSelected?.name}</p>
                        <p class="info">Data de Nascimento: ${childrenSelected?.birth}</p>
                        <p class="info">Matrícula: ${childrenSelected?.registration}</p>
                        <p class="info">Tipo sanguíneo: ${childrenSelected?.bloodType}</p>
                        <p class="info">Série: ${childrenSelected?.grade} ano</p>
                        <p class="info">Validade: ${validadeCarteirinha}</p>
                    </div>
            </body> 
            </html>
        `

        const file = await printToFileAsync({
            html,
            base64: false
        });

        await shareAsync(file.uri);
    }

    useEffect(() => {
        if (user?.children) {
            getGeneralInformationChildren(user?.children)
        }
    }, [])

    return (
        <>
            <HeaderHome
                nameUser={user!.name.split(" ")[0]}
                nameSchool={school}
            />

            <VStack mt={7} flex={1} px={7} pb={16}>

                <VStack>
                    <Text
                        fontFamily={'heading'}
                        fontSize={'2xl'}
                        mb={5}
                    >Carteirinhas</Text>

                    <FlatList
                        data={children}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => (
                            <ScrollViewChildren
                                item={item}
                                onPress={() => {
                                    onOpen()
                                    setChildrenSelected(item)
                                }}
                            />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        maxH={110}
                        minH={110}
                    //_contentContainerStyle={{ px: 8 }}
                    />
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
                            onPress={() => navigation.navigate('frequency')}
                        />
                        <ButtonCardMenu
                            title='Notas'
                            color={'redButton'}
                            icone={<IconeNotas />}
                            onPress={() => navigation.navigate('grades')}
                        />
                    </HStack>
                    <HStack justifyContent={'space-between'}>
                        <ButtonCardMenu
                            title='Comunicados'
                            color={'orangeButton'}
                            icone={<IconeComunicados />}
                            onPress={() => navigation.navigate('announcement')}
                        />
                        <ButtonCardMenu
                            title='Financeiro'
                            color={'greenButton'}
                            icone={<IconeFinanceiro />}
                            onPress={() => navigation.navigate('financial')}
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
                    <Actionsheet.Content >
                        <VStack px={9} mt={2} mb={5} w={'100%'} h={'90%'} alignItems='center'>

                            <HStack
                                justifyContent={'center'}
                                alignItems={'center'}
                                h={50}
                                mb={3}
                            >
                                <LogoSvg width={'50px'} height={'50px'} style={{ marginRight: 1 }} />
                                <Text color='purple.600' fontFamily='heading' fontSize='2xl' ml={1}>
                                    {school}
                                </Text>
                            </HStack>

                            <VStack
                                w={'100%'}
                                flex={1}
                                alignItems={'center'}
                                bg={'purple.100'}
                                shadow={5}
                                mb={5}
                                rounded={'lg'}
                                px={3}
                                justifyContent={'center'}
                            >


                                <Avatar bg="gray.500" size={'xl'} shadow={7} m={2} source={{
                                    uri: childrenSelected?.photograph
                                }}>
                                    ...
                                </Avatar>

                                <VStack w={'100%'}>
                                    <Text fontFamily={'heading'}>Nome</Text>
                                    <Text fontFamily={'body'} fontSize={18}>{childrenSelected?.name}</Text>
                                </VStack>
                                <HStack justifyContent={'space-between'}>
                                    <VStack mt={2} w={'50%'}>
                                        <Text fontFamily={'heading'}>Data de Nascimento</Text>
                                        <Text fontFamily={'body'} fontSize={18}>{childrenSelected?.birth}</Text>
                                    </VStack>

                                    <VStack mt={2} w={'50%'}>
                                        <Text fontFamily={'heading'}>Tipo sanguineo</Text>
                                        <Text fontFamily={'body'} fontSize={18}>{childrenSelected?.bloodType}</Text>
                                    </VStack>
                                </HStack>

                                <HStack justifyContent={'space-between'}>
                                    <VStack w={'50%'} mt={2}>
                                        <Text fontFamily={'heading'}>Matricula</Text>
                                        <Text fontFamily={'body'} fontSize={18}>{childrenSelected?.registration}</Text>
                                    </VStack>

                                    <VStack w={'50%'} mt={2}>
                                        <Text fontFamily={'heading'}>Validade</Text>
                                        <Text fontFamily={'body'} fontSize={18}>{validadeCarteirinha}</Text>
                                    </VStack>
                                </HStack>

                                <VStack w={'100%'} mt={2}>
                                    <Text fontFamily={'heading'}>Série</Text>
                                    <Text fontFamily={'body'} fontSize={18}>{childrenSelected?.grade} ano</Text>
                                </VStack>

                            </VStack>
                            <Button
                                title='Download em PDF'
                                mb={2}
                                onPress={() => {
                                    console.log('fazendo o download')
                                    handleGeneratePDF()
                                    //onClose()
                                }}
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