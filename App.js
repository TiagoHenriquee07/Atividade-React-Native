import { StatusBar } from 'expo-status-bar';
import MovieList from './src/screens/MovieList';

export default function App() {
  return (
    <>
      <MovieList />
      <StatusBar style="auto" />
    </>
  );
}
