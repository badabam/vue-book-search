var tagButtons = [
  {
    title: 'Author',
    type: 'text',
    placeholder: 'Tolkien',
    multi: true
  },
  {
    title: 'Release date',
    type: 'date',
    placeholder: '06.1980',
    hint: 'Possible values: <03.2012 for "published before March 2012", >2014 for all books from 2015 and above, <=2016 for all from 2016 and before'
  },
  {
    title: 'Publisher',
    type: 'text',
    placeholder: 'Bastei Lübbe AG'
  },
  {
    title: 'Price from',
    type: 'price',
    placeholder: '1.99'
  },
  {
    title: 'Price to',
    type: 'price',
    placeholder: '49.99'
  },
  {
    title: 'Keyword',
    type: 'text',
    placeholder: 'kochen',
    multi: true,
    hint: 'Multi-field: Write a comma "," to instantly create the next item'
  },
  {
    title: 'Language',
    type: 'text',
    placeholder: 'englisch',
    multi: true
  },
  {
    title: 'Media',
    type: 'text',
    placeholder: 'DVD',
    values: [
      'DVD',
      'mp3',
      'Bluray',
      'soft-cover',
      'hardback',
      'ebook'
    ],
    multi: true,
    hint: 'Use arrow buttons to select item or filter by writing'
  },
  {
    title: 'ISBN',
    type: 'number',
    placeholder: '97x-x-xxx-xxxxx-x'
  },
];
