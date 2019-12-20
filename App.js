import React from 'react';
import {createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator} from 'react-navigation-stack'
//import {createDrawerNavigator} from 'react-navigation-drawer';

import LogIn    from './components/src/LogIn';
import SignUp   from './components/src/SignUp';
import Loading  from './components/src/Loading';
import Main     from './components/src/Main';
import Agenda   from './components/src/Agenda';
import Horarios from './components/src/Horarios';
import Configuracion from './components/src/Configuracion';

/*
const MainNavigator = createStackNavigator(
  {  
    Login:   {screen: LogIn},
    SignUp:  {screen: SignUp},
    Loading: {screen: Loading},
    Main:    {screen: Main},
    Agenda:  {screen: Agenda},
  },
  {
    initialRouteName: 'Loading',
  },
);

*/

//const MainNavigator = createDrawerNavigator(
/* Dejo estos por fuera del tab menu
  
    */
const MainNavigator = createBottomTabNavigator(

  { 
    Login:   {screen: LogIn},
    SignUp:  {screen: SignUp},
    Loading: {screen: Loading},
    Main:    {screen: Main},
    Agenda:  {screen: Agenda},
    Config:   {screen: Configuracion}
  },
  {
      initialRouteName: 'Loading',
      tabBarOptions : {
        style: {
          backgroundColor: 'black',
        }
      }
  },
);

const HiddenNavigator = createStackNavigator(
  {
    Login:   {screen: LogIn},
    SignUp:  {screen: SignUp},
    Loading: {screen: Loading},
  },
  {
    initialRouteName: 'Loading',
  },
);

//const App = createStackNavigator({ MainNavigator }, { headerMode: "none" });
const App = createAppContainer(MainNavigator);
//const App = createAppContainer(MainNavigator);

export default App;