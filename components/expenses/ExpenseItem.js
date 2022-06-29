import { View, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

const ExpenseItem = ({ intemName, date, amount }) => {
    return (
        <View style={styles.rootContainer}>
            <View>
                <Text>{intemName}</Text>
                <Text style={styles.dateText}>{date.toDateString()}</Text>
            </View>
            <View style={styles.amoutContainer}>
                <Text>${amount.toFixed(2)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: GlobalStyles.colors.primary300,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 5,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    dateText: {
        fontSize: 8,
    },
    amoutContainer: {
        paddingVertical: 2,
        paddingHorizontal: 7,
        borderRadius: 8,
        backgroundColor: GlobalStyles.colors.primary200,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 80,
    },
})

export default ExpenseItem