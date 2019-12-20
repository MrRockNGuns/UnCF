import React, { useState, useEffect }from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import {styles}  from 'UniversoCF/components/styles/Styles';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';
import FillData from 'UniversoCF/components/src/FillData';


export default class Configuracion extends React.Component{ 
    
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

                
                <FillData/>

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

/*
firebase.auth().currentUser.signOut();

{this.state.Usuario = this.getData(),
        console.log(this.state.Usuario)}


getData = async () => {
        this.state.loading = false;
        const Referencia = firebase.database().ref('/usuarios/');
        Referencia.once('value', onSnapshot);
        
    }

    prcData = (info) => {
        Object.keys(info).map(function(u,key){
            // u contains your user data object which is like u.uid and u.email or whatever keys you got.
        
        });
    }
data.on('value', function(snapshot){
            var usra = snapshot.val();
                return (
                    <FlatList
                        data={snapshot}
                        renderItem={({items})=>{
                            console.log(items)
                            return <Text>{items.Email}</Text>
                        }}
                    />
                )
                
        });
        */