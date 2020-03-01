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
  const [horaant,setHoraant] = useState()
  const [diaant,setDiaant] = useState()
  
  
  
  useEffect( () => {
    
    
    if(dia === '' || hora === ''){
      
    
    }
    else{
      if (dia === diaant && hora === horaant){
      
      }
      else{
        
        setLoaded(false);  
      
      }

      
      if(loaded === false){
       
        firebase
        .database()
        .ref(`/rutinas/${dia}/${hora}`)
        .once('value', snapshot => {
          let data = snapshot.val();
          if (data === null) {
            setDesc('No hay Rutinas Asignadas para esta clase')
          }
          else{
            setDesc(data.Desc); 
            
          }
          setLoaded(true);
          setHoraant(hora);
          setDiaant(dia); 
        })
      }
    }
    
  })

  return( 
    <Modal
      animationType={'none'}
      visible={mostrar}
      onRequestClose= {()=> {console.log('close Modal')}}>

      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper2}>
          <Text style={styles.Titulo} > Rutinas Dia: {dia} Hora: {hora}  </Text>
          <Text style={{color:'black'}}> {desc}</Text>
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