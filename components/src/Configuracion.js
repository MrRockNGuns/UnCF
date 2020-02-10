import React, {useState,useEffect}from 'react';
import { View,Text,TouchableOpacity,} from 'react-native';
import {styles}  from 'UniversoCF/components/styles/Styles';

//Elementos de Firebase
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

import ModalView from 'UniversoCF/components/src/Modal';
import HighLevel from 'UniversoCF/components/src/loaders/highLevel';



export default class Configuracion extends React.Component{ 
    
    displayModal = () => {
        console.log('quiero desplegar modal')
        return(
            <ModalView/>
        )
    }

    

    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
            ()=> this.props.navigation.navigate('LogIn');
        } catch (e) {
            console.log(e);
        }
    };
        
    render(){  
        
        return (
            <View style={styles.fondo}>
                <Text style={styles.titulo}>
                    Configuracion
                </Text>

                <HighLevel/>

                <TouchableOpacity
                    style={styles.BtnStyle}
                    onPress = { () => {
                        this.props.navigation.navigate('EditarDatos'); 
                    }}
                >
                    <Text style={styles.textBtnStyle}>Editar Datos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.BtnStyle}
                    onPress = { () => {
                        this.signOutUser()      
                        }
                    }
                >
                    <Text style={styles.textBtnStyle}>Cerrar Sesion</Text>
                </TouchableOpacity>
            </View>
        )
    }
}