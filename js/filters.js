function price(val, type) {
  const isNumber = /\d+/.test(val);
  if(type !== 'price' || !isNumber) {return val;}
  return val ? Number(val.replace(',', '.')).toFixed(2) + ' €' : '';
}
