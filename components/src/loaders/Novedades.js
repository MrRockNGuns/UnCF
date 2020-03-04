import React,{useState,useEffect} from 'react';
import {Text, ActivityIndicator, View} from 'react-native';

import {styles} from 'UniversoCF/components/styles/Styles';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

const FillData = () => {
  // inicializa los datos del componente
  const [loaded, setLoaded] = useState(false);
  const [Novedad, setNovedad] = useState('Sin Novedades')
  
  // obtiene los datos de la base una sola vez
  useEffect(() => {
    var date  = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1 ;
    var year  = new Date().getFullYear();
    var fullday = date.toString() + month.toString() + year.toString();
    if (!loaded) {
      firebase
        .database()
        .ref(`/novedades/${fullday}`)
        .once('value', snapshot => {
          let data = snapshot.val();
          if(data){
            setNovedad(data.Descripcion);
          }
          
        });
      setLoaded(true);
    }
  }); 
  
  return (      
      <Text style={styles.subtitulo}>{Novedad} </Text>
  );
}

export default FillData;
