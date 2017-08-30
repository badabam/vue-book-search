var tagButtons = [
  {
    label: 'Author',
    type: 'text',
    placeholder: 'Rowling',
    multi: true,
    hint: 'Create another by pressing <code>,</code>'
  },
  {
    label: 'Release date',
    type: 'date',
    placeholder: '< 06.1980',
    hint: '<code>&lt; 03.2012</code> = before March 2012, <code>&lt; 2014</code> for all books from 2015 and above, <code>&lt;=2016</code> for all from 2016 and before'
  },
  {
    label: 'Publisher',
    type: 'text',
    placeholder: 'BoD'
  },
  {
    label: 'Price from',
    type: 'price',
    placeholder: '1.99'
  },
  {
    label: 'Price to',
    type: 'price',
    placeholder: '49.99'
  },
  {
    label: 'Keyword',
    type: 'text',
    placeholder: 'cooking',
    multi: true,
    hint: 'Create another by pressing <code>,</code>'
  },
  {
    label: 'Language',
    type: 'text',
    placeholder: 'german',
    multi: true,
    hint: 'Create another by pressing <code>,</code>'
  },
  {
    label: 'Media',
    type: 'text',
    placeholder: 'DVD',
    values: [
      'softcover',
      'hardcover',
      'ebook',
      'DVD',
      'Bluray',
      'mp3',
    ],
    multi: true,
    hint: 'Use <code>↑</code> and <code>↓</code> to move.'
  },
  {
    label: 'ISBN',
    type: 'isbn',
    placeholder: '97x-x-xxx-xxxxx-x',
    hint: 'Number-formatting is not yet implemented.'
  },
];
