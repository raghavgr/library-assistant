import { createStackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import {  StyleSheet, Text, View, Button, Alert, } from 'react-native';
import { Card, FormLabel, FormInput } from "react-native-elements";
import { StackNavigator } from 'react-navigation'; // 2.6.2
import {  BarCodeScanner, Permissions } from 'expo';
// import './global.js';
class MainActivity extends Component {

  static navigationOptions =
    {
      title: 'EDIT USER',
    };

  FunctionToOpenSecondActivity = () => {
    this.props.navigation.navigate('Second');

  }


  render() {
    return (
      <View style={styles.MainContainer}>

        <View style={{ marginBottom: 20 }}>

          <Text style={styles.TextStyle}>Scan your Barcode </Text>

        </View>

        <Button onPress={this.FunctionToOpenSecondActivity.bind(this)} title='Edit User' />

      </View>
    );
  }
}

class SecondActivity extends Component {
  static navigationOptions =
    {
      title: 'Scanning User Barcode',
    };
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
    };
  }
  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  typeToString(type) {
    switch (type) {
      case 32: return "ISBN";
      default: return type;
    }
  }

  getTitleFromApi(URL) {
    return fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  FunctionToOpenEditUserActivity(readerBarcode) {
    this.props.navigation.navigate('Third', { readerBarcode: readerBarcode });
    // this.props.navigation.navigate('Third', { readerBarcode });
  }

  _handleBarCodeRead = (data) => {
    const myData = data.data;
    //alert(myData);
    readerBarcode = myData;
    //const myType = this.typeToString(data.type);
    //let URL ='https://www.googleapis.com/books/v1/volumes?q=isbn:' + myData;
    this.FunctionToOpenEditUserActivity(readerBarcode);

    /*this.getTitleFromApi(URL).then(result => {
      Alert.alert(
        'The code has read the following info',
        myType + " : " + myData + "\nTitle: " + JSON.stringify(result.items[0].volumeInfo.title)
      )
      //alert(JSON.stringify(result.items[0].volumeInfo.title));
    });
  */

  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{ height: 200, width: 200 }}
            />
        }
      </View>
    );
  }
}

class EditUserActivity extends Component {

  static navigationOptions =
    {
      title: 'User Information'
    };
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      middleName: null,
      lastName: null,
      data: null,
      readerBarcode: null,
      library: null,
      fn: null,
      mn: null,
      ln: null,
    };
  }

  //handling button update
  handleChangeFN(target) {
    this.setState({firstName: target});    
  }
  handleChangeMN(target) {
    this.setState({middleName: target});    

  }
  handleChangeLN(target) {
    this.setState({lastName: target});    

  }
  

  publish(){
    this.readerBarcode = this.props.navigation.state.params.readerBarcode;
    alert("Successfully Updated");
    this.props.navigation.navigate('HomeScreen');

    //alert(this.state.firstName, this.state.middleName, this.state.lastName,this.readerBarcode,this.state.library);
    console.log(this.state.firstName, this.state.middleName, this.state.lastName,this.readerBarcode,this.state.library);
    
    
    fetch("https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/reader/", {
  method: "PUT",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },  

  //make sure to serialize your JSON body
  body: JSON.stringify({
    "barCode" : this.readerBarcode,
    "firstName" : this.state.firstName,
    "middleName" : this.state.middleName,
    "lastName" : this.state.lastName,
    "libraryName" : this.state.library
  })
})
    .then((response) => {
      if(response.status == 400) {
        console.log(response.status);      
      }
      else {
        console.log(response.status);
        console.log(response);
      }
  })


  }

  componentDidMount() {
    //this.setState({readerBarcode: this.props.readerBarcode});
    this.readerBarcode = this.props.navigation.state.params.readerBarcode;
    //this.readerBarcode = '5555555';
    //this.setState({readerBarcode:'5555555'});

    let URL = 'https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/reader/' + this.readerBarcode;

    fetch(URL)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ middleName: responseJson.MiddleName },
          this.setState({firstName: responseJson.FirstName}),
          this.setState({lastName: responseJson.LastName}),
          this.setState({library:responseJson.LibraryName})
        );
        //this.state.middleName = responseJson.MiddleName;
      })

    //alert(this.data);

    /*
   this.getUserInfoByBarcode(URL).then(result => {
     this.result = result;
     this.middleName = result.MiddleName;
     alert(this.middleName);
     this.render();
     //Alert.alert(JSON.stringify(this.middleName));
   })
   //.then(this.middleName = this.setState(Readresult.MiddleName));
   //alert(this.result);
 */
  }

  getUserInfoByBarcode(URL) {
    return fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      });
  }

  FunctionToOpenLanding = () => {
   // this.props.navigation.navigate('First');
   this.props.navigation.navigate('HomeScreen');


  }
  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <FormLabel>First Name</FormLabel>
          <FormInput 
          name="fn"
          placeholder={this.state.firstName}
          value = {this.state.fn}
          onChangeText={(target) => this.handleChangeFN(target)} />

          <FormLabel>Middle Name</FormLabel>
          <FormInput 
          name ="mn"
          placeholder={this.state.middleName} 
          value = {this.state.mn}
          onChangeText={(target) => this.handleChangeMN(target)} />
          
          <FormLabel>Last Name</FormLabel>
          <FormInput 
          name="ln"
          placeholder={this.state.lastName}
          value ={this.state.ln}
          onChangeText={(target) => this.handleChangeLN(target)} />
          
          <FormLabel>{this.state.library}</FormLabel>
          <FormLabel></FormLabel>
          
          
          <FormLabel></FormLabel>
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#00994c"
            value = "Send"
            title = "Update"
            onPress = {() => this.publish()}>
          </Button>
          <FormLabel></FormLabel>

          <Button 
          buttonStyle = {{marginTop: 20}}
          backgroundColor= "#ff3333"
          title = "Cancel"
          onPress = {() => this.FunctionToOpenLanding()}>
          </Button>
          
          
        </Card>
      </View>
    );
  }
}


const App = createStackNavigator(
  {
    First: { screen: MainActivity },

    Second: { screen: SecondActivity },

    Third: { screen: EditUserActivity },
  });

export default App;
const styles = StyleSheet.create(
  {
    MainContainer:
    {
      justifyContent: 'center',
      flex: 1,
      backgroundColor: 'rgb(138, 187 ,216)'
      // margin: 10

    },

    TextStyle:
    {
      fontSize: 23,
      textAlign: 'center',
      color: '#000',
    },

  });