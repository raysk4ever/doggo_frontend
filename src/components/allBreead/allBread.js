import React, { Component } from 'react';
import Cookies from "universal-cookie";
import "../../styles/allBreeds.css"

class AllBreeds extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            allBreeds: [],
            breedData: {}
        }
        this.cookies = new Cookies();
        if(!this.cookies.get("userLoggedIn")) return window.location.pathname = "/login"
    }
    componentDidMount(){
        this.getAllBreed();
        if(this.props.match.params.breedName) this.getBreedDetails(this.props.match.params.breedName);
    }

    getAllBreed = () =>{
        const url = 'https://dog.ceo/api/breeds/list/all';
        fetch(url)
        .then( data=> data.json())
        .then(response =>{
            const allBreeds = Object.keys(response.message);
            this.setState({allBreeds})
        }).catch(err=> console.log(`Something went wrong!!, ${err}`))
    }
    getBreedDetails = (breedName) =>{
        const url = `https://dog.ceo/api/breed/${breedName}/images/random`;
        fetch(url)
        .then( data=> data.json())
        .then(response =>{
            const breedData = response;
            this.setState({breedName, breedData})
        }).catch(err=> console.log(`Something went wrong!!, ${err}`))
    }

    handleBadgeClick = breed => this.getBreedDetails(breed);

    render() {
        console.log(`props`, this.props.match.params.breedName)
        return (
            <div className="breed-container">
                <div className="badge-container">
                    {this.state.allBreeds.map(breed=>(
                        <div className={this.state.breedName == breed? "badge badge-primary m-2 p-2 active": "badge badge-primary m-2 p-2"} onClick={()=> this.handleBadgeClick(breed)}><span>{breed}</span>   </div>
                    ))}
                </div>
                {<div className="breed-details-containar">
                        <p>{this.state.breedName || "Select Category"}</p>
                        <img src={this.state.breedData.message}/>
                </div>}
            </div>
        );
    }
}
 
export default AllBreeds;