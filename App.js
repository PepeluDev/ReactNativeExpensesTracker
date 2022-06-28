import { StatusBar } from 'expo-status-bar'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Ionicons from 'react-native-vector-icons/Ionicons'

import ExpensesScreen from './screens/ExpensesScreen'
import ManageExpense from './screens/ManageExpense'

import { GlobalStyles } from './constants/styles'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const screenStyleOptions = {
    headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
    headerTintColor: 'white',
}

const tabScreenOptions = {
    ...screenStyleOptions,
    tabBarStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
    },
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
}

function getDrawerIconFunction(iconName) {
    return ({ color, size }) => (
        <Ionicons name={iconName} color={color} size={size} />
    )
}

function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={tabScreenOptions}>
            <Tab.Screen
                name="recentExpenses"
                component={ExpensesScreen}
                options={{
                    title: 'Recent Expenses',
                    tabBarLabel: 'Recent',
                    tabBarIcon: getDrawerIconFunction('hourglass'),
                }}
            />
            <Tab.Screen
                name="allExpenses"
                component={ExpensesScreen}
                options={{
                    title: 'All Expenses',
                    tabBarLabel: 'All',
                    tabBarIcon: getDrawerIconFunction('calendar'),
                }}
            />
        </Tab.Navigator>
    )
}

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="TabNavigator">
                    <Stack.Screen
                        name="ManageExpense"
                        component={ManageExpense}
                    />
                    <Stack.Screen
                        name="TabNavigator"
                        component={TabNavigator}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}
