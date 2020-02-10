import React , {useState,useEffect}from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import {styles} from 'UniversoCF/components/styles/Styles';
import UsuarioDatos from './loaders/DatosUsuario';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

// obtiene los datos de la base una sola vez
    

const EditarDatos = () => {
    const [nombre, setNombre] = useState();
    const [apellido, setApellido] = useState();
    const [cel, setCel] = useState();
    const [sexo, setSexo] = useState();
    const [obs, setObs] = useState();
    const [salud, setSalud] = useState();
    const [nivel, setNivel] = useState('1');
    const [cod, setCod] = useState('1');
    const [loaded, setLoaded] = useState(false);
    const [Usuario,setUsuario] = useState([]);
    const {currentUser} = firebase.auth();
    const [error, setError] = useState(null);
    const [scss, setScss] = useState(null);

    useEffect(() => {
        if (!loaded) {
          firebase
            .database()
            .ref(`/usuarios/${currentUser.uid}`)
            .orderByChild(`${currentUser.uid}`)
            .once('value', snapshot => {
              let data = snapshot.val();
              setNombre(data.nombre);
              setApellido(data.apellido);
              setCel(data.tel);
              setUsuario(snapshot.val());
              setSexo(data.sexo);
              setObs(data.obs);
              setSalud(data.salud);
              setNivel(data.nivel);
              setCod(data.cod);
            });
          setLoaded(true);
        }
    });
    
    const EditarUsuario = () =>{
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
        <View style={styles.fondo}>
            {error &&
                    showError()
                }
                {scss &&
                    showSuccess()
                }
            <Text style={styles.titulo}>Editar Usuario</Text>
            <UsuarioDatos  datatype={nombre} />
            <UsuarioDatos  datatype={apellido}/>
            <UsuarioDatos  datatype={cel}/>
            <UsuarioDatos  datatype={obs}/>
            <UsuarioDatos  datatype={sexo} onChangeText={sexo => setSexo({sexo}),console.log('Sexo: ' + sexo)}/>
            <UsuarioDatos  datatype={salud}/>
            <TouchableOpacity
                    style={styles.BtnStyle}
                    onPress = { () => {
                        EditarUsuario()
                        }
                    }
                >
                    <Text style={styles.textBtnStyle}>Agendar Clase</Text>
                </TouchableOpacity>
        </View>
    )
}
export default EditarDatos;