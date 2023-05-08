import { Text, VStack } from "native-base";

import { useNavigation } from '@react-navigation/native'

import { Button } from "@components/Button";

export function SignUp() {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }


    return(
        <VStack mt={10} flex={1} px={12} pb={16} alignItems='center' justifyContent='center'>
            <Text>RequestAccount</Text>
            <Button
                mt={20}
                title="Voltar"
                onPress={handleGoBack}
            />
        </VStack>
    );
}