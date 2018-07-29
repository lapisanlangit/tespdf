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
let listTabel=[{"kdindukjen":"1","kdrinci":"01","nmrinci":"Tiket Pesawat","uraian":"Tiket Pesawat (PP)","kali":"","keterangan":"Pesawat","persentase":"","jumlah":2674000,"total":2674000,"bukti":1},{"kdindukjen":"1","kdrinci":"02","nmrinci":"Taksi","uraian":"Taksi (PP)","kali":"2 kali","keterangan":"Taksi","persentase":"","jumlah":213000,"total":426000,"bukti":0},{"kdindukjen":"1","kdrinci":"03","nmrinci":"Transport Darat","uraian":"Transport Darat Taksi","kali":"2 kali","keterangan":"Tranport Darat","persentase":"","jumlah":185000,"total":370000,"bukti":1},{"kdindukjen":"2","kdrinci":"01","nmrinci":"Uang Harian","uraian":"Uang Harian","kali":"2 hari","keterangan":null,"persentase":"","jumlah":410000,"total":820000,"bukti":1},{"kdindukjen":"3","kdrinci":"01","nmrinci":"Biaya Inap","uraian":"Penginapan","kali":"1 hari","keterangan":null,"persentase":"100%","jumlah":1063000,"total":1063000,"bukti":1}];

for (let index = 0; index < listTabel.length; index++) {
    listTabel[index].jumlahribuan = ribuan(listTabel[index].jumlah);
    listTabel[index].totalribuan = ribuan(listTabel[index].total);
    listTabel[index].no = index + 1 + '.';
}
console.log(listTabel);

let listData=listTabel;
let kolom = ['no', 'uraian', 'kali', 'jumlahribuan', 'totalribuan','keterangan']
let styles = ['', '', 'tengah', 'uang', 'uang','']
let judulKolom = [{ text: 'NO', style: 'judulKolom' }, { text: 'RINCIAN BIAYA SPD', style: 'judulKolom', colSpan: 4 }, {}, {}, { text: 'JUMLAH', style: 'judulKolom' },{ text: 'KETERANGAN', style: 'judulKolom' }]
// console.log("siapsusun");
let listIsiTabel = susunListTabel(listData, kolom, styles, judulKolom);
console.log(listIsiTabel)

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
//                 widths: [120, 200,100],
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