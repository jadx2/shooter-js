const getScore = require('../src/Scenes/api/getScore');

jest.mock('../src/Scenes/api/getScore');

describe('It returns information from the Api', () => {
  it('Returns the third user name', () => {
    getScore.mockResolvedValue({
      result: [
        {
          user: 'Pedro Castillo',
          score: 20,
        },
        {
          user: 'Carlo Magno',
          score: 1230,
        },
        {
          user: 'Peter Castle',
          score: 2410,
        },
        {
          user: 'Pierce Brosnan',
          score: 910,
        },
      ],
    });
    getScore().then((data) => {
      expect(data.result[2].user).toMatch('Peter Castle');
    });
  });

  it('Returns the second player score', () => {
    getScore.mockResolvedValue({
      result: [
        {
          user: 'Pedro Castillo',
          score: 20,
        },
        {
          user: 'Carlo Magno',
          score: 1230,
        },
        {
          user: 'Peter Castle',
          score: 2410,
        },
        {
          user: 'Pierce Brosnan',
          score: 910,
        },
      ],
    });
    getScore().then((data) => {
      expect(data.result[1].score).toBe(1230);
    });
  });
});
