import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Button,
    Image,
} from 'react-native';


import {styles} from 'UniversoCF/components/styles/Styles';
import { firebase } from '@react-native-firebase/auth';


export default class Main extends React.Component{
   
    componentDidMount = async () => {
        const {navigate} = this.props.navigation;
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
                <Text style={styles.subtitulo}>
                    {currentUser.email}
                </Text>
                <Text style={styles.subtitulo}>
                    Novedades
                </Text>
            </View>
        );
    }
}