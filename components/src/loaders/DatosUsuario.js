import React, {useState,useEffect}from 'react';
import {TextInput, View,Text} from 'react-native';
import {styles} from 'UniversoCF/components/styles/Styles';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';


const DatosUsuario= () =>{
    const [nombre, setNombre] = useState();
    const [apellido, setApellido] = useState();
    const [cel, setCel] = useState();
    const [loaded, setLoaded] = useState(false);
    const [Usuario,setUsuario] = useState([]);
    const {currentUser} = firebase.auth();
    
    
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
            setCel(data.cel);
            setUsuario(snapshot.val());
            
          });
        setLoaded(true);
      }
      
    });
    

    console.log(Usuario);
    
      return(
        <View>
          <TextInput style={styles.Input}>{Usuario.nombre}</TextInput>
          <TextInput style={styles.Input}>{Usuario.apellido}</TextInput>
          <TextInput style={styles.Input}>{Usuario.email}</TextInput>
          <TextInput style={styles.Input}>{Usuario.salud}</TextInput>
          <TextInput style={styles.Input}>{Usuario.tel}</TextInput>
        </View>
      )
  
    
}


const datoNombre = () => {
  return (
    <TextInput style={styles.Input}>{Usuario.nombre}</TextInput>
  )
}

export default DatosUsuario;

export default datoNombre;