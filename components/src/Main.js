import React from 'react';
import {
    View,
    Text,
} from 'react-native';



import {styles} from 'UniversoCF/components/styles/Styles';
import { firebase } from '@react-native-firebase/auth';
import FillData     from 'UniversoCF/components/src/FillData'; 

export default class Main extends React.Component{
    componentDidMount = async () => {
        await firebase.auth().onAuthStateChanged(email => {      
            this.props.navigation.navigate(email ? 'Main' : 'Login') 
        });
    }
  render(){
        const {currentUser}  = firebase.auth()
        return(
            <View style={styles.fondo} >
                <Text style={styles.titulo}>
                    Bienvenido 
                </Text>
                <FillData/>
                <Text style={styles.subtitulo}>
                    Novedades
                </Text>
            </View>
        );
    }
}