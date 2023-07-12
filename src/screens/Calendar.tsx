import { Text, VStack } from "native-base";

import { useNavigation } from '@react-navigation/native'

import { MaterialIcons } from '@expo/vector-icons'; 

import { Header } from "@components/Header";
import { Calendar as CalendarComponent, CalendarUtils} from 'react-native-calendars';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';



export function Calendar() {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }


    return(
        <VStack flex={1}>
            <Header
                title="Calendário"
                buttonBack={false}
            />
            <VStack flex={1}>
                <CalendarComponent 
                    animationType="fade"
                    style={{
                        margin: 20,
                        marginTop: 20
                    }}
                    theme={{
                        textDayFontFamily: 'Roboto',
                        textMonthFontFamily: 'Roboto',
                        textDayHeaderFontFamily: 'Roboto',

                        backgroundColor: '#F1F3F5',
                        calendarBackground: '#F1F3F5',
                        textSectionTitleColor: '#8257E6', //dias da semana
                        todayTextColor: '#8257E6', //o dia atual
                        monthTextColor: '#000000', //o mes atual

                       
                    }}

                    renderArrow={direction => 
                        direction == 'left' ?
                            <MaterialIcons name="arrow-back-ios" size={20} color="#8257E6" />
                        :
                            <MaterialIcons name="arrow-forward-ios" size={20} color="#8257E6" />
                    }
                    //renderArrow={right => <MaterialIcons name="arrow-forward-ios" size={24} color="black" />}

                />
            </VStack>
        </VStack>
    );
}