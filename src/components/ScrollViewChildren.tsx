import { Spinner, Center, Image, VStack, Text, ScrollView, Pressable, HStack, Avatar } from 'native-base'

import LogoSvg from '@assets/logo.svg'
import { childrenProps } from '../types/children'


type Props = {
    isActive ?: boolean;
    item: childrenProps;
    onPress: () => void
}

export function ScrollViewChildren({ isActive = false, item, onPress}: Props) {
    return (
        <Pressable
            width={isActive ? 193 : 190}
            height={100}
            bg={'white'}
            rounded={10}
            shadow={7}
            ml={2}
            mr={2}
            //key={index}
            borderColor={'purple.600'}
            borderWidth={ isActive ? 3 : 0}            
            _pressed={{
                opacity: .7
            }}
            onPress={onPress}
        >
            <HStack h={'full'}>

                <VStack w={'60%'} p={3} justifyContent={'center'}>
                    <Text
                        fontFamily={'heading'}
                        fontSize={'md'}
                    >{item.name.split(" ")[0] + '\n' + item.name.split(" ")[1]}</Text>
                    <Text
                        fontFamily={'body'}
                        color={'gray.500'}
                    >{item.registration}</Text>

                </VStack>

                <VStack w={'40%'} /* bg={'green.100'} w={'30%'} */
                    justifyContent={'center'}
                    alignItems={'center'}
                >

                    <Avatar bg="gray.500" size={'lg'} shadow={7} source={{
                        uri: item.photograph
                    }}>
                        ...
                    </Avatar>

                </VStack>

            </HStack>
        </Pressable>
    );
}