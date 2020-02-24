import React, {useState,useEffect}from 'react';
import {TextInput, View,Text} from 'react-native';
import {styles} from 'UniversoCF/components/styles/Styles';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';


export default class CrearNovedad extends React.Component{
    state = {Titulo: '', descripcion: ''}
    render(){
        return(  
            <View style={styles.fondo}>
                <Text style={styles.titulo}>Crear Novedad</Text>

                <TextInput style={styles.Input} placeholder="Titulo" 
                    placeholderTextColor="white" 
                    name="email"
                    onChangeText={Titulo => this.setState({ Titulo })}
                    value={this.state.Titulo}
                    
                />

                <TextInput style={styles.Input} placeholder="Descripcion" 
                    placeholderTextColor="white" 
                    name="email"
                    onChangeText={descripcion => this.setState({ descripcion })}
                    value={this.state.descripcion}
                    
                />
                
            </View>
        );
    }
}