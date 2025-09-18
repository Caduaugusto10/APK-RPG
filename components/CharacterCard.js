import React from 'react';
import { Card, Button, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { UserOutlined, UserAddOutlined, DeleteOutlined } from '@ant-design/icons-react-native';

const CharacterCard = ({ character, onRecruit, onRemove }) => (
  <Card style={styles.card}>
    <Card.Title
      title={character.name}
      left={props => <UserOutlined style={{ fontSize: 32, color: '#6200ee' }} />}
    />
    <Card.Content>
      <Text>Status: {character.recruited ? 'Recrutado' : 'Disponível'}</Text>
    </Card.Content>
    <Card.Actions>
      {!character.recruited && (
        <Button 
          icon={({ size, color }) => <UserAddOutlined style={{ fontSize: size || 16, color }} />} 
          onPress={() => onRecruit(character)}
        >
          Recrutar
        </Button>
      )}
      <Button 
        icon={({ size, color }) => <DeleteOutlined style={{ fontSize: size || 16, color: color || 'red' }} />} 
        onPress={() => onRemove(character)} 
        textColor="red"
      >
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
