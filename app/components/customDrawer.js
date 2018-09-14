import React, { Component } from 'react';
import { Card, Header  } from 'react-native-elements';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { View, StyleSheet } from 'react-native';

class SomeCustomDrawerContentComponent extends Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
        
          <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
            <Header
                outerContainerStyles={styles.headerOuterContainer}
                
            />

            <View>
              <DrawerItems { ...this.props } />
            </View>
          </SafeAreaView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
    headerOuterContainer: {
        backgroundColor: '#006883',
        borderBottomWidth:0
      },
    });
export default SomeCustomDrawerContentComponent;