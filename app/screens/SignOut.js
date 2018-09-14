import React from "react";
import { View, AsyncStorage } from "react-native";
import { Card, Button, Text, Header } from "react-native-elements";
import { onSignOut } from "../auth";
import { bold } from "ansi-colors";

export default class SignOutScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
    };
    constructor(props){
      super(props);
  
      this.state = {
          username: '',
          email: '',
          fullname: '',
          initials: '',
          library: ''
      }
    }
    async componentDidMount() {
        var value;
        await AsyncStorage.multiGet(['cognitoSession', 'loggedIn']).then(response => {
            value = JSON.parse(response[0][1]);
        });
        this.setState({library: value["custom:Library"]});
        fullname = value.name + ' ' + value.family_name;
        initials = value.name[0]+ value.family_name[0];
        this.setState({username: value.name});
        this.setState({fullname: fullname});
        this.setState({initials: initials.toUpperCase()});
        this.setState({email: value.email});
        console.log(value["custom:Library"]);
        console.log(value.email);
    }

    /**
     * Signing out and removing cognito data from AsyncStorage
     */
    async signOut() { 
      return await AsyncStorage.multiRemove(['cognitoSession', 'loggedIn']);
    }
    
    render() {
    return (
      
        <View style={{ paddingVertical: 20 }}>
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.props.navigation.openDrawer(),
            size: 30,
          }}
          centerComponent={{
            text: "Profile",
            style: { color: "white", fontSize:25, fontWeight: 'bold' },
            
          }}
          outerContainerStyles={{ backgroundColor: "#333F50" }}
      
        />  
        <Card title={this.state.fullname}>
          <View
            style={{
              backgroundColor: "#bcbec1",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: "center",
              marginBottom: 20
            }}
          >
            <Text style={{ color: "white", fontSize: 28 }}>{this.state.initials}</Text>
           
          </View>
          <View 
            style={{
              alignItems: "center",
              justifyContent: "center",
              
              alignSelf: "center",
              marginBottom: 20
            }}
          >
          <Text style={{ color:'black', fontSize: 18}}>Email: {this.state.email}</Text>
          <Text style={{ color:'black', fontSize: 18}}>Library: {this.state.library}</Text>

          </View>
          

          <Button
            backgroundColor="#64a5cb"
            fontFamily="Avenir Next"
            
            title="SIGN OUT"
            onPress={() => onSignOut().then(() => this.props.navigation.navigate("Auth"))}
          />
        </Card>
      </View>
    );
    }
}