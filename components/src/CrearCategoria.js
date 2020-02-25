import React, {useState,useEffect}from 'react';
import {TextInput, View,Text,TouchableOpacity} from 'react-native';
import {styles} from 'UniversoCF/components/styles/Styles';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

import ModalView from 'UniversoCF/components/src/Modal';

export default class CrearNovedad extends React.Component{
    static navigationOptions = {
        title: 'Publicar Novedad',
      };
    state = {Titulo: '', descripcion: '', modalVisible: false,mensajeError: '' ,mensajeScss: ''}

    Publicar = () =>{
        const {Titulo,descripcion} = this.state;

        this.setModalVisible(true);
        if(Titulo === '' || descripcion === ''){
            this.setModalVisible(false);
            this.setState({mensajeError: 'Debe completar todos los campos.'})
        }
        else{
            var date  = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1 ;
            var year  = new Date().getFullYear();
            var fullday = date.toString() + month.toString() + year.toString();
            const referencia = firebase.database().ref(`/novedades/`);
            console.log(fullday)
            referencia.child(fullday).set({
                Titulo: Titulo,
                Descripcion: descripcion
            }).catch(
                e => this.setState({mensajeError: e.message})
            )
            this.setModalVisible(false);
            this.setState({mensajeScss: 'Agregado Correctamente'})
        }
        
    }


    DisplayError =  () => {
        const {errorMensaje} = this.state;
        return(
            <Text style={{ color: 'red' }}>{errorMensaje}</Text>
        )
        
    }
    DisplayCorrecto =  () => {
        const {mensajeScss} = this.state;
        return(
            <Text style={{ color: 'green' }}>{mensajeScss}</Text>
        )
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
        //console.log('setModalVisible ' + this.state.modalVisible)
    }

    render(){
        return(  
            <View style={styles.fondo}>

                <ModalView visible={this.state.modalVisible} cerrar={()=> this.setModalVisible(false)} />

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