import { useState, useEffect } from 'react'
import { Text, VStack } from "native-base";

import { useIsFocused } from '@react-navigation/native';

import HeaderHomeSvg from '@assets/headerHome.svg'



type Props = {
    nameUser: string;
    nameSchool: string;
}

export function HeaderHome({ nameUser, nameSchool }: Props) {
    const isFocused = useIsFocused();
    const [dayPeriod, setDayPeriod] = useState('Olá');

    useEffect(() => {
        var dataInicio = new Date();
        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'America/Sao_Paulo',
            hour: 'numeric',
        };
        const horaBrasil = new Intl.DateTimeFormat('pt-BR', options).format(dataInicio);

        console.log(horaBrasil)
        if (parseInt(horaBrasil) > -1 && parseInt(horaBrasil) < 12) {
            setDayPeriod('Bom dia')
        }
        if (parseInt(horaBrasil) > 11 && parseInt(horaBrasil) < 18) {
            setDayPeriod('Boa tarde')
        }
        if (parseInt(horaBrasil) > 17 && parseInt(horaBrasil) < 24) {
            setDayPeriod('Boa noite')
        }
        console.log('atualizou')
        //ele atualiza quando sai o focu tb, poderia evitado, como? n sei
    }, [isFocused])

    return (
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
        >
            {/* <HeaderHomeSvg width={'100%'}> */}
            <Text mt={2} fontSize={'xl'} bold color={'gray.100'}>{dayPeriod}, {nameUser}</Text>
            <Text fontSize={'md'} color={'black'} mb={4} mt={1}>{nameSchool}</Text>
            {/* </HeaderHomeSvg> */}
        </VStack>
    )
}
