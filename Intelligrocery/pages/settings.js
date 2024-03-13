
//React Native
import { Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native'

//Firebase
import { auth, handleSignOut } from '../firebase'
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const SettingsScreen = ({navigation}) => {
    // const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
            source={require('../images/IntelliGrocery.png')}
            style={{ width: windowWidth * 0.8, height: windowWidth * 0.15, marginBottom: 25 }} // Adjust percentages as needed
            />
            <Text style={styles.emailText}>{auth.currentUser?.email}</Text>
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
        backgroundColor: 'tomato',
        width: '50%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonLogOutText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    emailText: {
        fontWeight: 'bold',
        fontSize: 20,
        // marginTop: 20,
    },
})