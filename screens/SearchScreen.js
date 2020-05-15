import React, { Component, useContext} from "react";
import { Dimensions, StyleSheet, Text, View, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { findNameinJSON, findFullnameinJSON } from './../util';

const { height, width } = Dimensions.get("window");

export default class SearchScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {searchText:"",
    telBook: this.props.route.params.telBook,
    }
  }
  state = {
    searchText:"",
    telBook:[]
  }
  componentDidMount() {
    console.log(this.state.searchText);
  }

  render() {
    return(
      <View style={styles.container}>
            <Text style={styles.title}></Text>
            <View style={styles.card}>
              {/* <TextInput
                style={styles.input}
                placeholder={"New To Do"}
                value={newToDo}
                onChangeText={this._crontollNewToDo}
                placeholderTextColor={"#999"}
                returnKeyType={"done"}
                autoCorrect={false}
                onSubmitEditing={this._addToDo}
              /> */}
              <TextInput  style={styles.input} placeholder={"검색"} 
              onChangeText={this._crontollNewToDo}
              onSubmitEditing={this._search}
              />
              <ScrollView contentContainerStyle={styles.toDos}>
                {/* {Object.values(toDos).map(toDo => (
                  <ToDo
                    key={toDo.id}
                    deleteToDo={this._deleteToDo}
                    uncompleteToDo={this._uncompleteToDo}
                    completeToDo={this._completeToDo}
                    updateToDo={this._updateToDo}
                    {...toDo}
                  />
                ))} */}
              </ScrollView>
            </View>    
        </View>
    );
  }
  _crontollNewToDo = text => {
    this.setState({
      searchText: text
    });
  }
  _search = () => {
    const searchValue = this.state.searchText;
    if(searchValue.length == 0) return;
    console.log(searchValue);
    var findlist = findNameinJSON(this.state.telBook, searchValue, true);
    console.log(findlist);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3d7ece",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 10,
    marginTop: 10,
    fontWeight: "200",
    marginBottom: 30,
    height:0
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
    input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
}
);
