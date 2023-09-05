import { useEffect, useState } from "react";
import { FlatList, Text, VStack, Pressable, HStack, ScrollView, Actionsheet, KeyboardAvoidingView, useDisclose } from "native-base";

import { useNavigation } from '@react-navigation/native'

import { Header } from "@components/Header";
import { ScrollViewChildren } from "@components/ScrollViewChildren";
import { Button } from "@components/Button";
import { ButtonGhost } from "@components/ButtonGhost";

import * as Clipboard from 'expo-clipboard';
import { childrenProps } from "src/types/children";

import { useAuth } from "@hooks/auth";
import Api from "../helpers/Api";
import { monthlyPaymentProps } from "src/types/monthlyPayment";



type propsChildren = {
    id: string;
    name: string;
    birth: string;
    registration: string;
    bloodType: string;
    grade: string;
    id_grade: string;
    photograph: string;
}
type propsMonthlyPayment = {
    idChildren: string;
    installment: string;
    month: string;
    maturity: string;
    value: string;
    status: string;
    pay_day: string;
    bar_code: string;
}



export function Financial() {
    const navigation = useNavigation();
    const api = Api();
    const { user } = useAuth()


    /* const children: propsChildren[] = [
        {
            id: 'aaaaaaa111111',
            name: 'Maria Laura da Silva Oliveira',
            birth: '02/09/2010',
            registration: '1713332034',
            bloodType: 'O+',
            grade: 'Ensino Fundamental II - 9º ano',
            id_grade: 'ensino_Fundamental_II',
            photograph: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        },
        {
            id: 'bbbbbbb2222222',
            name: 'Pedro Henrique da Silva Oliveira',
            birth: '12/09/1997',
            registration: '1913332134',
            bloodType: 'A+',
            grade: 'Ensino Fundamental I - 5º ano',
            id_grade: 'ensino_Fundamental_I',
            photograph: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 'ccccccc2222222',
            name: 'Luíz Fellipe Oliveira',
            birth: '12/09/1997',
            registration: '1724442134',
            bloodType: 'A+',
            grade: 'Ensino Fundamental II - 8º ano',
            id_grade: 'ensino_Fundamental_II',
            photograph: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        },
    ] */

    /* const monthlyPayment: propsMonthlyPayment[] = [
        {
            idChildren: 'aaaaaaa111111',
            installment: '2/12',
            month: 'Fevereiro',
            maturity: '10/03/2023',
            value: '250,50',
            status: 'Boleto em aberto',
            bar_code: 'jdvvrfvbbvhjhvbhjdsfbvjsdbfkdshfksdjhfsdkjbcshdbvhjdsbvjhs',
            pay_day: 'Indisponível'
        },
        {
            idChildren: 'aaaaaaa111111',
            installment: '1/12',
            month: 'Janeiro',
            maturity: '10/02/2023',
            value: '250,50',
            status: 'Boleto pago',
            bar_code: 'cejhfvcyjuvefyhjbvefudcysabfwgdsvcjhbfhdcbusvjcbhedsyucgxz',
            pay_day: '08/02/2023'
        },
        {
            idChildren: 'bbbbbbb2222222',
            installment: '2/12',
            month: 'Fevereiro',
            maturity: '15/03/2023',
            value: '250,00',
            status: 'Boleto em aberto',
            bar_code: 'e4g8r4g8fergv8srf1vc8sd4c8s4c8s4c8s4c8ersfvs5f1ce8scw8se1ce8s1',
            pay_day: 'Indisponível'
        },
        {
            idChildren: 'bbbbbbb2222222',
            installment: '1/12',
            month: 'Janeiro',
            maturity: '15/02/2023',
            value: '250,00',
            status: 'Boleto pago',
            bar_code: 'vfvdr8gv4df8vd8v4c8sd4cs8dc4sd8c4s8d8fdv1df8v1df8v1df8v1fd8v18',
            pay_day: '05/02/2023'
        }
    ] */


    const [childrenSelected, setChildrenSelected] = useState<childrenProps | null>(null);
    const [monthlyPaymentFiltered, setMonthlyPaymentFiltered] = useState<monthlyPaymentProps[] | null>(null);
    //const [monthlyPaymentSelected, setMonthlyPaymentSelected] = useState<propsMonthlyPayment | null>(null);
    const [monthlyPaymentSelected, setMonthlyPaymentSelected] = useState<monthlyPaymentProps | null>(null);
    const [monthlyPayment, setMonthlyPayment] = useState<monthlyPaymentProps[] | null>(null);
    const { isOpen, onOpen, onClose } = useDisclose();

    const [children, setChildren] = useState<childrenProps[] | null>(null)

    const getGeneralInformationChildren = async (tokens: string[]) => {
        let resp = await api.getGeneralInformationChildren(tokens)
        if (resp) {
            setChildren(resp)
            let resp2 = await api.getMonthlyPaymentChildren(resp)
            if (resp2) {
                console.log('resp2: ', resp2)
                setMonthlyPayment(resp2)
                setMonthlyPaymentFiltered(resp2.filter(monthlyPayment => monthlyPayment.idChildren === resp[0].id))
            }
        }
    }

    useEffect(() => {
        if (user?.children) {
            getGeneralInformationChildren(user?.children)
        }
    }, [])



    const copyToClipboard = async () => {
        if (monthlyPaymentSelected) {
            await Clipboard.setStringAsync(monthlyPaymentSelected.bar_code);
            console.log('texto copiado');
        } else {
            console.log('texto vazio');
        }
    }


    useEffect(() => {
        if (children && children.length > 0 && !childrenSelected) {
            setChildrenSelected(children[0]);
        }
    }, [children, childrenSelected]);


    useEffect(() => {
        if (monthlyPayment && monthlyPayment?.length > 0) {
            let aux = monthlyPayment.filter(monthlyPayment => monthlyPayment.idChildren === childrenSelected?.id)
            setMonthlyPaymentFiltered(
                monthlyPayment.filter(monthlyPayment => monthlyPayment.idChildren === childrenSelected?.id)
            )
            console.log('Filtrado: ', monthlyPayment.filter(monthlyPayment => monthlyPayment.idChildren === childrenSelected?.id))
        }
    }, [childrenSelected])



    return (
        <>
            <VStack flex={1}>
                <Header
                    title="Financeiro"
                    buttonBack
                />
                <VStack mt={7} flex={1} px={8}>

                    <Text
                        fontFamily={'heading'}
                        fontSize={'2xl'}
                        mb={5}
                    >Selecione seu filho</Text>

                    <FlatList
                        data={children}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => (
                            <ScrollViewChildren
                                item={item}
                                isActive={childrenSelected?.name == item.name}
                                onPress={() => {
                                    setChildrenSelected(item)
                                }}
                            />
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        maxH={110}
                        minH={110}
                    />

                    <VStack
                        flex={1}
                        bg={'gray.100'}
                        mt={4}
                        mb={10}
                        borderRadius={'xl'}
                        shadow={7}
                    >
                        <ScrollView
                            borderTopLeftRadius={'xl'}
                            borderTopRightRadius={'xl'}
                            showsVerticalScrollIndicator={false}
                            p={4}
                        >
                            {monthlyPaymentFiltered && monthlyPaymentFiltered.map((item, index) => (

                                <Pressable
                                    bg={item.status === 'Boleto pago' ? 'green.100' : 'yellow.100'}
                                    p={4}
                                    borderRadius={'md'}
                                    mb={4}
                                    key={index}
                                    shadow={2}
                                    onPress={() => {
                                        setMonthlyPaymentSelected(item)
                                        onOpen()
                                    }}
                                >
                                    <HStack justifyContent={'space-between'}>
                                        <Text fontFamily={'heading'}>{item.installment} - Mensalidade {item.month}</Text>
                                        <Text>R$ {item.value.toFixed(2).replace('.', ',')}</Text>
                                    </HStack>

                                    <HStack justifyContent={'space-between'} mt={7}>
                                        <VStack>
                                            <Text fontFamily={'heading'}>Vencimento</Text>
                                            <Text>{item.maturity}</Text>
                                        </VStack>
                                        <VStack>
                                            <Text fontFamily={'heading'}>Pagamento</Text>
                                            <Text>{item.pay_day}</Text>
                                        </VStack>
                                    </HStack>
                                </Pressable>
                            ))
                            }

                        </ScrollView>
                    </VStack>

                </VStack>
            </VStack>

            {/* Pop up carteirinha */}
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <KeyboardAvoidingView
                    behavior="padding"
                    w={'100%'}
                >
                    <Actionsheet.Content >
                        <VStack px={9} mt={2} mb={5} w={'100%'} alignItems='center'>


                            <Text
                                fontFamily={'heading'}
                                fontSize={'2xl'}
                            >Mensalidade {monthlyPaymentSelected?.month}</Text>

                            <VStack w={'100%'} mt={7}>
                                <HStack mb={2}>
                                    <Text fontFamily={'heading'} fontSize={'lg'}>Parcela: </Text>
                                    <Text fontSize={'lg'}>{monthlyPaymentSelected?.installment}</Text>
                                </HStack>
                                <HStack mb={2}>
                                    <Text fontFamily={'heading'} fontSize={'lg'}>Vencimento: </Text>
                                    <Text fontSize={'lg'}>{monthlyPaymentSelected?.maturity}</Text>
                                </HStack>
                                <HStack mb={2}>
                                    <Text fontFamily={'heading'} fontSize={'lg'}>Valor: </Text>
                                    <Text fontSize={'lg'}>{monthlyPaymentSelected?.value.toFixed(2).replace('.', ',')}</Text> 
                                </HStack>
                                <HStack mb={7} w={'100%'}>
                                    <Text fontFamily={'heading'} fontSize={'xl'}>Status: </Text>
                                    <Text
                                        fontFamily={'heading'}
                                        fontSize={'xl'}
                                        color={monthlyPaymentSelected?.status === 'Boleto pago' ? 'green.700' : 'yellow.200'}
                                    >{monthlyPaymentSelected?.status}</Text>
                                </HStack>
                            </VStack>


                            {monthlyPaymentSelected?.status === 'Boleto em aberto' &&
                                <Button
                                    title='Copiar código de barra'
                                    mb={4}
                                    onPress={() => {
                                        console.log('fazendo o download')
                                        copyToClipboard()
                                        onClose()
                                    }}
                                />
                            }

                            <ButtonGhost
                                title={monthlyPaymentSelected?.status === 'Boleto pago' ? 'voltar' : 'cancelar'}
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