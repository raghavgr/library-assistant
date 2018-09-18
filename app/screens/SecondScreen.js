
import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { BarCodeScanner } from 'expo';
import   _ from 'lodash';
import { AsyncStorage } from '@aws-amplify/core';


class SecondScreen extends Component {

  constructor(props) {
    super(props);

    this.state= {
        //results: null
        libName: '',
        results: []
    }
    this.fetchData = this.fetchData.bind(this);
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

  // fetchData(URL) {
  //   return fetch(URL)
  //     .then((response) => response.json())
  //     .then((responseData) => { return responseData })
  //     //.catch((error) => { console.log(error)})
  // }

  // postData(URL, isbn) {
  //   return fetch(URL, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       'libraryName': 'lib1',
  //       'bookBarcode': '18263'
  //     })
  //   })
  //   .then((response) => response.json())
  //   .then((responseData) => {
  //     return responseData
  //   })
    // .catch((error) => {
    //   console.error(error)
    // })
  // }


  fetchData(URL) {
    return fetch(URL)
      .then((response) => response.json())
      .then((responseData) => {
        return responseData 
      })
      .catch((error) => {
        console.error(error)
      })
  }


  _handleBarCodeRead = data => {
    let isbn = data.data; 
    let URL = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn;
    // let URL = 'https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/book'

    this.fetchData(URL).then(bookResult => {
      //console.log(bookResult)
      this.setState({ results: bookResult })
      //console.log(this.state.results.items[0].volumeInfo.title)
      //alert('The code has read the following info' + isbn + '\nTitle: ' + this.state.results.items[0].volumeInfo.title)
      
      fetch('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/return', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // 'barCode': '77777777',
        // 'firstName': 'MICHAEL',
        // 'middleName': 'C',
        // 'lastName': 'CHANG',
        'libraryName': this.state.libName, //libName
        'bookBarcode': isbn //186461
      }),
    })
      //.then((response) => response.json())
      //.then((responseJson) => { console.log(responseJson.status) }) 
      .then((response) => {
        if (response.status == 400) {
          console.log(response.status)
          // console.log(isbn)
          // console.log(response)
          alert('Return unsuccessful, please try again.');
        }
        else {
          console.log(response.status)
          console.log(response)
          alert(this.state.libName);
          this.props.navigation.navigate('ThirdPage', { title: this.state.results.items[0].volumeInfo.title });
        }
      })

      // this.props.navigation.navigate('ThirdPage', { title: this.state.results.items[0].volumeInfo.title});
      // this.props.navigation.navigate('ThirdPage', { title: this.state.results[0].Title });
    })
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

export default SecondScreen;