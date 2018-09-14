import React from "react";
import { View, AsyncStorage, ActivityIndicator } from "react-native";
import { Card, Button, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import { onSignIn } from "../auth";

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

export var lib_name = '';

const storeSession = (session, cb) => {
    AsyncStorage.multiSet([['cognitoSession', JSON.stringify(session)], ['loggedIn', JSON.stringify(true)]])
      .then((result) => {
        if (cb) cb(result);
      })
      .catch(err => console.log('Error setting credentials in async', err));
  };

export default class SignInScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            library: '',
            isAuthenticating: false
        }

    }
    static navigationOptions = {
        title: 'Sign In',
        headerStyle: {
          backgroundColor: '#333F50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    };
   

    validateInput() {
        this.setState({isAuthenticating: true})
        if(this.state.username === null || this.state.password === null) {
            alert('Enter username and password');
            this.setState({isAuthenticating: false});
        } else {
            this.signIn();
        }
    }

    
      

    signIn() {
        var authenticationData = {
            Username : this.state.username,
            Password : this.state.password,
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

        const poolData = {
            UserPoolId : 'us-east-2_zFJU1vK2t',
            ClientId : '4tco3thknv6ei9avcu32nhvhum'
        };

        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var userData = {
            Username : this.state.username,
            Pool : userPool
        };
        //console.log(authenticationData);
        //console.log(userData);

        var idToken = "";
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {

                /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
                storeSession(result.idToken.payload);
                idToken = result.idToken.jwtToken;
                console.log(idToken);
                console.log(result);
                console.log(result.idToken.payload["custom:Library"]);
                onSignIn();
                //AsyncStorage.setItem(library_name, result.idToken.payload["custom:Library"]);
                this.setState({isAuthenticating: false});
                this.props.navigation.navigate("App");

            },

            onFailure: (err) => {
                console.log(cognitoUser);
                console.log(err);
                this.setState({isAuthenticating: false});

                alert("Error:  "+ err.message );
                idToken = "None";
            },

        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
        <View style={{ paddingVertical: 20 }}>
            <Card>
            <FormLabel>Username</FormLabel>
            <FormInput placeholder="Username..." autoCapitalize={('none')} onChangeText={(text) => this.setState({username: text})} />

            <FormLabel>Password</FormLabel>
            <FormInput secureTextEntry placeholder="Password..." onChangeText={(text) => this.setState({password: text})}/>


            <Button
                buttonStyle={{ marginTop: 20 }}
                backgroundColor="#64a5cb"
                

                title="SIGN IN"
                onPress={() => {
                    this.validateInput()

                    //onSignIn().then(() => this.props.navigation.navigate("App"));
                }}

                //onPress={() => onSignIn().then(() => this.props.navigation.navigate("App"))}

            />
            </Card>
            <ActivityIndicator
            size="large" 
            color="#333F50"
            animating={this.state.isAuthenticating}
            >

            </ActivityIndicator>

        </View>
        );
    }

}
