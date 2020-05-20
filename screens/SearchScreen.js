import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, View, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { findNameinJSON, findFullnameinJSON, departNameFromFullName } from '../util';
import NameCard from "./componenets/NameCard";

const { width } = Dimensions.get("window");

export default class SearchScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      searchText:"",
      telBook: this.props.route.params.telBook,
      nameCards : []
    }
  }
  // state = {
  //   searchText:"",
  //   telBook:[],
  //   nameCards : []
  // };

  componentDidMount() {
    // console.log(this.state.searchText);
  };

  render() {
    const { nameCards } = this.state;
    // console.log(Array.isArray(nameCards));
    return(
      <View style={styles.container}>
            <Text style={styles.title}/>
            <View style={styles.card}>
              <TextInput  style={styles.input} placeholder={"검색"}
              onChangeText={this._controlSearch}
              onSubmitEditing={this._search}
              />
              <ScrollView contentContainerStyle>
                {nameCards.map(nameCard => (
                  // console.log(nameCard)
                  <NameCard
                    key = {nameCard.id}
                    // {...nameCard}
                    id = {nameCard.id}
                    jobname = {nameCard.jobname}
                    departname ={nameCard.departname}
                    pt = {nameCard.pt}
                    rt = {nameCard.rt}
                    isFavorite = {false}
                    />
                ))
                }
              </ScrollView>
            </View>
        </View>
    );
  }
  _controlSearch = text => {
    this.setState({
      searchText: text
    });
  }
  _search = () => {
    const searchValue = this.state.searchText;
    if(searchValue.length === 0) return;
    this.setState({nameCards:[]});
    const findlist = findNameinJSON(this.state.telBook, searchValue, true);
    for (let i = 0; i < findlist.length; i++) {
      const fullName = findFullnameinJSON(this.state.telBook, findlist[i].id);
      const departName = departNameFromFullName(fullName);
      const nameCard = {
        id: findlist[i].id,
        jobname: findlist[i].name,
        departname: departName,
        pt: findlist[i].pt,
        rt: findlist[i].rt,
      };

      this.setState(prevState => {
        const newNameCards = prevState.nameCards.push(nameCard);
        return {
          newNameCards
        }
      }
      );
    }
    // console.log(this.state.nameCards);

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
    marginBottom: 20,
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
    padding: 10,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
}
);
