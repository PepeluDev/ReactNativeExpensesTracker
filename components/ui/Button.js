import { View, StyleSheet, Text, Pressable } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

const Button = ({ children, onPress, mode, style }) => {
    return (
        <View style={style}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => pressed && styles.pressed}
            >
                <View
                    style={[
                        styles.button,
                        mode === 'flat' && styles.flatButton,
                    ]}
                >
                    <Text
                        style={[
                            styles.text,
                            mode === 'flat' && styles.flatText,
                        ]}
                    >
                        {children}
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary300,
    },
    flatButton: {
        backgroundColor: GlobalStyles.colors.primary200,
    },
    text: {
        color: GlobalStyles.colors.primary500,
        textAlign: 'center',
    },
    flatText: {
        color: GlobalStyles.colors.primary400,
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4,
    },
})

export default Button
