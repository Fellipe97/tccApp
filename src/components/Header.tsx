import { Center, HStack, Text, VStack, Button } from "native-base";

import { useNavigation } from '@react-navigation/native'
import IconeVoltar from "@assets/iconeVoltar.svg"
import { MaterialIcons } from '@expo/vector-icons';



/* import { Button } from "@components/Button";
 */

type Props = {
    title: string;
    buttonBack?: boolean;
}

export function Header({title, buttonBack=true}: Props) {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }


    return (
        <VStack
            w={'100%'}
            height={24}
            /* background={'red.100'} */
            justifyContent={'flex-end'}
        >
            <HStack alignItems="center" >
                {buttonBack &&
                    <Button 
                        onPress={handleGoBack} 
                        bg="transparent" 
                        p={0} 
                        position="absolute"
                        left={8}
                        zIndex={2}
                        _pressed={{
                            bg:"transparent",
                            opacity: .3
                        }}
                    >
                        {/* <IconeVoltar /> */}
                        <MaterialIcons name="arrow-back-ios" size={20} color="#8257E6" />
                    </Button>
                }

                <VStack flex={1} /* 
                 */>
                    <Center>
                        <Text
                            fontFamily={'heading'}
                            fontSize={24}
                            color={'purple.600'}
                        >{title}</Text>  
                    </Center>
                </VStack>

            </HStack>

        </VStack>
    );
}