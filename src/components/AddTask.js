import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { theme } from '../constants/theme';

const estadoInicial = {
  desc: '',
  date: new Date(),
  showDatePicker: false,
};

export default function AddTask(props) {
  const [estado, setEstado] = useState({ ...estadoInicial });

  const resetAndClose = () => {
    setEstado({ ...estadoInicial });
    props.onCancel();
  };

  const handleSave = () => {
    if (!estado.desc.trim()) {
      alert('Informe a descrição da tarefa');
      return;
    }
    props.onSave({ desc: estado.desc.trim(), date: estado.date });
    setEstado({ ...estadoInicial });
  };

  const dateString = moment(estado.date).locale('pt-br').format('ddd, D [de] MMMM [de] YYYY');

  return (
    <Modal
      transparent
      visible={props.isVisible}
      onRequestClose={resetAndClose}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={resetAndClose}>
        <View style={styles.background} />
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <Text style={styles.header}>Nova tarefa</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe a descrição..."
          placeholderTextColor={theme.textMuted}
          onChangeText={(desc) => setEstado((prev) => ({ ...prev, desc }))}
          value={estado.desc}
        />

        <TouchableOpacity
          onPress={() => setEstado((prev) => ({ ...prev, showDatePicker: true }))}
        >
          <Text style={styles.dateLabel}>Data prevista</Text>
          <Text style={styles.date}>{dateString}</Text>
        </TouchableOpacity>

        {estado.showDatePicker && (
          <DateTimePicker
            value={estado.date}
            mode="date"
            onChange={(_, date) =>
              setEstado((prev) => ({
                ...prev,
                date: date || prev.date,
                showDatePicker: false,
              }))
            }
          />
        )}

        <View style={styles.buttons}>
          <TouchableOpacity onPress={resetAndClose}>
            <Text style={styles.buttonCancel}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.buttonSave}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableWithoutFeedback onPress={resetAndClose}>
        <View style={styles.background} />
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.surface,
    flex: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  header: {
    backgroundColor: theme.primary,
    color: '#fff',
    textAlign: 'center',
    padding: 18,
    fontSize: 18,
    fontWeight: '700',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  input: {
    height: 48,
    margin: 16,
    backgroundColor: theme.surfaceLight,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: theme.text,
  },
  dateLabel: {
    marginLeft: 16,
    fontSize: 12,
    color: theme.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 18,
    marginLeft: 16,
    marginTop: 4,
    marginBottom: 12,
    color: theme.text,
    fontWeight: '600',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  buttonCancel: {
    margin: 20,
    marginRight: 16,
    color: theme.textMuted,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSave: {
    margin: 20,
    marginRight: 28,
    color: theme.primary,
    fontSize: 16,
    fontWeight: '700',
  },
});
