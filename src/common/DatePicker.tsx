import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { horizontalScale, moderateScale, verticalScale } from './styles/Dimensions';
import { Colors } from './styles/Theme';

interface DatePickerProps {
    onPress: () => void;
    label: string;
    labels?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ onPress, label, labels }) => {
    return (
        <View style={{ marginBottom: verticalScale(15) }}>
            {labels && <Text style={styles.topContainerLabelText}>{labels}</Text>}
            <TouchableOpacity
                style={styles.topContainerValue}
                onPress={onPress}
                activeOpacity={0.7}>
                <Text style={styles.topContainerValueText}>{label}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DatePicker;

const styles = StyleSheet.create({
    topContainerLabelText: {
        fontSize: moderateScale(16),
        color: Colors.BLACK,
        alignItems: 'center',
    },
    topContainerValueText: {
        fontSize: moderateScale(16),
        color: Colors.BLACK,
        alignItems: 'center',
    },
    topContainerValue: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: moderateScale(10),
        borderWidth: 1,
        borderColor: Colors.BORDER,
        minHeight: verticalScale(50),
        backgroundColor: Colors.LIST_BG,
        paddingHorizontal: horizontalScale(10)
    },
});