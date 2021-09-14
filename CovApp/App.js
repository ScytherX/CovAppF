import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import { Button, Text, View, StyleSheet, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Stack, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import CreateUserScreen from "./screens/CreateUserScreen";

const lang = ["Español", "English", "Français", "中国人"]//Languages in which the application will be available

var usert = null;

function LogInScreen({ navigation }) { //Log in screen
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const logIn = () => {
    auth().signInWithEmailAndPassword(email,pass);
    usert = auth().currentUser.email;
    console.log(`${usert} ha iniciado sesión.`)
    navigation.navigate("Home",{
      params: { user: usert },
    });
  }

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
        onPress={logIn}
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

  const signup = () => {
    createUser(email, pass)
    navigation.navigate("Home")
  }

  const createUser = (email, pass) => {
    auth()//Function for create new users
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        console.log('User account created & signed in!');
        setEmail('');
        setPass('');
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

      <Button
        title="Sign Up"
        style={styles.Button}
        onPress={signup}
      />
    </View>
  );
}

function HomeScreen({ route,navigation }) {//Registration screen

  

  return (
    <View>

      <View style={styles.texPadCurp}>
        <Text style={styles.txmain}>Curp</Text>
        <Text style={styles.texC}>{usert}</Text>
      </View>

      <View style={styles.txDosis}>
        <Text style={styles.txSepa}>Dose 1</Text>
        <Text style={styles.txDo2}>Dose 2</Text>
      </View>

      <Button title="S.O.S." style={styles.Button}
        onPress={() => navigation.navigate("Configuracion")}
      />

    </View>
  );
}


function SettScreen({ navigation }) {//Configuration screen, where you can log out and change the language of the application.

  const logOut = () => {
    auth() //Funcion for close session
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('LogInScreen');
      });
  }

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

      <Button title="Home" onPress={
        navigation.navigate('Home')
      } />


      <Button title="Log Out" style={{
        position: 'absolute', width: 300, height: 40,
        left: 58, top: 460,
      }}
        onPress={() => logOut}
      />

    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {//Hides headers and links components
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Configuracion" component={SettScreen} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

const LogStack = createStackNavigator();

function LogStackScreen() {//Hides headers and links components
  return (
    <NavigationContainer>
      <LogStack.Navigator ScreenOptions={{ headerShown: false }}>
        <LogStack.Screen name="Log In" component={LogInScreen} />
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
      <SignStack.Navigator>
        <SignStack.Screen name="Sign Up" component={SignUpScreen} />
        <SignStack.Screen name="Home" component={HomeScreen} />
      </SignStack.Navigator>
    </NavigationContainer>
  );
}

const SettStack = createStackNavigator();

function SetStackScreen() {//Hide header and link component
  return (
    <NavigationContainer>
      <SettStack.Navigator>
        <SettStack.Screen name="Set" component={SettScreen} />
        <SettStack.Screen name="Home" component={HomeScreen} />
        <SettStack.Screen name="Log In" component={LogInScreen} />
      </SettStack.Navigator>
    </NavigationContainer>
  );
}

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
    paddingTop: 210,
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