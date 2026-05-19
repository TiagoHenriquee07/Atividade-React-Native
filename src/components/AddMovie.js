import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';

const AddMovie = ({ onAddMovie }) => {
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('Ação');

  const handleAdd = () => {
    if (nome.trim() === '') {
      alert('Por favor, digite o nome do filme');
      return;
    }

    onAddMovie({ nome, genero });
    setNome('');
    setGenero('Ação');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Filme</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome do Filme</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Ex: Interestelar"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gênero</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={genero}
            onValueChange={(itemValue) => setGenero(itemValue)}
            style={styles.picker}
            dropdownIconColor="#007BFF"
          >
            <Picker.Item label="Ação" value="Ação" />
            <Picker.Item label="Comédia" value="Comédia" />
            <Picker.Item label="Drama" value="Drama" />
            <Picker.Item label="Ficção Científica" value="Ficção Científica" />
            <Picker.Item label="Terror" value="Terror" />
            <Picker.Item label="Romance" value="Romance" />
            <Picker.Item label="Animação" value="Animação" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAdd} activeOpacity={0.7}>
        <MaterialIcons name="add-circle-outline" size={24} color="#FFF" />
        <Text style={styles.buttonText}>Adicionar Filme</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: -30, // Efeito de sobreposição no header
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    fontSize: 16,
    color: '#333',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: {
    height: Platform.OS === 'ios' ? 150 : 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default AddMovie;
