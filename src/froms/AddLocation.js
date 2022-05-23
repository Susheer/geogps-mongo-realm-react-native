import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';

export const WelcomeView = ({navigation, route}) => {
  const [business_id, setBusiness_id] = useState(null);
  const [name, setName] = useState('');
  const [latlang] = useState('');

  return (
    <View style={styles.viewWrapper}>
      <>
        <Button
          title="Submit"
          onPress={() => submit(business_id, name, latlang)}
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
});
