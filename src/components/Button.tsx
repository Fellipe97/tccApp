import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
    title: string;
}


export function Button({ title, ...rest }: Props) {
    return (
        <ButtonNativeBase
            w="full"
            h={14}
            bg="purple.600"
            borderWidth={0}
            rounded='sm'
            _pressed={{
                bg: "purple.500"
            }}
            shadow={7}
            {...rest}
        >
            <Text
                color="white"
                fontFamily="heading"
                fontSize="lg"
            >
                {title}
            </Text>
        </ButtonNativeBase>
    )
}