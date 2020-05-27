import React, {Component} from "react";
import {View, Text, Dimensions, StyleSheet, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {TouchableOpacity} from "react-native-gesture-handler";
const {width} = Dimensions.get("window");

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <SafeAreaView>
            <Image style={styles.logo} source={require('../assets/splash.png')} resizeMethod={"auto"}  />
            <View style={styles.container}>
                <Text>경찰전화번호부</Text>
            </View>
            <TouchableOpacity style={styles.touchableBtn} >
                <Text style={styles.SearchBtn}>검색</Text>

            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableBtn} >
                <Text style={styles.OrganizationBtn}>조직도</Text>

            </TouchableOpacity>

        </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between"
    },
    touchableBtn: {
        alignContent: "center",
    },

    logo: {
        alignContent: "center",
        height: 80,
        width: "100%"
    },
    SearchBtn: {
        backgroundColor: "#0054a6",
        alignContent: "center",
        height: 80,
        width: 100
    },
    OrganizationBtn: {
        backgroundColor: "#0054a6",
        alignContent: "center",
        height: 80,
        width: 100
    }

});
