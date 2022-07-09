import { Pressable, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const IconButton = ({ onPress, iconName, color, size, style }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [style, pressed && styles.pressed]}
        >
            <Ionicons name={iconName} size={size || 34} color={color} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.5,
    },
})

export default IconButton
