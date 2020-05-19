import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class OrganizationScreen extends Component{

  render() {
    return(
      <View style={styles.container}>
      <Text>OrganizationScreen2</Text>
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
