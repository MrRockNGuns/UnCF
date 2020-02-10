import React, {useState,useEffect}from 'react';
import {TextInput, View,Text} from 'react-native';
import {styles} from 'UniversoCF/components/styles/Styles';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';


export default class EditarDatos extends React.Component{

    render(){
        return(  
            <View style={styles.fondo}>
                <Text style={styles.titulo}>Crear Categoria</Text>
                <DatosUsuario/>
            </View>
        );
    }
}