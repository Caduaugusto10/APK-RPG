import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const AddCharacterForm = ({ onAdd }) => {
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nome do Personagem"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />
      <Button mode="contained" onPress={handleAdd} style={styles.button} icon="plus">
        Adicionar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
  button: {
    height: 48,
    justifyContent: 'center',
  },
});

export default AddCharacterForm;
