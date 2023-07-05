import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
    title: string;
    subTitle: string;
}


export function ButtonConfig({ title, subTitle,  ...rest }: Props) {
    return (
        <ButtonNativeBase
            w="full"
            //h={14}
            bg="gray.100"
            borderWidth={0}
            rounded='md'
            shadow={7}
            justifyContent={'flex-start'}
            _pressed={{
                bg:"gray.100",
                opacity: .9
            }}
            {...rest}
        >
            <Text
                color="purple.500"
                fontFamily="heading"
                fontSize="lg"
                ml={2}
            >
                {title}
            </Text>
            <Text
                color="gray.500"
                fontFamily="heading"
                fontSize="sm"
                ml={2}
            >
                {subTitle}
            </Text>
        </ButtonNativeBase>
    )
}