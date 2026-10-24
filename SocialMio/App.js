import {useEffect, useState} from 'react';
import HomeScreen from './ui/HomeScreen';
import LoginScreen from './ui/LoginScreen';
import * as SecureStore from 'expo-secure-store';

export default function App() {
  const [token, setToken] = useState(null);
  // salvo un valore all'interno della memoria del telefono, con await
  // aspetto che il salvataggio sia completato
  async function saveToken(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  // leggo un valore dal secure store, se non trovo nulla mi dà null
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
  }
  useEffect(() => {
    getValueFor('token').then(result => setToken(result));
  }, []);
  async function  handleLogin(newToken) {
    await saveToken('token', newToken);
    setToken(newToken);
  }
  async function handleLogout() {
    await SecureStore.deleteItemAsync('token');
    setToken(null);
  }
    if(token) {
      return (<HomeScreen token={token} onLogout={handleLogout}></HomeScreen>);
    } else {
      return (<LoginScreen onLogin={handleLogin}></LoginScreen>);
    }
}