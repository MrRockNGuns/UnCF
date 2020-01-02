import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

//Importo los estilos Propios
import {styles} from 'UniversoCF/components/styles/Styles';
import { firebase } from '@react-native-firebase/auth';

 
export default class LogIn extends React.Component{
    static navigationOptions = {        
         tabBarVisible: false ,
    };
    state = {email: '', password: '', errorMensaje: null}    

    DisplayError =  () => {
        const {errorMensaje} = this.state;
        if (errorMensaje === '[auth/wrong-password] The password is invalid or the user does not have a password.'){
            return(
                 <Text style={{ color: 'red' }}>Contraseña Incorrecta</Text>
            )
        }
        else{
            return(
                <Text style={{ color: 'red' }}>{errorMensaje}</Text>
            )
        }
        
    }
    handleLogin = async () => {
        const { email, password, errorMensaje } = this.state;
        if (email === '' || password === ''){
            var Err = 'Usuario o Correo Vacio';
            this.setState({errorMensaje: Err})
            this.DisplayError();
        }
        else{
            this.setState({errorMensaje: null})
            const login = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then( () => this.props.navigation.navigate('Main',email))
            .catch(e => this.setState({errorMensaje: e.message})  )  
        }       
    }

    render(){
        return(
            <View style={styles.fondo}>
                <Text style={styles.titulo}>Universo CrossFit</Text>
                <Text style={styles.logintxt}>Log In</Text>
                <TextInput style={styles.Input} placeholder="Correo eléctronico" 
                    placeholderTextColor="white" 
                    name="email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    
                />
                <TextInput
                    style={styles.Input} placeholder="Contraseña"
                    secureTextEntry={true}
                    placeholderTextColor="white"
                    name="password" 
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}  
                />
                {this.state.errorMensaje &&
                    this.DisplayError()
                }
                <TouchableOpacity
                    style={styles.BtnStyle}
                    onPress = { () =>
                        this.handleLogin()
                    }
                >
                    <Text style={styles.textBtnStyle}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.BtnStyleOp}
                    onPress = {
                        ()=> this.props.navigation.navigate('SignUp')
                    }
                >
                    <Text style={styles.textBtnStyleOp}>No eres usuario? Registrate</Text>
                </TouchableOpacity>
            </View>
        );   
    }
}