import { staticNotes } from '../utils/constants';

class APIService {
  getData = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(staticNotes);
    }, 1000);
  })
}

export default new APIService();
