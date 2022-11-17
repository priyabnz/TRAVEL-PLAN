import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Forms from "../src/components/Forms";
import Results from "../src/components/Results";

const App = () => {
  return (
    <div id="main-wrapper" className="formWrap">
      <div className="form-container">
    
        <Router>
          <Switch>
            <Route path="/result" component={Results} />
            <Route path="/" component={Forms} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
export default App;
