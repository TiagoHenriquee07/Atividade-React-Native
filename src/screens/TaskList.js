import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Task from '../components/Task';
import AddTask from '../components/AddTask';
import moment from 'moment-timezone';
import 'moment/locale/pt-br';
import { TASK_HEADER_IMAGE } from '../constants/genreImages';
import { theme } from '../constants/theme';

const taskDB = [
  {
    id: '1',
    desc: 'Ler o livro Fúria Vermelha',
    estimateAt: new Date(),
    doneAt: null,
  },
  {
    id: '2',
    desc: 'Caminhar com o cachorro',
    estimateAt: new Date(),
    doneAt: null,
  },
  {
    id: '3',
    desc: 'Assistir a série GOT',
    estimateAt: new Date(),
    doneAt: null,
  },
];

export default function TaskList() {
  const [tasks, setTasks] = useState([...taskDB]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [hideDone, setHideDone] = useState(false);

  const today = moment()
    .tz('America/Sao_Paulo')
    .locale('pt-br')
    .format('ddd, D [de] MMMM');

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, doneAt: task.doneAt ? null : new Date() }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const saveTask = ({ desc, date }) => {
    const newTask = {
      id: String(Date.now()),
      desc,
      estimateAt: date,
      doneAt: null,
    };
    setTasks((prev) => [newTask, ...prev]);
    setShowAddTask(false);
  };

  const visibleTasks = hideDone ? tasks.filter((t) => !t.doneAt) : tasks;
  const pendingCount = tasks.filter((t) => !t.doneAt).length;

  return (
    <View style={styles.container}>
      <AddTask
        isVisible={showAddTask}
        onCancel={() => setShowAddTask(false)}
        onSave={saveTask}
      />

      <ImageBackground source={{ uri: TASK_HEADER_IMAGE }} style={styles.background}>
        <View style={styles.headerOverlay}>
          <View style={styles.iconBar}>
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setHideDone((v) => !v)}
              activeOpacity={0.8}
            >
              <FontAwesome
                name={hideDone ? 'eye-slash' : 'eye'}
                size={18}
                color="white"
              />
              <Text style={styles.eyeLabel}>
                {hideDone ? 'Mostrar concluídas' : 'Ocultar concluídas'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Minhas Tarefas</Text>
            <Text style={styles.subtitle}>{today}</Text>
            <Text style={styles.counter}>
              {pendingCount} pendente{pendingCount !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.taskList}>
        <FlatList
          data={visibleTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Task
              {...item}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {hideDone ? 'Nenhuma tarefa pendente.' : 'Nenhuma tarefa cadastrada.'}
            </Text>
          }
          contentContainerStyle={styles.listContent}
        />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.85}
        onPress={() => setShowAddTask(true)}
      >
        <FontAwesome name="plus" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  background: { height: 220 },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 15, 20, 0.6)',
  },
  taskList: { flex: 1 },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  eyeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  eyeLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: '800',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16,
    marginTop: 6,
  },
  counter: {
    color: theme.primary,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.textMuted,
    marginTop: 40,
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
