import React, { useEffect, useState } from "react";
import { Text, VStack } from "native-base";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from "@components/Header";
import { Calendar as CalendarComponent, CalendarUtils, LocaleConfig, DateData } from 'react-native-calendars';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

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

export function Calendar() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [initialDate, setInitialDate] = useState('');
    const [key, setKey] = useState('');
    const [markedDates, setMarkedDates] = useState<MarkedDates>({});
    const [selectedDate, setSelectedDate] = useState('');


    const datasMarcadas = [
        {
            idAluno: 'aaaabbbb111',
            name: 'Luiz Fellipe',
            data: '22/07/2023',
            info: 'Prova de matematica'
        },
        {
            idAluno: 'aaaabbbb111',
            name: 'Luiz Fellipe',
            data: '30/07/2023',
            info: 'Prova de portugues'
        },
        {
            idAluno: 'bbbbccc222',
            name: 'Maria Laura',
            data: '02/08/2023',
            info: 'Feira de ciência'
        }
    ];

    function handleDayPress(date: DateData) {
        if (date.dateString) {
            console.log(date)
            setSelectedDate(date.dateString);
        }
    }

    useEffect(() => {
        if (isFocused) {
            var dataAtual = new Date();
            dataAtual.setHours(dataAtual.getHours() - 3);
            var dia = dataAtual.getDate();
            var mes = dataAtual.getMonth() + 1;
            var ano = dataAtual.getFullYear();
            var dataFormatada = ano + '-' + mes + '-' + dia;
            setInitialDate(dataFormatada);
            var novaKey = Math.random().toString();
            setKey(novaKey);
        }
    }, [isFocused]);

    useEffect(() => {
        
        const updatedMarkedDates = datasMarcadas.reduce((prevMarkedDates: MarkedDates, data) => {
            const { data: dataMarcada } = data;
            const [dia, mes, ano] = dataMarcada.split('/');
            const dataFormatada = `${ano}-${mes}-${dia}`;
            prevMarkedDates[dataFormatada] = {
                marked: true,
                dotColor: "#8257E6",
            };

            return prevMarkedDates;
        }, {})

        updatedMarkedDates[selectedDate] = {
            ...updatedMarkedDates[selectedDate],
            selected: true,
            selectedColor: "#8257E6",
        };

        setMarkedDates(updatedMarkedDates);

    }, [selectedDate]);


    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <VStack flex={1}>
            <Header
                title="Calendário"
                buttonBack={false}
            />
            <VStack flex={1}>
                {isFocused && (
                    <CalendarComponent
                        key={key}
                        animationType="fade"
                        style={{
                            margin: 20,
                            marginTop: 20
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
                    />
                )}
            </VStack>
        </VStack>
    );
}
