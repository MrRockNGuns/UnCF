import React, {useState,useEffect}from 'react';
import {TextInput, View,Text,TouchableOpacity} from 'react-native';
import {styles} from 'UniversoCF/components/styles/Styles';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

import ModalView from 'UniversoCF/components/src/Modal';

export default class CrearNovedad extends React.Component{
    state = {Titulo: '', descripcion: '', modalVisible: false, mensajeError: null ,mensajeScss: null}

    static navigationOptions = {
        title: 'Publicar Novedad',
    };

    Publicar = async () =>{
        const {Titulo,descripcion} = this.state;
        this.setModalVisible(true);
        this.setState({mensajeError: null})
        this.setState({mensajeScss: null})
        //console.log(Titulo + ' ' + descripcion)
        if(Titulo == '' || descripcion == ''){
            this.setState({mensajeError: 'Debe completar todos los campos.'})
            this.setModalVisible(false);
        }
        else{
            // console.log('Lleno')
            var date  = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1 ;
            var year  = new Date().getFullYear();
            var fullday = date.toString() + month.toString() + year.toString();
            const referencia = firebase.database().ref(`/novedades/`);
            // console.log(fullday)
            referencia.child(fullday).set({
                Titulo: Titulo,
                Descripcion: descripcion
            }, onComplete = () =>{
                this.setState({mensajeScss: 'Agregado Correctamente'})
                this.setModalVisible(false);
            })
        }
    }

    DisplayError = () => {
        return(
            <Text style={{ color: 'red' }}>{this.state.mensajeError}</Text>
        )
    }

    DisplayCorrecto =  () => {
        const {mensajeScss} = this.state;
        return(
        <Text style={{ color: 'green' }}>{this.state.mensajeScss}</Text>
        )
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render(){
        return(  
            <View style={styles.fondo}>

                <ModalView visible={this.state.modalVisible} cerrar={()=> this.setModalVisible(false)} />

                {this.state.mensajeError &&
                    this.DisplayError()
                }
                {this.state.mensajeScss &&
                    this.DisplayCorrecto()
                }

                <Text style={styles.titulo}>Crear Novedad</Text>

                <TextInput style={styles.Input} placeholder="Titulo" 
                    placeholderTextColor="white" 
                    name="Titulo"
                    onChangeText={Titulo => this.setState({ Titulo })}
                    value={this.state.Titulo}
                    
                />

                <TextInput style={styles.Input} placeholder="Descripcion" 
                    placeholderTextColor="white" 
                    name="descripcion"
                    onChangeText={descripcion => this.setState({ descripcion })}
                    value={this.state.descripcion}
                    
                />
                <TouchableOpacity
                    style={styles.BtnStyle}
                    onPress = { () => {
                        this.Publicar();
                    }
                }>
                    <Text style={styles.textBtnStyle}>Publicar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}