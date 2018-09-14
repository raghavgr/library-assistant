import React, { Component } from 'react';
import { Text, View } from 'react-native';

class BookInfo extends Component {
    render() {
        return(
            <View style = {styles.container}>
                <Text>
                    {this.props.isbnNum}
                </Text>
            </View>
        );
    }
}

const styles = {
    container: {
      //flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  };

export default BookInfo;