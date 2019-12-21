import React, {Component, Fragment} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {CATEGORIES} from "./Categories";
import axiosQiotsApi from '../axios-quotsApi'
import Spinner from "../components/UI/Spinner/Spinner";


class AddQuotes extends Component {
    unmaunte = false;
    state = {
        author: '',
        text: '',
        category: CATEGORIES[0].id,
        loading: false,
    };

    getQuotesHandler = e => this.setState({[e.target.name]: e.target.value});

    addQuotesHandler = async (e) => {
        e.preventDefault();
        this.unmaunte = true;
        const addQuotes = {
            category: this.state.category,
            author: this.state.author,
            text: this.state.text
        };
        if (this.unmaunte) {
            this.setState({loading: true});
            await axiosQiotsApi.post('/quotes.json', addQuotes);
            this.props.history.push("/");
            this.setState({loading: false});
        }

    };

    componentWillUnmount() {
        this.unmaunte = false;
    }

    render() {
        let lodadForm = (
            <Fragment>
                <h1>Submit new quote</h1>
                <hr/>
                <Form onSubmit={this.addQuotesHandler}>
                    <FormGroup>
                        <Label for="category">Categories</Label>
                        <Input type="select" name="category" id="category" onChange={this.getQuotesHandler}>
                            {CATEGORIES.map((categories) => (
                                <option key={categories.id} value={categories.id}>{categories.id}</option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="author" sm={2}>Author</Label>
                        <Col sm={10}>
                            <Input type="text" name="author" id="author" placeholder="Enter author quote"
                                   onChange={this.getQuotesHandler}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleText" sm={2}>Quote text</Label>
                        <Col sm={10}>
                            <Input type="textarea" name="text" id="exampleText" onChange={this.getQuotesHandler}/>
                        </Col>
                    </FormGroup>
                    <FormGroup check row>
                        <Col sm={{size: 0, offset: 0}}>
                            <Button>Submit</Button>
                        </Col>
                        <hr/>
                    </FormGroup>
                </Form>
            </Fragment>
        );
        if (this.state.loading) {
            lodadForm = <Spinner/>
        }
        return (
            <div>
                {lodadForm}
            </div>
        );
    }
}

export default AddQuotes;