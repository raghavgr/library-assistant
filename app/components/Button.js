import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
    return(
        <TouchableOpacity style = {styles.buttonStyle} onPress = { props.onPress }>
            <Text style = {styles.textStyle}>{props.children}</Text>
        </TouchableOpacity>
    );
}

const styles = {
    buttonStyle: {
        backgroundColor: '#fff',
        borderRadius: 5,
        marginLeft: 3,
        marginRight: 3,
        height: 120,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(51, 63, 80)'
    },

    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '600'
    }
}

export default Button;
