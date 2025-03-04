import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from './DashboardStyles'
import { Colors } from '../common/styles/Theme'
import { Ionicons } from '../common/styles/Icons'
import { horizontalScale, moderateScale } from '../common/styles/Dimensions'
import { SwipeListView } from 'react-native-swipe-list-view'
import AddToDoModal from './AddToDoModal'
import { useSelector } from 'react-redux'
import { allTodos, deleteTodo } from '../redux/todoSlice'
import { useAppDispatch } from '../redux/hooks'
import { GroupedTasks, Task } from '../types'
import moment from 'moment'

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

  const renderItem = ({ item }: any) => (
    <View
      style={[styles.cartItem, styles.elevation]}
      onLayout={event => handleLayout(event, item.id)}>
      <View style={styles.contentContainer}>
        <TouchableOpacity></TouchableOpacity>
        <View>
          <Text numberOfLines={1} style={styles.toDoTitle}>
            {item.title}
          </Text>
          <Text numberOfLines={2} style={styles.toDoDetails}>
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
        onPress={() => { dispatch(deleteTodo(item.id)); }}>
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
      <TouchableOpacity onPress={() => { setIsModal(true) }} activeOpacity={0.7} style={styles.addButton}>
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