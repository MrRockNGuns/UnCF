import React from 'react';
import {
    View,
    Text,
    Picker,
    TouchableOpacity,
} from 'react-native';

import {styles}  from 'UniversoCF/components/styles/Styles';
import { Calendar,LocaleConfig } from 'react-native-calendars';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/auth';

import ModalRutinas  from 'UniversoCF/components/src/ModalRutinas';
import ModalView from 'UniversoCF/components/src/Modal';

// Defecto Español
LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene.','Feb.','Mar.','Abr.','May.','Jun.','Jul.','Ago','Sept.','Oct.','Nov.','Dic.'],
  dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
  dayNamesShort: ['Dom.','Lun.','Mar.','Mie.','Jue.','Vie.','Sab.'],
}

LocaleConfig.defaultLocale = 'es';

export default class Agenda extends React.Component{
    state = {fecha: '', hora: '',usuario: '',errorMensaje: null,successMensaje: null,modalVisible: false, limite: 0,loading: false,ocupados: 0,completo: false} 
    
    componentDidMount = async  () => {
        
         firebase.database().ref(`/tope/`).once('value',
         val => {
             var Lim = val.val()
             this.setState({limite: Lim.Cap})
         })
        
    }


    verificarDisp =  () => {
        const { fecha, hora,completo  } = this.state
        const referencia = firebase.database().ref(`/reservas/${fecha}/${hora}/`);
        
        referencia.once('value', value => {
            var items = value.val()
            let count = 0
            Object.values(items).map(
                (i) => {
                    count ++;
                    this.contarPersonas(count)        
                }
            )
            console.log('Completado')
            this.setState({completo: true})
            this.agendarClase() 
        }) 
    }

    agendarClase =  () => {
        console.log('Intento agendar')
        const { fecha, hora,ocupados,limite } = this.state
        const {currentUser}  = firebase.auth()
        const referencia = firebase.database().ref(`/reservas/${fecha}/${hora}/`);
        const Id = currentUser.uid
        

        if(hora == null || hora == null){
            this.setState({errorMensaje: 'Debe indicar una Hora.'})
        }
        else{
            this.setState({loading: true})

            console.log('Limite: ' + this.state.limite)
            console.log('Ocupados: ' + this.state.ocupados)
            if (ocupados <= limite){
                console.log('Sobran Lugares')
                referencia.child(Id).set({
                    usuario: currentUser.email,
                }, onComplete = () =>{
                    this.setState({loading: false})
                    this.setState({successMensaje: 'Agendado Correctamente'})
                })
            }
            else{
                this.setState({loading: false})
                this.setState({errorMensaje: 'No quedan Cupos para esta clase'})
            }
            
            
        }

    }

    contarPersonas = (valor) =>{
        this.setState({ocupados:  valor })
        console.log('Sumando Ocupados: ' + this.state.ocupados)
    }

    showError =() =>{
        const {errorMensaje} = this.state;
        return(
            <Text style={styles.textoError}>{errorMensaje}</Text>
        );
    }

    showSuccess = () =>{
        const {successMensaje} = this.state;
        return(
            <Text style={styles.textoSuccess}>{successMensaje}</Text>
        )
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    
    render(){
        return(
            
            <View style={styles.fondo} >
                <ModalView visible={this.state.loading} />
                {this.state.errorMensaje &&
                    this.showError()
                }
                {this.state.successMensaje &&
                    this.showSuccess()
                }
                    <ModalRutinas 
                        mostrar={this.state.modalVisible} 
                        dia={this.state.fecha} 
                        hora={this.state.hora}
                        cerrar={()=> this.setModalVisible(false)}
                        errors={() => this.setState({errorMensaje: 'Debe indicar una Hora.'})} />
                

                <Text style={styles.titulo}>
                    Agenda
                </Text>
                <Calendar
                    horizontal={true}
                    hideArrows={false}
                    
                    onDayPress={
                        (day) => {                           
                            this.setState({fecha: day.dateString})
                            //this.state.fecha = (day.dateString)
                        }
                    }
                    markedDates={
                        { 
                            [this.state.fecha]: { selected: true } 
                        }
                    }
                    onChangeText={fecha => this.setState({ fecha })}
                    theme={
                        {
                            calendarBackground:         'black',
                            textSectionTitleColor:      '#64b6ac',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor:       '#ffffff',
                            todayTextColor:             '#00adf5',
                            dayTextColor:               '#2d4150',
                            textDisabledColor:          '#d9e1e8',
                            dotColor:                   '#00adf5',
                            selectedDotColor:           '#ffffff',
                            arrowColor:                 '#738290',
                            monthTextColor:             '#23b5d3',
                            indicatorColor:             'blue',
                            textDayFontFamily:          'monospace',
                            textMonthFontFamily:        'monospace',
                            textDayHeaderFontFamily:    'monospace',
                            textDayFontWeight:          '300',
                            textMonthFontWeight:        'bold',
                            textDayHeaderFontWeight:    '300',
                            textDayFontSize:            16,
                            textMonthFontSize:          16,
                            textDayHeaderFontSize:      16,
                            agendaKnobColor:            'blue'
                        }
                    } 
                />
                <Picker
                    selectedValue={this.state.hora}
                    style={styles.pickerStyle}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({hora: itemValue})
                      }
                >                   
                    <Picker.Item label='Eliga una hora...' value={0} />
                    <Picker.Item label="07:00 08:00" value="07:00 08:00" />
                    <Picker.Item label="09:00 10:00" value="09:00 10:00" />
                    <Picker.Item label="12:20 13:20" value="12:20 13:20" />
                    <Picker.Item label="17:00 18:00" value="17:00 18:00" />
                    <Picker.Item label="18:00 19:00" value="18:00 19:00" />
                    <Picker.Item label="19:00 20:00" value="19:00 20:00" />
                    <Picker.Item label="20:00 21:00" value="20:00 21:00" />
                    <Picker.Item label="21:00 22:00" value="21:00 22:00" />
                </Picker>

                <TouchableOpacity
                style={styles.BtnStyleOp}
                onPress = { () => {
                    this.setModalVisible(true)
                }
                }
                >
                    <Text style={styles.textBtnStyleOp}>Rutinas para el dia</Text>
                </TouchableOpacity>               
                
                <TouchableOpacity
                    style={styles.BtnStyle}
                    onPress = { () => {
                        this.state.hora != null && this.state.fecha != null ?
                        this.verificarDisp() : console.log("Falta Datos")
                        }
                    }
                >
                    <Text style={styles.textBtnStyle}>Agendar Clase</Text>
                </TouchableOpacity>               
            </View>
        );
    }
}