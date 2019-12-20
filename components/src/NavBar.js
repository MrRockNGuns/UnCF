import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    Button,
    Image,
} from 'react-native';

import {styles} from 'UniversoCF/components/styles/Styles';

export default class HeaderNavigationBar extends Component {
    render() {
        return (
            <View style={styles.NavBarNavigation}>
                <TouchableHighlight style={{ marginLeft: 10, marginTop: 15 }}
                    onPress={() => { this.props.navigation.openDrawer() }}>
                    <Image
                        style={{ width: 32, height: 32 }}
                        source={require('UniversoCF/components/img/menu.png')}
                    />
                </TouchableHighlight>
            </View>
        );
    }
}