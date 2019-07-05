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

  async deleteCourse(email, password, id) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {
      email,
      password,
    });
    if (response.stats === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      console.log('Something else went wrong');
    }
  }
}
