import React from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
// import { onSignIn } from "../auth";

this.state = {
  fname: null,
  mname: null,
  lname: null
}


export default class App extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, paddingVertical: 20, backgroundColor: 'rgb(138, 187, 216)' }}>
      <Card>
        <FormLabel>First Name</FormLabel>
        <FormInput placeholder="First Name..." onChangeText={(text) => this.setState({fname: text})}/>
        <FormLabel>Middle Name (optional)</FormLabel>
        <FormInput placeholder="Middle Name..." onChangeText={(text) => this.setState({mname: text})}/>
        <FormLabel>Last Name</FormLabel>
        <FormInput placeholder="Last Name..." onChangeText={(text) => this.setState({lname: text})}/>
  
        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="rgb(51, 63, 80)"
          title="ADD BARCODE"
          onPress= { () => this.props.navigation.navigate('AddUserBarcodeScreen', {firstName: this.state.fname, middleName: this.state.mname, lastName: this.state.lname})} 
        />
      </Card>
      </View>
    );
  }
}
