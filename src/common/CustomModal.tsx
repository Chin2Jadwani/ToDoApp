import React from 'react';
import {
    Modal,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
    Text,
} from 'react-native';
// import { moderateScale } from './style/dimensions';
// import { Colors } from './Theme/Themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale } from './styles/Dimensions';
import { Colors } from './styles/Theme';

interface CustomModalProps {
    children: React.ReactNode;
    visible: boolean;
    closeModal: () => void;
    maxHeight?: any;
    title?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
    children,
    visible,
    closeModal,
    maxHeight = '80%',
    title = '',
}) => {
    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={visible}
            onRequestClose={closeModal}
        >
            <View style={styles.backdrop}>
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={closeModal}
                />
                <View style={styles.modalContainer}>
                    <View style={[styles.contentWrapper, { maxHeight }]}>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.BORDER }}>
                            {/* Close Button */}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.closeButton}
                                onPress={closeModal}
                            >
                                <Ionicons
                                    name={'close'}
                                    size={moderateScale(23)}
                                    color={Colors.RED}
                                />
                            </TouchableOpacity>

                            {/* Title (optional) */}
                            {title && (
                                <View style={styles.titleContainer}>
                                    <Text style={styles.titleText}>{title}</Text>
                                </View>
                            )}
                        </View>
                        <ScrollView
                            nestedScrollEnabled
                            contentContainerStyle={styles.scrollViewContent}
                            showsVerticalScrollIndicator={true}
                        >
                            <View style={{ flex: 1 }}>{children}</View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
    },
    modalContainer: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentWrapper: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        maxHeight: '90%',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
        padding: 5,
        backgroundColor: '#f4f4f4',
        borderRadius: moderateScale(5),
    },
    titleContainer: {
        paddingTop: 15,
        paddingBottom: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
});

export default CustomModal;