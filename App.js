import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator} from 'react-navigation-stack';
import { Icon } from 'react-native-elements'

import LogIn         from './components/src/LogIn';
import SignUp        from './components/src/SignUp';
import Main          from 'UniversoCF/components/src/Main';
import Agenda        from 'UniversoCF/components/src/Agenda';
import Configuracion from 'UniversoCF/components/src/Configuracion';

//Navegacion interna
import EditarDatos    from 'UniversoCF/components/src/EditarDatos';
import CrearNovedad from 'UniversoCF/components/src/CrearCategoria';
import RegistroScss    from 'UniversoCF/components/src/RegistroScss';

// Primer Menu principal

const ConfiguracionOpc = createStackNavigator(
  {
    Configuracion: {screen:Configuracion},
    EditarDatos: {screen:EditarDatos},
    CrearNovedad: {screen: CrearNovedad},
  },
  {
    initialRouteName: 'Configuracion',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'black',
        headerVisible: true,
      },
      headerTintColor: '#fff',
    }
  },
)

const MainNavigator = createBottomTabNavigator(
  { 
    Main:{screen: Main,
            navigationOptions: {
              tabBarLabel: "Agenda",
              tabBarIcon: () => (
                <Icon color="white" name="home" type="font-awesome" />
              )
            }
         },
    Agenda:  {screen: Agenda,
      navigationOptions: {
        tabBarLabel: "Principal",
        tabBarIcon: () => (
          <Icon color="white" name="calendar" type="font-awesome" />
        )
      }
    },
    Configuracion:{screen: ConfiguracionOpc,
      navigationOptions: {
        tabBarLabel: "Configuracion",
        tabBarIcon: () => (
          <Icon color="white" name="cog" type="font-awesome" />
        )
      }
      
    },
  },
  {    
  tabBarOptions : {
    style: {
      backgroundColor: 'black',
    },
  }
  },
);



const LoginOpc = createStackNavigator(
  {
    Login:   {screen: LogIn},
    SignUp:  {screen: SignUp},
    RegistroScss: {screen: RegistroScss}
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#fff',
    }
  },
)

// Navegacion para LogIn se coloca MainNavigator para luego poder llamarLos objetos correctamente
const HiddenNavigator = createSwitchNavigator(
  {
    LoginOpc:       {screen: LoginOpc},
    MainNavigator: {screen: MainNavigator},
    ConfiguracionOpc : {screen: ConfiguracionOpc}
  },
  {
    initialRouteName: 'LoginOpc',
    headerMode: 'screen',
    headerStyle: {
      backgroundColor: 'black',
    },
    navigationOptions: {
        headerVisible: true,
    }
  },
);

const App = createAppContainer(HiddenNavigator);

export default App;