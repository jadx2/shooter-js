const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/BQNOsYUqviBl2tJvWCxU/scores/';

const setScore = async (player, score) => {
  try {
    const response = await fetch(api, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: player, score }),
    });
    return response.json();
  } catch (err) {
    return err;
  }
};

module.exports = setScore;
