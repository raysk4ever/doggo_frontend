import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import Cookies from "universal-cookie";

class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            password: ""
        }
        this.cookies = new Cookies();
        if(this.cookies.get("userLoggedIn")) return window.location.pathname = "/all-breeds"
    }

    handleChange = e =>{
        const input = e.currentTarget;
        if(input.name == "email") this.setState({email: input.value});
        else if(input.name == "name") this.setState({name: input.value});
        else this.setState({password: input.value});
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(`this.state`, this.state)
        fetch('http://localhost:5000/api/v1/user/signup', {
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
                <div className="form-container">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" onChange={(e) => this.handleChange(e)} placeholder="Enter Name" />      
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" onChange={(e) => this.handleChange(e)} placeholder="Enter email" />      
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={(e) => this.handleChange(e)} placeholder="Password" />
                        </Form.Group>
                        <Button variant="success" onClick={(e) => this.handleSubmit(e) } type="submit">
                            Register
                        </Button>
                    </Form>
                </div>
            </div>
         );
    }
}
 
export default Signup;