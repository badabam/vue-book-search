var tagButtons = [
  {
    label: 'Author',
    type: 'text',
    placeholder: 'Rowling',
    multi: true,
    hint: 'Add another by pressing <code>,</code> or <code>+</code>'
  },
  {
    label: 'Release date',
    type: 'date',
    placeholder: '> 10.2015',
    hint: '<code>&lt; 03.2012</code> = before March 2012, <code>&lt; 2014</code> for all books from 2015 and above, <code>&lt;=2016</code> for all from 2016 and before'
  },
  {
    label: 'Publisher',
    type: 'text',
    placeholder: 'BoD',
    hint: 'Enter any value'
  },
  {
    label: 'Product group',
    type: 'number',
    placeholder: '12500',
    anyValue: true,
    multi: true,
    values: [
      '12500',
      '14810',
      '21110',
      '22500',
      '41300',
      '42500'
    ],
    hint: 'Type any number or choose a value with <code>↑</code> and <code>↓</code>'
  },
  {
    label: 'Price from',
    type: 'price',
    placeholder: '1.99',
    hint: 'Insert any number value'
  },
  {
    label: 'Price to',
    type: 'price',
    placeholder: '49.99',
    hint: 'Insert any number value'
  },
  {
    label: 'Keyword',
    type: 'text',
    placeholder: 'cooking',
    multi: true,
    hint: 'Add another by pressing <code>,</code> or <code>+</code>'
  },
  {
    label: 'Language',
    type: 'text',
    placeholder: 'german',
    multi: true,
    hint: 'Add another by pressing <code>,</code> or <code>+</code>'
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
    hint: 'Choose one of the values by filtering or using <code>↑</code> and <code>↓</code>'
  },
  {
    label: 'ISBN',
    type: 'isbn',
    placeholder: 'xxx-x-xxx-xxxxx-x',
    hint: 'Number-formatting is not yet implemented.',
    size: 180
  },
];
