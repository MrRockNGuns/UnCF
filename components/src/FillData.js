import React,{useState,useEffect} from 'react';
import {Text, View} from 'react-native';

import {styles} from 'UniversoCF/components/styles/Styles';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

const FillData = () => {
  // inicializa los datos del componente
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const {currentUser} = firebase.auth();
  const [nombre, setNombre] = useState()
  const [apellido, setApellido] = useState()
  
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
//          setItems(Object.values(data));
        });
      setLoaded(true);
    }
  });
  
  // a modo de ejemplo, se utiliza 'Hola {item.apellido}'
  return (
    <View>
      <Text style={styles.subtitulo}>{nombre + ' ' + apellido} </Text>
    </View>
  );
};

export default FillData;


/**
  <Text key={i} style={styles.texto}>
             {item.nombre} {item.apellido}
          </Text>
          {items.map((item, i) => {
        return (
          <Text>Un Texto de Prueba</Text>
        );
      })}
 */