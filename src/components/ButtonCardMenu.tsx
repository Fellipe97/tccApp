import { Button as ButtonNativeBase, IButtonProps, Text, Icon, Center, VStack } from "native-base";
import { AntDesign } from '@expo/vector-icons'

type Props = IButtonProps & {
    title: string,
    icone: React.ReactElement,
    color: "blueButton" | "redButton" | "orangeButton" | "greenButton"
}

export function ButtonCardMenu({ title, icone, color, ...rest }: Props) {
    let buttonColor = "blue.600";
    let buttonColorHover = "blue.500";
   /*  if (color === "blueButton") {
        buttonColor = "blue.500";
    } */
    if (color === "redButton") {
        buttonColor = "red.600";
        buttonColorHover = "red.500";
    }
    if (color === "orangeButton") {
        buttonColor = "orange.600";
        buttonColorHover = "orange.500";
    }
    if (color === "greenButton") {
        buttonColor = "green.600";
        buttonColorHover = "green.500";
    }


    return (
        <ButtonNativeBase
            h={100}
            w={150}
            rounded='lg'
            bg={buttonColor}
            _pressed={{
                bg:buttonColorHover
            }}

            {...rest}
        >
            <Center>
                {icone}
                <Text
                    fontFamily={'heading'}
                    fontSize={18}
                >{title}</Text>
            </Center>
        </ButtonNativeBase >
    );
}