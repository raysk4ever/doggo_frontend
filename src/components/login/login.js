import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import Cookies from "universal-cookie";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.cookies = new Cookies();
        if(this.cookies.get("userLoggedIn")) return window.location.pathname = "/all-breeds"
    }

    handleChange = e =>{
        const input = e.currentTarget;
        if(input.name == "email") this.setState({email: input.value.toLowerCase()});
        else this.setState({password: input.value});
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        
        fetch('https://doggo-be.herokuapp.com/api/v1/user/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json() )
        .then(data => {
            if(data.status){
                this.cookies.set('userLoggedIn', true, { path: '/' });
                window.location.pathname = "/all-breeds"
            }else{
                console.log(data)
                alert(data.errorMessage);
            }
        });
    }

    render() { 
        return ( 
        <div className="container">
            <h1>Login</h1>
            <hr/>
            <div className="form-container">
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" onChange={(e)=> this.handleChange(e)} placeholder="Enter email" />      
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={(e)=> this.handleChange(e)} placeholder="Password" />
                    </Form.Group>
                    <Button variant="success" type="submit" onClick={(e) => this.handleSubmit(e)}>
                        Login
                    </Button>
                    <a className="btn btn-secondary m-2" href="/signup">
                        Create a new account, signup
                    </a>
                </Form>
            </div>
        </div>
        )
    }
}
 
export default Login;