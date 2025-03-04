import React from 'react'
import { Text, View } from 'react-native'
import CheckBox from 'react-native-check-box'
import { Colors } from '../common/styles/Theme'
import { Task } from '../types'
import { styles } from '../Screens/DashboardStyles'

interface TaskRowProps {
    task: Task
    onLayout: (event: any) => void
    onToggle: () => void
}

const TaskRow: React.FC<TaskRowProps> = ({ task, onLayout, onToggle }) => {
    const isCompleted = task.completed

    return (
        <View
            style={[styles.cartItem, styles.elevation]}
            onLayout={onLayout}>
            <View style={styles.contentContainer}>
                <CheckBox
                    onClick={onToggle}
                    isChecked={isCompleted}
                    checkedCheckBoxColor={Colors.BLUE}
                    checkBoxColor={Colors.BLACK}
                />
                <View>
                    <Text
                        numberOfLines={1}
                        style={[
                            styles.toDoTitle,
                            isCompleted && { textDecorationLine: 'line-through', color: 'gray' }
                        ]}
                    >
                        {task.title}
                    </Text>
                    <Text
                        numberOfLines={2}
                        style={[
                            styles.toDoDetails,
                            isCompleted && { textDecorationLine: 'line-through', color: 'gray' }
                        ]}
                    >
                        {task.details}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default React.memo(TaskRow)