import { useEffect, useState } from "react";
import { FlatList, Text, VStack, Pressable, HStack, ScrollView } from "native-base";

import { useNavigation } from '@react-navigation/native'

import { Header } from "@components/Header";
import { ScrollViewChildren } from "@components/ScrollViewChildren";
import { Bimester } from "@components/Bimester";

import { MaterialIcons } from '@expo/vector-icons';
import Api from "../helpers/Api";
import { useAuth } from "@hooks/auth";
import { childrenProps } from "../types/children";


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
type propsGrades = {
    idChildren: string;
    school_subject: string;
    grade: string;
    bimester: number;
}

export function Grades() {
    const navigation = useNavigation();
    const api = Api();
    const { user } = useAuth()



    const [children, setChildren] = useState<childrenProps[] | null>(null)
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

    const grades: propsGrades[] = [
        {
            idChildren: 'TxquPuSseEdBXsZJcYen',
            school_subject: 'Português',
            grade: '4,6',
            bimester: 1
        },
        {
            idChildren: 'TxquPuSseEdBXsZJcYen',
            school_subject: 'Português',
            grade: '6,8',
            bimester: 2
        },
        {
            idChildren: 'TxquPuSseEdBXsZJcYen',
            school_subject: 'Português',
            grade: '7,3',
            bimester: 3
        },
        {
            idChildren: 'TxquPuSseEdBXsZJcYen',
            school_subject: 'Português',
            grade: '5,1',
            bimester: 4
        },
        {
            idChildren: 'TxquPuSseEdBXsZJcYen',
            school_subject: 'Matemática',
            grade: '8,9',
            bimester: 1
        },
        {
            idChildren: 'TxquPuSseEdBXsZJcYen',
            school_subject: 'Matemática',
            grade: '9,8',
            bimester: 2
        },
        {
            idChildren: 'TxquPuSseEdBXsZJcYen',
            school_subject: 'Matemática',
            grade: '2,4',
            bimester: 3
        },
        {
            idChildren: 'TxquPuSseEdBXsZJcYen',
            school_subject: 'Matemática',
            grade: '8,2',
            bimester: 4
        },
        {
            idChildren: 'TxquPuSseEdBXsZJcYen',
            school_subject: 'História',
            grade: '9,6',
            bimester: 1
        },
        {
            idChildren: 'TxquPuSseEdBXsZJcYen',
            school_subject: 'História',
            grade: '7,3',
            bimester: 2
        },
        {
            idChildren: 'TxquPuSseEdBXsZJcYen',
            school_subject: 'História',
            grade: '4,2',
            bimester: 3
        },
        {
            idChildren: 'TxquPuSseEdBXsZJcYen',
            school_subject: 'História',
            grade: '8,6',
            bimester: 4
        },



        {
            idChildren: 'Wf3dXr6IHRQb8aZMLJgp',
            school_subject: 'Matemática',
            grade: '7,5',
            bimester: 1
        },
        {
            idChildren: 'Wf3dXr6IHRQb8aZMLJgp',
            school_subject: 'Matemática',
            grade: '6,3',
            bimester: 2
        },
        {
            idChildren: 'Wf3dXr6IHRQb8aZMLJgp',
            school_subject: 'Matemática',
            grade: '9,4',
            bimester: 3
        },
        {
            idChildren: 'Wf3dXr6IHRQb8aZMLJgp',
            school_subject: 'Matemática',
            grade: '3,4',
            bimester: 4
        },
        {
            idChildren: 'Wf3dXr6IHRQb8aZMLJgp',
            school_subject: 'Português',
            grade: '3,5',
            bimester: 1
        },
        {
            idChildren: 'Wf3dXr6IHRQb8aZMLJgp',
            school_subject: 'Português',
            grade: '6,2',
            bimester: 2
        },
        {
            idChildren: 'Wf3dXr6IHRQb8aZMLJgp',
            school_subject: 'Português',
            grade: '9,4',
            bimester: 3
        },
        {
            idChildren: 'Wf3dXr6IHRQb8aZMLJgp',
            school_subject: 'Português',
            grade: '7,2',
            bimester: 4
        },
        {
            idChildren: 'Wf3dXr6IHRQb8aZMLJgp',
            school_subject: 'História',
            grade: '8,4',
            bimester: 1
        },
        {
            idChildren: 'Wf3dXr6IHRQb8aZMLJgp',
            school_subject: 'História',
            grade: '7,2',
            bimester: 2
        },
        {
            idChildren: 'Wf3dXr6IHRQb8aZMLJgp',
            school_subject: 'História',
            grade: '3,4',
            bimester: 3
        },
        {
            idChildren: 'Wf3dXr6IHRQb8aZMLJgp',
            school_subject: 'História',
            grade: '9,2',
            bimester: 4
        }
    ]


    const [childrenSelected, setChildrenSelected] = useState<propsChildren | null>(null);
    const [gradesFiltered, setGradesFiltered] = useState<propsGrades[] | null>(null);

    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const [expanded4, setExpanded4] = useState(false);



    function handleGoBack() {
        navigation.goBack();
    }

    const getGeneralInformationChildren = async (tokens: string[]) => {
        let resp = await api.getGeneralInformationChildren(tokens)
        if (resp) {
            setChildren(resp)
        }
    }

    useEffect(() => {
        if (user?.children) {
            getGeneralInformationChildren(user?.children)
        }
    }, [])

    useEffect(() => {
        if (children && children.length > 0 && !childrenSelected) {
            setChildrenSelected(children[0]);
        }
    }, [children, childrenSelected]);


    /* useEffect(() => {
        if (children.length > 0 && !childrenSelected) {
            setChildrenSelected(children[0]);
        }
    }, [children, childrenSelected]); */


    useEffect(() => {
        setGradesFiltered(
            grades.filter(grade => grade.idChildren === childrenSelected?.id)
        )
        console.log('Filtrado: ', grades.filter(grade => grade.idChildren === childrenSelected?.id))
    }, [childrenSelected])


    return (
        <VStack flex={1}>
            <Header
                title="Notas"
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
                    >



                        {/* Primeiro bimestre */}
                        <Bimester
                            bimestreNumber={1}
                            expanded={expanded1}
                            onPress={() => setExpanded1(!expanded1)}
                            gradesFiltered={gradesFiltered}
                        />

                        {/* Segundo bimestre */}
                        <Bimester
                            bimestreNumber={2}
                            expanded={expanded2}
                            onPress={() => setExpanded2(!expanded2)}
                            gradesFiltered={gradesFiltered}
                        />

                        {/* Terceiro bimestre */}
                        <Bimester
                            bimestreNumber={3}
                            expanded={expanded3}
                            onPress={() => setExpanded3(!expanded3)}
                            gradesFiltered={gradesFiltered}
                        />

                        {/* Quarto bimestre */}
                        <Bimester
                            bimestreNumber={4}
                            expanded={expanded4}
                            onPress={() => setExpanded4(!expanded4)}
                            gradesFiltered={gradesFiltered}
                        />


                    </ScrollView>
                </VStack>

            </VStack>
        </VStack>
    );
}


{/* <MaterialIcons name="keyboard-arrow-down" size={24} color="black" /> */ }