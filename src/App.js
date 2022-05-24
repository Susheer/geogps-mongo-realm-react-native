/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
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
import {AddLocation} from './froms/AddLocation';
async function anonymousLogin() {
  let user;
  try {
    const app = new Realm.App(getRealmApp());
    const credentials = Realm.Credentials.anonymous();
    user = await app.logIn(credentials);
    return user;
  } catch (error) {
    throw `Error logging in anonymously: ${JSON.stringify(error, null, 2)}`;
  }
}
let session = null;

function App() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [data, setData] = useState([]);
  // set lang & lat
  const [lang, setLang] = useState(0);
  const [lat, setLat] = useState(0);

  // local flags
  const [shouldAddLocation, setShouldAddLocation] = useState(0);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    if (!session) {
      setIsSessionActive(false);
    }
  }, [isSessionActive]);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={{marginVertical: 10}}>
          {!isSessionActive ? (
            <View>
              <Button
                title="Init Application"
                onPress={() => {
                  anonymousLogin()
                    .then(user => {
                      session = user;
                      setIsSessionActive(true);
                    })
                    .catch(err => {
                      setIsSessionActive(false);
                      console.log('User error', err);
                    });
                }}
              />
              {!shouldAddLocation && (
                <Button
                  title="Add Location"
                  onPress={() => {
                    setShouldAddLocation(true);
                  }}
                />
              )}
            </View>
          ) : null}
        </View>
        <View style={{marginBottom: 12}}>
          {isSessionActive ? (
            <Button
              title="Search Within"
              onPress={() => {
                console.log('Invoked');
                session.functions
                  .searchWithin(300, [12.8687464, 77.5652512])
                  .then(data => {
                    setData(data);
                  })
                  .catch(error => {
                    // try again
                    console.log('error', error);
                  });
              }}
            />
          ) : null}
        </View>
        <View>
          {shouldAddLocation ? (
            <View>
              <AddLocation
                onClose={() => {
                  setShouldAddLocation(false);
                }}
                submit={(business_id, name, latlang) => {
                  console.log(business_id, name, latlang);
                }}
              />
            </View>
          ) : data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <View key={index}>
                  <Text>{item.name}</Text>
                </View>
              );
            })
          ) : (
            <Text>No data</Text>
          )}
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
