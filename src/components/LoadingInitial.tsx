import {Spinner, Center, Image} from 'native-base'

import LogoSvg from '@assets/logo.svg'


export function LoadingInitial(){
    return(
        <Center flex={1} bg={'gray.100'}>
            <LogoSvg />
            <Spinner color="purple.600" size='lg' mt={8}/>
        </Center>
    );
}