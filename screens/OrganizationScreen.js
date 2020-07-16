import React, {Component} from "react";
import {ImageBackground, View ,StyleSheet, ScrollView, Dimensions,Text} from "react-native";
import {AppLoading} from "expo";
import TreeNode from "./componenets/TreeNode";
import {SafeAreaView} from "react-native-safe-area-context";
import * as Font from 'expo-font';
const {width, height} = Dimensions.get("window");

const birdImage = require('../assets/birds.png');

let customFonts = {
    'NanumBarunGothic': require('../assets/fonts/NanumBarunGothic.ttf'),
    'NanumBarunGothicBold': require('../assets/fonts/NanumBarunGothicBold.ttf')
};

export default class OrganizationScreen extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        telBook: [],
        isLoading: false,
        fontsLoaded: false,

    };

    componentDidMount() {
        this._load();
    };

    _load = async () => {
        const telBook = this.props.route.params.telBook;
        this.setState({isLoading: true, telBook: telBook});
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    };

    render() {
        const {isLoading, telBook, fontsLoaded} = this.state;

        if (!isLoading)
            return <AppLoading/>;
        if (!fontsLoaded)
            return <AppLoading/>;

        return (
        <View style={styles.container}>
            <SafeAreaView>
                <Text style={styles.title}>인천지방경찰청 조직도</Text>
                <ImageBackground source={birdImage} style={styles.image} resizeMode={"center"}
                                 imageStyle={{opacity:0.1, width: "100%", flex:1,
                                     alignItems:"center", justifyContent:"center"}}>
                <ScrollView contentContainerStyle style={styles.scrollView}>
                    {telBook.map(treeNode => (
                        <TreeNode key={treeNode.ID}
                                  node={treeNode}
                                  isCollapsed={true}
                                  level={0}/>
                    ))}
                </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#55efc4",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontFamily:"NanumBarunGothicBold",
        fontSize: 30,
        textAlign: "center",
        marginTop: 10,
        fontWeight: "200",
        borderBottomWidth: 5,
        borderBottomColor: "lightgray",
    },
    card: {
        backgroundColor: "white",
        flex: 1,
        width: width - 20,
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
    scrollView:{
        height: height - 105,
        // borderTopWidth:2,
        // borderLeftWidth:1,
        // borderRightWidth:1,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        // borderColor:"#0054a6",
        backgroundColor: 'rgba(255,255,255,0.1)'
    },
    image: {
        flex: 1,
        // resizeMode: "cover",
        justifyContent: "center"

        // opacity:0.1

    },
});
