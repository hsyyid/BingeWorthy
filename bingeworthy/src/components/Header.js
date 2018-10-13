//Header component to display a header at the top of the app

//import libraries for making a header
import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

//make a header
const Header = (props) => (
    <View style={styles.viewStyle}>
      <SafeAreaView>
        <Text style={styles.textStyle}>{props.headerText}</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20,
    color: '#ffffff'
  }
};


//export the component
export { Header };
