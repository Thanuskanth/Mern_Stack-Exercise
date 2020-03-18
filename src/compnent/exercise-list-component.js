import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td><Link to={"/edit/" + props.exercise._id}> <button className="btn btn-success" size="small"> Edit </button></Link>  <button className="btn btn-danger" href="/" onClick={() => props.deleteExercise(props.exercise._id)} size="small">Delete</button></td>
    </tr>
)

export default class ExerciseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercise: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/exercise/')
            .then(res => {
                this.setState({
                    exercise: res.data
                })
            })
    }
    exerciseList() {
        return this.state.exercise.map(exercise => {
            return <Exercise exercise={exercise} deleteExercise={this.deleteExercise} key={exercise._id} />
        })
    }
    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercise/' + id)
            .then(res => console.log(res.data))
        this.setState({
            exercise: this.state.exercise.filter(el => el._id !== id)
        })
    }
    render() {
        return (
            <div className="container">
                <h3>Logged exercise</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>duration</th>
                            <th>date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>

        );
    }
}