import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, View, ScrollView } from "react-native";
import PropTypes from "prop-types";

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
        id: PropTypes.string.isRequire,
        jobname: PropTypes.string.isRequire,
        departname: PropTypes.string.isRequire,
        pt: PropTypes.string.isRequire,
        rt: PropTypes.string.isRequire,
        isFavorite: PropTypes.bool.isRequired
    };

    
    componentDidMount = () => {
        console.log(this.state.id);
    };

    render() {
        console.log(this.state);
        // const { isFavorite } = this.state;
        return( 
        <View  style={styles.container}>
            <View style={styles.row}>
                <Text style= {styles.jobname}>{this.state.jobname}</Text>
                <Text style= {styles.pt}>☎️ : {this.state.pt}</Text>
                </View>
                <Text style= {styles.departname}>{this.state.departname}</Text>
        </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: width - 30,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        // flexDirection: "row",
        // alignItems: "center",
        justifyContent: "space-between"
      },
    row :{
        flexDirection: "row",
    },
    jobname:{
        fontSize:30,
        fontWeight: "800",
    },
    departname:{
        textAlign:"right",
        fontSize:13
    },
    pt:{
        fontSize:20, 
        textAlign:"right"
    }
});
