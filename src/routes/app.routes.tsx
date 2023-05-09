import { Platform } from "react-native";
import { useTheme } from "native-base";
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { Entypo, Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';


import { Home } from "@screens/Home";
import { Config } from "@screens/Config";
import { Contacts } from "@screens/Contacts";
import { Calendar } from "@screens/Calendar";
import { Notifications } from "@screens/Notifications";


type AppRoutes = {
    home: undefined;
    config: undefined;
    contacts: undefined;
    calendar: undefined;
    notifications: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;


const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRotes() {
    const { sizes, colors } = useTheme();

    const iconSize = sizes[8];

    return (
        <Navigator initialRouteName="home" screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.purple[600],
            tabBarInactiveTintColor: colors.gray[200],
            tabBarStyle: {
                backgroundColor: colors.gray[100],
                borderTopWidth: 0,
                height: Platform.OS === 'android' ? 'auto' : 96,
                paddingBottom: sizes[8],
                paddingTop: sizes[8]
            }
        }}>
            <Screen
                name="calendar"
                component={Calendar}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="calendar-alt" color={color} size={iconSize} width={iconSize} height={iconSize} />
                    )
                }}
            />
            <Screen
                name="contacts"
                component={Contacts}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="call" color={color} size={iconSize} width={iconSize} height={iconSize} />
                    )
                }}
            />
            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" color={color} size={iconSize} width={iconSize} height={iconSize} />
                    )
                }}
            />
            <Screen
                name="notifications"
                component={Notifications}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="notifications" color={color} size={iconSize} width={iconSize} height={iconSize} />
                    )
                }}
            />
            <Screen
                name="config"
                component={Config}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="settings-sharp" color={color} size={iconSize} width={iconSize} height={iconSize} />
                    )
                }}
            />


        </Navigator>
    );
}