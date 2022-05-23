import {Realm} from '@realm/react';
export interface Location {
  Type: string;
  coordinates: [number];
}

export class Ambulence extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  business_id!: number;
  location: Location;

  // the Task.generate() method creates Task objects with fields with default values
  static generate(name: string, business_id: number, location: Location) {
    return {
      _id: new Realm.BSON.ObjectId(),
      business_id,
      location,
      name,
    };
  }

  // To use a class as a Realm object type, define the object schema on the static property "schema".
  static schema = {
    name: 'Ambulence',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      business_id: 'number',
      location: 'object',
    },
  };
}
