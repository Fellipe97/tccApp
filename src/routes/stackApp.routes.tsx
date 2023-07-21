import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabAppRotes } from "./tabApp.routes";

import { TermOfUse } from "@screens/TermOfUse";
import { PrivacyPolicy } from "@screens/PrivacyPolicy";
import { RedefinePassword } from "@screens/RedefinePassword";
import { Announcement } from "@screens/Announcement";
import { Grades } from "@screens/Grades";
import { Frequency } from "@screens/Frequency";
import { Financial } from "@screens/Financial";

type StackAppRoutes = {
    tabHome: undefined;
    termOfUse: undefined;
    privacyPolicy: undefined;
    redefinePassword: undefined;
    announcement: undefined;
    grades: undefined;
    frequency: undefined;
    financial: undefined;
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
            <Screen
                name="grades"
                component={Grades}
            />
            <Screen
                name="frequency"
                component={Frequency}
            />
            <Screen
                name="financial"
                component={Financial}
            />
        </Navigator>
    )
}