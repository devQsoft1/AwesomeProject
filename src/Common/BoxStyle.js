//--------- imports 

// react
import React from 'react';
import {
    View
} from 'react-native';

// style
import Style  from './Style';

//---------- components

const BoxStyle = (props) => {

    //---------- main view

    return (
        <View style={[Style.boxStyle, props.parentsStyle]}>
            {
                props.children
            }
        </View>
    );
};

//---------- exports

export default BoxStyle;
