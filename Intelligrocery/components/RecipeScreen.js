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
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
        />
        <Button
        title ='Enter'
        onPress={this.handleEnter}
        ></Button>
        
        </View>
    );
  }
}
  /*const [recipe, setRecipe] = useState("");

  return (
    <View style = {styles.container}>
      <View style = {styles.inputContainer}>
        <TextInput style = {styles.userInput}
        placeholder='Search a recipe...'
        value = {recipe}
        onChangeText={(text) => setRecipe(text)}></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    padding: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#777',
    borderRadius: 10,
    fontSize: 36
  }
})*/