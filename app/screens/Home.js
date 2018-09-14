import React from 'react';
import { StyleSheet, View,TouchableHighlight, Image, AsyncStorage } from 'react-native';
import { Text, Button, Header } from 'react-native-elements';

/**
 *

 */
export default class Home extends React.Component {

    constructor(props){
        super(props);
    
        this.state = {
            library: ''
        }
      }

    async componentDidMount() {
        var value;
        await AsyncStorage.multiGet(['cognitoSession', 'loggedIn']).then(response => {
            value = JSON.parse(response[0][1]);
        });
        this.setState({library: value["custom:Library"]});
        console.log(value["custom:Library"]);
        console.log(value.email);
    }
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',}}>
                <Header
                outerContainerStyles={styles.headerOuterContainer}
                leftComponent={{
                    icon: 'menu',
                    color: '#fff',
                    onPress: () => this.props.navigation.openDrawer(),
                    size: 30,
                }}
                centerComponent={{
                    text: 'HOME',
                    style: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
                }}
                rightComponent={{
                    icon: 'log-out',
                    type: 'entypo',
                    color: '#fff' ,
                    onPress: () => this.props.navigation.navigate('Exit'),
                    size:25,
                }}
                />
                <View style={{
                        flex: 1,
                        backgroundColor: '#333F50',
                        justifyContent: 'center'}}>
                        <Text style={{textAlign: 'right',color: 'white',fontSize: 20,paddingRight: 20}}><Text style={{color: '#8abbd8', fontWeight: 'bold'}}>Library:</Text> {this.state.library.charAt(0).toUpperCase() + this.state.library.slice(1)} </Text>

                </View>
                <View style={{
                    flex: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                        <TouchableHighlight underlayColor = "#808080"
                        onPress={() => this.props.navigation.navigate('AddUserScreen')}
                        style={styles.Button}>
                        <Image source={require('../images/addUser.png')}
                        style={{flex: 1,
                            alignSelf: 'stretch',
                            width: undefined,
                            height: undefined}}
                        />
                        {/* <Text> ADD USER </Text> */}
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor = "#808080"
                        onPress={() => this.props.navigation.navigate('OverdueScreen')}
                        style={styles.Button}>
                        <Image source={require('../images/overdue.png')}
                        style={{flex: 1,
                            alignSelf: 'stretch',
                            width: undefined,
                            height: undefined}}
                        />
                        {/* <Text> ADD USER </Text> */}
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor = "#808080"
                        onPress={() => this.props.navigation.navigate('CheckOutScreen')}
                        style={styles.Button}>
                        <Image source={require('../images/checkout.png')}
                        style={{flex: 1,
                            alignSelf: 'stretch',
                            width: undefined,
                            height: undefined}}
                        />
                        {/* <Text> ADD USER </Text> */}
                        </TouchableHighlight>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                        <TouchableHighlight underlayColor = "#808080"
                        onPress={() => this.props.navigation.navigate('EditUserScreen')}
                        style={styles.Button}>
                        <Image source={require('../images/editUser.png')}
                        style={{flex: 1,
                            alignSelf: 'stretch',
                            width: undefined,
                            height: undefined}}
                        />
                        {/* <Text> ADD USER </Text> */}
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor = "#808080"
                        onPress={() => this.props.navigation.navigate('InventoryScreen')}
                        style={styles.Button}>
                        <Image source={require('../images/inventory.png')}
                        style={{flex: 1,
                            alignSelf: 'stretch',
                            width: undefined,
                            height: undefined}}
                        />
                        {/* <Text> ADD USER </Text> */}
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor = "#808080"
                        onPress={() => this.props.navigation.navigate('FirstPage')}
                        style={styles.Button}>
                        <Image source={require('../images/return.png')}
                        style={{flex: 1,
                            alignSelf: 'stretch',
                            width: undefined,
                            height: undefined}}
                        />
                        {/* <Text> ADD USER </Text> */}
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    headerOuterContainer: {
        backgroundColor: '#006883',
        borderBottomWidth:0
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Button: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#1c2f21',
    backgroundColor: '#e1e1e2'
  },
});
