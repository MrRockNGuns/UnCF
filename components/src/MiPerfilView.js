import React from 'react';
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

export default class MiPerfilView extends React.Component{
    state = {DeadLift: 0,CleanJerk: 0,BackSquat: 0,ShoulderPress: 0,Snatch: 0,FiveRun: 0,error: '', loaded: ''}

    componentDidMount = async () => {
        console.log('Estoy entrando al should Component Update')
        
        const {currentUser} = firebase.auth()
        const referencia = firebase.database().ref(`/usrPrf/${currentUser.uid}`)
        referencia.once("value",snapshot =>
            {
            this.setState({DeadLift: snapshot.DeadLift});
            this.setState({CleanJerk: snapshot.CleanJerk});
            this.setState({BackSquat: snapshot.BackSquat});
            this.setState({ShoulderPress: snapshot.ShoulderPress});
            this.setState({Snatch: snapshot.Snatch});
            this.setState({FiveRun: snapshot.FiveRun});
            console.log('DedLift: ' + this.state.DeadLift)
            console.log(snapshot.Snatch)
            }
        )
    }
  render(){
        return(
            <View style={styles.fondo} >
                <Text style={styles.titulo}>
                    Perfil
                </Text>

                <Text style={styles.subtitulo}>
                    Tu Informacion de Progresos
                </Text>

                <Text style={styles.texto}> DeadLift: {this.state.DeadLift} Kg </Text>
                <Text style={styles.texto}> CleanJerk: {this.state.CleanJerk} Kg </Text>
                <Text style={styles.texto}> BackSquat: {this.state.BackSquat} Kg </Text>
                <Text style={styles.texto}> ShoulderPress: {this.state.ShoulderPress} Kg </Text>
                <Text style={styles.texto}> Snatch: {this.state.Snatch} Kg </Text>
                <Text style={styles.texto}> FiveRun: {this.state.FiveRun} Min </Text>

                <TouchableOpacity
                    style={styles.BtnStyle}
                    onPress = { () =>
                        this.props.navigation.navigate('MiPerfil')
                    }
                >
                    <Text style={styles.textBtnStyle}>Actualizar Progreso</Text>
                </TouchableOpacity>

            </View>
        );
    }
}