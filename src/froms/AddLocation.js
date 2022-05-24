import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Alert, TextInput} from 'react-native';

export const AddLocation = ({submit, onClose}) => {
  const [business_id, setBusiness_id] = useState(null);
  const [name, setName] = useState('');
  const [latlang, setLatLang] = useState('');

  return (
    <View style={styles.viewWrapper}>
      <View style={{flex: 1}}>
        <TextInput
          style={{
            borderStyle: 'solid',
            borderWidth: 0.5,
            marginTop: 5,
          }}
          onChangeText={setLatLang}
          value={latlang}
          placeholder={'lat,lang'}
        />
        <TextInput
          style={{
            borderStyle: 'solid',
            borderWidth: 0.5,
            marginTop: 5,
          }}
          onChangeText={setBusiness_id}
          value={business_id}
          placeholder={'Please type unique id '}
        />
        <TextInput
          style={{
            borderStyle: 'solid',
            borderWidth: 0.5,
            marginTop: 5,
          }}
          onChangeText={setName}
          value={name}
          placeholder={'Please type name or description '}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <View style={{margin: 5}}>
          <Button onPress={onClose} title="Close" />
        </View>
        <View style={{margin: 5}}>
          <Button
            title="Submit"
            onPress={() => submit(business_id, name, latlang)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    marginHorizontal: 12,
  },
});
