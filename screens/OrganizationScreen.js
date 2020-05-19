import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView} from "react-native";

export default class OrganizationScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      telBook: this.props.route.params.telBook,
    }
  }
  state = {
    telBook:[],
    isLoading:false
  };
  componentDidMount() {
    console.log(this.state);
  }
  render() {
    const org = this.props.telBook;
    console.log(org);
    return(
      
      <View style={styles.container}>
        <ScrollView contentContainerStyle>
          {/* {org.map(node, i =>(console.log(node))) } */}
        </ScrollView>
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
});
