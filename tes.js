var fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
};

var PdfPrinter = require('./src/printer');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

// SET DATA
let listData=[{"nip":"195904301983021001","nmpeg":"I GUSTI NGURAH BAGUS SUTEJA","gaji":10000},{"nip":"195907191983021001","nmpeg":"I KETUT SANDRA","gaji":20000}]
let kolom = ['nip', 'nmpeg','gaji'];
let styles = ['isiData', 'isiData','uang']
let judulKolom = [{ text: 'NIP',style: 'judulKolom' }, { text: 'Nama', style: 'judulKolom' },{ text: 'Gaji', style: 'judulKolom' }];

//SUSUN 
let daftar = susunListTabel(listData, kolom, styles, judulKolom);


var dd = {
    content: [

        {
            text: 'MONITORING PENERBITAN', style: 'judulLaporan'
        },
        {
            text: '\n'
        },
        {
            table: {
                widths: [120, 200,100],
                body: daftar
            }
        }
    ],

    styles: {

        judulKolom: {
            bold: true,
            color: 'black',
            alignment: 'center'
        },
        uang: {
            alignment: 'right'
        },
        isiData: {
            fontSize: 10,
        },
        judulLaporan: {
            fontSize: 15,
            alignment: 'center',
            bold: true
        },
        judulAngka: {
            bold: true,
            color: 'black',
            alignment: 'center',
            fontSize: 9
        },
    },
}

var pdfDoc = printer.createPdfKitDocument(dd);
pdfDoc.pipe(fs.createWriteStream('pdfs/tes.pdf'));
pdfDoc.end();


function susunListTabel(data, columns,styles, judulKolom){
  var body = [];

   body.push(judulKolom);
   data.forEach(function (row) {
         // console.log(row);

         var dataRow = [];
         for (let i = 0; i < columns.length; i++) {
               if (columns[i].constructor === Array) {

                   var barisTampung='';
                   var objKolomTampung={};
                   columns[i].forEach(function (isi) {
                     barisTampung=barisTampung+row[isi].toString()+'\n';
                     var objKolom2={};
                     var arrayTampung=[];
                     objKolom2['text'] = barisTampung.toString();
                     objKolom2['style'] = styles[i].toString();
                     objKolomTampung=objKolom2;
                   })
                  dataRow.push(objKolomTampung);
               } else {
                   var objKolom={};
                   objKolom['text'] = row[columns[i]].toString();
                   objKolom['style'] = styles[i].toString();
                   dataRow.push(objKolom);
               }

       }
        body.push(dataRow);
   });

   return body;
}

function setTglIndo(stgl) {
  var str = stgl;
  var xtahun = str.substr(0, 4);
  var xbulan = str.substr(5, 2);
  var xtgl = str.substr(8, 2);

  return xtgl + '-' + xbulan + '-' + xtahun;
}