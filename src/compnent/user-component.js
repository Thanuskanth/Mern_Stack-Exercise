import React, { Component } from 'react';
import axios from 'axios';
export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(e) {

        this.setState({
            username: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username
        }

        console.log(user)
        axios.post('http://localhost:5000/user/add', user)
            .then(res => console.log(res.data))
        this.setState({
            username: ''
        })
    }
    render() {
        return (
            <div className="container">
                <h3>Create User</h3>

                <form onSubmit={this.onSubmit}>    <div className="form-group">
                    <input type="text" placeholder="Enter username" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}></input>
                </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" >Create User</button>
                    </div>
                </form>

            </div>

        );
    }
}