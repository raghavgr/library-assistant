import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
    return(
        <View style = { styles.containerStyle }>
            {props.children}
        </View>
    );
} 

const styles = {
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 7,
        backgroundColor: '#fff',
        height: 85,
        width: 230,
        borderRadius: 5
    }
}

export default Card;