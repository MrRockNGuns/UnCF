import React from 'react';
import { 
    View, 
    Text,
    ActivityIndicator,
    Image,    
} from 'react-native'

import {styles} from 'UniversoCF/components/styles/Styles';
import { firebase } from '@react-native-firebase/auth';

export default class Loading extends React.Component{
  static navigationOptions = {        
         tabBarVisible: false ,
    };
  state = {email: '', password: '', errorMensaje: null}    
  componentDidMount = async () => {
    const {navigate} = this.props.navigation;
    await firebase.auth().onAuthStateChanged(email => {      
       this.props.navigation.navigate(email ? 'Main' : 'Login') 
     /* 
      if (user === null ){
        console.log("Entro al Auth")
          navigate('Login')
      }
      else{
        console.log("Entro al Else")
          navigate('Main')
      }
    */
    })
    
  }
  
    
  render(){
    this.componentDidMount();
    return( 
      <View style={styles.fondo}>
        <Image
            style={{width: 100, height: 100}}
            source={require('UniversoCF/components/img/UniversoLogoU.png')}
        />
        <Text style={styles.subtitulo} >Cargando</Text>
        <ActivityIndicator size="large" />
          
      </View>
    );
    
  }
}