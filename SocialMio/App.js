import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View, Text, Button, FlatList } from 'react-native';
import InputMessages from "./ui/InputMessages";
import Messages from "./ui/Messages";
import {useState} from 'react';
import axios from "axios";
import HomeScreen from './ui/HomeScreen';
import LoginScreen from './ui/LoginScreen';

export default function App() {
  const auth = false;
    if(auth) {
      return (<HomeScreen></HomeScreen>)
    } else {
      return (<LoginScreen></LoginScreen>);
    }
}