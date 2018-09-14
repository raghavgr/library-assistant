import React, {Component} from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';

import Button from '../components/Button';
import Card from '../components/Card';

class ThirdScreen extends Component {
    render() {
        return(
            // <ImageBackground source = { {uri: 'https://www.somervillepubliclibrary.org/sites/default/files/reading.png'}}
            // style = { styles.backgroundStyle } >
                <View style = {styles.container}>
                    <View style = { styles.cardContainer }>
                        <Card>
                            <View style = { styles.iconContainer }>
                                <Icon size = { 42 } name = 'check-circle'/>
                            </View>
                            <View style = { styles.textContainer }>
                                <Text>Return Successful!</Text>
                            </View>
                        </Card>

                        <Card>
                            <View style = { styles.iconContainer }> 
                                <Icon size = { 42 } type = 'font-awesome' name = 'book' />
                            </View>
                            <View style = { styles.textContainer }>
                                <Text>{ this.props.navigation.state.params.title }</Text>
                            </View>
                        </Card>
                    </View>
                    
                    <View style = { styles.buttonContainer }>
                        <Button onPress = { () => this.props.navigation.navigate('FirstPage') }>
                            Return Another Book
                        </Button>
                        <Button onPress = { () => this.props.navigation.navigate('HomeScreen') }>
                            Return to Home
                        </Button>
                    </View>
                </View>
            // </ImageBackground>
        );
    }
}

const styles = {
    container: {
      flex: 1,
      backgroundColor: 'rgb(138,187,216)',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor: '#008000'
        marginBottom: 7
    },

    cardContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    backgroundStyle: {
        height: '100%',
        width: '100%'
    },

    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },

    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
  };

  export default ThirdScreen;