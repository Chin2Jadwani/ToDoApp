import React, { useState, useCallback, useRef } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import moment from 'moment'
import { useSelector } from 'react-redux'
import PushNotification from 'react-native-push-notification'

import { Ionicons } from '../common/styles/Icons'
import { Colors } from '../common/styles/Theme'
import { styles } from './DashboardStyles'
import { horizontalScale, moderateScale } from '../common/styles/Dimensions'
import { useAppDispatch } from '../redux/hooks'
import { allTodos, deleteTodo, toggleTodo } from '../redux/todoSlice'
import { GroupedTasks, Task } from '../types'

import AddToDoModal from './AddToDoModal'
import TaskRow from '../components/TaskRow'

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch()
  const allTodo = useSelector(allTodos)
  const swipeListRef = useRef<any>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isModal, setIsModal] = useState(false)
  const [rowHeights, setRowHeights] = useState<{ [key: string]: number }>({})

  const groupByDueDate = useCallback((tasks: Task[]): GroupedTasks[] => {
    const groupedData: Record<string, GroupedTasks> = {}

    tasks.forEach(task => {
      if (!groupedData[task.dueDate]) {
        groupedData[task.dueDate] = {
          dueDate: task.dueDate,
          data: []
        }
      }
      groupedData[task.dueDate].data.push(task)
    })

    return Object.values(groupedData).sort((a, b) =>
      moment(a.dueDate, 'DD/MM/YYYY').toDate().getTime() -
      moment(b.dueDate, 'DD/MM/YYYY').toDate().getTime()
    )
  }, [])

  const handleLayout = useCallback((event: any, id: string) => {
    const { height } = event.nativeEvent.layout
    setRowHeights(prev => ({ ...prev, [id]: height }))
  }, [])

  const handleEdit = useCallback((task: Task) => {
    swipeListRef.current?.closeAllOpenRows()
    setSelectedTask(task)
    setIsModal(true)
  }, [])

  const toggleCheck = useCallback((task: Task) => {
    dispatch(toggleTodo(task.id))
    if (!task.completed) {
      PushNotification.localNotification({
        channelId: "task-channel",
        title: "Task Completed",
        message: `You have completed: ${task.title}`,
        playSound: true,
        soundName: "default",
      })
    }
  }, [dispatch])

  const handleDelete = useCallback((task: Task) => {
    dispatch(deleteTodo(task.id))
    PushNotification.localNotification({
      channelId: "task-channel",
      title: "Task Deleted",
      message: `You have Deleted: ${task.title}`,
      playSound: true,
      soundName: "default",
    })
  }, [dispatch])

  const renderItem = useCallback(({ item }: { item: Task }) => (
    <TaskRow
      task={item}
      onLayout={(event) => handleLayout(event, item.id)}
      onToggle={() => toggleCheck(item)}
    />
  ), [handleLayout, toggleCheck])

  const renderHiddenItem = useCallback(({ item }: { item: Task }) => (
    <View style={[styles.hiddenContainer, { height: rowHeights[item.id] || 50 }]}>
      <TouchableOpacity
        style={[styles.deleteButton, { backgroundColor: Colors.BLUE }]}
        onPress={() => handleEdit(item)}>
        <Ionicons
          name="pencil-outline"
          size={moderateScale(24)}
          color={Colors.WHITE}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item)}>
        <Ionicons
          name="trash-outline"
          size={moderateScale(24)}
          color={Colors.WHITE}
        />
      </TouchableOpacity>
    </View>
  ), [handleEdit, handleDelete, rowHeights])

  const renderSectionHeader = ({ section }: any) => (
    <View style={styles.sectionHeaderTitle}>
      <Text style={styles.sectionText}>{section.dueDate}</Text>
    </View>
  );

  const closeModal = useCallback(() => {
    setIsModal(false)
    setSelectedTask(null)
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => { setIsModal(true); }}
        activeOpacity={0.7}
        style={[styles.addButton, styles.elevation]}
      >
        <Ionicons
          name='add-outline'
          size={moderateScale(30)}
          color={Colors.WHITE}
        />
      </TouchableOpacity>

      <View style={styles.topContainer}>
        <View style={[styles.userProfile, styles.elevation]} />
        <Text style={styles.headerText}>TO DO APP</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.notificationContainer}
        >
          <Ionicons
            name="notifications-outline"
            size={moderateScale(20)}
            color={Colors.BLACK}
          />
        </TouchableOpacity>
      </View>

      {allTodo.length > 0 ? (
        <SwipeListView
          ref={swipeListRef}
          useSectionList
          sections={groupByDueDate(allTodo)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          renderSectionHeader={renderSectionHeader}
          rightOpenValue={-150}
          disableRightSwipe
          contentContainerStyle={{ padding: horizontalScale(10) }}
        />
      ) : (
        <View style={styles.noTasksContainer}>
          <Text style={styles.noTasksText}>No tasks available</Text>
        </View>
      )}

      <AddToDoModal
        visible={isModal}
        closeModal={closeModal}
        title={selectedTask ? 'Update Todo' : 'Add To Do'}
        editTask={selectedTask}
      />
    </View>
  )
}

export default Dashboard