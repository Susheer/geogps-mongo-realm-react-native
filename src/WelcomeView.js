import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import {realmApp} from './RealmApp';

export const WelcomeView = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // state values for toggable visibility of features in the UI
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [isInSignUpMode, setIsInSignUpMode] = useState(true);
  useEffect(() => {
    if (user) {
      navigation.navigate('Tasks'); // if there is a logged in user, navigate to the Tasks Screen
    }
  }, [user, navigation]);

  // signIn() uses the emailPassword authentication provider to log in
  const signIn = async () => {
    const creds = Realm.Credentials.anonymous();
    const loggedInUser = await realmApp.logIn(creds);
    setUser(loggedInUser);
  };

  // onPressSignIn() uses the emailPassword authentication provider to log in
  const onPressSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };

  return (
    <View style={styles.viewWrapper}>
      <>
        <Button
          title="Log In"
          buttonStyle={styles.mainButton}
          onPress={onPressSignIn}
        />
        <Button
          title="Don't have an account? Create Account"
          type="clear"
          onPress={() => setIsInSignUpMode(!isInSignUpMode)}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
  },
  mainButton: {
    width: 350,
  },
});
