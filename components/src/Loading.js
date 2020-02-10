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
    headerStyle: {
      backgroundColor: 'black',
      shadowOpacity: 0,
      elevation: 0,
    },
  };

  state = {email: '', password: '', errorMensaje: null}
  componentDidMount = async () => {
    const {navigate} = this.props.navigation;
    await firebase.auth().onAuthStateChanged(email => {
       this.props.navigation.navigate(email ? 'Main' : 'Login')
    })
  }
  render(){
    return( 
      <View style={styles.fondo}>
        <Image
            style={{width: 100, height: 100}}
            source={require('UniversoCF/components/img/UniversoLogoU.png')}
        />
        <Text style={styles.subtitulo}>Cargando</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}