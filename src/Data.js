// imports REST API URL
import config from './config';

// creates class for fetch API and methods to use with context
export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, creds = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const endcodedCreds = btoa(`${creds.email}:${creds.password}`);
      options.headers['Authorization'] = `Basic ${endcodedCreds}`;
    }

    return fetch(url, options);
  }
  // gets users
  async getUser(email, password) {
    const response = await this.api(`/users`, 'GET', null, true, {
      email,
      password,
    });
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
  // creates users
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  // creates course
  async createCourse(email, password, info) {
    const response = await this.api(`/courses`, 'POST', info, true, {
      email,
      password,
    });
    if (response.status === 201) {
      return response.headers;
    } else if (response.status === 401 || response.status === 400) {
      return response
        .json()
        .then(data => {
          return data.errors;
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log('Something else went wrong');
    }
  }
  // deletes course
  async deleteCourse(email, password, id) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {
      email,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 401 || response.status === 403) {
      return response
        .json()
        .then(data => {
          return data.errors;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  // updates course
  async updateCourse(email, password, info, id) {
    const response = await this.api(`/courses/${id}`, 'PUT', info, true, {
      email,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 401 || response.status === 400) {
      return response
        .json()
        .then(data => {
          return data.errors;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
