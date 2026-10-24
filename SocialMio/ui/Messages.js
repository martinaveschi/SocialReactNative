import {useState} from "react";
import {View, Text, TextInput, Button, StyleSheet} from "react-native";

export default function Messages({id, userName, textMessage, dateTime, modifyButton, deleteButton, saveButton, cancelButton, onMessageDeletePress, onMessageSavePress}){
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(textMessage);

  function startEditing() {
    setDraft(textMessage);
    setIsEditing(true);
  }

  function handleSave() {
    onMessageSavePress(id, draft);
    setIsEditing(false);
  }

  function handleCancel() {
    setDraft(textMessage);
    setIsEditing(false);
  }

  let messageContent;
  if (isEditing) {
    messageContent = <TextInput value={draft} onChangeText={setDraft} style={styles.input}/>;
  } else {
    messageContent = <Text>{textMessage}</Text>;
  }

  let buttons;
  if (isEditing) {
    buttons = (
      <>
        <Button title={saveButton} onPress={handleSave} color="#DEB887"></Button>
        <Button title={cancelButton} onPress={handleCancel} color="#DEB887"></Button>
      </>
    );
  } else {
    buttons = (
      <>
        <Button title={modifyButton} onPress={startEditing} color="#DEB887"></Button>
        <Button title={deleteButton} onPress={() => onMessageDeletePress(id)} color="#DEB887"></Button>
      </>
    );
  }

  return (
    <View>
      <Text style={{fontWeight: 'bold'}}>{id}-{userName}</Text>
      {messageContent}
      <Text>{dateTime}</Text>
      <View style={styles.viewbutton}>
        {buttons}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewbutton: {
    alignSelf: "stretch",
    flexDirection: "row",
    gap: 3,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
  },
});