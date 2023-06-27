import { Center, Text, VStack } from "native-base";

import { useNavigation } from '@react-navigation/native'

import { Button } from "@components/Button";

import { View, Image, ImageSourcePropType } from 'react-native';


export function SignUp() {
    const navigation = useNavigation();
    const gifSource: ImageSourcePropType = require('../assets/signUpGIF.gif');


    function handleGoBack() {
        navigation.goBack();
    }


    return (
        <VStack mt={1} flex={1} /* px={12} */ /* pb={16} */>
            <VStack flex={1} background={'red.100'} w={'100%'}>
                {/*  <VStack bg={'red.100'}>
                    <Center>
                        <Text
                            fontSize={24}
                            //font-weight: 800;
                            fontFamily={'heading'}
                            fontWeight={900}
                        >PRIMEIRO ACESSO</Text>
                        <Text
                            fontFamily={'heading'}
                        >PROCESSO</Text>
                    </Center>
                </VStack> */}

                <Image
                    source={gifSource}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="stretch"
                />

            </VStack>
            <VStack px={12} mb={5}>
                <Button
                    //mt={20}
                    title="Voltar"
                    onPress={handleGoBack}
                />
            </VStack>
        </VStack>
    );
}