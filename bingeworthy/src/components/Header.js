//Header component to display a header at the top of the app

//import libraries for making a header
import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

//make a header
const Header = (props) => (
    <View style={styles.viewStyle}>
      <SafeAreaView>
        <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: props.fontWeight }}>{props.headerText}</Text>
      </SafeAreaView>
    </View>
);

//style of header
const styles = {
  viewStyle: {
    backgroundColor: '#ff69b4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20,
    color: '#ffffff'
  }
};


//export the component
export default Header;
