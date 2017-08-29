function price(val, type) {
  const isNumber = /\d+/.test(val);
  console.log('filter:price', isNumber, type);
  if(type !== 'price' || !isNumber) {return val;}
  return val ? Number(val).toFixed(2) + ' €' : '';
}
