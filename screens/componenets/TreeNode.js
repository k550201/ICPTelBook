import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, View, Linking , Alert } from "react-native";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
    faAngleRight,
    faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

const { width, height } = Dimensions.get("window");
export default class TreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            node: props.node,
            isCollapsed: true,
            hasChild: false,
            child:[]
        };

    };

    static propTypes = {
        node: PropTypes.object.isRequired,
        isCollapsed: PropTypes.bool.isRequired
    };
    componentDidMount() {
        if (Array.isArray(this.state.node.CHILD)) {
            this.setState({hasChild: true,
                child:this.state.node.CHILD}
            );
        }
    }
    _open= event => {
        this.setState({isCollapsed:!this.state.isCollapsed});
    }

    render() {
        const { isCollapsed, node, hasChild } = this.state
        return (
            <View  style={styles.container}>
                <View style={styles.row}>
                    {hasChild?<TouchableOpacity onPress={this._open} >
                        {isCollapsed ?
                            <FontAwesomeIcon icon={faAngleRight} size = {30}/>
                            : <FontAwesomeIcon icon={faAngleDown} size = {30} />
                        }
                    </TouchableOpacity>
                    : null
                    }
                    <Text style= {styles.name}>{node.NAME}</Text>
                    {!hasChild? <Text>☎️ : {node.PT}</Text> : null}
                </View>
                    { isCollapsed ? null :
                        node.CHILD.map(
                            childNode => (
                          <TreeNode key = {childNode.ID} node={childNode} isCollapsed={false} />
                          ))
                    }
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
        justifyContent:"flex-start",
        alignItems:"center",

    },
    name :{
        fontSize:30,
    }
});

