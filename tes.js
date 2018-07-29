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


function ribuan(nilai) {
  return nilai.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

}
// SET DATA
let listTabel = [
  { "kdindukjen": "1", "kdanak": "", "jumlah": "1000" }, { "kdindukjen": "1", "kdanak": "01", "jumlah": "500" }, { "kdindukjen": "1", "kdanak": "02", "jumlah": "500" },
  { "kdindukjen": "2", "kdanak": "", "jumlah": "2000" }, { "kdindukjen": "2", "kdanak": "01", "jumlah": "1000" }, { "kdindukjen": "2", "kdanak": "02", "jumlah": "1000" }
];

let listData = listTabel;
let kolom = ['kdindukjen', 'kdanak', 'jumlah'];
let styles = ['isiData', 'isiData', 'number']
let judulKolom = [{ text: 'INDUK', style: 'judulKolom' }, { text: 'ANAK', style: 'judulKolom' }, { text: 'JUMLAH', style: 'judulKolom' }];

//SUSUN 
// let daftar = susunListTabel(listData, kolom, styles, judulKolom);
daftar =
  [[{ text: 'INDUK', style: 'judulKolom' },
  { text: 'ANAK', style: 'judulKolom' },
  { text: 'JUMLAH', style: 'judulKolom' }],
  [{ text: '1', style: 'isiData' },
  { text: '', style: 'isiData' },
  { text: '1000', style: 'number' }],
  [{ text: '1', style: 'isiData' },
  { text: '01', style: 'isiData' },
  { text: '500', style: 'number' }],
  [{ text: '1', style: 'isiData' },
  { text: '02', style: 'isiData' },
  { text: '500', style: 'number' }],
  [{ text: '2', style: 'isiData' },
  { text: '', style: 'isiData' },
  { text: '2000', style: 'number' }],
  [{ text: '2', style: 'isiData' },
  { text: '01', style: 'isiData' },
  { text: '1000', style: 'number' }],
  [{ text: '2', style: 'isiData' },
  { text: '02', style: 'isiData' },
  { text: '1000', style: 'number' }]]


// [ [ { text: 'INDUK', style: 'judulKolom' },{ text: 'ANAK', style: 'judulKolom' },{ text: 'JUMLAH', style: 'judulKolom' } ],
//   [ { text: '1', style: 'isiDataTebal' },{ text: '', style: 'isiDataTebal' },{ text: '1000', style: 'isiDataTebal' } ],
//   [ { text: '1', style: 'isiData' }, { text: '01', style: 'isiData' },{ text: '500', style: 'number' } ],
//   [ { text: '1', style: 'isiData' }, { text: '02', style: 'isiData' },{ text: '500', style: 'number' } ],
//   [ { text: '2', style: 'isiDataTebal' },{ text: '', style: 'isiDataTebal' }, { text: '2000', style: 'isiDataTebal' } ],
//   [ { text: '2', style: 'isiData' },{ text: '01', style: 'isiData' },{ text: '1000', style: 'number' } ],
//   [ { text: '2', style: 'isiData' }, { text: '02', style: 'isiData' },{ text: '1000', style: 'number' } ] ]


//  console.log(daftar[1].length) //akses row  [ { text: '1', style: 'isiData' }, { text: '', style: 'isiData' },{ text: '1000', style: 'number' } ]
// console.log(daftar[1][2]) // akses element { text: '1', style: 'isiData' }
//  console.log(daftar[1].length)
//  var ganti=daftar[1][1].style='IsiDataTebal';

//contoh penggunaan

hasilFormat=formatRow(daftar,"isiDataTebal",1,"")
console.log(hasilFormat)
hasilnya :
[ [ { text: 'INDUK', style: 'judulKolom' },{ text: 'ANAK', style: 'judulKolom' },{ text: 'JUMLAH', style: 'judulKolom' } ],
  [ { text: '1', style: 'isiDataTebal' },{ text: '', style: 'isiDataTebal' },{ text: '1000', style: 'isiDataTebal' } ],
  [ { text: '1', style: 'isiData' }, { text: '01', style: 'isiData' },{ text: '500', style: 'number' } ],
  [ { text: '1', style: 'isiData' }, { text: '02', style: 'isiData' },{ text: '500', style: 'number' } ],
  [ { text: '2', style: 'isiDataTebal' },{ text: '', style: 'isiDataTebal' }, { text: '2000', style: 'isiDataTebal' } ],
  [ { text: '2', style: 'isiData' },{ text: '01', style: 'isiData' },{ text: '1000', style: 'number' } ],
  [ { text: '2', style: 'isiData' }, { text: '02', style: 'isiData' },{ text: '1000', style: 'number' } ] ]


function formatRow(daftar,nmstyle,indeksKondisi,kondisi){
  for (let index = 1; index < daftar.length; index++) {
    const element = daftar[index][indeksKondisi].text;
    if (element == kondisi) {
        var dataRow2 = [];  
        for (let index2 = 0; index2 < daftar[0].length; index2++) {
          var objKolom1={};  
          objKolom1['text'] = daftar[index][index2].text;
          objKolom1['style'] = nmstyle;
          dataRow2.push(objKolom1);
        }
        daftar.splice(index,1,dataRow2)
    }
  }
  return daftar
}


hasilFormat=formatKolomKhusus(daftar,"uangtebal",1,"",2)
 console.log(hasilFormat)
//  hasilnya : uangtebal akan terisi pada kolom tertentu

 [ [ { text: 'INDUK', style: 'judulKolom' },
 { text: 'ANAK', style: 'judulKolom' },
 { text: 'JUMLAH', style: 'judulKolom' } ],
[ { text: '1', style: 'isiData' },
 { text: '', style: 'isiData' },
 { text: '1000', style: 'uangtebal' } ],
[ { text: '1', style: 'isiData' },
 { text: '01', style: 'isiData' },
 { text: '500', style: 'number' } ],
[ { text: '1', style: 'isiData' },
 { text: '02', style: 'isiData' },
 { text: '500', style: 'number' } ],
[ { text: '2', style: 'isiData' },
 { text: '', style: 'isiData' },
 { text: '2000', style: 'uangtebal' } ],
[ { text: '2', style: 'isiData' },
 { text: '01', style: 'isiData' },
 { text: '1000', style: 'number' } ],
[ { text: '2', style: 'isiData' },
 { text: '02', style: 'isiData' },
 { text: '1000', style: 'number' } ] ]


function formatKolomKhusus(daftar,nmstyle,indeksKondisi,kondisi,kolomKe){
  for (let index = 1; index < daftar.length; index++) {
    const element = daftar[index][indeksKondisi].text;
    if (element == kondisi) {
          var objKolom1={};  
          objKolom1['text'] = daftar[index][kolomKe].text;
          objKolom1['style'] = nmstyle;
          daftar[index][kolomKe]=objKolom1
          
    }
    
  }
  return daftar
}


 // objKolom1['text'] = daftar[index][0].text;
    // objKolom1['style'] = 'isiDataTebal';
    // dataRow2.push(objKolom1);
    // var objKolom2={};
    // objKolom2['text'] = daftar[index][1].text;
    // objKolom2['style'] = 'isiDataTebal';
    // dataRow2.push(objKolom2);
    // var objKolom3={};
    // objKolom3['text'] = daftar[index][2].text;
    // objKolom3['style'] = 'isiDataTebal';
    // dataRow2.push(objKolom3);
    // console.log(dataRow2)
// console.log(daftar)
// var dd = {
//     content: [

//         {
//             text: 'MONITORING PENERBITAN', style: 'judulLaporan'
//         },
//         {
//             text: '\n'
//         },
//         {
//             table: {
//                 widths: [40, 40,60],
//                 body: daftar
//             }
//         }
//     ],

//     styles: {

//         judulKolom: {
//             bold: true,
//             color: 'black',
//             alignment: 'center'
//         },
//         uang: {
//             alignment: 'right'
//         },
//         isiData: {
//             fontSize: 10,
//         },
//         isiDataTebal: {
//           fontSize: 10,
//           bold: true
//         },
//         judulLaporan: {
//             fontSize: 15,
//             alignment: 'center',
//             bold: true
//         },
//         judulAngka: {
//             bold: true,
//             color: 'black',
//             alignment: 'center',
//             fontSize: 9
//         },
//     },
// }

// var pdfDoc = printer.createPdfKitDocument(dd);
// pdfDoc.pipe(fs.createWriteStream('pdfs/tes.pdf'));
// pdfDoc.end();


function susunListTabel(data, columns, styles, judulKolom) {
  var body = [];

  body.push(judulKolom);
  data.forEach(function (row) {
    //  console.log(row);

    var dataRow = [];
    for (let i = 0; i < columns.length; i++) {
      // console.log(111);
      if (columns[i].constructor === Array) {

        var barisTampung = '';
        var objKolomTampung = {};
        columns[i].forEach(function (isi) {
          //  console.log(isi)
          barisTampung = barisTampung + row[isi].toString() + '\n';
          var objKolom2 = {};
          objKolom2['text'] = barisTampung.toString();
          objKolom2['style'] = styles[i].toString();
          objKolomTampung = objKolom2;
        })
        dataRow.push(objKolomTampung);
      } else {
        // console.log(row[columns[i]].toString())
        var objKolom = {};
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