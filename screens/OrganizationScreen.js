import React, { Component } from "react";
import {StyleSheet, Text, View, ScrollView, Dimensions} from "react-native";
import {AppLoading} from "expo";
import TreeNode from "./componenets/TreeNode";

const { width } = Dimensions.get("window");

export default class OrganizationScreen extends Component{
  constructor(props) {
    super(props);
    // this.state = {
    //   telBook: this.props.route.params.telBook,
    //   isLoading: false
    // }
  }
  state = {
    telBook:[],
    isLoading:false
  };
  componentDidMount() {
    this._load();
  };

  _load = async () => {
    const telBook = this.props.route.params.telBook;
    this.setState({isLoading:true, telBook:telBook});

  };

  render() {
    const {isLoading, telBook} = this.state;

    if(!isLoading)
      return <AppLoading />;
    console.log(`telbookArray : ${Array.isArray(telBook)}`);

    return(
      <View style={styles.container}>
        <Text style={styles.title}/>
        <View style={styles.card}>
        <ScrollView contentContainerStyle>
          {telBook.map(treeNode => (
              <TreeNode key = {treeNode.ID}
              node = {treeNode}
              isCollapsed = {true} />
              ))}
        </ScrollView>
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#55efc4",
    alignItems: "center",
    justifyContent: "center",
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
});
