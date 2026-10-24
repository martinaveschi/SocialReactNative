import {useState} from "react";
import {View, TextInput, Button, StyleSheet} from "react-native";

export default function InputMessages({inputMessageLabel, postMessageInput, messageButton, onMessagePostPress}) {
  const [text, setText] = useState('');
  return (
      <View style={{flexDirection: 'row', gap: 6, alignItems: 'center', borderWidth: 1}}>
          <TextInput placeholder={inputMessageLabel} defaultValue={postMessageInput} onChangeText={setText} style={styles.message}/>
          <Button color="#DEB887" title={messageButton} onPress={() => onMessagePostPress(text)}/>
      </View>
  );
}

const styles = StyleSheet.create({
  message: {
    backgroundColor: 'white',
    flex: 1,
    borderWidth: 1,
  },
});