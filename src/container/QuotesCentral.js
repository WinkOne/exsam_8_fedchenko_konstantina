import React, {Component, Fragment} from 'react';
import axiosQiotsApi from '../axios-quotsApi'
import {Button, Card, CardTitle, ListGroup, ListGroupItem} from "reactstrap";
import {Link, NavLink} from "react-router-dom";
import {CATEGORIES} from "./Categories";

class QuotesCentral extends Component {
    unmaunte = false;
    state = {
        quot: null
    };

    getQuote = async () => {
        this.unmaunte = true;
        let url = '/quotes.json';
        const id = this.props.match.params.id;
        if (id) {
            url += `?orderBy="category"&equalTo="${id}"`
        }
        const response = await axiosQiotsApi.get(url);
        if (this.unmaunte) {
            this.setState({quot: response.data})
        }

    };

    async componentDidMount() {
        this.getQuote()
    };

    deleteQuotes = async (id) => {
        await axiosQiotsApi.delete('/quotes/' + id + '.json');
        this.getQuote();
        this.props.history.replace('/')
    };

    async componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.getQuote()
        }
    }

    componentWillUnmount() {
        this.unmaunte = false;
    }

    render() {
        return (
            <Fragment>
                <div>
                    <ListGroup>
                        <ListGroupItem active color="secondary" tag={NavLink} to={"/"}>All</ListGroupItem>
                        {CATEGORIES.map((name, index) => (
                            <ListGroupItem key={index} tag={NavLink}
                                           to={'/questId/' + name.id}>{name.title}</ListGroupItem>
                        ))}
                    </ListGroup>
                </div>

                <div>
                    <hr/>
                    <h1>{}</h1>
                    {this.state.quot && Object.keys(this.state.quot).map((all, index) => {
                        return <Card key={index} body inverse
                                     style={{backgroundColor: '#333', borderColor: '#333', margin: '10px'}}>
                            <CardTitle>&#8212; {this.state.quot[all].author}</CardTitle>
                            <p>{this.state.quot[all].text}</p>
                            <div>
                                <Button onClick={() => this.deleteQuotes(all)} style={{margin: '10px'}}
                                        color="danger">Delete</Button>
                                <Button tag={Link} to={'/refactor/' + all}
                                        style={{margin: '10px'}} color="success">Refactor</Button>
                            </div>
                        </Card>
                    })}
                </div>
            </Fragment>

        );
    }
}

export default QuotesCentral;