// import React from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   ovalShapeView: {
//     marginTop: 10,
//     width: 320,
//     height: 50,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     borderRadius: 10
//   },
//   text: {
//     marginLeft: 12,
//     fontSize: 16,
//   },
//   photo: {
//     height: 40,
//     width: 40,
//     borderRadius: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// const Row = (props) => {
//   return (
//   // <View style={styles.container}>
//    <View style={styles.ovalShapeView}>
//     {/* <Image source={{ uri: props.picture.large}} /> */}
//     <Text style={styles.text}>
//       <Text style={styles.title}> {`${props.Title}`}{'\n'} </Text>
//       {`${props.FirstName} ${props.LastName}`}
//     </Text>
//   </View>
//   );
// }

// export default Row;

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ovalShapeView: {
    marginTop: 25,
    width: 400,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 10
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const Row = (props) => {
  return (
  // <View style={styles.container}>
   <View style={styles.ovalShapeView}>
    {/* <Image source={{ uri: props.picture.large}} /> */}
    <Text style={styles.text}>
      <Text style={styles.title}> {`${props.Title}`}{'\n'} </Text>
      {`${props.FirstName} ${props.LastName}`}
    </Text>
  </View>
  );
}

export default Row;