import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import {styles} from 'UniversoCF/components/styles/Styles';
import { firebase } from '@react-native-firebase/auth';
import FillData  from 'UniversoCF/components/src/loaders/FillData'; 
import Novedades  from 'UniversoCF/components/src/loaders/Novedades'; 

export default class Main extends React.Component{
    shouldComponentUpdate = async () => {
        await firebase.auth().onAuthStateChanged(usuario => {      
            console.log('Verificando')
            this.props.navigation.navigate(usuario.emailVerified ? 'Main' : 'Login')
        });
    }
  render(){
       
        return(
            <View style={styles.fondo} >
                <Text style={styles.titulo}>
                    Bienvenido 
                </Text>
                <FillData />
                <Text style={styles.subtitulo}>
                    Novedades
                </Text>
                <Novedades/>
            </View>
        );
    }
}