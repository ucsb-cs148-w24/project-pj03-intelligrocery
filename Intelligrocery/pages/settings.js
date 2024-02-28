
//React Native
import { Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/core'

//Firebase
import { auth, handleSignOut } from '../firebase'


const SettingsScreen = ({navigation}) => {
    // const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Email: { auth.currentUser?.email }</Text>
        <TouchableOpacity
            onPress={() => {
                handleSignOut({ navigation });
            }}
            style={ styles.buttonLogOut }
        >
            <Text style={styles.buttonLogOutText}>Sign out</Text>
        </TouchableOpacity>
        </View>
    )
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
    }, 
    buttonLogOut: {
        backgroundColor: '#0782F9',
        width: '50%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonLogOutText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})