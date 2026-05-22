import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import MovieList from './src/screens/MovieList';
import TaskList from './src/screens/TaskList';
import { theme } from './src/constants/theme';

const TABS = [
  { id: 'movies', label: 'Filmes', icon: 'movie' },
  { id: 'tasks', label: 'Tarefas', icon: 'check-square-o' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('movies');

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.content}>
        {activeTab === 'movies' ? <MovieList /> : <TaskList />}
      </View>

      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.8}
            >
              {tab.id === 'movies' ? (
                <MaterialIcons
                  name={tab.icon}
                  size={24}
                  color={isActive ? theme.primary : theme.textMuted}
                />
              ) : (
                <FontAwesome
                  name={tab.icon}
                  size={22}
                  color={isActive ? theme.primary : theme.textMuted}
                />
              )}
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: theme.surface,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    paddingVertical: 8,
    paddingBottom: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  tabActive: {
    backgroundColor: theme.surfaceLight,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: theme.textMuted,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: theme.primary,
    fontWeight: '700',
  },
});
