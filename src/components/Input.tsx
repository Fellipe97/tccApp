import { Input as NativeBaseInput, IInputProps, FormControl } from "native-base";

type Props = IInputProps & {
    errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
    const invalid = !!errorMessage || isInvalid;

    return (
        <FormControl isInvalid={invalid} mb={4}>
            <NativeBaseInput
                bg="backgroundColor"
                h={14}
                px={4}
                borderWidth={2}
                fontSize="md"
                color="black"
                fontFamily="body"
                placeholderTextColor="gray.500"
                isInvalid={invalid}
                _invalid={{
                    borderColor: 'red.500'
                }}
                _focus={{
                    bg: "backgroundColor",
                    //borderBottomColor: "green.500" deu efeito diferente, podemos tentar
                    borderColor: "purple.600"
                }}
                {...rest}
            />

            <FormControl.ErrorMessage _text={{color:'red.500'}}>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}