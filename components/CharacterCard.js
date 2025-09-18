import React from 'react';
import { Card, Button, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CharacterCard = ({ character, onRecruit, onRemove }) => (
  <Card style={styles.card}>
    <Card.Title
      title={character.name}
      left={props => <MaterialIcons name="person" size={32} color="#6200ee" />}
    />
    <Card.Content>
      <Text>Status: {character.recruited ? 'Recrutado' : 'Disponível'}</Text>
    </Card.Content>
    <Card.Actions>
      {!character.recruited && (
        <Button icon="account-plus" onPress={() => onRecruit(character)}>
          Recrutar
        </Button>
      )}
      <Button icon="delete" onPress={() => onRemove(character)} color="red">
        Remover
      </Button>
    </Card.Actions>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default CharacterCard;
