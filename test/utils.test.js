import utils from '../helpers/utils';

const calcPerc = utils.calcPerc;

test('one over two is 50.0%', () => {
  expect(calcPerc(1,2)).toBe('50.0%')
});

test('one over three is not 50.0%', () => {
  expect(calcPerc(1,3)).not.toBe('50.0%')
});