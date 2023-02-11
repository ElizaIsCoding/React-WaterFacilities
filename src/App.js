import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import Uploaded from './components/Uploaded'
import Found from './components/projects/Found';
import {ThemeProvider} from "./components/themeChange";


class App extends Component {
    render() {
        return (
            <ThemeProvider>
                <BrowserRouter>
                    <div>
                        <Navbar/>
                        <Switch>
                            <Route exact path='/' component={Dashboard}/>
                            <Route path='/project/:id' component={ProjectDetails}/>
                            <Route path='/signin' component={SignIn}/>
                            <Route path='/signup' component={SignUp}/>
                            <Route path='/create' component={CreateProject}/>
                            <Route path='/uploaded' component={Uploaded}/>
                            <Route path='/found' component={Found}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        );
    }

}

export default App;
