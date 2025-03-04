import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Platform,
    TouchableOpacity,
    TextInputProps,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from './styles/Dimensions';
import { Colors } from './styles/Theme';

interface FormInputProps extends TextInputProps {
    label?: string;
    error?: boolean | undefined;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onRightIconPress?: () => void;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    labelStyle?: TextStyle;
    errorText?: string;
    isRound?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    keyboardType = 'default',
    secureTextEntry = false,
    error,
    leftIcon,
    rightIcon,
    onRightIconPress,
    editable = true,
    containerStyle,
    inputStyle,
    labelStyle,
    maxLength,
    onBlur,
    onFocus,
    multiline = false,
    numberOfLines = 1,
    autoCapitalize = 'none',
    errorText,
    isRound = false,
    ...rest
}) => {
    return (
        <View style={[styles.mainContainer, containerStyle]}>
            {label && <Text style={[styles.labelText, labelStyle]}>{label}</Text>}
            <View
                style={[
                    styles.inputContainer,
                    multiline && {
                        minHeight: verticalScale(120),
                        alignItems: 'flex-start',
                    },
                    error && styles.errorInput,
                    !editable && styles.disabledInput,
                ]}>
                {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
                <TextInput
                    style={[
                        styles.input,
                        inputStyle,
                        multiline && styles.multilineInput,
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.PLACEHOLDER}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    editable={editable}
                    maxLength={maxLength}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    autoCapitalize={autoCapitalize}
                    {...rest}
                />
                {rightIcon && (
                    <TouchableOpacity
                        style={styles.rightIconContainer}
                        onPress={onRightIconPress}
                        disabled={!onRightIconPress}>
                        {rightIcon}
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.errorText}>{errorText}</Text>}
        </View>
    );
};

export default FormInput;

const styles = StyleSheet.create({
    mainContainer: {
        marginVertical: verticalScale(5),
    },
    labelText: {
        fontSize: moderateScale(14),
        color: Colors.BLACK,
        marginBottom: verticalScale(5),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: moderateScale(10),
        borderWidth: 1,
        borderColor: Colors.BORDER,
        minHeight: verticalScale(50),
        backgroundColor: Colors.LIST_BG,
    },
    input: {
        flex: 1,
        color: Colors.BLACK,
        fontSize: moderateScale(16),
        padding: Platform.OS === 'android' ? moderateScale(8) : moderateScale(12),
        paddingHorizontal: horizontalScale(16),
    },
    multilineInput: {
        textAlignVertical: 'top',
    },
    leftIconContainer: {
        marginRight: horizontalScale(8),
    },
    rightIconContainer: {
        marginLeft: horizontalScale(8),
    },
    errorInput: {
        borderColor: Colors.RED,
    },
    errorText: {
        color: Colors.RED,
        fontSize: moderateScale(12),
        marginTop: verticalScale(4),
    },
    disabledInput: {
        opacity: 0.7,
        backgroundColor: Colors.BORDER,
    },
});
