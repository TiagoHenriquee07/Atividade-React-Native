import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MovieItem from '../components/MovieItem';
import AddMovie from '../components/AddMovie';
import { HEADER_IMAGE, getPosterForMovie } from '../constants/genreImages';
import { theme } from '../constants/theme';

const INITIAL_MOVIES = [
  { id: 1, nome: 'Matrix', genero: 'Ficção Científica' },
  { id: 2, nome: 'O Senhor dos Anéis', genero: 'Ação' },
  { id: 3, nome: 'Toy Story', genero: 'Animação' },
].map((m) => ({ ...m, poster: getPosterForMovie(m.nome, m.genero) }));

const MovieList = () => {
  const [filmes, setFilmes] = useState(INITIAL_MOVIES);

  const addMovie = (newMovie) => {
    const filmeComId = {
      ...newMovie,
      id: Date.now(),
      poster: getPosterForMovie(newMovie.nome, newMovie.genero),
    };
    setFilmes([filmeComId, ...filmes]);
  };

  const deleteMovie = (id) => {
    setFilmes((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: HEADER_IMAGE }} style={styles.headerImage}>
        <View style={styles.headerOverlay}>
          <Text style={styles.title}>CineList</Text>
          <Text style={styles.subtitle}>Seus filmes favoritos em um só lugar</Text>
        </View>
      </ImageBackground>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.body}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <AddMovie onAddMovie={addMovie} />

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>
            Filmes cadastrados ({filmes.length})
          </Text>

          <FlatList
            data={filmes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MovieItem
                id={item.id}
                nome={item.nome}
                genero={item.genero}
                poster={item.poster}
                onDelete={deleteMovie}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyEmoji}>🎬</Text>
                <Text style={styles.emptyText}>Nenhum filme cadastrado ainda.</Text>
                <Text style={styles.emptyHint}>Adicione o primeiro acima!</Text>
              </View>
            }
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  headerImage: {
    height: 200,
    justifyContent: 'flex-end',
  },
  headerOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 48,
    backgroundColor: 'rgba(15, 15, 20, 0.55)',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.text,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: theme.textMuted,
    marginTop: 6,
  },
  body: {
    flex: 1,
    marginTop: -28,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.textMuted,
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 24,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 17,
    color: theme.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyHint: {
    fontSize: 14,
    color: theme.textMuted,
    marginTop: 6,
    textAlign: 'center',
  },
});

export default MovieList;
