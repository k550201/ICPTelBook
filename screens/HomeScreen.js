import React, {Component} from "react";
import {View, Text, Dimensions, StyleSheet, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {TextInput, TouchableOpacity} from "react-native-gesture-handler";
import { TabActions } from '@react-navigation/native';
import { useFonts } from '@use-expo/font';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import AwesomeButton from 'react-native-really-awesome-button';

import {
    faPhoneAlt,
    faSearch,
    faSitemap,
} from '@fortawesome/free-solid-svg-icons';
import * as Font from 'expo-font';
let customFonts = {
    'NanumBarunGothic': require('../assets/fonts/NanumBarunGothic.ttf'),
    'NanumBarunGothicBold': require('../assets/fonts/NanumBarunGothicBold.ttf')
};


import { AppLoading } from 'expo';

const {width} = Dimensions.get("window");


export default class HomeScreen extends Component {

    state = {
        fontsLoaded: false,
        searchText: "",
    };

    constructor(props) {
        super(props);
    }
    _goSearch = event => {
        this.props.navigation.jumpTo('SearchScreen');

    }
    _goOrganization = event => {
        this.props.navigation.jumpTo('OrganizationScreen');
    }
    componentDidMount() {
        this._load();
    };
    _load = async () => {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    _controlSearch = text => {
        this.setState({
            searchText: text
        });
    }

    _search = () => {
        if(this.state.searchText.length === 0) return;
        const searchText = this.state.searchText;
        console.log('_homeSearch');
        this.props.navigation.jumpTo('SearchScreen', {searchText:searchText});
    }

    render() {
        const {fontsLoaded} = this.state;

        if (!fontsLoaded)
            return <AppLoading/>;

        return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>인천지방경찰청
                스마트전화번호부</Text>
            <Image style={styles.logo} source={require('../assets/birds.png')} resizeMode={'stretch'}/>

            <TextInput style={styles.input} placeholder={"업무검색(예:경무)"}
                       onChangeText={this._controlSearch}
                       onSubmitEditing={this._search}
            />

            {/*<AwesomeButton style={styles.touchableBtn} height={80} borderRadius={10} onPress={this._goSearch} >*/}
            {/*    <Text style={styles.SearchBtn}>*/}
            {/*        <FontAwesomeIcon icon={faSearch} color={"white"} size={34}/>️️*/}
            {/*        검    색</Text>*/}
            {/*</AwesomeButton>*/}

            <AwesomeButton style={styles.touchableBtn} height={80} borderRadius={10} onPress={this._goOrganization}>
                <Text style={styles.OrganizationBtn}>
                    <FontAwesomeIcon icon={faSitemap} color={"white"} size={34}/>️️
                    조직도</Text>
            </AwesomeButton>
        </SafeAreaView>
    )

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "space-around",
        flexDirection: "column",
        alignContent:"center"
    },
    touchableBtn: {
        alignContent: "center",
        alignSelf:"center"

    },
    logo: {
        alignContent: "center",
        alignSelf:"center",
        height: "25%",
        width: "80%"

    },
    title: {
        fontFamily:"NanumBarunGothicBold",
        alignContent: "center",
        textAlign: "center",
        alignSelf:"center",
        width: "100%",
        fontSize:40,
        textAlignVertical: 'center'
    },

    SearchBtn: {
        fontFamily:"NanumBarunGothic",
        fontSize:40,
        backgroundColor: "#0054a6",
        alignContent: "center",
        textAlign: "center",
        alignSelf:"center",
        height: 80,
        width: width - 100,
        borderRadius:10,
        textAlignVertical: 'center',
        color:"white"
    },
    OrganizationBtn: {
        fontFamily:"NanumBarunGothic",
        fontSize:40,
        backgroundColor: "#0054a6",
        alignContent: "center",
        textAlign: "center",
        alignSelf:"center",
        height: 80,
        width: width - 100,
        borderRadius:10,
        textAlignVertical: 'center',
        color:"white"
    },
    input: {
        margin: 5,
        padding: 10,
        borderColor: "#0054a6",
        borderWidth: 3,
        borderRadius: 10,
        fontSize: 35,
        height: 70,
        width: width - 100,
        alignSelf:"center",
        textAlign:"center"

    },


});
