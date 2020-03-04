import React, { useState,useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

import {styles} from 'UniversoCF/components/styles/Styles';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

const MiPerfilView = (props) =>{
    const [DeadLift,setDeadLift] = useState(0);
    const [CleanJerk,setCleanJerk] = useState(0);
    const [BackSquat,setBackSquat] = useState(0);
    const [ShoulderPress,setShoulderPress] = useState(0);
    const [Snatch,setSnatch] = useState(0);
    const [FiveRun,setFiveRun] = useState(0);
    const [error,seterror] = useState(false);
    const [loaded,setloaded] = useState(false);
    
    useEffect (() => {
        
            
        const {currentUser} = firebase.auth()
        const referencia = firebase.database().ref(`/usrPrf/${currentUser.uid}`)
        if(!loaded){
            referencia.once("value",snapshot => 
            {
            let data = snapshot.val();
            if (data){
                setDeadLift(data.DeadLift);
                setCleanJerk(data.CleanJerk);
                setBackSquat(data.BackSquat);
                setShoulderPress(data.ShoulderPress);
                setSnatch(data.Snatch);
                setFiveRun(data.FiveRun);
            }
            setloaded(true);
            }
        )
        }
    })
  
        return(
            <View style={styles.fondo} >
                <Text style={styles.titulo}>
                    Perfil
                </Text>

                <Text style={styles.subtitulo}>
                    Tu Informacion de Progresos
                </Text>

                <Text style={styles.texto}> DeadLift: {DeadLift} Kg </Text>
                <Text style={styles.texto}> CleanJerk: {CleanJerk} Kg </Text>
                <Text style={styles.texto}> BackSquat: {BackSquat} Kg </Text>
                <Text style={styles.texto}> ShoulderPress: {ShoulderPress} Kg </Text>
                <Text style={styles.texto}> Snatch: {Snatch} Kg </Text>
                <Text style={styles.texto}> FiveRun: {FiveRun} Min </Text>

                <TouchableOpacity
                    style={styles.BtnStyle}
                    onPress = { () =>
                        props.navigation.navigate('MiPerfil')
                    }
                >
                    <Text style={styles.textBtnStyle}>Actualizar Progreso</Text>
                </TouchableOpacity>

            </View>
        );
    }
export default MiPerfilView;