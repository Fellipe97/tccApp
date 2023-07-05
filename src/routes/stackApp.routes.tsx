import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabAppRotes } from "./tabApp.routes";

import { TermOfUse } from "@screens/TermOfUse";
import { PrivacyPolicy } from "@screens/PrivacyPolicy";

type StackAppRoutes = {
    tabHome: undefined;
    termOfUse: undefined;
    privacyPolicy: undefined;
}

export type StackAuthNavigatorRoutesProps = NativeStackNavigationProp<StackAppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<StackAppRoutes>();

export function StackAppRoutes() {
    return (
        <Navigator screenOptions={{ 
            headerShown: false, 
            animationTypeForReplace: "pop",
            animation: 'fade'
        }}>
            <Screen
                name="tabHome"
                component={TabAppRotes}
            />
            <Screen
                name="termOfUse"
                component={TermOfUse}
            />
            <Screen
                name="privacyPolicy"
                component={PrivacyPolicy}
            />
        </Navigator>
    )
}