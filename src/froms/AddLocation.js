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

export const AddLocation = ({submit}) => {
  const [business_id, setBusiness_id] = useState(null);
  const [name, setName] = useState('');
  const [latlang, setLatLang] = useState('');

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
        <TextInput
          style={{
            padding: 16,
            marginTop: 50,
          }}
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={setBusiness_id}
          value={business_id}
          placeholder={'Please type unique id '}
        />
        <TextInput
          style={{
            padding: 16,
            marginTop: 50,
          }}
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={set}
          value={setLatLang}
          placeholder={'lat,lang'}
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
