import { Animated, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonScale = ({ children, onPress = () => { } }) => {
    const animation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0.95];
    const scale = animation.interpolate({ inputRange, outputRange });

    const onPressIn = () => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    const onPressOut = () => {
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };
    return (
        <Animated.View
            style={{
                transform: [{ scale }]
            }}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        </Animated.View>
    )
}

export default ButtonScale