import { StatusBar } from 'expo-status-bar'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Ionicons from 'react-native-vector-icons/Ionicons'

import ExpensesScreen from './screens/ExpensesScreen'
import ManageExpense from './screens/ManageExpense'

import { GlobalStyles } from './constants/styles'
import ExpensesContextProvider from './store/context/expenses-context'

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

const stackScreenOptions = {
    ...screenStyleOptions,
    contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
}

function getTabIcon(iconName) {
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
                initialParams={{ period: 'recent' }}
                options={{
                    title: 'Recent Expenses',
                    tabBarLabel: 'Recent',
                    tabBarIcon: getTabIcon('hourglass'),
                }}
            />
            <Tab.Screen
                name="allExpenses"
                component={ExpensesScreen}
                options={{
                    title: 'All Expenses',
                    tabBarLabel: 'All',
                    tabBarIcon: getTabIcon('calendar'),
                }}
            />
        </Tab.Navigator>
    )
}

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            <ExpensesContextProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="TabNavigator"
                        screenOptions={stackScreenOptions}
                    >
                        <Stack.Screen
                            name="ManageExpense"
                            component={ManageExpense}
                            options={{
                                presentation: 'modal',
                            }}
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
            </ExpensesContextProvider>
        </>
    )
}
