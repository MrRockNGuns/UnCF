import React, {useState, useEffect} from 'react';
import {Text,View} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

const ObtenerUsuarios = () => {
    const [datos,setDatos] = useState([]);
    const {currentuser} = firebase.auth();

    useEffect( () => {
        firebase.database().ref(`/usuarios/${currentUser.uid}`).once('value',
        snapshot => {
            let datos = snapshot.val()
            setDatos(datos);
        })
    });
}