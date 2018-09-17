import React from 'react';
import { StyleSheet, View,TouchableHighlight, Image, AsyncStorage } from 'react-native';
import { Text, Button, Icon} from 'react-native-elements';
import Row from '../components/Row';

/**
 *

 */
export default class Home extends React.Component {
    static navigationOptions = ({ navigation }) => {
       return {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#006883',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: (
              <Button 
                
                onPress={() => navigation.navigate('Exit')}
                icon={{
                    name: 'exit-to-app',
                    size: 15,
                    color: 'white'
                  }}
                title="Exit"
                
                backgroundColor="#006884"
              />
          ),
       };
    };
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

                <View style={{
                        flex: 1,
                        backgroundColor: '#333F50',
                        justifyContent: 'center'}}>
                        <Text style={{textAlign: 'right',color: 'white',fontSize: 14,paddingRight: 20}}><Text style={{color: '#8abbd8', fontWeight: 'bold'}}>Library:</Text> {this.state.library.charAt(0).toUpperCase() + this.state.library.slice(1)} </Text>

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
        borderBottomWidth:0,
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

/**
 
                <Header
                outerContainerStyles={styles.headerOuterContainer}
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
 */