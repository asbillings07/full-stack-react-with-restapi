import config from './config';

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
  async deleteCourse(email, password, id) {
    // complete function to delete course
  }

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
