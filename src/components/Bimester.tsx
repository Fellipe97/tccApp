import React from 'react';
import { Pressable, HStack, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

type propsGrades = {
    idChildren: string;
    school_subject: string;
    grade: string;
    bimester: number;
  };

type BimestreProps = {
    bimestreNumber: number;
    expanded: boolean;
    onPress: () => void;
    gradesFiltered: propsGrades[] | null;
};

export const Bimester = ({
    bimestreNumber,
    expanded,
    onPress,
    gradesFiltered,
}: BimestreProps) => (
    <>
        <Pressable
            shadow={expanded ? 7 : 0}
            borderTopLeftRadius={bimestreNumber === 1 ? 'xl' : 0}
            borderTopRightRadius={bimestreNumber === 1 ? 'xl' : 0}
            padding={5}
            px={5}
            mb={2}
            bg={'purple.400'}
            onPress={onPress}
        >
            <HStack justifyContent={'space-between'}>
                <Text fontFamily={'heading'} fontSize={'lg'} color={'gray.100'}>
                    {`${bimestreNumber}° Bimestre`}
                </Text>
                {expanded ? (
                    <MaterialIcons name="keyboard-arrow-up" size={24} color="#F1F3F5" />
                ) : (
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="#F1F3F5" />
                )}
            </HStack>
        </Pressable>
        {expanded &&
            gradesFiltered &&
            gradesFiltered
                .filter(grade => grade.bimester === bimestreNumber)
                .map((item, index) => (
                    <HStack
                        key={index}
                        py={3}
                        px={5}
                        justifyContent="space-between"
                    >
                        <Text fontSize="md">{item.school_subject}</Text>
                        <Text
                            fontSize="md"
                            fontFamily={'heading'}
                            color={parseFloat(item.grade) >= 5 ? 'green.700' : 'red.700'}
                        >
                            {item.grade}
                        </Text>
                    </HStack>
                ))}
    </>
);