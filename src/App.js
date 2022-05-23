/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Appearance,
  Button,
} from 'react-native';
import Realm from 'realm';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {LogoutButton} from './LogoutButton';
import {WelcomeView} from './WelcomeView';
import {TasksView} from './TasksView';

async function anonymousLogin() {
  let user;
  try {
    const app = new Realm.App(getRealmApp()); // pass in the appConfig variable that you created earlier
    const credentials = Realm.Credentials.anonymous(); // create an anonymous credential
    user = await app.logIn(credentials);
    return user;
  } catch (error) {
    throw `Error logging in anonymously: ${JSON.stringify(error, null, 2)}`;
  }
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.footer}>
          <Button
            title="Login"
            onPress={() => {
              let promise = anonymousLogin();
              promise
                .then(async user => {
                  console.log('User user', user);
                  const _response = await user.functions.searchWithin(
                    100,
                    [12.8687464, 77.5652512],
                  );
                  console.log('Response', _response);
                })
                .catch(err => {
                  console.log('User error', err);
                });
            }}>
            login
          </Button>
          <View style={{marginBottom: 12}}></View>
          <Button
            title="Search"
            onPress={() => {
              // user = anonymousLogin();
              // console.log('Userlog', user);
            }}>
            login
          </Button>
          <Text style={styles.footerText}>
            Management application for CRUD operation. All rights are resevred
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footerText: {
    fontSize: 10,
    textAlign: 'center',
  },
  footer: {
    margin: 40,
  },
});

export default App;

export function getRealmApp() {
  const appId = 'mgmt-app-zhhip'; // Set Realm app ID here.
  const appConfig = {
    id: appId,
    timeout: 10000,
  };
  return new Realm.App(appConfig);
}
