import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabAppRotes } from "./tabApp.routes";

import { TermOfUse } from "@screens/TermOfUse";
import { PrivacyPolicy } from "@screens/PrivacyPolicy";
import { RedefinePassword } from "@screens/RedefinePassword";
import { Announcement } from "@screens/Announcement";

type StackAppRoutes = {
    tabHome: undefined;
    termOfUse: undefined;
    privacyPolicy: undefined;
    redefinePassword: undefined;
    announcement: undefined;
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
            <Screen
                name="redefinePassword"
                component={RedefinePassword}
            />
            <Screen
                name="announcement"
                component={Announcement}
            />
        </Navigator>
    )
}