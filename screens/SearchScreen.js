import React, {Component} from "react";
import {Dimensions, StyleSheet, Image, View, Linking, ScrollView, Alert, ImageBackground} from "react-native";
import {TextInput, TouchableOpacity} from "react-native-gesture-handler";
import {findNameinJSON, findFullnameinJSON, departNameFromFullName} from '../util';
import NameCard from "./componenets/NameCard";
import {SafeAreaView} from "react-native-safe-area-context";
import Toast from 'react-native-root-toast';


const {height, width} = Dimensions.get("window");

export default class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            telBook: this.props.route.params.telBook,
            visible: false,
            nameCards: []
        }
    }

    componentDidMount() {
        // setTimeout(() => this.setState({
        //     visible: true
        // }), 1000); // show toast after 2s
        //
        // setTimeout(() => this.setState({
        //     visible: false
        // }), 5000); // hide toast after 5s
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
        // console.log(Array.isArray(nameCards));
        return (


            <SafeAreaView>
                <View style={styles.row}>
                    <TouchableOpacity onPress={this._linkHome}>
                        <Image style={styles.logo} source={require('../assets/logo.png')}/>
                    </TouchableOpacity>
                    <TextInput style={styles.input} placeholder={"업무검색(예:경무)"}
                               onChangeText={this._controlSearch}
                               onSubmitEditing={this._search}
                    />
                </View>
                <Toast
                    visible={this.state.visible}
                    position={250}
                    shadow={false}
                    animation={false}
                    hideOnPress={true}
                >This is a message</Toast>

                <ScrollView contentContainerStyle style={styles.scrollView}>
                    {nameCards.map(nameCard => (
                        // console.log(nameCard)
                        <NameCard
                            key={nameCard.id}
                            // {...nameCard}
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
            </SafeAreaView>
        );
    }

    _controlSearch = text => {
        this.setState({
            searchText: text
        });
    }
    _search = () => {
        const searchValue = this.state.searchText;
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
        const message = `${listsize}건이 검색되었습니다.`;
        let toast = Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });

// You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
        setTimeout(function () {
            Toast.hide(toast);
        }, 2000);
        // console.log(this.state.nameCards);

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
