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
    state = {success: false,pressed: true} 
    displayModal = () => {
        console.log('quiero desplegar modal')
        return(
            <ModalView/>
        )
    }
    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
        this.setState({success: true});
        this.props.navigation.navigate(this.state.success? 'Login': 'Login')
    };
    setNovedad(value){
        this.setState({pressed: value});
        console.log('Valor SetPress' + this.state.pressed)
        if(this.state.pressed === value){
            this.props.navigation.navigate('CrearNovedad'); 
        }
    }

    setRutina(value){
        this.setState({pressed: value});
        console.log('Valor SetPress' + this.state.pressed)
        if(this.state.pressed === value){
            this.props.navigation.navigate('CrearRutinas'); 
        }
    }

    setAgendados(value){
        this.setState({pressed: value});
        console.log('Valor SetPress' + this.state.pressed)
        if(this.state.pressed === value){
            this.props.navigation.navigate('VerAgendados'); 
        }
    }
        
    render(){  
        
        return (
            <View style={styles.fondo}>
                <Text style={styles.titulo}>
                    Configuracion
                </Text>

                <HighLevel texto={'Publicar Novedad'} pantalla={()=> this.setNovedad(true)} />

                <HighLevel texto={'Crear Rutina'} pantalla={()=> this.setRutina(true)} />

                <HighLevel texto={'Ver Inscriptos por dia'} pantalla={()=> this.setAgendados(true)} />


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