import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator} from 'react-navigation-stack';
import { Icon } from 'react-native-elements'

import LogIn         from './components/src/LogIn';
import SignUp        from './components/src/SignUp';
import Loading       from './components/src/Loading';
import Main          from 'UniversoCF/components/src/Main';
import Agenda        from 'UniversoCF/components/src/Agenda';
import Configuracion from 'UniversoCF/components/src/Configuracion';


//Navegacion interna
import EditarDatos    from 'UniversoCF/components/src/EditarDatos';
import CrearCategoria from 'UniversoCF/components/src/CrearCategoria';


// Primer Menu principal
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
    Config:{screen: Configuracion,
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

const ConfiguracionOpc = createStackNavigator(
  {
    EditarDatos: {screen:EditarDatos},
    CrearCategoria: {screen: CrearCategoria},
  },
  {
    initialRouteName: 'EditarDatos',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#fff',
    }
  },
)

const LoginOpc = createStackNavigator(
  {
    Login:   {screen: LogIn},
    SignUp:  {screen: SignUp},
    Loading: {screen: Loading},    
  },
  {
    initialRouteName: 'Loading',
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