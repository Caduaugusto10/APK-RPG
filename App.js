import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Provider as PaperProvider,
  Portal,
  Dialog,
  Button,
  Snackbar,
  SegmentedButtons,
  Text,
} from "react-native-paper";
import { 
  UnorderedListOutlined, 
  BedOutlined, 
  StarOutlined, 
  CheckOutlined, 
  DeleteOutlined 
} from '@ant-design/icons-react-native';

// Componentes
import Header from "./components/Header";
import AddCharacterForm from "./components/AddCharacterForm";
import CharacterCard from "./components/CharacterCard";

export default function App() {
  // Habilita LayoutAnimation no Android
  useEffect(() => {
    if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const [characters, setCharacters] = useState([
    { id: 1, name: "🧙‍♂️ Gandalf o Mago", recruited: 0 },
    { id: 2, name: "⚔️ Aragorn o Guerreiro", recruited: 0 },
    { id: 3, name: "🏹 Legolas o Arqueiro", recruited: 0 },
  ]);

  // Filtro: all | available | recruited
  const [filter, setFilter] = useState("all");

  // Snackbar (feedback visual)
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  // Diálogos de confirmação
  const [confirmAdd, setConfirmAdd] = useState({ visible: false, name: "" });
  const [confirmRemove, setConfirmRemove] = useState({ visible: false, character: null });

  const showSnackbar = (message) => setSnackbar({ visible: true, message });
  const hideSnackbar = () => setSnackbar({ visible: false, message: "" });

  const filteredCharacters = useMemo(() => {
    if (filter === "recruited") return characters.filter((c) => !!c.recruited);
    if (filter === "available") return characters.filter((c) => !c.recruited);
    return characters;
  }, [characters, filter]);

  // Pedido de adição via formulário -> abre modal de confirmação
  function requestAddCharacter(name) {
    if (!name || !name.trim()) return;
    setConfirmAdd({ visible: true, name: name.trim() });
  }

  function addCharacterConfirmed() {
    const name = confirmAdd.name;
    if (!name) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const newCharacterObj = {
      id: Date.now(),
      name,
      recruited: 0,
    };

    setCharacters((prev) => [newCharacterObj, ...prev]);
    setConfirmAdd({ visible: false, name: "" });
    showSnackbar("Personagem adicionado");
  }

  function cancelAddCharacter() {
    setConfirmAdd({ visible: false, name: "" });
  }

  function toggleRecruit(character) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCharacters((prev) =>
      prev.map((c) =>
        c.id === character.id ? { ...c, recruited: c.recruited ? 0 : 1 } : c
      )
    );
    showSnackbar(
      character.recruited ? "Marcado como disponível" : "Personagem recrutado"
    );
  }

  function requestRemoveCharacter(character) {
    setConfirmRemove({ visible: true, character });
  }

  function removeCharacterConfirmed() {
    const char = confirmRemove.character;
    if (!char) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCharacters((prev) => prev.filter((c) => c.id !== char.id));
    setConfirmRemove({ visible: false, character: null });
    showSnackbar("Personagem removido");
  }

  function cancelRemoveCharacter() {
    setConfirmRemove({ visible: false, character: null });
  }

  function renderCharacter({ item }) {
    return (
      <CharacterCard
        character={item}
        onRecruit={toggleRecruit}
        onRemove={requestRemoveCharacter}
      />
    );
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <Header />

        {/* Filtro */}
        <View style={styles.filterRow}>
          <Text variant="titleMedium" style={styles.filterLabel}>Filtrar:</Text>
          <SegmentedButtons
            value={filter}
            onValueChange={setFilter}
            buttons={[
              { 
                value: "all", 
                label: "Todos", 
                icon: ({ size, color }) => <UnorderedListOutlined style={{ fontSize: size || 16, color }} /> 
              },
              { 
                value: "available", 
                label: "Disponíveis", 
                icon: ({ size, color }) => <BedOutlined style={{ fontSize: size || 16, color }} /> 
              },
              { 
                value: "recruited", 
                label: "Recrutados", 
                icon: ({ size, color }) => <StarOutlined style={{ fontSize: size || 16, color }} /> 
              },
            ]}
            style={{ flex: 1 }}
          />
        </View>

        {/* Formulário para adicionar */}
        <AddCharacterForm onAdd={requestAddCharacter} />

        {/* Lista */}
        <FlatList
          data={filteredCharacters}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderCharacter}
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 24 }}
        />

        {/* Diálogo confirmar adicionar */}
        <Portal>
          <Dialog visible={confirmAdd.visible} onDismiss={cancelAddCharacter}>
            <Dialog.Title>Adicionar Personagem</Dialog.Title>
            <Dialog.Content>
              <Text>Deseja adicionar "{confirmAdd.name}"?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={cancelAddCharacter}>Cancelar</Button>
              <Button 
                onPress={addCharacterConfirmed} 
                icon={({ size, color }) => <CheckOutlined style={{ fontSize: size || 16, color }} />}
              >
                Confirmar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* Diálogo confirmar remover */}
        <Portal>
          <Dialog visible={confirmRemove.visible} onDismiss={cancelRemoveCharacter}>
            <Dialog.Title>Remover Personagem</Dialog.Title>
            <Dialog.Content>
              <Text>
                Remover "{confirmRemove.character?.name}" da party?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={cancelRemoveCharacter}>Não</Button>
              <Button 
                onPress={removeCharacterConfirmed} 
                icon={({ size, color }) => <DeleteOutlined style={{ fontSize: size || 16, color: color || 'red' }} />}
                textColor="red"
              >
                Sim
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {/* Snackbar */}
        <Snackbar visible={snackbar.visible} onDismiss={hideSnackbar} duration={2000}>
          {snackbar.message}
        </Snackbar>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A0E0A",
  },
  list: {
    flex: 1,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  filterLabel: {
    color: "#F4E4BC",
    marginRight: 12,
  },
});