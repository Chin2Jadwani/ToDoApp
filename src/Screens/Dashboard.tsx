import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './DashboardStyles'
import { Colors } from '../common/styles/Theme'
import { Ionicons } from '../common/styles/Icons'
import { horizontalScale, moderateScale } from '../common/styles/Dimensions'
import { SwipeListView } from 'react-native-swipe-list-view'
import AddToDoModal from './AddToDoModal'
import { useSelector } from 'react-redux'
import { allTodos, deleteTodo, toggleTodo } from '../redux/todoSlice'
import { useAppDispatch } from '../redux/hooks'
import { GroupedTasks, Task } from '../types'
import moment from 'moment'
import CheckBox from 'react-native-check-box'
import PushNotification from 'react-native-push-notification'

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const allTodo = useSelector(allTodos);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isModal, setIsModal] = useState(false)
  const [rowHeights, setRowHeights] = useState<{ [key: string]: number }>({});
  const handleLayout = (event: any, id: any) => {
    const { height } = event.nativeEvent.layout;
    setRowHeights(prev => ({ ...prev, [id]: height }));
  };

  function groupByDueDate(tasks: Task[]): GroupedTasks[] {
    const groupedData: Record<string, GroupedTasks> = {};

    tasks.forEach(task => {
      if (!groupedData[task.dueDate]) {
        groupedData[task.dueDate] = {
          dueDate: task.dueDate,
          data: []
        };
      }
      groupedData[task.dueDate].data.push(task);
    });

    // Sort groups by date (earliest date first)
    return Object.values(groupedData).sort((a, b) =>
      moment(a.dueDate, 'DD/MM/YYYY').toDate().getTime() -
      moment(b.dueDate, 'DD/MM/YYYY').toDate().getTime()
    );
  }

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsModal(true);
  };
  const toggleCheck = (task: any) => {
    dispatch(toggleTodo(task.id));
    if (task && !task.completed) {
      PushNotification.localNotification({
        channelId: "task-channel",
        title: "Task Completed",
        message: `You have completed: ${task.title}`,
        playSound: true,
        soundName: "default",
      });
    }
  }
  const handleDelete = (task:any)=>{
    dispatch(deleteTodo(task.id));
    if (task) {
      PushNotification.localNotification({
        channelId: "task-channel",
        title: "Task Deleted",
        message: `You have Deleted: ${task.title}`,
        playSound: true,
        soundName: "default",
      });
    }

  }
  const renderItem = ({ item }: any) => (
    <View
      style={[styles.cartItem, styles.elevation]}
      onLayout={event => handleLayout(event, item.id)}>
      <View style={styles.contentContainer}>
        <CheckBox
          onClick={() => {
            toggleCheck(item)
          }}
          isChecked={item.completed}
          checkedCheckBoxColor={Colors.BLUE}
          checkBoxColor={Colors.BLACK}
        />
        <View>
          <Text numberOfLines={1} style={[styles.toDoTitle, item.completed ? { textDecorationLine: 'line-through', color: 'gray' } : {},]}>
            {item.title}
          </Text>
          <Text numberOfLines={2} style={[styles.toDoDetails, item.completed ? { textDecorationLine: 'line-through', color: 'gray' } : {},]}>
            {item.details}
          </Text>
        </View>
      </View>
    </View>
  );
  const renderSectionHeader = ({ section }: any) => (
    <View style={styles.sectionHeaderTitle}>
      <Text style={styles.sectionText}>{section.dueDate}</Text>
    </View>
  );

  const renderHiddenItem = ({ item }: any) => (
    <View style={[styles.hiddenContainer, { height: rowHeights[item?.id] || 50, }]}>
      <TouchableOpacity
        style={[styles.deleteButton, { backgroundColor: Colors.BLUE }]}
        onPress={() => { handleEdit(item) }}>
        <Ionicons
          name="pencil-outline"
          size={moderateScale(24)}
          color={Colors.WHITE}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => { handleDelete(item) }}>
        <Ionicons
          name="trash-outline"
          size={moderateScale(24)}
          color={Colors.WHITE}
        />
      </TouchableOpacity>

    </View>
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { setIsModal(true) }} activeOpacity={0.7} style={[styles.addButton, styles.elevation]}>
        <Ionicons
          name='add-outline'
          size={moderateScale(30)}
          color={Colors.WHITE}
        />
      </TouchableOpacity>
      <View style={styles.topContainer}>
        <View style={[styles.userProfile, styles.elevation]} />
        <Text style={styles.headerText}>TO DO APP</Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.notificationContainer}>
          <Ionicons
            name="notifications-outline"
            size={moderateScale(20)}
            color={Colors.BLACK}
          />
        </TouchableOpacity>
      </View>
      {allTodo.length > 0 ?
        <SwipeListView
          useSectionList
          sections={groupByDueDate(allTodo)}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          renderSectionHeader={renderSectionHeader}
          rightOpenValue={-150}
          disableRightSwipe
          contentContainerStyle={{ padding: horizontalScale(10) }}
        />
        : <View style={styles.noTasksContainer}>
          <Text style={styles.noTasksText}>No tasks available</Text>
        </View>}

      <AddToDoModal visible={isModal}
        closeModal={() => {
          setIsModal(false)
          setSelectedTask(null)
        }}
        title={selectedTask ? 'Update Todo' : 'Add To Do'}
        editTask={selectedTask}
      />
    </View>
  )
}

export default Dashboard