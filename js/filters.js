function price(val, type) {
  if(type !== 'number') {return val;}
  return val ? Number(val).toFixed(2) + ' €' : '';
}
