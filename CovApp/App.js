import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import { Button, Text, View, StyleSheet, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Stack, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

const lang = ["Español", "English", "Français", "中国人"]//Languages in which the application will be available
// const [state, setState] = useState(initalState);

const createUser = (email, pass) => {
  auth()//Function for create new users
    .createUserWithEmailAndPassword(email, pass)
    .then(() => {
      console.log('User account created & signed in!');
      setEmail('');
      setPass('');
      navigation.navigate('HomeScreen') // Si se crea el usuario, entrar al home
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}

const logIn = ({ navigation }) => {
  navigation.navigate("Home")
}

const logOut = () => {
  auth() //Funcion for close session
    .signOut()
    .then(() => {
      console.log('User signed out!');
      navigation.navigate('LogInScreen');
    });
}

function LogInScreen({ navigation }) { //Log in screen
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>

      <View style={styles.texi}>
        <Text style={styles.txDo2}>Email</Text>
        <TextInput placeholder='Email' style={styles.txlog} /* onChangeText={(value) => handleChangeText(value, "email")}
        value={state.email} */
          onChangeText={(email) => setEmail(email)} //En cada cambio le pasamos el valor al useState de email
        ></TextInput>
      </View>

      <View style={styles.texi}>
        <Text style={styles.txDo2}>Password</Text>
        <TextInput placeholder='Password' style={styles.txlog} /* onChangeText={(value) => handleChangeText(value, "email")}
        value={state.email} */
          onChangeText={(pass) => setPass(pass)} //En cada cambio le pasamos el valor al useState de pass
        ></TextInput>
      </View>

      <Button title="Sign In" style={styles.Button}
        onPress={() => navigation.navigate("Home")}
      />

      <View style={styles.btnSepa}></View>

      <Button title="Sign Up" style={styles.Button}
        onPress={() => navigation.navigate("Sign Up")}
      />

    </View>

  );
}

function SignUpScreen({ navigation }) {//Registration screen
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>

      <View style={styles.texi}>
        <Text style={styles.txDo2}>Email</Text>
        <TextInput placeholder='Email' style={styles.txlog}
          onChangeText={(email) => setEmail(email)} //En cada cambio le pasamos el valor al useState de email

        ></TextInput>
      </View>

      <View style={styles.texi}>
        <Text style={styles.txDo2}>Password</Text>
        <TextInput placeholder='Password' style={styles.txlog}
          onChangeText={(pass) => setPass(pass)} //En cada cambio le pasamos el valor al useState de pass

        ></TextInput>
      </View>

      <Button title="Sign Up" style={styles.Button}
        onPress={() => createUser(email, pass), logIn}
      />
    </View>
  );
}


const HomeScreen = ({ navigation }) => {//Main screen showing information about the doses applied and the date when they were applied.
  return (
    <View>

      <View style={styles.texPadCurp}>
        <Text style={styles.txmain}>Curp</Text>
        <Text style={styles.texC}>HEMJ820709MMIRNS08</Text>
      </View>

      <View style={styles.txDosis}>
        <Text style={styles.txSepa}>Dose 1</Text>
        <Text style={styles.txDo2}>Dose 2</Text>
      </View>

    </View>
  );
}

const check = () => {//Checkbox to be used in the main screen to keep track of the doses (does not work).
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
      </View>
    </View>
  );
}

function SettingsScreen({ navigation }) {//Configuration screen, where you can log out and change the language of the application.
  return (
    <View style={{
      justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff',
      paddingTop: 40, paddingBotton: 80
    }}>
      <View style={styles.texPadLang}>
        <>
          <Text style={{ padding: 75, paddingBottom: 30, fontSize: 20 }}>Languaje</Text>
        </>
        <SelectDropdown style={{ paddingBottom: 50 }}
          data={lang}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
      </View>
      <Button title="Log Out" style={{
        position: 'absolute', width: 300, height: 40,
        left: 58, top: 460,
      }}
        onPress={() => logOut, navigation.navigate('LogIn')}
      />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused//Icons that appear to access the home screen
                ? 'ios-person-outline'
                : 'ios-person-outline';
            } else if (route.name === 'Settings') {
              iconName = focused//Icons that appear to access the settings screen
                ? 'cog-outline'
                : 'cog-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{//Colors displayed when active or inactive
          activeTintColor: 'red',
          inactiveTintColor: 'black',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />{/*Button to access the HomeScreen or also called the main screen.*/}
        <Tab.Screen name="Settings" component={SettingsStackScreen} />{/*Button to access the SettingsScreen*/}
      </Tab.Navigator>
    </View>
  );
}

function tabNav (){
  <Tab.Navigator independent={true}
  ScreenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused//Icons that appear to access the home screen
          ? 'ios-person-outline'
          : 'ios-person-outline';
      } else if (route.name === 'Settings') {
        iconName = focused//Icons that appear to access the settings screen
          ? 'cog-outline'
          : 'cog-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
  tabBarOptions={{//Colors displayed when active or inactive
    activeTintColor: 'red',
    inactiveTintColor: 'black',
  }}
>
  <Tab.Screen name="Home" component={HomeStackScreen} />{/*Button to access the HomeScreen or also called the main screen.*/}
  <Tab.Screen name="Settings" component={SettingsStackScreen} />{/*Button to access the SettingsScreen*/}
</Tab.Navigator>
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {//Hides headers and links components
  return (
    <NavigationContainer>
      <HomeStack.Navigator >
        <HomeStack.Screen name="Home" style={styles.txUpBar} component={HomeScreen}
          Options={{ headerShown: false }}
        />
        <HomeStack.Screen name="Settings" component={SettingsScreen} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

const LogStack = createStackNavigator();

function LogStackScreen() {//Hides headers and links components
  return (
    <NavigationContainer>
      <LogStack.Navigator ScreenOptions={{ headerShown: false }}>
        <LogStack.Screen name="Log In" component={LogInScreen}

        />
        <LogStack.Screen name="Home" component={HomeScreen} />
        <LogStack.Screen name="Sign Up" component={SignUpScreen} />
      </LogStack.Navigator>
    </NavigationContainer>
  );
}

const SignStack = createStackNavigator();

function SignStackScreen() {//Hides headers and links components
  return (
    <NavigationContainer>
      <SignStack.Navigator screenOptions={{ headerShown: false }}>
        <SignStack.Screen name="Sign Up" component={SignUpScreen} />
        <LogStack.Screen name="Home" component={HomeScreen} />
      </SignStack.Navigator>
    </NavigationContainer>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {//Hide header and link component
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Home" component={HomeScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <LogStackScreen />
  );
}

const styles = StyleSheet.create({ //Styles that are used in the app
  txlog: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 7,
    color: '#000000'
  },
  txDosis: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    padding: 7,
  },
  txSepa: {
    borderBottomWidth: 1,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 11,
    paddingBottom: 19,
  },
  btnSepa: {
    paddingBottom: 16,
  },
  txDo2: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingTop: 18.5,
  },
  texi: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 12,
  },
  texPadCurp: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 260,
  },
  txUpBar: {
    color: '#ffffff'
  },
  texPadLang: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 180,
  },
  txmain: {
    fontSize: 30,
    paddingRight: 15,
    paddingBottom: 12,
  },
  texC: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    paddingBottom: 2,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 2,
    paddingTop: 2,
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  line: {
    width: 327,
    height: 0,
    left: 43,
    top: 438,
  },
  texLang: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    paddingBottom: 2,
    paddingRight: 40,
    paddingLeft: 40,
    paddingBottom: 2,
    paddingTop: 2,
    fontSize: 20,
    textAlign: 'center',
  },
  Button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 45,
    backgroundColor: '#323232',
    padding: 60,
  },
  usericon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 4,
    position: 'absolute',
    width: 38.64,
    height: 38.32,
    left: 69,
    top: 838,
  },
});