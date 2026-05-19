import React, { useState } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Text, 
  SafeAreaView, 
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import MovieItem from '../components/MovieItem';
import AddMovie from '../components/AddMovie';

const MovieList = () => {
  const [filmes, setFilmes] = useState([
    { id: 1, nome: 'Matrix', genero: 'Ficção Científica' },
    { id: 2, nome: 'O Senhor dos Anéis', genero: 'Ação' },
    { id: 3, nome: 'Toy Story', genero: 'Animação' },
  ]);

  const addMovie = (newMovie) => {
    const filmeComId = {
      ...newMovie,
      id: Date.now(),
    };
    setFilmes([filmeComId, ...filmes]); // Adiciona no topo da lista
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>CineList</Text>
          <Text style={styles.subtitle}>Meus Filmes Favoritos</Text>
        </View>

        <AddMovie onAddMovie={addMovie} />

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Filmes Cadastrados ({filmes.length})</Text>
          
          <FlatList
            data={filmes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MovieItem nome={item.nome} genero={item.genero} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhum filme cadastrado ainda.</Text>
              </View>
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 25,
    paddingBottom: 50,
    backgroundColor: '#007BFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    marginTop: 5,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
    marginLeft: 5,
  },
  listContent: {
    paddingBottom: 30,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default MovieList;
