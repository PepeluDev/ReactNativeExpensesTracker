import { View, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

const ExpensesHeader = ({ timeRange, totalAmount }) => {
    return (
        <View style={styles.rootContainer}>
            <Text style={styles.textStyle}>{timeRange}</Text>
            <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>
                ${totalAmount.toFixed(2)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: GlobalStyles.colors.primary400,
        alignItems: 'center',
    },
    textStyle: {
        color: GlobalStyles.colors.accent500,
        fontSize: 18,
    },
})

export default ExpensesHeader
