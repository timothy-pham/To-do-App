import React from 'react';
import {Provider} from 'react-redux';
import {store} from '~redux';
import RootNavigator from '~routes';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

export default App;
