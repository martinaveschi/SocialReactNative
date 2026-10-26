import {useState} from "react";
import {View, Text, TextInput, Button, StyleSheet} from "react-native";
import axios from "axios";

export default function LoginScreen({onRegistration}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    return (
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                <Text style={styles.registrationText}>Username</Text>
                <TextInput style={styles.registrationTextInput} value={username} onChangeText={setUsername}/>
                <Text style={styles.registrationText}>Password</Text>
                <TextInput style={styles.registrationTextInput} secureTextEntry={true} value={password} onChangeText={setPassword}/>
                <Text style={styles.registrationText}>Conferma password</Text>
                <TextInput style={styles.registrationTextInput} secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword}/>
                <Button color="#DEB887" title="Registrati" onRegistration={handleRegistration}/>
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