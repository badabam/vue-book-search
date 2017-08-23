function price(val, type) {
  const isNumber = /\d+/.test(val);
  console.log(isNumber);
  if(type !== 'price' || !isNumber) {return val;}
  return val ? Number(val).toFixed(2) + ' €' : '';
}
