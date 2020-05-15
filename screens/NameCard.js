import React, { Component } from "react";
import PropTypes from "prop-types";

export default class NameCard extends Component {
    constructor(props) {
        super(props);
        this.state = { isFavorite : false};
    }

    static propTypes = {
        id: PropTypes.string.isRequire,
        name: PropTypes.string.isRequire,
        departname: PropTypes.string.isRequire,
        pt: PropTypes.string.isRequire,
        rt: PropTypes.string.isRequire,
        isFavorite: PropTypes.bool.isRequired
    }

    render() {
        const { isFavorite} = this.state;
        return( <View>

        </View>
        );
    }



}