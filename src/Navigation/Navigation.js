//---------- imports 

// react
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// components
import Home from '../Components/Home'

// global veriable
const Stack = createNativeStackNavigator();

//---------- Component

const Navigation = () => {

    //---------- Main View

    return (

        <Stack.Navigator>

            <Stack.Screen
                name="Home"
                component={Home}
            />

        </Stack.Navigator>
    );
};

//---------- export component

export default Navigation;
