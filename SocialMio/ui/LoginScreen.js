import {useState} from "react";
import {View, Text, TextInput, Button, StyleSheet} from "react-native";
import axios from "axios";
import RegistrationScreen from "./RegistrationScreen";

export default function LoginScreen({onLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [view, setView] = useState("login");
    function handleLogin(){
        axios
            // url casa
            // .post("http://192.168.1.110/api/login.php",
            .post("http://10.10.53.237/api/login.php",
            {
                username: username,
                password: password
            })
            .then((response) => {
                if (response.data.token) {
                    onLogin(response.data.token);
                } else {
                    alert(response.data.error);
                }
            })
            .catch((error) => {
                alert('Impossibile contattare il server: ' + error.message);
            });
    }
    function handleRegistration(){
        if(!username || !password || !confirmPassword) {
            alert("Inserisci username e password");
            return;
        }
        axios
            // url casa
            // .post("http://192.168.1.110/api/login.php",
            .post("http://10.10.53.237/api/registration.php",
            {
                username: username,
                password: password,
                confirmPassword: confirmPassword
            })
            .then((response) => {
                if (response.data) {
                    onRegistration(response.data);
                } else {
                    alert(response.data.error);
                }
            })
            .catch((error) => {
                alert('Impossibile contattare il server: ' + error.message);
            });
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={styles.loginText}>Username</Text>
                <TextInput style={styles.loginTextInput} value={username} onChangeText={setUsername}/>
                <Text style={styles.loginText}>Password</Text>
                <TextInput style={styles.loginTextInput} secureTextEntry={true} value={password} onChangeText={setPassword}/>
                <Button color="#DEB887" title="Login" onPress={handleLogin}/>
                {view === "login" && (
                    <Button title="Registrati" onPress={() => setView("register")} />
                )}
                {view === "register" && (
                    <RegisterScreen onRegistration={handleRegistration} />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'bisque',
    },
    container: {
        alignItems: 'center',
        borderColor: 'black',
        backgroundColor: 'white',      
        borderWidth: 1,
        borderRadius: 10,
        width: '75%',
        padding: 10,
    },
    loginText: {
        fontWeight: 'bold',
        fontSize: 10,
        color: 'black',
        padding: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 10,
        padding: 5,
    },
    loginTextInput: {
        fontWeight: 'thin',
        fontSize: 10,
        color: 'black',
        borderColor: 'black',
        borderWidth: 1,
        width: '50%',
        paddingBottom: 5,
        margin: 5,
    }
})