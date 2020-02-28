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

export default class MiPerfil extends React.Component{
    static navigationOptions = {
        title: 'Actualizar Perfil',
      };
    state = {DeadLift: 0,CleanJerk: 0,BackSquat: 0,ShoulderPress: 0,Snatch: 0,FiveRun: 0,error: 0}
    shouldComponentUpdate = async () => {

    }
    Guardar = () =>{
        const {DeadLift,CleanJerk,BackSquat,ShoulderPress,Snatch,FiveRun} = this.state;
        const {currentUser} = firebase.auth()
        const referencia = firebase.database().ref(`/usrPrf/${currentUser.uid}`)

        referencia.set({
            DeadLift:      DeadLift,
            CleanJerk:     CleanJerk,
            BackSquat:     BackSquat,
            ShoulderPress: ShoulderPress,
            Snatch:        Snatch,
            FiveRun:       FiveRun
        }).catch(
            e => this.setState({error: e.message})
        );
    }
  render(){
        return(
            <View style={styles.fondo} >
                <Text style={styles.titulo}>
                    Perfil
                </Text>

                <Text style={styles.subtitulo}>
                    Indica tus Records
                </Text>
                <View style={styles.fondoperfil}>
                    <TextInput
                        style={styles.InputPerfil} placeholder="DeadLift "
                        placeholderTextColor="white"
                        name="DeadLift" 
                        keyboardType={'numeric'}  
                        onChangeText={DeadLift => this.setState({ DeadLift })}
                        value={this.state.DeadLift}
                    />
                    <Text style={styles.minitext}> Kg.</Text>
                </View>
                
                <View style={styles.fondoperfil}>
                    <TextInput
                        style={styles.InputPerfil} placeholder="Back Squat "
                        placeholderTextColor="white"
                        name="BackSquat" 
                        keyboardType={'numeric'}  
                        onChangeText={BackSquat => this.setState({ BackSquat })}
                        value={this.state.BackSquat}  
                    />
                    <Text style={styles.minitext}> Kg.</Text>
                </View>

                <View style={styles.fondoperfil}>
                    <TextInput
                        style={styles.InputPerfil} placeholder="Shoulder Press "
                        placeholderTextColor="white"
                        name="ShoulderPress" 
                        keyboardType={'numeric'}  
                        onChangeText={ShoulderPress => this.setState({ ShoulderPress })}
                        value={this.state.ShoulderPress}  
                    />
                    <Text style={styles.minitext}> Kg.</Text>
                </View>
                
                <View style={styles.fondoperfil}>
                    <TextInput
                        style={styles.InputPerfil} placeholder="Clean&Jerk "
                        placeholderTextColor="white"
                        name="CleanJerk" 
                        keyboardType={'numeric'}  
                        onChangeText={CleanJerk => this.setState({ CleanJerk })}
                        value={this.state.CleanJerk}  
                    />
                    <Text style={styles.minitext}> Kg.</Text>
                </View>

                <View style={styles.fondoperfil}>
                    <TextInput
                        style={styles.InputPerfil} placeholder="Snatch "
                        placeholderTextColor="white"
                        name="Snatch" 
                        keyboardType={'numeric'}  
                        onChangeText={Snatch => this.setState({ Snatch })}
                        value={this.state.Snatch}  
                    />
                    <Text style={styles.minitext}> Kg.</Text>
                </View>
                
                <View style={styles.fondoperfil}>
                    <TextInput
                        style={styles.InputPerfil} placeholder="5Km Run "
                        placeholderTextColor="white"
                        name="FiveRun" 
                        keyboardType={'numeric'}  
                        onChangeText={FiveRun => this.setState({ FiveRun })}
                        value={this.state.FiveRun}  
                    />
                    <Text style={styles.minitext}>Min.</Text>
                </View>

                <TouchableOpacity
                    style={styles.BtnStyle}
                    onPress = { () =>
                        this.Guardar()
                    }
                >
                    <Text style={styles.textBtnStyle}>Guardar</Text>
                </TouchableOpacity>

            </View>
        );
    }
}