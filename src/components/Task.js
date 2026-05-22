import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import { theme } from '../constants/theme';

export default function Task(props) {
  const doneOrNotStyle = props.doneAt != null ? { textDecorationLine: 'line-through' } : {};
  const date = props.doneAt ? props.doneAt : props.estimateAt;
  const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM');

  const handleDelete = () => {
    Alert.alert(
      'Remover tarefa',
      `Deseja remover "${props.desc}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => props.onDeleteTask(props.id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
        <View style={styles.checkContainer}>{getCheckedView(props.doneAt)}</View>
      </TouchableWithoutFeedback>
      <View style={styles.textBlock}>
        <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
        <Text style={[styles.date, doneOrNotStyle]}>{formattedDate}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        activeOpacity={0.7}
      >
        <MaterialIcons name="delete-outline" size={22} color={theme.danger} />
      </TouchableOpacity>
    </View>
  );
}

function getCheckedView(doneAt) {
  if (doneAt != null) {
    return (
      <View style={styles.done}>
        <FontAwesome name="check" size={18} color="white" />
      </View>
    );
  }
  return <View style={styles.pending} />;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: theme.border,
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
    backgroundColor: theme.surface,
  },
  checkContainer: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pending: {
    height: 26,
    width: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: theme.textMuted,
  },
  done: {
    height: 26,
    width: 26,
    borderRadius: 13,
    backgroundColor: theme.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: {
    flex: 1,
  },
  desc: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    color: theme.textMuted,
    fontSize: 12,
    marginTop: 4,
  },
  deleteButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(231, 76, 60, 0.12)',
  },
});
