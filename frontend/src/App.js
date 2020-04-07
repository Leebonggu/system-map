import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/layout';
import Home from './pages/home';
import SystemMap from './pages/map';

function App() {
  return (
    <Layout>
      <Route exact path="/" component={Home}/>
      <Route path={["/system-map", "/map"]} component={SystemMap}/>
    </Layout>
  );
}

export default App;
