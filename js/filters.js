function price(val, type) {
  if(type !== 'price') {return val;}
  return val ? Number(val).toFixed(2) + ' €' : '';
}
