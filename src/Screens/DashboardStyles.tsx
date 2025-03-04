import { StyleSheet } from 'react-native';
import { Colors } from '../common/styles/Theme';
import { horizontalScale, moderateScale, verticalScale } from '../common/styles/Dimensions';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: horizontalScale(10),
        paddingVertical: verticalScale(5),
        backgroundColor: Colors.BACKGROUND
    },
    headerText: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: Colors.BLACK
    },
    userProfile: {
        backgroundColor: Colors.BUTTON_BG,
        width: horizontalScale(45),
        height: horizontalScale(45),
        borderRadius: moderateScale(100),
        padding: moderateScale(2),
        justifyContent: 'center',
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
    },
    notificationContainer: {
        borderWidth: 1,
        borderColor: Colors.BLACK,
        borderRadius: moderateScale(100),
        padding: moderateScale(5)
    },
    addButton: {
        zIndex: 1,
        backgroundColor: Colors.BUTTON_BG,
        position: 'absolute',
        bottom: verticalScale(25),
        alignSelf: 'flex-end',
        right: horizontalScale(20),
        padding: moderateScale(10),
        borderRadius: moderateScale(100)
    },
    hiddenContainer: {
        alignItems: 'flex-end',
        borderRadius: moderateScale(10),
        marginBottom: verticalScale(10),
        marginHorizontal: horizontalScale(11),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: moderateScale(5)
    },
    deleteButton: {
        width: horizontalScale(60),
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: Colors.RED,
        borderRadius: moderateScale(10),
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: verticalScale(10),
        paddingHorizontal: horizontalScale(10),
        marginHorizontal: horizontalScale(10),
        backgroundColor: Colors.LIST_BG,
        marginBottom: verticalScale(10),
        borderRadius: moderateScale(10),
        gap: moderateScale(5),
        justifyContent: 'space-between',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: moderateScale(10),
    },
    toDoTitle: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: Colors.BLACK,
    },
    toDoDetails: {
        fontSize: moderateScale(14),
        color: Colors.LABEL,
        flexShrink: 1,
    },
    sectionHeaderTitle: {
        paddingTop: verticalScale(10),
        paddingBottom: verticalScale(5),
    },
    sectionText: {
        fontSize: moderateScale(17),
        fontWeight: '700',
        color: Colors.BLACK,
    },
    elevation: {
        elevation: 5,
        shadowColor: Colors.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 1,
    },
    noTasksContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: moderateScale(20),
    },
    noTasksText: {
        fontSize: moderateScale(18),
        color: Colors.BLACK,
        textAlign: 'center',
    },

});
