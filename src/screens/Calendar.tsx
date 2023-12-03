import React, { useEffect, useState } from "react";
import { FlatList, HStack, ScrollView, Text, VStack } from "native-base";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from "@components/Header";
import { Calendar as CalendarComponent, CalendarUtils, LocaleConfig, DateData } from 'react-native-calendars';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useAuth } from "@hooks/auth";
import Api from "../helpers/Api";

LocaleConfig.locales['pt-br'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul.', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter.', 'Qua', 'Qui', 'Sex', 'Sab'],
    today: "Hoje"
};
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDates {
    [date: string]: {
        marked: boolean;
        dotColor?: string;
        selected?: boolean;
        selectedColor?: string;
        // Outras propriedades opcionais
    };
}

interface PropsDatas {
    idAluno: string;
    name: string;
    data: string;
    message: string;
    time: string;
}


export function Calendar() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const api = Api();
    const { user } = useAuth()
    const [initialDate, setInitialDate] = useState('');
    const [key, setKey] = useState('');

    const [markedDatesAux, setMarkedDatesAux] = useState<MarkedDates>({});
    const [markedDates, setMarkedDates] = useState<MarkedDates>({});
    const [selectedDate, setSelectedDate] = useState('');

    const [datasFiltradas, setDatasFiltradas] = useState<PropsDatas[]>();

    const [datasMarcadas, setDatasMarcadas] = useState<PropsDatas[]>([])
    /* const datasMarcadas: PropsDatas[] = [
        {
            idAluno: 'aaaabbbb111',
            name: 'Luiz Fellipe',
            data: '22/12/2023',
            message: 'Prova de matematica',
            time: '07:58'
        },
        {
            idAluno: 'aaaabbbb111',
            name: 'Luiz Fellipe',
            data: '15/12/2023',
            message: 'Prova de matematica',
            time: '07:58'
        },
        {
            idAluno: 'aaaabbbb111',
            name: 'Luiz Fellipe',
            data: '30/12/2023',
            message: 'Prova de portugues',
            time: '09:50'
        },
        {
            idAluno: 'bbbbccc222',
            name: 'Maria Laura',
            data: '02/12/2023',
            message: 'Feira de ciência',
            time: '10:30'
        }
    ]; */

    //quando clicar no dia que precisa mostrar as informaçoes do dia
    function handleDayPress(date: DateData) {
        if (date.dateString) {
            //console.log(date)
            setSelectedDate(date.dateString);
        }
    }

    const renderItem = ({ item }: any) => (
        <HStack
            h={75}
            w={'100%'}
            bg={'purple.500'}
            borderRadius={'2xl'}
            alignItems={'center'}
            justifyContent={'space-between'}
            px={5}
            mt={2}
        >
            <Text width={'60%'} numberOfLines={4} fontFamily={"heading"} fontSize={'md'} color={'gray.100'}>{item.message}</Text>
            <Text fontFamily={"heading"} fontSize={'md'} color={'gray.100'}>{item.time}</Text>
        </HStack>
    )


    useEffect(() => {
        if (selectedDate) {
            setDatasFiltradas(datasMarcadas.filter((item) => {
                const itemData = item.data.split('/').reverse().join('-');
                return itemData === selectedDate;
            })
            )
        }
    }, [selectedDate])


    useEffect(() => {
        if (isFocused) {

            let auxCalendarInfo: any = []
            const calendarInfo = async (idAlunos: string[]) => {
                const json = await api.getCalendar(idAlunos)
                console.log('json', json)

                if (json) {
                    setDatasMarcadas(json!)

                    //forcar no mes vigente
                    const dataAtual = new Date();
                    const dia = dataAtual.getDate();
                    const mes = dataAtual.getMonth() + 1;
                    const ano = dataAtual.getFullYear();
                    const dataFormatada = `${ano}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;

                    setInitialDate(dataFormatada);
                    const novaKey = Math.random().toString();
                    setKey(novaKey);

                    //carregar as datas do banco de dados e adicionar no calendario
                    const updatedMarkedDates = json.reduce((prevMarkedDates: MarkedDates, data: any) => {
                        const { data: dataMarcada } = data;
                        const [dia, mes, ano] = dataMarcada.split('/');
                        const dataFormatada2 = `${ano}-${mes}-${dia}`;
                        prevMarkedDates[dataFormatada2] = {
                            marked: true,
                            dotColor: "#8257E6",
                        };

                        return prevMarkedDates;
                    }, {});

                    setMarkedDatesAux(updatedMarkedDates);
                    setSelectedDate(dataFormatada);
                    setMarkedDates(updatedMarkedDates);
                }
            }
            calendarInfo(user?.children!)
        }
    }, [isFocused]);



    //pegar a data selecionada e mostrar no calendario
    useEffect(() => {
        const updatedMarkedDates = { ...markedDatesAux };

        if (selectedDate) {
            if (updatedMarkedDates[selectedDate]) {
                updatedMarkedDates[selectedDate] = {
                    ...updatedMarkedDates[selectedDate],
                    selected: true,
                    selectedColor: "#8257E6",
                };
            } else {
                updatedMarkedDates[selectedDate] = {
                    marked: false,
                    selected: true,
                    selectedColor: "#8257E6",
                };
            }
        }

        setMarkedDates(updatedMarkedDates);
    }, [selectedDate, markedDatesAux]);



    return (
        <VStack flex={1}>
            <Header
                title="Calendário"
                buttonBack={false}
            />
            <VStack flex={1} >
                {isFocused && (
                    <>
                        <CalendarComponent
                            key={key}
                            animationType="fade"
                            style={{
                                marginTop: 10
                            }}
                            theme={{
                                backgroundColor: '#F1F3F5',
                                calendarBackground: '#F1F3F5',
                                textSectionTitleColor: '#8257E6', // dias da semana
                                todayTextColor: '#8257E6', // o dia atual
                                monthTextColor: '#000000', // o mês atual
                            }}
                            renderArrow={direction =>
                                direction == 'left' ?
                                    <MaterialIcons name="arrow-back-ios" size={20} color="#8257E6" />
                                    :
                                    <MaterialIcons name="arrow-forward-ios" size={20} color="#8257E6" />
                            }
                            initialDate={initialDate}
                            onDayPress={handleDayPress}

                            markedDates={markedDates}
                            px={4}
                        />

                        {datasFiltradas?.length === 0 ? (
                            <VStack px={4} flex={1} mt={6}>
                                <HStack
                                    h={75}
                                    w={'100%'}
                                    bg={'gray.500'}
                                    borderRadius={'2xl'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                    px={5}
                                >
                                    <Text numberOfLines={4} fontFamily={"heading"} fontSize={'md'} color={'gray.100'}>
                                        Nenhum evento agendado
                                    </Text>
                                </HStack>
                            </VStack>
                        )
                            : (
                                <FlatList
                                    px={4} py={2} mt={2} flex={1} borderRadius={'xl'} mb={2}
                                    data={datasFiltradas}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={renderItem}
                                />
                            )}
                    </>
                )}
            </VStack>
        </VStack>
    );
}
