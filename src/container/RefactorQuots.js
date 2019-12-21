import React, {Component, Fragment} from 'react';
import axiosQiotsApi from "../axios-quotsApi";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {CATEGORIES} from "./Categories";

class RefactorQuots extends Component {

    state = {
        author: '',
        text: '',
        category: ''
    };

    async componentDidMount() {
        const id = this.props.match.params.id;
        const response = await axiosQiotsApi.get('/quotes/' + id + '.json');
        this.setState({author: response.data.author, text: response.data.text, category: response.data.category})
    };

    getQuotesHandler = e => this.setState({[e.target.name]: e.target.value});

    refactorSubmitHandler = async (e) => {
        e.preventDefault();

        const addQuotes = {
            category: this.state.category,
            author: this.state.author,
            text: this.state.text
        };

        const id = this.props.match.params.id;
        await axiosQiotsApi.put('/quotes/' + id + '.json', addQuotes);
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <Fragment>
                    <h1>Refactor post</h1>
                    <Form onSubmit={this.refactorSubmitHandler}>
                        <FormGroup>
                            <Label for="category">Categories</Label>
                            <Input value={this.state.category} type="select" name="category" id="category"
                                   onChange={this.getQuotesHandler}>
                                {CATEGORIES.map((categories) => (
                                    <option key={categories.id} value={categories.id}>{categories.id}</option>
                                ))}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="author">Author</Label>
                            <Input type="author" name="author" id="author"
                                   defaultValue={this.state.author} onChange={this.getQuotesHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="text">Text:</Label>
                            <Input type="text" name="text" id="text"
                                   defaultValue={this.state.text} onChange={this.getQuotesHandler}/>
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </Fragment>
            </div>
        );
    }
}

export default RefactorQuots;