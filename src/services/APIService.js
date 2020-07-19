import { staticNotes } from '../utils/constants';

class APIService {
  #isServerActive = true;

  getData = async () => {
    try {
      const response = await fetch('http://localhost:8080/');
      const notes = await response.json();

      return notes;
    } catch (error) {
      this.#isServerActive = false;
      console.error('Static data was loaded. Please run `npm run server` command to use data from .json file');

      return staticNotes;
    }
  }

  saveData = async (data) => {
    if (!this.#isServerActive) {
      return console.error('It looks like you don\'t use server. Please run `npm run server` command to save data to .json file');
    }

    let response;

    try {
      response = await fetch('http://localhost:8080/update_file', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Can\'t update file. Try later');
    }

    response = await response.json();
    return response;
  }
}

export default new APIService();
