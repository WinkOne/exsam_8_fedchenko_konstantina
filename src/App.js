import React, {Fragment} from 'react';
import './App.css'
import {Container} from "reactstrap";
import Navigation from "./components/UI/Navigation/Navigation";
import {Route, Switch} from "react-router";
import QuotesCentral from "./container/QuotesCentral";
import AddQuotes from "./container/AddQuotes";
import RefactorQuots from "./container/RefactorQuots";


function App() {
    return (
        <Fragment>
            <Navigation/>
            <Container>
                <Switch>
                    <Route path={"/"} exact component={QuotesCentral}/>
                    <Route path={"/quotes/:name"} component={QuotesCentral}/>
                    <Route path={"/questId/:id"} component={QuotesCentral}/>
                    <Route path={"/add"} component={AddQuotes}/>
                    <Route path={"/refactor/:id"} component={RefactorQuots}/>
                    <Route render={() => <h1>Not Fount</h1>}/>
                </Switch>
            </Container>
        </Fragment>

    );
}

export default App;