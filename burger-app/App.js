import * as React from 'react';
import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  Image,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItems,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//LoginScreen

function LoginScreen({ navigation }) {
  const [username, setUname] = useState('');
  const [password, setPword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('./Src/components/images/logo.png')}
        />
        <Text style={styles.title}> Get ready for a Burger rain </Text>
      </View>

      <View style={styles.container}>
        <TextInput
          placeholder='Username'
          placeholderTextColor="rgba(255,255,255,0.7)"
          onChangeText={(username) => setUname(username)}
          returnKeyType="next"
          style={styles.inputText}>
          </TextInput>

        <TextInput
          placeholder='Password'
          placeholderTextColor="rgba(255,255,255,0.7)"
          onChangeText={(password) => setPword(password)}
          returnKeyType="go"
          secureTextEntry
          style={styles.inputText}>
          </TextInput>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            var uname = username;
            var pword = password;

            if (uname == 'nas' && pword == 'abc123') {
              Alert.alert('Login Successfull');
              navigation.navigate('Home',
              {itemId:username
              
              });
              } 
            else {
              Alert.alert('Error!, Please check the username and Password');
            }

          }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}

//HomeScreen - Drawer
const Drawer = createDrawerNavigator();

function HomeScreen({navigation, route}){
  const {itemId} = route.params;
  return(
    <Drawer.Navigator DrawerContent={props => <customDrawerContent {...props}/>}
    screenOptions={
      {
        headerStyle:{
          backgroundColor: '#130f40',
        },
        headerTintColor:'#fff',
      }}>
      <Drawer.Screen name = "Home" component={HomePage} intialParams = {{itemId1 : itemId}}/>
      <Drawer.Screen name = "Signout" component={LoginScreen}/>
      </Drawer.Navigator>
  );
}

//HomePage - Tabs
const Tab=createBottomTabNavigator()
function HomePage({navigation, route}){
  const {itemId} = route.params;
 return(
   <Tab.Navigator screenOptions = {({route}) => ({
     tabBarIcon : ({focused,color,size}) => {  
       if (route.name === 'Home'){
         return(
           <Ionicons
           name={
             focused
             ? 'ios-home'
             : 'ios-home'
           }
           size = {size}
           color = {color} />
         );
       } else if (route.name === 'Products'){
         return (
           <Ionicons
            name={focused 
            ? 'fast-food-outline'
            : 'fast-food-outline'
            }
            size = {size}
            color = {color}
            />
         );
       }
       else if (route.name === 'Add Cart'){
         return (
           <Ionicons
            name={focused 
            ? 'cart-outline'
            : 'cart-outline'}
            size = {size}
            color = {color}
            />
         );
       }
     },
   })}
   tabBarOptions={{
     activeTintColor:'tomato',
     inactiveTintColor:'gray'
   }}
   >
   <Tab.Screen name = "Home" component = {HomeStackScreen} initialParams = {{itemId2:itemId}}/>
   <Tab.Screen name = "Products" component={ProductScreen}/>
   <Tab.Screen name = "Add Cart" component ={CartScreen}/>
   </Tab.Navigator>
 );
}

//Products Screen
function ProductScreen(){
  return (
    <View style={styles.container}>
    <Text>Our Price Menu</Text>
    <View style={styles.imgContainer}> 
    <Image style={styles.logo1} source={require('./Src/components/images/1.jpg')}/>
    <Image style={styles.logo1} source={require('./Src/components/images/2.jpg')}/>
    <Image style={styles.logo1} source={require('./Src/components/images/3.jpg')}/>
    </View>
    <View style={styles.imgContainer}> 
    <Image style={styles.logo1} source={require('./Src/components/images/4.jpg')}/>
    <Image style={styles.logo1} source={require('./Src/components/images/5.jpg')}/>
    <Image style={styles.logo1} source={require('./Src/components/images/6.jpg')}/>
    </View>
    </View>
  )
}

function HomeStackScreen({navigation,route }){
  const {itemId2} = route.params;
  return(
    <View style={styles.logoContainer}>
    <Text style = {styles.title1}>
      Hi {itemId2}! Welcome to the Burger Cloud
    </Text>
    </View>
  );
}



function App (){
  const RootStack = createStackNavigator();
  return (
    <NavigationContainer>
      <RootStack.Navigator mode = 'modal'headerMode='none'
        screenOptions={{
          headerStyle:{
            backgroundColor:'#f4511e',
            },
            headerTintColor: '#fff',
        }}>
       
        <RootStack.Screen name = "Login" component={LoginScreen} />
        <RootStack.Screen name = "Home" component={HomePage} />
        </RootStack.Navigator> 
    </NavigationContainer>
  )
}

function CartScreen({route,navigation}){
  const [pname, setText2] = useState('');
  const [location, setText3] = useState('');
  const [swiftcode, setText4] = useState('');

  return(
    <View style = {styles.container}>
    <TextInput
    placeholder = "Product Name"
    placeholderTextColor = "rgba(0,0,0,0.7)"
    onChangeText={pname=>setText2(pname)}
    defaultValue={pname}
    returnKeyType="next"
    style = {styles.inputS}></TextInput>

    <TextInput
    placeholder = "Delivery Location"
    placeholderTextColor = "rgba(0,0,0,0.7)"
    onChangeText={location=>setText3(location)}
    defaultValue={location}
    returnKeyType="next"
    style = {styles.inputS}></TextInput>

    <TextInput
    placeholder = "SwiftCode"
    placeholderTextColor = "rgba(0,0,0,0.7)"
    onChangeText={swiftcode=>setText4(swiftcode)}
    defaultValue={swiftcode}
    returnKeyType="go"
    style = {styles.inputS}></TextInput>
    
    <TouchableOpacity
    styles={styles.buttonContainer}
    onPress={()=>{
      var productName = pname;
      var locationAddress = location;
      var swiftcode = swiftcode;

      Alert.alert('Product'+productName+'will be deliver to the location'
      +locationAddress+'.\n Changes will be reduce from swift code :' +swiftcode);
    }}>
    <Text style={styles.buttonText}>Proceed</Text>
    </TouchableOpacity>
    </View>
  );
}

export default App;

//Stylesheet
const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    backgroundColor: '#cb4330',
  },
  inputText: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    fontSize: 20,
    color: '#ffffff',
    paddingHorizontal: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 20,
  },
  buttonContainer: {
    backgroundColor: '#fc5d00',
    paddingVertical: 15,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  logo: {
    width: 250,
    height: 250,
    alignItems:"center"
  },

  logo1: {
    width: 90,
    height: 90,
    alignItems:"center"
  },
  title1: {
   fontSize:30,
  },

  imgContainer:{
    marginTop:30,
    justifyContent:'space-around',
    flexDirection : 'row',
    alignItems:'center',
  }
});

