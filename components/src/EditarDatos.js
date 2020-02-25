import React , {useState,useEffect}from 'react';
import {Text,View,TouchableOpacity,TextInput,Picker} from 'react-native';
import {styles} from 'UniversoCF/components/styles/Styles';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';


// obtiene los datos de la base una sola vez


const EditarDatos = (props) => {    
    
    const [nombre, setNombre] = useState();
    const [apellido, setApellido] = useState();
    const [cel, setCel] = useState();
    const [sexo, setSexo] = useState();
    const [obs, setObs] = useState();
    const [salud, setSalud] = useState();
    const [nivel, setNivel] = useState('1');
    const [cod, setCod] = useState('1');
    const [loaded, setLoaded] = useState(false);
    const {currentUser} = firebase.auth();
    const [error, setError] = useState(null);
    const [scss, setScss] = useState(null);
    
    useEffect( () => {
            if (loaded === false) {
                firebase
                  .database()
                  .ref(`/usuarios/${currentUser.uid}`)
                  .orderByChild(`${currentUser.uid}`)
                  .once('value', snapshot => {
                    let data = snapshot.val();
                    setNombre(data.nombre);
                    setApellido(data.apellido);
                    setCel(data.tel);
                    setSexo(data.sexo);
                    setObs(data.obs);
                    setSalud(data.salud);
                    setNivel(data.nivel);
                    setCod(data.cod);
                  });
                  setLoaded(true);
              }
        
    }); 
    const EditarUsuario = () => {
        const referencia = firebase.database().ref(`/usuarios/`);
        try{
            referencia.child(currentUser.uid).set({
                nombre: nombre,
                apellido: apellido,
                tel: cel,
                salud: salud,
                sexo: sexo,
                obs: obs,
                cod: cod,
                email:  currentUser.email,
                nivel: nivel,
              })
              setScss('Cambios guardados');
              //Emitir Mensaje
            } catch (e) {
              console.error(e.message);
                setError(e.message);
            }
    }
    const showError =() =>{
        return(
            <Text style={styles.textoError}>{error}</Text>
        );
    }

    const showSuccess = () =>{
        return(
            <Text style={styles.textoSuccess}>{scss}</Text>
        )
    }
    return(        
        <View style={styles.fondo} > 
            {error &&
                showError()
            }
            {scss &&
                showSuccess()
            }
            <Text style={styles.titulo}>Editar Usuario</Text>
            <TextInput style={styles.Input} onChangeText={(nombre) => setNombre(nombre)} value={nombre}/>
            <TextInput style={styles.Input} onChangeText={(apellido) => setApellido(apellido)} value={apellido}/>
            <TextInput style={styles.Input} onChangeText={(cel) => setCel(cel)} value={cel}/>
            <TextInput style={styles.Input} onChangeText={(obs) => setObs(obs)} value={obs}/>
            <Picker
                selectedValue={sexo}
                style={styles.pickerStyle}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({sexo: itemValue})
                    }
            >                   
                    <Picker.Item label='Sexo...' value={0} />
                    <Picker.Item label='Femenino' value='F' />
                    <Picker.Item label='Masculino' value='M' />
            </Picker>
            <TextInput style={styles.Input} onChangeText={(salud) => setSalud(salud)} value={salud}/>
            <TouchableOpacity
                style={styles.BtnStyle}
                onPress = { () => {
                    EditarUsuario()
                    }
                }>
                <Text style={styles.textBtnStyle}>Editar Datos</Text>
            </TouchableOpacity>
        </View>
    )
}
export default EditarDatos;