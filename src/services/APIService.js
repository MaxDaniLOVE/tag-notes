import { staticNotes } from '../utils/constants';

class APIService {
  getData = async () => {
    try {
      const response = await fetch('http://localhost:8080/');
      const notes = await response.json();
      return notes;
    } catch (error) {
      console.error('Static data was loaded. Please run `npm run server` command to use data from .json file');
      return staticNotes;
    }
  }

  saveData = async (data) => {
    try {
      await fetch('http://localhost:8080/update_file', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Can\'t update file. Try later');
    }
  }
}

export default new APIService();
