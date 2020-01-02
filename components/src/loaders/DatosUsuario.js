import React, {useState,useEffect}from 'react';
import {TextInput, View} from 'react-native';
import {styles} from 'UniversoCF/components/styles/Styles';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';


const DatosUsuario= () =>{
    const [nombre, setNombre] = useState()
    const [apellido, setApellido] = useState()
    const [cel, setCel] = useState()
    const [loaded, setLoaded] = useState(false);
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
            console.log(data);
            setNombre(data.nombre);
            setApellido(data.apellido);
            setCel(data.cel);
          });
        setLoaded(true);
      }
    });
    
    return(
        <View style={styles.fondo}>
            <TextInput style={styles.Input}
                placeholderTextColor="white" 
                name='Nombre'
                value={nombre}
            />
            <TextInput style={styles.Input}
                placeholderTextColor="white" 
                name='Apellido'
                value={apellido}
            />
            <TextInput style={styles.Input}
                placeholderTextColor="white" 
                name='Celular'
                value={cel}
            />
        </View>
        
    )
}

export default DatosUsuario;