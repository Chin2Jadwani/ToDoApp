import { Button, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomModal from '../common/CustomModal'
import { verticalScale } from '../common/styles/Dimensions';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormInput from '../common/FormInput';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DatePicker from '../common/DatePicker';
import moment from 'moment';
import { useAppDispatch } from '../redux/hooks';
import { addTodo, updateTodo } from '../redux/todoSlice';
interface CustomModalProps {
    visible: boolean;
    closeModal: () => void;
    maxHeight?: any;
    title?: string;
    editTask?: any;
}
const AddToDoModal: React.FC<CustomModalProps> = ({ visible,
    closeModal, title, editTask }) => {
    const [date, setDate] = useState(new Date());
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (editTask) {
            setFieldValue('title', editTask.title);
            setFieldValue('details', editTask.details);
            setFieldValue('dueDate', editTask.dueDate);
            setDate(moment(editTask.dueDate, 'DD/MM/YYYY').toDate());
        }
    }, [editTask]);

    const validationSchema = yup.object().shape({
        title: yup.string().trim().required('Title is required'),
        details: yup.string().trim(),
    });
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
        resetForm,
    } = useFormik({
        initialValues: {
            title: '',
            details: '',
            dueDate: moment(new Date()).format('DD/MM/YYYY'),
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            const postData = {
                id: editTask ? editTask.id : '',
                title: values?.title,
                details: values?.details,
                dueDate: values?.dueDate,
            };
            if (editTask) {
                dispatch(updateTodo(postData)); // Update existing todo
            } else {
                dispatch(addTodo(postData)); // Add new todo
            }
            CloseModal();
            console.log(postData, values, 'postData');
        },
    });

    const isTitleError = errors.title && touched.title;
    const onChangeDate = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            const formattedDate = moment(selectedDate).format('DD/MM/YYYY');
            setDate(selectedDate);
            setFieldValue('dueDate', formattedDate);
          }
    };

    const showEndMode = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange: onChangeDate,
            mode: 'date',
            is24Hour: true,
        });
    };
    const CloseModal = () => {
        closeModal();
        resetForm();
        setDate(new Date());
    }
    return (
        <CustomModal visible={visible}
            closeModal={() => { CloseModal() }}
            maxHeight='98%'
            title={title}>
            <View style={{ paddingVertical: verticalScale(10) }}>
                <FormInput
                    label="Title"
                    placeholder="Enter todo title..."
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    error={isTitleError ? true : false}
                    errorText={errors.title}
                />
                <FormInput
                    label="To Do Detail"
                    placeholder="Enter todo details..."
                    value={values.details}
                    onChangeText={handleChange('details')}
                    onBlur={handleBlur('details')}
                    errorText={errors.details}
                    multiline
                />
                <DatePicker
                    onPress={showEndMode}
                    label={moment(date).format('DD/MM/YYYY')}
                    labels="Due Date:" />
                <Button title={editTask ? "Update Todo" : "Add Todo"}
                    onPress={() => handleSubmit()}
                    disabled={!values.title.trim() || !values.dueDate}
                />
            </View>

        </CustomModal>
    )
}

export default AddToDoModal

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 10,
    },
    detailsInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    dateText: {
        fontSize: 16,
        paddingVertical: 8,
    },
})