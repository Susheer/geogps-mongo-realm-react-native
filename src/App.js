/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Appearance,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {LogoutButton} from './LogoutButton';
import {WelcomeView} from './WelcomeView';
import {TasksView} from './TasksView';

const Stack = createStackNavigator();
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomeView} />
          <Stack.Screen
            name="Tasks"
            component={TasksView}
            options={{
              headerLeft: () => {
                return <LogoutButton />;
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Management application for CRUD operation. All rights are resevred
        </Text>
      </View>
    </>
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
