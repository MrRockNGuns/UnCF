import React from 'react';
import {
    View,
    Text,
    Picker,
    TouchableOpacity,
    FlatList,
    Button,
} from 'react-native';

import {styles}  from 'UniversoCF/components/styles/Styles';
import { Calendar,LocaleConfig } from 'react-native-calendars';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';


async function Agregar(state){
    const { fecha, hora, usuario } = this.state
    console.log(fecha,hora,usuario);
    const referencia = firebase.database().ref(`/reservas`);
    await referencia.set({
        //Valores a Agregar
        fecha: fecha,
        hora: hora,
        usuario: usuario,
    });
}

// Defecto Español
LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene.','Feb.','Mar.','Abr.','May.','Jun.','Jul.','Ago','Sept.','Oct.','Nov.','Dic.'],
  dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
  dayNamesShort: ['Dom.','Lun.','Mar.','Mie.','Jue.','Vie.','Sab.'],
}

LocaleConfig.defaultLocale = 'es';


export default class Agenda extends React.Component{
    state = {fecha: '', hora: '',usuario: '',errorMensaje: null} 
    
    agendarClase = () => {
        const { fecha, hora, usuario } = this.state
        const {currentUser}  = firebase.auth()
        const referencia = firebase.database().ref(`/reservas/${currentUser.uid}`);
        const Id = firebase.database().ref(`/reservas/`).push()
        
        
        console.log('Id ' + Id.key)
        console.log('Uid ' + currentUser.uid)

        referencia.child(Id.key).set({
        
            fecha: fecha,
            hora: hora,
            usuario: currentUser.email,
        })
        
        //No hago nada
    }
    render(){
        return(
            <View style={styles.fondo} >
                <Text style={styles.titulo}>
                    Agenda
                </Text>
                <Calendar
                    horizontal={true}
                    hideArrows={false}
                    onDayPress={
                        (day) => {                           
                            this.state.fecha = (day.dateString),                            
                            console.log(this.state.fecha)
                        }
                    }
                    markedDates={
                        { 
                            [this.state.fecha]: { selected: true } 
                        }
                    }
                    theme={
                        {
                            calendarBackground: 'black',
                            textSectionTitleColor: '#64b6ac',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#00adf5',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                            dotColor: '#00adf5',
                            selectedDotColor: '#ffffff',
                            arrowColor: '#738290',
                            monthTextColor: '#23b5d3',
                            indicatorColor: 'blue',
                            textDayFontFamily: 'monospace',
                            textMonthFontFamily: 'monospace',
                            textDayHeaderFontFamily: 'monospace',
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: 16,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 16,
                            agendaKnobColor: 'blue'
                        }
                    } 
                />
                <Picker
                    selectedValue={this.state.language}
                    style={styles.pickerStyle}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({hora: itemValue})
                    }
                >                   
                    <Picker.Item label="07:00 - 08:00" value="7:00 - 08:00" />
                    <Picker.Item label="09:00 10:00" value="9:00 10:00" />
                    <Picker.Item label="12:20 13:20" value="12:20 13:20" />
                    <Picker.Item label="17:00 18:00" value="17:00 18:00" />
                    <Picker.Item label="18:00 19:00" value="18:00 19:00" />
                    <Picker.Item label="19:00 20:00" value="19:00 20:00" />
                    <Picker.Item label="20:00 21:00" value="20:00 21:00" />
                    <Picker.Item label="21:00 22:00" value="21:00 22:00" />
                </Picker>

                
                <TouchableOpacity
                    style={styles.BtnStyle}
                    onPress = { () => {
                        this.state.hora != null && this.state.fecha != null ?
                        this.agendarClase() : console.log("Falta Datos")
                        }
                    }
                >
                    <Text style={styles.textBtnStyle}>Agendar Clase</Text>
                </TouchableOpacity>               
            </View>
        );
    }
}
/**
  <TextInput
                    style={styles.Input} 
                    placeholder="Hora"
                    placeholderTextColor="white"
                    name="Hora"
                    onChangeText={hora => this.setState({ hora })}
                    value={this.state.hora} 
                /> */