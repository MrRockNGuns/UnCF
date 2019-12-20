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


/**
{this.loadUserTypes()}  
 state = {horarios: '',category: '', errorMensaje: null}    
    async function LoadPicker(){
        category = this.state
        const referencia = firebase.database().ref(`/horarios`).once('value').then(
            (datos)=> {
                this.setState({category:datos.toJSON()})   
            }
        );
        console.log(category)
    }

    loadUserTypes() {
      return this.state.category.map( (
        <Picker.Item label={category.key} value={category.horaDesde} />
      ))
    }
componentDidMount(){ 
        this.state.isLoaded = false;
        const category = LoadPicker()
        console.log("CATEGORY " + category)
    }


constructor(props){
        super(props);
        this.state = {
            isLoaded: true, // Saber si esta cargado el Json 
            horarios: {}, //los datos en si por ahora vacio
        };
    }


    if(this.state.isLoaded == true){  
            console.log("Esta Cargado " + this.state.horarios);
        }

        <Picker
                    selectedValue={this.state.language}
                    style={styles.pickerStyle}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({language: itemValue})
                    }
                >
                </Picker>
 */