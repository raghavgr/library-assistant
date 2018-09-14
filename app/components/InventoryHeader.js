import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    // padding: 8,
    // width: 50, 
    // height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgb(51, 63, 80)',
    justifyContent: 'flex-start',
  },
});

const InventoryHeader = (props) => (
  <View style={styles.container}>
    <Text style={{textAlign: 'right',color: 'white',fontSize: 30,fontWeight: 'bold'}}>           INVENTORY </Text>
  </View>
);

export default InventoryHeader;