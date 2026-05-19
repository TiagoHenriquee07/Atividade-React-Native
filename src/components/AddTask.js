import { useState } from 'react'
import {Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker' 
import moment from 'moment'

const estadoInical= {
    desc: '',
    date: new Date(),
    showDateTimePicker: false
}

export default function addTask(props) {
    const [estado, setEstado] = useState({...estadoInical})

    const getDatePicker = () =>{
        let datePicker = <DateTimePicker 
            value={estado.date}
            onChange={(_, date) => setEstado(prev => {
                return {...prev, date, showDatePicker: false} 
            })}
        />

        const dateString = moment(estado.date).format('ddd, D [de] MMMM [de] YYYY')

        datePicker = (
            <View>
                <TouchableOpacity onPress={() => setEstado(prev=> {
                    return {...prev, showDatePicker: true}
                })}>
                    <Text style={styles.date}>
                        {dateString}
                    </Text>
                </TouchableOpacity>
                {estado.showDatePicker && datePicker}
            </View>
        )

        return datePicker
    }

    return(
        <Modal transparent={true} visible={props.isVisible}
            onRequestClose={props.onCancel}
            animationType='slide'>

            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
            
            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Informe a descrição...'
                    onChangeText={desc => setEstado(prev => {
                        return {
                            ...prev,
                            desc
                        }
                    })}
                    value={estado.desc}
                />
                {getDatePicker()}

                <View style={styles.buttons}>
                    <TouchableOpacity onPress={props.onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.button}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 2
    },
    background: {
        flex: 1,
        backgroundColor:'rgba(0,0,0,0.7)'
    },
    header: {
        backgroundColor: '#b13b44',
        color: '#fff',
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        height: 40,
        margin: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button:{
        margin: 20,
        marginRight: 28,
        color: '#b13b44'
    },
    date: {
        fontSize: 20,
        marginLeft: 16
    }

})