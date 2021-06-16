const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BQNOsYUqviBl2tJvWCxU/scores';
const getScore = () => {
  fetch(api).then((res) => res.json());
};

export default getScore;
