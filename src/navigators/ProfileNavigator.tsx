import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProlieSreeen } from '~screens';

const ProfileNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='ProlieSreeen' component={ProlieSreeen}/>
        </Stack.Navigator>
    )
}

export default ProfileNavigator