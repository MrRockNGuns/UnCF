import React,{useState,useEffect} from 'react';
import {Text, ActivityIndicator, View} from 'react-native';

import {styles} from 'UniversoCF/components/styles/Styles';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

const FillData = () => {
  // inicializa los datos del componente
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const {currentUser} = firebase.auth();
  const [nombre, setNombre] = useState('Cargando...')
  const [apellido, setApellido] = useState('espere...')
  
  // obtiene los datos de la base una sola vez
  useEffect(() => {
    if (!loaded) {
      firebase
        .database()
        .ref(`/usuarios/${currentUser.uid}`)
        .orderByChild(`${currentUser.uid}`)
        .once('value', snapshot => {
          let data = snapshot.val();
          setNombre(data.nombre);
          setApellido(data.apellido);
        });
      setLoaded(true);
    }
  });
  
  // a modo de ejemplo, se utiliza 'Hola {item.apellido}'
  if (!loaded || nombre === 'undefined'){
    return(
      <View>
        <Text style={styles.subtitulo}>Cargando</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  else{
    return (      
        <Text style={styles.subtitulo}>{nombre + ' ' + apellido} </Text>
    );
  }
  
};

export default FillData;
