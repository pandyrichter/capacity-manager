function calcPerc(num, den) {
  let calc = num / den;
  let f = calc * 100;
  let fixed = Number.parseFloat(f).toFixed(1);
  return (`${fixed}%`)
};

module.exports = { calcPerc }