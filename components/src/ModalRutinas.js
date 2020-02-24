import React from 'react';
import {View, Modal,Text,TouchableHighlight, ActivityIndicator} from 'react-native';
import {styles} from 'UniversoCF/components/styles/Styles';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';
import { useState, useEffect } from 'react';

const ModalRutinas = ({mostrar,cerrar,dia,hora,errors}) => {
  
  const [desc,setDesc] = useState('No hay Rutinas Asignadas para esta clase');
  const [loaded,setLoaded] = useState(false);
  useEffect( () => {
    if(dia === null && hora === null){
      
    }
    else{
      if(!loaded){
        firebase
        .database()
        .ref(`/rutinas/${dia}/${hora}`)
        .once('value', snapshot => {
        let data = snapshot.val();
        setDesc(data.Desc);
        })
        setLoaded(true);
      }
    }
  })

  return( 
    <Modal
      animationType={'none'}
      visible={mostrar}
      onRequestClose= {()=> {console.log('close Modal')}}>

      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Text style={styles.Titulo} > Rutinas</Text>
          <Text> {desc}</Text>
        </View>
        <TouchableHighlight
        style={styles.BtnStyle}
          onPress={
            ()=> cerrar()
          }>
          <Text>Cerrar</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  )
}

export default ModalRutinas;