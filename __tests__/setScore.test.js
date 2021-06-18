const setScore = require('../src/Scenes/api/setScore');

jest.mock('../src/Scenes/api/setScore');

describe('It returns a positive result after POST', () => {
  it('Should save the score into the API with filled fields', () => {
    setScore.mockResolvedValue({
      result: 'Score added correctly.',
    });
    setScore('Jaim', 150).then((data) => {
      expect(data.result).toMatch('Score added correctly.');
    });
  });

  it('It rejects if user is empty', () => {
    setScore.mockResolvedValue({
      result: 'You need to fill the user field.',
    });
    setScore('', 30).then((data) => {
      expect(data.result).toMatch(
        'You need to fill the user field.',
      );
    });
  });

  it('It rejects if score is empty', () => {
    setScore.mockResolvedValue({
      result: 'You need to fill the score.',
    });
    setScore('Test', '').then((data) => {
      expect(data.result).toMatch(
        'You need to fill the score.',
      );
    });
  });
});
