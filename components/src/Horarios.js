import React,{useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Picker,
} from 'react-native';

import {styles} from 'UniversoCF/components/styles/Styles';
import { firebase } from '@react-native-firebase/database';

export default class Horarios extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true, // Saber si esta cargado el Json 
            setLoading: true,
            games: [],
            setGames: [],
        };
    }

    render(){    
        return(
            <View style={styles.fondo} >
                <Text style={styles.titulo}>
                    Horarios
                </Text>
            </View>
        );
    }
}