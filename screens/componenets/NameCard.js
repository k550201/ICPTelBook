import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, View, Linking , Alert } from "react-native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
export default class NameCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:props.id,
            jobname:props.jobname,
            departname:props.departname,
            pt:props.pt,
            rt:props.rt,
            isFavorite : false
        };
    };

    static propTypes = {
        id: PropTypes.string.isRequired,
        jobname: PropTypes.string.isRequired,
        departname: PropTypes.string.isRequired,
        pt: PropTypes.string.isRequired,
        rt: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool.isRequired
    };

    _call = event => {
        const {rt} = this.state;
        Alert.alert(
            "전화하기",
            `${rt}로 전화하시겠습니까?`,
            [
              {
                text: "취소",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "전화하기", onPress: () => Linking.openURL(`tel:${rt}`) }
            ],
            { cancelable: false }
          );
    }
    componentDidMount = () => {
    };

    render() {
        return(
        <View  style={styles.container}>
            <TouchableOpacity onPress={this._call}>
                <View style={styles.row}>
                    <Text style= {styles.jobname}>{this.state.jobname}</Text>
                    <Text style= {styles.pt}>☎️ : {this.state.pt}</Text>
                </View>
                <Text style= {styles.departname}>{this.state.departname}</Text>
            </TouchableOpacity>
        </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: width - 30,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: "space-between",
        padding:5

      },
    row :{
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",

    },
    jobname:{
        fontSize:25,
        fontWeight: "800",
    },
    departname:{
        textAlign:"right",
        fontSize:16
    },
    pt:{
        fontSize:20,
        textAlign:"right",
    }
});
