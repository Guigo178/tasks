import React, { Component } from "react"
import { StyleSheet, View, Text, ImageBackground, FlatList, TouchableOpacity, Platform } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome6"

import moment from "moment"
import 'moment/locale/pt-br'

import today_Image from "../../assets/imgs/today.jpg"

import Task from "../components/Task"

export default class Task_List extends Component {

    state = {
        show_done_task: true,
        visible_tasks: [],
        tasks: [{
            id: Math.random(),
            description: "Tarefa 1",
            estimate_at: moment(new Date()),
            done_at: moment(new Date())
        },
        {
            id: Math.random(),
            description: "Tarefa 2",
            estimate_at: moment(new Date()).add(7, "days"),
            done_at: null
        },
        {
            id: Math.random(),
            description: "Tarefa 3",
            estimate_at: moment(new Date()).add(14, "days"),
            done_at: null
        },
        {
            id: Math.random(),
            description: "tarefa 1",
            estimate_at: moment(new Date()).add(10, "days"),
            done_at: null
        },
        {
            id: Math.random(),
            description: "tarefa 2",
            estimate_at: moment(new Date()).add(120, "days"),
            done_at: null
        }]
    }

    componentDidMount = () => {
        this.filter_tasks()
    }

    filter_tasks = () => {
        let visible_tasks = null
        if (this.state.show_done_task) {
            visible_tasks = [...this.state.tasks]
        } else {
            const pending = task => task.done_at === null
            visible_tasks = this.state.tasks.filter(pending)
        }
        this.setState({ visible_tasks })
    }

    toggle_filter = () => {
        this.setState({show_done_task: !this.state.show_done_task}, this.filter_tasks)
    }

    toggle_task = task_id => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === task_id) {
                task.done_at = task.done_at != null ? null : new Date()
            }
        })
        this.setState({ tasks }, this.filter_tasks())
    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <View style={styles.container}>
                <ImageBackground source={today_Image} style={styles.background}>
                    <View style={styles.icon_bar}>
                        <TouchableOpacity onPress={this.toggle_filter}>
                            <Icon name={this.state.show_done_task ? 'eye' : 'eye-slash'} size={20} color="#FFF"></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subTitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList
                        data={this.state.visible_tasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <Task {...item} toggle_task={this.toggle_task} />}
                    />
                    {/* <Task description={"terminar TCC"}
                        estimate_at={moment(new Date())}
                        done_at={moment(new Date())} />
                    <Task description={"apresentar TCC"}
                        estimate_at={moment(new Date()).add(5, "days")}
                        done_at={null} />
                    <Task description={"Tarefa 3"}
                        estimate_at={moment(new Date()).add(10, "days")}
                        done_at={moment(new Date())} /> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: 'Arial',
        fontSize: 50,
        color: '#FFF',
        marginLeft: 20,
        marginBottom: 20
    },
    subTitle: {
        fontFamily: 'Arial',
        fontSize: 20,
        color: '#FFF',
        marginLeft: 20,
        marginBottom: 30
    },
    icon_bar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 50,
        justifyContent: 'flex-end'
    }
})





