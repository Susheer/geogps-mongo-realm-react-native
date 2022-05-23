import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  InputAccessoryView,
} from 'react-native';

export const AddLocation = ({navigation, route}) => {
  const [business_id, setBusiness_id] = useState(null);
  const [name, setName] = useState('');
  const [latlang] = useState('');

  return (
    <View style={styles.viewWrapper}>
      <>
        <TextInput
          style={{
            padding: 16,
            marginTop: 50,
          }}
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={setName}
          value={name}
          placeholder={'Please type name or description '}
        />
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
