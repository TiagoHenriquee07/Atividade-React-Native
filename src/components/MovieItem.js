import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

const MovieItem = ({ id, nome, genero, poster, onDelete }) => {
  const handleDelete = () => {
    Alert.alert(
      'Remover filme',
      `Deseja remover "${nome}" da lista?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: () => onDelete(id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: poster }} style={styles.poster} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={1}>{nome}</Text>
        <View style={styles.generoBadge}>
          <MaterialIcons name="local-movies" size={14} color={theme.primary} />
          <Text style={styles.genero}>{genero}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        activeOpacity={0.7}
        accessibilityLabel={`Remover ${nome}`}
      >
        <MaterialIcons name="delete-outline" size={22} color={theme.danger} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.surface,
    padding: 12,
    marginVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  poster: {
    width: 56,
    height: 80,
    borderRadius: 10,
    backgroundColor: theme.surfaceLight,
  },
  info: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 6,
  },
  generoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surfaceLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  genero: {
    fontSize: 13,
    color: theme.textMuted,
    fontWeight: '500',
  },
  deleteButton: {
    padding: 10,
    marginLeft: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(231, 76, 60, 0.12)',
  },
});

export default MovieItem;
