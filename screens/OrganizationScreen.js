import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const OrganizationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>OrganizationScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#55efc4",
    alignItems: "center",
    justifyContent: "center",
  },
});
