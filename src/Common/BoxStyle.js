import React from 'react';
import {
    View
} from 'react-native';
import Style  from './Style';

const BoxStyle = (props) => {

    return (
        <View style={[Style.boxStyle, props.parentsStyle]}>
            {
                props.children
            }
        </View>
    );
};

export default BoxStyle;
