import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, ActivityIndicator, View } from 'react-native';
import InventoryHeader from '../components/InventoryHeader';
import Footer from '../components/Footer';
import Row from '../components/Row';
import { reject } from 'rsvp';



export default class Inventory extends Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://p0kvnd5htd.execute-api.us-east-2.amazonaws.com/test/book')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch(err => reject(err));
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
      <View style={{flex: 1, backgroundColor: 'rgb(138, 187, 216)'}}>
          <FlatList
            style={styles.container}
            data={this.state.dataSource}
            renderItem={({item}) => <Row {...item} />}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => <InventoryHeader />}
            ListFooterComponent={() => <Footer />}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgb(138, 187, 216)',
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
})