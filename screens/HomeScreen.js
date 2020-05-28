import React, {Component} from "react";
import {View, Text, Dimensions, StyleSheet, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {TouchableOpacity} from "react-native-gesture-handler";
import { TabActions } from '@react-navigation/native';

const {width} = Dimensions.get("window");

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }
    _goSearch = event => {
        console.log('goSearch');
        console.log(this.props);
        this.props.navigation.jumpTo('SearchScreen');

    }
    _goOrganization = event => {
        console.log('goOrganization');
        this.props.navigation.jumpTo('OrganizationScreen');

    }
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.logo} source={require('../assets/splash.png')} resizeMode={'stretch'} />
                <Text style={styles.title}>경찰전화번호부</Text>
                <TouchableOpacity style={styles.touchableBtn} onPress={this._goSearch}>
                    <Text style={styles.SearchBtn}>검색</Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableBtn} onPress={this._goOrganization}>
                    <Text style={styles.OrganizationBtn}>조직도</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "space-around",
        flexDirection: "column",
    },
    touchableBtn: {
        alignContent: "center",
    },
    logo: {
        alignContent: "center",
        alignSelf:"center",
        height: 80,
        width: "95%"

    },
    title: {
        alignContent: "center",
        textAlign: "center",
        alignSelf:"center",
        height: 80,
        width: "100%",
        fontSize:40,
        textAlignVertical: 'center'
    },

    SearchBtn: {
        fontSize:40,
        backgroundColor: "#0054a6",
        alignContent: "center",
        textAlign: "center",
        alignSelf:"center",
        height: 80,
        width: width - 100,
        borderRadius:10,
        textAlignVertical: 'center'
    },
    OrganizationBtn: {
        fontSize:40,
        backgroundColor: "#0054a6",
        alignContent: "center",
        textAlign: "center",
        alignSelf:"center",
        height: 80,
        width: width - 100,
        borderRadius:10,
        textAlignVertical: 'center'
    }

});
