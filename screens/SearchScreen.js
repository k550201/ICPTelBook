import React, {Component, useState} from "react";
import {Button, Dimensions, StyleSheet, Image, View, Linking, ScrollView, Alert, ImageBackground} from "react-native";
import {TextInput, TouchableOpacity} from "react-native-gesture-handler";
import {findNameinJSON, findFullnameinJSON, departNameFromFullName} from '../util';
import NameCard from "./componenets/NameCard";
import {SafeAreaView} from "react-native-safe-area-context";
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';

const {height, width} = Dimensions.get("window");

export default class SearchScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            telBook: this.props.route.params.telBook,
            visible: false,
            bSearch:true,
            nameCards: []
        }
    };

    _focus = () => {
        console.log("_focus");
        // console.log(this.state.searchText);
        // console.log(this.props.route.params.searchText);
        // this.setState({searchText:this.props.route.params.searchText});
        console.log("1 : " + this.state.searchText);
        console.log("2 : " + this.props.route.params.searchText);
        console.log("3 : " + this.props);

        if(!this.state.bSearch){
            this.setState({bSearch:true});
            return;
        }
        if(this.props.route.params.searchText === this.state.searchText) return;
        this._controlSearch(this.props.route.params.searchText);
        this._search(this.props.route.params.searchText);
    }

    _tabPress = () => {
        console.log('tabPress');
        this.setState({bSearch:false});
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', this._focus);
        this.props.navigation.addListener('tabPress', this._tabPress);
        setTimeout(() => this.setState({
            visible: true
        }), 2000); // show toast after 2s

        setTimeout(() => this.setState({
            visible: false
        }), 5000); // hide toast after 5s
    };

    _linkHome = event => {
        Alert.alert(
            "홈페이지 연결",
            `인천지방경찰청 홈페이지로 이동하시겠습니까?`,
            [
                {
                    text: "취소",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {text: "연결하기", onPress: () => Linking.openURL(`http://www.icpolice.go.kr/`)}
            ],
            {cancelable: false}
        );
    }

    render() {
        const {nameCards} = this.state;
        const theme = {
            main: "mediumseagreen"
        };
        return (
            <SafeAreaView>

                <RootSiblingParent>
                <View style={styles.row}>
                    <TouchableOpacity onPress={this._linkHome}>
                        <Image style={styles.logo} source={require('../assets/logo.png')}/>
                    </TouchableOpacity>
                    <TextInput style={styles.input} placeholder={"업무검색(예:경무)"}
                               onChangeText={this._controlSearch}
                               onSubmitEditing={this._search}
                               value={this.state.searchText}
                    />

                </View>
                <ScrollView contentContainerStyle style={styles.scrollView}>
                    {nameCards.map(nameCard => (
                        <NameCard
                            key={nameCard.id}
                            id={nameCard.id}
                            jobname={nameCard.jobname}
                            departname={nameCard.departname}
                            pt={nameCard.pt}
                            rt={nameCard.rt}
                            isFavorite={false}
                        />
                    ))
                    }
                </ScrollView>
                <View style={styles.container}>
                    <View style={styles.card}>

                    </View>
                </View>
                </RootSiblingParent>
            </SafeAreaView>
        );
    }

    _controlSearch = text => {
        this.setState({
            searchText: text
        });
    }
    _search = (txt) => {

        const searchValue = (typeof(txt)==='string')?txt:this.state.searchText;
        console.log("3 : " + searchValue);
        if (searchValue === undefined) return;
        if (searchValue.length === 0) return;
        this.setState({nameCards: []});
        const findlist = findNameinJSON(this.state.telBook, searchValue, true);
        const listsize = findlist.length;
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
        console.log(listsize);
        const message = `${listsize}건이 검색되었습니다.`;

        const toast = Toast.show(message, {
            duration: 1000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onShow: () => {
                // calls on toast\`s appear animation start
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        });

        // // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
        // setTimeout(function () {
        //     Toast.hide(toast);
        // }, 2000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0054a6",
        alignItems: "center",
        width: width,
        height: height
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 5,
        borderBottomColor: "lightgray",
    },
    logo: {
        height: 60,
        width: 60
    },
    title: {
        color: "white",
        fontSize: 10,
        marginTop: 10,
        fontWeight: "200",
        marginBottom: 20,
        height: 100
    },
    card: {
        backgroundColor: "blue",
        flex: 1,
        width: width,
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
    scrollView:{
    height: height - 120,
    // backgroundColor: 'rgba(255,255,50,0.1)'
    },
    input: {
        margin: 5,
        padding: 10,
        borderColor: "#0054a6",
        borderWidth: 3,
        borderRadius: 10,
        fontSize: 25,
        height: 55,
        width: width - 70,
    },
    image: {
            flex: 1,
            justifyContent: "center",
            backgroundColor:"#ffff00"
        },

    }

);
