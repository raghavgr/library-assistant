import React, { Component } from "react";
import { createStackNavigator, createSwitchNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { StyleSheet } from "react-native";
import SignInScreen from "./screens/SignIn";
import SignOutScreen from "./screens/SignOut";
import Home from "./screens/Home";

import AddUser from './screens/AddUser';
import FirstScreen from './screens/FirstScreen';
import SecondScreen from './screens/SecondScreen';
import ThirdScreen from './screens/ThirdScreen';
import CheckOut from './screens/CheckOut';
import AddUserBarcode from './screens/AddUserBarcode';
import Inventory from './screens/Inventory';
import EditUser from './screens/EditUser';
import Overdue from './screens/Overdue';

import SomeCustomDrawerContentComponent from "./components/customDrawer";
const AppNavigator = createStackNavigator(
  {
    HomeScreen: Home,
    AddUserScreen: AddUser,
    AddUserBarcodeScreen: AddUserBarcode, 
    FirstPage: FirstScreen,
    SecondPage: SecondScreen,
    ThirdPage: ThirdScreen,
    CheckOutScreen: CheckOut,
    InventoryScreen: Inventory,
    EditUserScreen: EditUser,
    OverdueScreen: Overdue,
    Exit: SignOutScreen,
  }, {
    initialRouteName: 'HomeScreen'
  }
);
/**
 
export const AppStack = createDrawerNavigator(
    {
        Home: {
            screen: AppNavigator,
        },
        Exit:  {
            screen: SignOutScreen
        }
    },
    {
        initialRouteName: 'Home',
        drawerPosition: 'left',
        contentComponent: SomeCustomDrawerContentComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle'
    }
);
 */

export const AuthStack = createStackNavigator({ SignIn: SignInScreen });


export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      App: AppNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: signedIn ? 'App': 'Auth'
    }
  );
};