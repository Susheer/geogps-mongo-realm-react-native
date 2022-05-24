import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Alert, TextInput} from 'react-native';

export const AddLocation = ({submit, onClose}) => {
  const [business_id, setBusiness_id] = useState(null);
  const [name, setName] = useState('');
  const [latlang, setLatLang] = useState('');

  return (
    <View style={styles.viewWrapper}>
      <TextInput
        style={{
          padding: 16,
        }}
        onChangeText={setLatLang}
        value={setLatLang}
        placeholder={'lat,lang'}
      />

      <TextInput
        style={{
          padding: 16,
        }}
        onChangeText={setBusiness_id}
        value={business_id}
        placeholder={'Please type unique id '}
      />
      <TextInput
        style={{
          padding: 16,
        }}
        onChangeText={setName}
        value={name}
        placeholder={'Please type name or description '}
      />
      <Button onPress={onClose} title="Close" />
      <Button
        title="Submit"
        onPress={() => submit(business_id, name, latlang)}
      />
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
