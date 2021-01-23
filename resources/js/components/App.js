import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Home from '../pages/Home/Home';
import Campaign from '../pages/Campaign/Campaign';
import Footer from '../components/Footer/Footer';

const App = props => {
    return (
        <div className="main-content">
            <Router forceRefresh={true} >
                <Switch>
                    <Route path="/campaigns/create" component={Campaign} />
                    <Route path="/campaigns/edit/:id" component={Campaign} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </Router>

            <Footer />
        </div>
    );
};

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
