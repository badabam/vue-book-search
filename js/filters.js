function price(val, type) {
  const isNumber = /\d+/.test(val);
  if(type === 'price' && isNumber) {
    return val ? Number(val.replace(',', '.')).toFixed(2) + ' €' : '';
  } else {
    return val;
  }
}
