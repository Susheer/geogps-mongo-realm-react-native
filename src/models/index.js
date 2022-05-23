import {createRealmContext} from '@realm/react';
import {Ambulence, Location} from './Ambulence';

export const AmbulenceRealmContext = createRealmContext({
  schema: [Ambulence],
});
