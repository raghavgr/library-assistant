import React, {Component} from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { BarCodeScanner } from 'expo';
import _ from 'lodash';

export default class AddUserBarcode extends Component {

  constructor(props){
    super(props);
    this.state = { 
      isLoading: true,
      libName: ''
    }

    this._handleBarCodeRead = _.debounce(this._handleBarCodeRead, 600);
  }

  async componentDidMount() {
    var value;
    await AsyncStorage.multiGet(['cognitoSession', 'loggedIn']).then(
      response => {
        value = JSON.parse(response[0][1]);
      }
    );
    this.setState({libName: value['custom:Library']});  
  }

  render() {
    return (
      <BarCodeScanner
        onBarCodeRead={this._handleBarCodeRead}
        style={[StyleSheet.absoluteFill, styles.container]}
      >
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </BarCodeScanner>
    );
  }

  _handleBarCodeRead = data => {
    let isbn = data.data;
    console.log(isbn)
    console.log(this.props.navigation.state.params.fname)
    console.log("in handle");
    fetch('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/reader', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'barCode': isbn,
        'firstName': this.props.navigation.state.params.firstName,
        'middleName': this.props.navigation.state.params.middleName,
        'lastName': this.props.navigation.state.params.lastName,
        'libraryName': this.state.libName,
      })
    })
      .then((response) => {
        if (response.status == 400) {
          console.log(response.status)
          //console.log(response)
          alert('Could not add User, please try again.');
          this.props.navigation.navigate('Home');

        }
        else {
          console.log(response.status)
          console.log(response)
          alert('User added Successfully.');
          this.props.navigation.navigate('Home');
        }
      })
    
  }
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  },
});


