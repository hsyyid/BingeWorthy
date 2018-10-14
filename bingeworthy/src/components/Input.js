import React from 'react';
import { TextInput, View, Text } from 'react-native';
import CardSection from './CardSection';

const Input = ({ value, onChangeText, placeholder }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <CardSection>
    <View style={containerStyle}>
      <TextInput
        placeholder={placeholder}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  </CardSection>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 20,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 60,
    flex: 1,
    alignItems: 'center'
  }
};

export default Input;
