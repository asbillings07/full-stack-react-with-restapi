import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

export default class app extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
    };
  }

  asyncHandler = async cb => {
    try {
      await cb();
    } catch {}
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ loading: true });
    const res = await axios.get('/api/courses');
    console.log(res.data);
    this.setState({ data: res.data, loading: false });
  };

  render() {
    const courses = this.state.data.map(course => {
      return <p>{course.title}</p>;
    });
    return (
      <div>
        <h1>Courses!</h1>
        {courses}
      </div>
    );
  }
}

// import svg from link then <img src={logo} className="App-logo" alt="logo" />
