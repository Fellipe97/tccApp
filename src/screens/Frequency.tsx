import { useEffect, useState } from "react";
import { FlatList, Text, VStack, Pressable, HStack, ScrollView, Center, Box } from "native-base";

import { useNavigation } from '@react-navigation/native'

import { Header } from "@components/Header";
import { ScrollViewChildren } from "@components/ScrollViewChildren";
import { Bimester } from "@components/Bimester";

import { MaterialIcons } from '@expo/vector-icons';

import { VictoryPie } from 'victory-native'


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
type propsPresences = {
    idChildren: string;
    school_subject: string;
    grade: string;
    bimester: number;
    total_classes: number;
    presence: number;
}

type propsChartPie = {
    absences: number;
    presence: number;
    total_classes: number;
}

export function Frequency() {
    const navigation = useNavigation();
    const [dataPie, setDataPie] = useState<propsChartPie | null>(null);

    const children: propsChildren[] = [
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
    ]

    const presences: propsPresences[] = [
        {
            idChildren: 'aaaaaaa111111',
            school_subject: 'Portugues',
            grade: '4,8',
            bimester: 1,
            total_classes: 30,
            presence: 15
        },
        {
            idChildren: 'aaaaaaa111111',
            school_subject: 'Portugues',
            grade: '4,8',
            bimester: 1,
            total_classes: 30,
            presence: 16
        },
        {
            idChildren: 'aaaaaaa111111',
            school_subject: 'Portugues',
            grade: '4,8',
            bimester: 1,
            total_classes: 30,
            presence: 20
        },
        {
            idChildren: 'aaaaaaa111111',
            school_subject: 'Portugues',
            grade: '4,8',
            bimester: 1,
            total_classes: 30,
            presence: 25
        },
        {
            idChildren: 'aaaaaaa111111',
            school_subject: 'Portugues',
            grade: '4,8',
            bimester: 1,
            total_classes: 30,
            presence: 15
        },
        {
            idChildren: 'aaaaaaa111111',
            school_subject: 'Portugues',
            grade: '4,8',
            bimester: 1,
            total_classes: 30,
            presence: 15
        },
        {
            idChildren: 'aaaaaaa111111',
            school_subject: 'Portugues',
            grade: '4,8',
            bimester: 1,
            total_classes: 30,
            presence: 15
        },
        {
            idChildren: 'aaaaaaa111111',
            school_subject: 'Matematica',
            grade: '8,8',
            bimester: 2,
            total_classes: 30,
            presence: 29
        },
        {
            idChildren: 'aaaaaaa111111',
            school_subject: 'Fisica',
            grade: '9,8',
            bimester: 3,
            total_classes: 30,
            presence: 28
        },
        {
            idChildren: 'aaaaaaa111111',
            school_subject: 'Educacao Fisica',
            grade: '9,8',
            bimester: 1,
            total_classes: 30,
            presence: 20
        },
        {
            idChildren: 'bbbbbbb2222222',
            school_subject: 'Historia',
            grade: '1,8',
            bimester: 1,
            total_classes: 30,
            presence: 27
        }
    ]


    const [childrenSelected, setChildrenSelected] = useState<propsChildren | null>(null);
    const [presencesFiltered, setPresencesFiltered] = useState<propsPresences[] | null>(null);

    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const [expanded4, setExpanded4] = useState(false);

    const attendancePercentage = 0.75




    function handleGoBack() {
        navigation.goBack();
    }


    useEffect(() => {
        if (children.length > 0 && !childrenSelected) {
            setChildrenSelected(children[0]);
        }
    }, [children, childrenSelected]);


    useEffect(() => {
        setPresencesFiltered(
            presences.filter(grade => grade.idChildren === childrenSelected?.id)
        )

        let presencesFilteredAux = presences.filter(grade => grade.idChildren === childrenSelected?.id)
        let totalClasses = 0;
        let totalPresence = 0;
        presencesFilteredAux.forEach((item) => {
            totalClasses += item.total_classes;
            totalPresence += item.presence;
        });
        let absences = totalClasses - totalPresence;
        setDataPie({
            absences: absences,
            presence: totalPresence,
            total_classes: totalClasses
        })

        /* console.log('presencesFilteredAux',{
            absences: absences,
            presence: totalPresence,
            total_classes: totalClasses
        }) */
        //console.log('Filtrado: ', presences.filter(grade => grade.idChildren === childrenSelected?.id))
    }, [childrenSelected])


    return (
        <VStack flex={1}>
            <Header
                title="Frequência"
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
                    bg={'gray.100'}
                    mt={4}
                    mb={2}
                    borderRadius={'xl'}
                    shadow={7}
                    py={3}
                    minH={285}
                    maxH={285}
                >
                    <Text px={5} fontSize={'2xl'} fontFamily={'heading'} mb={2}>Disciplinas</Text>
                    <ScrollView
                        borderTopLeftRadius={'xl'}
                        borderTopRightRadius={'xl'}
                        px={5}
                    >
                        {presencesFiltered &&
                            presencesFiltered
                                .map((item, index) => (
                                    <VStack
                                        key={index}
                                        mb={3}
                                    >
                                        <Text fontSize="md">{item.school_subject}</Text>
                                        <HStack justifyContent={'space-between'}>

                                            <Text
                                                fontSize="md"
                                                fontFamily={'heading'}
                                                color={'green.700'}
                                            >
                                                Presença {item.presence}
                                            </Text>
                                            <Text
                                                fontSize="md"
                                                fontFamily={'heading'}
                                                color={'red.700'}
                                            >
                                                Ausência {item.total_classes - item.presence}
                                            </Text>
                                            <Text
                                                fontSize="md"
                                                fontFamily={'heading'}
                                            >
                                                Aulas {item.total_classes}
                                            </Text>
                                        </HStack>
                                    </VStack>
                                )
                            )
                        }
                    </ScrollView>

                </VStack>

                {dataPie && dataPie.total_classes !== 0 &&
                    <VStack
                        flex={1}
                        //bg={'green.100'}
                        borderBottomLeftRadius={'xl'}
                        borderBottomRightRadius={'xl'}
                        mb={5}
                    >
                        <HStack>

                            <VStack maxW={'60%'}>
                                <Center>
                                    <VictoryPie
                                        height={200}
                                        innerRadius={80}
                                        data={[
                                            { x: " ", y: dataPie.absences },
                                            { x: " ", y: dataPie.presence }
                                        ]}
                                        colorScale={["#F01A31", "#1B936C"]}
                                    />
                                </Center>
                            </VStack>

                            <VStack justifyContent={'center'} flex={1}>
                                <Text
                                    fontFamily={'heading'}
                                    fontSize={'lg'}
                                    color={'green.700'}
                                >Presença - {dataPie.presence * 100 / dataPie.total_classes + '%'}</Text>
                                <Text
                                    fontFamily={'heading'}
                                    fontSize={'lg'}
                                    color={'red.700'}
                                    mt={2}
                                >Ausencia - {dataPie.absences * 100 / dataPie.total_classes + '%'}</Text>
                            </VStack>

                        </HStack>

                    </VStack>
                }



            </VStack>
        </VStack>
    );
}


