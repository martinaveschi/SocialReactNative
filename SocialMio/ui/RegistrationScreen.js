import {useState} from "react";
import {View, Text, TextInput, Button, StyleSheet} from "react-native";
import axios from "axios";

export default function RegistrationScreen({onRegistered, onCancel}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleRegistration() {
        if (!username || !password || !confirmPassword) {
            alert("Compila tutti i campi");
            return;
        }
        if (password !== confirmPassword) {
            alert("Le password non coincidono");
            return;
        }
        axios
            // url casa
            .post("http://192.168.1.110/api/registration.php",
            //.post("http://10.10.53.237/api/registration.php",
            {
                username: username,
                password: password,
                'password-confirmation': confirmPassword
            })
            .then((response) => {
                if (response.data.success) {
                    alert("Registrazione completata, ora puoi fare il login");
                    onRegistered();
                } else {
                    alert(response.data.error);
                }
            })
            .catch((error) => {
                // il server risponde 400/409 con { error } in caso di dati non validi
                alert(error.response?.data?.error ?? 'Impossibile contattare il server: ' + error.message);
            });
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={styles.registrationText}>Username</Text>
                <TextInput style={styles.registrationTextInput} value={username} onChangeText={setUsername}/>
                <Text style={styles.registrationText}>Password</Text>
                <TextInput style={styles.registrationTextInput} secureTextEntry={true} value={password} onChangeText={setPassword}/>
                <Text style={styles.registrationText}>Conferma password</Text>
                <TextInput style={styles.registrationTextInput} secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword}/>
                <Button color="#DEB887" title="Registrati" onPress={handleRegistration}/>
                <Button title="Torna al login" onPress={onCancel}/>
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
    registrationText: {
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
    registrationTextInput: {
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
