import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

const AddMovie = ({ onAddMovie }) => {
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('Ação');

  const handleAdd = () => {
    if (nome.trim() === '') {
      alert('Por favor, digite o nome do filme');
      return;
    }

    onAddMovie({ nome: nome.trim(), genero });
    setNome('');
    setGenero('Ação');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <MaterialIcons name="add-box" size={22} color={theme.primary} />
        <Text style={styles.title}>Cadastrar filme</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome do filme</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Ex: Interestelar"
          placeholderTextColor={theme.textMuted}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gênero</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={genero}
            onValueChange={(itemValue) => setGenero(itemValue)}
            style={styles.picker}
            dropdownIconColor={theme.primary}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Ação" value="Ação" color={theme.text} />
            <Picker.Item label="Comédia" value="Comédia" color={theme.text} />
            <Picker.Item label="Drama" value="Drama" color={theme.text} />
            <Picker.Item
              label="Ficção Científica"
              value="Ficção Científica"
              color={theme.text}
            />
            <Picker.Item label="Terror" value="Terror" color={theme.text} />
            <Picker.Item label="Romance" value="Romance" color={theme.text} />
            <Picker.Item label="Animação" value="Animação" color={theme.text} />
          </Picker>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleAdd}
        activeOpacity={0.85}
      >
        <MaterialIcons name="add-circle" size={22} color="#FFF" />
        <Text style={styles.buttonText}>Adicionar à lista</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.surface,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.text,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    color: theme.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.border,
    padding: 14,
    borderRadius: 12,
    backgroundColor: theme.surfaceLight,
    fontSize: 16,
    color: theme.text,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
    backgroundColor: theme.surfaceLight,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: {
    height: Platform.OS === 'ios' ? 150 : 50,
    width: '100%',
    color: theme.text,
  },
  pickerItem: {
    color: theme.text,
  },
  button: {
    backgroundColor: theme.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 6,
    gap: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AddMovie;
