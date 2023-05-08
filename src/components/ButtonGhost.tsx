//ButtonGhost.tsx
import { Pressable, Button, IButtonProps, Text } from "native-base";

type Props = IButtonProps & {
    title: string;
    colorButton?: 'sucess' | 'cancel';
}

export function ButtonGhost({ title, colorButton = 'sucess', ...rest }: Props) {
    return (
        <Pressable
            variant="ghost"
            {...rest }
        >
            <Text
                color={colorButton == 'sucess' ? 'purple.600' : 'red.500'}
                fontSize="md"
                fontFamily='heading'
            >
                {title}
            </Text>
        </Pressable>
    );
}