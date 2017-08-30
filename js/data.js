var tagButtons = [
  {
    title: 'Author',
    type: 'text',
    placeholder: 'Tolkien',
    multi: true,
    hint: 'Create another by pressing <code>,</code>'
  },
  {
    title: 'Release date',
    type: 'date',
    placeholder: '< 06.1980',
    hint: '<code>&lt; 03.2012</code> = before March 2012, <code>&lt; 2014</code> for all books from 2015 and above, <code>&lt;=2016</code> for all from 2016 and before'
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
    hint: 'Create another by pressing <code>,</code>'
  },
  {
    title: 'Language',
    type: 'text',
    placeholder: 'englisch',
    multi: true,
    hint: 'Create another by pressing <code>,</code>'
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
    hint: 'Use <code>↑</code> and <code>↓</code> to move.'
  },
  {
    title: 'ISBN',
    type: 'isbn',
    placeholder: '97x-x-xxx-xxxxx-x',
    hint: 'Number-formatting is not yet implemented.'
  },
];
