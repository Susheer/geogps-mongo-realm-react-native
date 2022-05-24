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
  Dimensions,
  TextInput,
  Button,
} from 'react-native';
import Realm from 'realm';
import {t} from 'react-native-tailwindcss';
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
  // set lang,lat
  const [latlang, setLatLang] = useState('');

  // local flags
  const [shouldAddLocation, setShouldAddLocation] = useState(0);

  // erros
  const [errors, setErrors] = useState([]);

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
            <View
              style={{
                flex: 1,
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                padding: 50,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Button
                title="Connect"
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
            </View>
          ) : !shouldAddLocation ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: 'gray',
                marginVertical: 10,
              }}>
              <TextInput
                style={{
                  minWidth: 100,
                  flex: 1,
                }}
                onChangeText={setLatLang}
                value={latlang}
                placeholder={'lat,lang'}
              />

              <Button
                title="Search"
                onPress={() => {
                  session &&
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

              {!shouldAddLocation && (
                <Button
                  title="Add"
                  onPress={() => {
                    setShouldAddLocation(true);
                  }}
                />
              )}
            </View>
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
                  let errorsList = validateLocation(latlang, name, business_id);

                  if (errorsList && errorsList.length) {
                    console.log(errorsList);
                    setErrors(errorsList);
                  } else {
                    setErrors([]);
                  }
                }}
              />
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 50,
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}>
                {errors.map((el, index) => {
                  return (
                    <Text key={index} style={{color: 'red'}}>
                      {el}
                    </Text>
                  );
                })}
              </View>
            </View>
          ) : isSessionActive && data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <View key={index}>
                  <Text>{item.name}</Text>
                </View>
              );
            })
          ) : (
            isSessionActive && <Text>No data</Text>
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

function validateLocation(latlang, name, business_id) {
  let msg = [];
  let lat, lang;
  if (!latlang) {
    msg.push('Fill lat,lang values ');
  }
  if (!name) {
    msg.push('Fill name details');
  }
  if (!business_id || business_id <= 0) {
    msg.push('Fill businnes  details');
  }
  if (msg.length) return msg;

  let arr = latlang.split(',');
  if (arr && arr.length === 2) {
    lang = arr[1];
    lat = arr[0];
    let isValid = false;
    if (lang >= -180 && lang <= 180) {
      isValid = true;
    } else {
      msg.push('Valid longitude values are between -180 and 180');
    }
    if (lat >= -90 && lat <= 90) {
      isValid = true;
    } else {
      msg.push('Valid latitude values are between -90 and 90');
    }
  } else {
    msg.push('Oos ! Entered lat and lang values are not in correct format');
    msg.push('It should be lat,lang');
  }
  return msg;
}
