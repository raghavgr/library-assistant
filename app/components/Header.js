import React from 'react';
import { View, Text } from 'react-native';

//Make a component
const Header = (props) => {
    const { textStyle } = styles;
    const { viewStyle } = styles;

    return (
        <View style = { viewStyle }>
            <Text style = { textStyle }>{props.headerText}</Text>
        </View>    
    );
}

const styles = {
    textStyle: {
        fontSize: 28,
        color: '#fff',
        fontWeight: '700'
    },
    
    viewStyle: {
        backgroundColor: 'rgb(51, 63, 80)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 80,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        elevation: 2,
        position: 'relative'
    }
};

//Make component available to other parts of app
export default Header;