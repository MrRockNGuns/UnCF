import React from 'react';
import {View, Modal,Text,TouchableHighlight} from 'react-native';
import {styles} from 'UniversoCF/components/styles/Styles';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';
import { useState, useEffect } from 'react';

const ModalRutinas = ({mostrar,cerrar,dia,hora}) => {
  const [agendados,setAgendados] = useState([]);
  const [loaded,setLoaded] = useState(false);
  const [horaant,setHoraant] = useState()
  const [diaant,setDiaant] = useState()
  
  
  
  useEffect( () => {
    
    if(dia === '' || hora === ''){
    
    }
    else {
      if (dia === diaant && hora === horaant){

      }
      else{
        setLoaded(false);  
      }
      if(!loaded){       
        const referencia = firebase.database().ref(`/reservas/${dia}/${hora}/`);
        
        referencia.once('value', value => {
          console.log('Sale carga')
            var items = value.val()
            var it = Object.values(items)
            setAgendados(it)
            
        })
         setLoaded(true);
         setHoraant(hora);
         setDiaant(dia); 
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
          <Text style={styles.Titulo} > Agendados Dia: {dia} Hora: {hora}  </Text>
          {
            console.log(agendados),
            agendados.map((item, i) => {
              console.log(item.usuario),
                <Text key={i} style={{color:'black'}}>{item}</Text>
            })
          }
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