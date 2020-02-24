import React, {useState,useEffect} from 'react';
import {
    Text,
    TouchableOpacity,
} from 'react-native';
import {styles}  from 'UniversoCF/components/styles/Styles';
//Elementos de Firebase
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';




highLevel = ({pantalla}) => {
    const [nivel, setNivel] = useState();
    const {currentUser} = firebase.auth();    
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        if (!loaded) {
          firebase
            .database()
            .ref(`/usuarios/${currentUser.uid}`)
            .orderByChild(`${currentUser.uid}`)
            .once('value', snapshot => {
              let data = snapshot.val();
              setNivel(data.nivel);
            });
          setLoaded(true);
        }
        
      });
    if(nivel == '9'){
        return(
            <TouchableOpacity
                style={styles.BtnStyle}
                onPress = { () => {
                    pantalla()
                }}
            >
                <Text style={styles.textBtnStyle}>Publicar Novedad</Text>
            </TouchableOpacity>
        )
        
    }
    else{
        return(
        <Text style={styles.Text}>Miembro</Text>
        )
    }
}

export default highLevel;