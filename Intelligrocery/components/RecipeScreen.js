import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class RecipeScreen extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  handleEnter = () => {
    console.log('Searching...', this.state.search);
  }

  render() {
    const { search } = this.state;
    return (
      <View>
        <SearchBar
        placeholder="Search a recipe..."
        placeholderTextColor=""
        onChangeText={this.updateSearch}
        value={search}
        containerStyle={{ backgroundColor: 'lightgrey' }}
        inputContainerStyle={{ backgroundColor: "#EEEEEE" }}
        />
        <Button
        title ='Enter'
        onPress={this.handleEnter}
        ></Button>
        
        </View>
    );
  }
}