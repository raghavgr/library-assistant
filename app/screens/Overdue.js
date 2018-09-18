import React, { Component } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, View, AsyncStorage } from 'react-native';
import Header from '../components/Header'
import Row from '../components/Row'


export default class App extends Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  async componentDidMount(){
    // return fetch('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/book')
    //   .then((response) => {
    //       console.log(response)
    //       return response.json()
    //   })
    //   .then((responseJson) => {
    //     console.log(responseJson)  
    //     this.setState({
    //     isLoading: false,
    //     dataSource: responseJson,
    //     }

    //     );

    // })
    //   .catch((error) =>{
    //     console.error(error);
    //   });
    var value;
    await AsyncStorage.multiGet(['cognitoSession', 'loggedIn']).then(
      response => {
        value = JSON.parse(response[0][1]);
      }
    );
    this.setState({libName: value['custom:Library']}); 
    var url = 'https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/book/overdue/?libraryName=' + this.state.libName

    // need to create variable for the libraryName and then append to URL
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            //console.log(response)
            return response.json()
        })
        .then((responseJson) => {
            //console.log(responseJson)
            this.setState({
                isLoading: false,
                dataSource: responseJson.Items
            })
        })
        
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, backgroundColor: 'rgb(138, 187, 216)' }}>
          <View style = { styles.headerView }>
              <Header headerText = { "OVERDUE BOOKS" }/>
          </View>
          <FlatList
            contentContainerStyle={styles.container}
            data={this.state.dataSource}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <Row {...item} />}
            // ListHeaderComponent={() => <Header headerText = { "OVERDUE BOOKS" }/>}
            // ListFooterComponent={() => <Footer />}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgb(138,187,216)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  ovalShapeView: {
    marginTop: 10,
    width: 320,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerView: {
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    
  },
})