import React from 'react';
import {Text,View} from 'react-native';

import {styles}  from 'UniversoCF/components/styles/Styles';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

const FillData = () =>{
    const {currentUser}  = firebase.auth();
    firebase.database().ref(`usuarios/`).orderByChild(`${currentUser.uid}`).on('value', snapshot => {
      let items = snapshot.val()
      object = Object.values(items).map(
        (i) => {
            return (<Text style={styles.subtitulo}>{i.nombre}</Text>) 
        }
      )
    })
}

export default FillData ;