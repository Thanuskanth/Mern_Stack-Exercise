import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
export default class EditExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            user: []

        }
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }
        console.log(exercise);
        axios.post('http://localhost:5000/exercise/update' + this.props.match.params.id, exercise)
            .then(res => console.log(res.data))
        window.location = '/'
    }
    componentDidMount() {
        axios.get('http://localhost:5000/user/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        user: res.data.map(user => user.username),
                        username: res.data[0].username
                    })
                }
            })
        axios.get('http://localhost:5000/exercise/' + this.props.match.params.id)
            .then(res => {

                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                })

            })

    }
    render() {
        return (
            <div className="container">
                <h3>Update Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label for="username"  >Username :</label>
                        <select ref="userInput" id="username" required value={this.state.username} className="username form-control" onChange={this.onChangeUsername}>
                            {
                                this.state.user.map(function (user) {
                                    return (
                                        <option key={user} value={user}>{user}</option>
                                    )
                                })
                            }

                        </select>
                    </div>

                    <div className="form-group">
                        <label for="description">Description :</label>
                        <input className="form-control" id="description" type="text" value={this.state.description} required onChange={this.onChangeDescription}></input>
                    </div>
                    <div className="form-group">
                        <label for="duration">Duration(in minutes) :</label>
                        <input className="form-control" id="duration" type="number" value={this.state.duration} required onChange={this.onChangeDuration}></input>
                    </div>
                    <div className="form-group">
                    <label for ="date">Date :</label>
                    <br/>
                        <DatePicker
                            className="form-control"
                            id="date"
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                        />
                    </div>
                    <div className="form-group">

                        <button className="btn btn-primary" type="submit">Update Exercise Log</button>
                    </div>
                </form>

            </div>

        );
    }
}