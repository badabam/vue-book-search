const locale = (function() {
  const lang = window.location.search
    .includes('lang=en') ? 'en' : 'de';

  switch (lang) {
    case 'en': return {
        i18n: {
          searching: {
            heading: '<h3>Searching for</h3>'
          },
          fulltext: {
            placeholder: 'Write here ...',
            label: 'Text search'
          },
          hintbar: {
            prefix: 'Hint: '
          },
          instructions: {
            htmlText: `
            Move selection with tab (<code>⇥</code>) or arrow keys (<code>←</code>, <code><div turned>←</div></code>).<br>
            Press <code>↵</code> to create a tag.<br>
            Try writing <code>Pr</code>, then use <code>⇥</code> to select.<br>
            Delete a tag with <code>⌫</code>.<br>
            `
          }
        },
        tagButtons: [
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
            placeholder: '€ 1,99',
            hint: 'Insert any number value'
          },
          {
            label: 'Price to',
            type: 'price',
            placeholder: '€ 149,00',
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
            anyValue: true,
            values: [
              'german',
              'english',
              'french',
              'italian',
              'russian',
              'spanish'
            ],
            hint: 'Any value is allowed. Add another by pressing <code>,</code> or <code>+</code>'
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
            size: 180
          },
        ]
      };
    case 'de': return {
      i18n: {
        searching: {
          heading: '<h3>Suche nach</h3>'
        },
        fulltext: {
          placeholder: 'Hier schreiben ...',
          label: 'Freitext'
        },
        hintbar: {
          prefix: 'Tipp: '
        },
        instructions: {
          htmlText: `
          Auswahl mit Tab (<code>⇥</code>) oder Pfeiltasten (<code>←</code>, <code><div turned>←</div></code>).<br>
          Mit <code>↵</code> Suchbegriff erzeugen.<br>
          Schreibe <code>Pr</code> und drücke <code>⇥</code>, um Kategorie zu wählen.<br>
          Lösche Einträge mit <code>⌫</code>.
          `
        }
      },
      tagButtons: [
        {
          label: 'Autor',
          type: 'text',
          placeholder: 'Rowling',
          multi: true,
          hint: 'Drücke <code>,</code> oder <code>+</code> für  einen weiteren Eintrag.'
        },
        {
          label: 'Erscheinungsdatum',
          type: 'date',
          placeholder: '> 10.2015',
          hint: '<code>= 03.2012</code> = nur März 2012, <code>&lt; 2014</code> = vor Januar 2014, <code>&gt; 08.2016</code> = ab 1. August 2016'
        },
        {
          label: 'Verlag',
          type: 'text',
          placeholder: 'BoD'
        },
        {
          label: 'Warengruppe',
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
          ]
        },
        {
          label: 'Preis von',
          type: 'price',
          placeholder: '€ 1,99'
        },
        {
          label: 'Preis bis',
          type: 'price',
          placeholder: '€ 149,00'
        },
        {
          label: 'Stichwort',
          type: 'text',
          placeholder: 'Kochen',
          multi: true,
          hint: 'Weiterer Eintrag mit <code>,</code> or <code>+</code>'
        },
        {
          label: 'Sprache',
          type: 'text',
          placeholder: 'deutsch',
          multi: true,
          anyValue: true,
          values: [
            'deutsch',
            'englisch',
            'französisch',
            'italienisch',
            'russisch',
            'spanisch'
          ],
          hint: 'Weiterer Eintrag mit <code>,</code> oder <code>+</code>'
        },
        {
          label: 'Format',
          type: 'text',
          placeholder: 'Neuheiten',
          values: [
          'Taschenbuch',
          'Audio/Video',
          'Schulbuch',
          'Neue Medien',
          'Kalender',
          'Neuheiten',
          'Buch',
          'Hardcover',
          'Hörbuch',
          'Landkarten',
          'Reiseführer',
          'aktive Titel'
          ],
          multi: true,
          hint: 'Choose one of the values by filtering or using <code>↑</code> and <code>↓</code>'
        },
        {
          label: 'EAN',
          type: 'isbn',
          placeholder: 'xxx-x-xxx-xxxxx-x',
          size: 180
        },
      ]
    };
  }

})();

const i18n = locale.i18n;
let tagButtons = locale.tagButtons;
