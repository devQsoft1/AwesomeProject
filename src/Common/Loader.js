//---------- Imports

// react
import React from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native'

//---------- component

const Loader = (props) => {

    //---------- view

    // center view
    if (props.type.toLowerCase() === 'center') {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator color={props.color ? props.color : '#000'} />
            </View>
        )
    }

    // default
    return (
        <ActivityIndicator color={props.color ? props.color : '#000'} />
    )
}

//---------- export component

export default Loader;

