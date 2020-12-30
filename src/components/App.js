import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { addReminder, deleteReminder, clearReminder } from '../actions';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);
    console.log(this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id)
  }

  clearReminder() {
    this.props.clearReminder()
  }

  renderReminders() {
    const { reminders } = this.props;

    return (
      <ul className="panel panel--center">
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className="panel-block">
                <div className="panel-block__inner">
                  <span>{reminder.text}</span>
                  <em>{moment(new Date(reminder.dueDate)).fromNow()}</em>

                </div>
                <div className="delete-button" onClick={() => this.deleteReminder(reminder.id)}>&#x2715;</div>

              </li>
            )
          })
        }
      </ul>
    )
  }


  render() {
    return (
      <div className="App">
        <div className="title">
          <h1>Habit Minder</h1>
        </div>

        <div className="field field--center is-horizontal">
          <div className="field has-addons is-grouped">
            <div className="control control--input">
              <input
                className="input"
                placeholder="I want to..."
                onChange= {(e) => {this.setState({text: e.target.value})}}
              />
            </div>
            <div className="control control--time">
              <input
                className="input"
                type="date"
                onChange={(e) => {this.setState({dueDate: e.target.value})}}
                />
              </div>
            </div>
          <div className="field is-grouped is-grouped-right">
            <div className="control">
              <button type="button" className="button is-primary" onClick={() => this.addReminder()}>
                Add Reminder
              </button>
            </div>
            <div className="control">
              <button className="button is-danger" onClick={()=> this.clearReminder()}>
                Clear Reminder
              </button>
            </div>
          </div>
        </div>

        {this.renderReminders()}
      </div>

    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ addReminder },dispatch)
// }

function mapStateToProps(state) {
  return {
    reminders: state
  }
}

export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminder})(App);
