function calcPerc(num, den) {
  let calc = num / den;
  let f = calc * 100;
  let fixed = Number.parseFloat(f).toFixed(1);
  return (`${fixed}%`)
};

function arrayHasOneItem(obj) {
  return Array.isArray(obj) && obj.length === 1 ? obj[0] : obj;
}

function ifPropExists(obj, prop) {
  try {
    return obj.hasOwnProperty(prop) ? arrayHasOneItem(obj[prop]) : null; 
  } catch (e) {
    console.error('Error from markUnassigned', e);
    return null;
  }
}

module.exports = { 
  calcPerc,
  arrayHasOneItem,
  ifPropExists 
};