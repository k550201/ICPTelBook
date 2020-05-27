import React, {Component} from "react";
import {Animated, StyleSheet, Text, View, Linking, Alert} from "react-native";
import PropTypes from "prop-types";
import {TouchableOpacity} from "react-native-gesture-handler";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
    faAngleRight,
    faAngleDown,
    faPhoneAlt,
    faUser,
    faFolder,
    faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';
// const {width} = Dimensions.get("window");

export default class TreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            node: props.node,
            level: props.level,
            isCollapsed: true,
            hasChild: false,
            child: [],
            opacity: new Animated.Value(0),

        };

    };

    static propTypes = {
        node: PropTypes.object.isRequired,
        isCollapsed: PropTypes.bool.isRequired,
        level: PropTypes.number.isRequired
    };

    componentDidMount() {
        if (Array.isArray(this.state.node.CHILD)) {
            this.setState({
                    hasChild: true,
                    child: this.state.node.CHILD,
                    level: this.state.level
                }
            );
        }
    }

    _open = event => {

        this.setState({isCollapsed: !this.state.isCollapsed});
    }
    _call = event => {

        const rt = this.state.node.RT;
        if (!rt) return;
        Alert.alert(
            "전화하기",
            `${rt}로 전화하시겠습니까?`,
            [
                {
                    text: "취소",
                    style: "cancel"
                },
                {text: "전화하기", onPress: () => Linking.openURL(`tel:${rt}`)}
            ],
            {cancelable: false}
        );
    }


    render() {
        const {isCollapsed, node, hasChild, level} = this.state
        const childLevel = level + 1;
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    {hasChild ? <TouchableOpacity onPress={this._open}>
                            {isCollapsed ?
                                <FontAwesomeIcon icon={faFolder} size={20} color={"#ffda69"}  />
                                : <FontAwesomeIcon icon={faFolderOpen} size={20} color={"#ffda69"} />
                            }
                        </TouchableOpacity>
                        : null
                    }
                    <TouchableOpacity style={styles.staff} onPress={hasChild ? this._open : this._call}>
                        <View style={styles.row}>
                            {!hasChild ?
                                <FontAwesomeIcon color={"#0054a6"} icon={faUser} size={20}/> : null
                            }
                            <Text style={styles.name}> {node.NAME}</Text>

                            {!hasChild ?
                                (<Text style={styles.tel}><FontAwesomeIcon icon={faPhoneAlt} color={"gray"} size={16}/>️
                                    : {node.PT}</Text>)
                                : null
                            }
                        </View>
                    </TouchableOpacity>

                </View>
                {isCollapsed ? null : (
                    node.CHILD.map(
                        childNode => (
                            <TreeNode key={childNode.ID} node={childNode} isCollapsed={false}
                                      level={childLevel}/>

                        )
                    )
                )
                }
            </View>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        // width:   width - 30  ,
        borderBottomColor: "#bbb",
        // borderBottomWidth: StyleSheet.hairlineWidth,
        // justifyContent: "space-between",
        flexWrap: "nowrap",
        paddingLeft: 16,
        paddingTop: 1,
        paddingBottom: 2

    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",

    },
    staff: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%"
    },
    name: {
        fontSize: 20,
        fontWeight: "normal",
        alignItems: "center",
        flexGrow: 1


    },
    tel: {
        fontSize: 18,
        alignItems: "center",
        marginRight: 10

    }
});

