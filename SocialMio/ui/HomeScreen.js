import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View, Text, Button, FlatList } from 'react-native';
import InputMessages from "./InputMessages";
import Messages from "./Messages";
import {useState} from 'react';
import axios from "axios";

export default function HomeScreen({token, onLogout}){
    const [newId, setId] = useState();
  const [messages, setMessages] = useState([
    {
      id: 1,
      username: 'Martina',
      text: 'Yoshi è bello',
      date: 28052026
    }, {
      id: 2,
      username: 'Alessandro',
      text: 'Abbasso il Senato',
      date: 28052026
    }, {
      id: 3,
      username: 'Riccardo',
      text: 'Amo Yoshi',
      date: 28052026
    }, {
      id: 4,
      username: 'Damiano',
      text: 'Forza Lazio',
      date: 28052026
    }, {
      id: 5,
      username: 'Marco',
      text: 'Martina è la mia figlia preferita',
      date: 28052026
    }
  ]);

  function handleDelete(id) {
    //console.log(id);
    // filtro la lista e mi restituisce un'altra lista; nuova lista che passo a setMessages
    setMessages ( messages.filter(message => message.id !== id));
  }

  function handlePost(content) {
    const newId = Math.max(...messages.map(m => m.id))+1;
    setMessages([
      ...messages,
      {
        id: newId,
        username: 'Yoshi',
        text: content,
        date: Date.now()
      }
    ]);
  }

  function handleEdit(id, newText) {
  setMessages(messages.map(message => {
    if (message.id === id) {
      return { ...message, text: newText };
    } else {
      return message;
    }
  }));
}

  function loadPosts() {
    axios
      .get("http://192.168.1.110/api/messages.php", {
        headers: {
          Authorization: "Bearer" + token
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("Request completed");
      });
  }
    return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.text}>YoshiX</Text>
        <Text>Powered by Martina</Text>
      </View>
      <View style={styles.view}>
        <Button title="Logout" onPress={onLogout} color="#DEB887"></Button>
      </View>
      <View style={styles.view}>
        <InputMessages inputMessageLabel='What are you thinking about?' messageButton='Send your post' onMessagePostPress={handlePost}/>
      </View>
      <View style={styles.view}>
        <FlatList data={messages}
                  keyExtractor={message => message.id}
                  renderItem={(message) => (
                    <Messages userName={message.item.username}
                              textMessage={message.item.text}
                              dateTime={message.item.date}
                              id={message.item.id}
                              onMessageDeletePress={handleDelete}
                              onMessageSavePress={handleEdit}
                              modifyButton='Modifica'
                              deleteButton='Elimina'
                              saveButton='Salva'
                              cancelButton='Annulla'/>)
                  }
        />
      </View>
      <View>
        <Button title="Scarica messaggi" onPress={loadPosts}></Button>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

  const styles = StyleSheet.create({
  container: {
    backgroundColor: 'bisque',
    alignItems: 'center',
    //justifyContent: 'center',
    borderWidth: 1,
  },
  text: {
    fontSize: 40,
    color: 'white',
  },
  view: {
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: "stretch"
  }
});
