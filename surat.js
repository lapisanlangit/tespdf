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

var dd = {
    content: [
        //KOP SURAT
        {
            stack: [
                'KEMENTERIAN KEUANGAN REPUBLIK INDONESIA \n',
                'KANTOR PELAYANAN PERBENDAHARAAN NEGARA TANJUNG SELOR',
            ],
            style: 'kopsurat'
        },

        { text: '______________________________________________________________________________________\n\n', alignment: 'center', bold: true },

        //NOMOR SURAT
        {
            style: 'tableExample',
            table: {
                widths: [370, 130],            
                body: [
                    [
                        {
                            style: 'tabelheader',
                            table: {
                                widths: [80, 10, 250],
                                headerRows: 1,
                                body: [
                                    ['Nomor', ':', '<<1>>'],
                                    ['Sifat', ':', 'Segera'],
                                    ['Lampiran', ':', '<<3>>'],
                                    ['Hal', ':', '<<Persetujuan Pembukaan Rekening <<4>>'],
                                    ['', ':', '<<5>>'],
                                ]
                            },
                            layout: 'noBorders'
                        },
                        {
                            style: 'tabelheader',
                            table: {
                                headerRows: 1,
                                body: [
                                    ['<<2>>'],
                                ]
                            },
                            layout: 'noBorders'
                        }

                    ],
                ]
            },
            layout: 'noBorders'
        },
        //YANG TERHORMAT
        {
            style: 'tableExample',
            table: {
                widths: [370],
                body: [
                    [
                        {
                            style: 'tabelheader',
                            table: {
                                widths: [80, 10, 250],
                                headerRows: 1,
                                body: [
                                    ['Yth', '.', '<<6>>'],
                                    ['', ':', '<<7>>'],
                                    ['', '', 'Di'],
                                    ['', '', '<<8>>'],
                                ]
                            },
                            layout: 'noBorders'
                        },
                    
                    ],
                ]
            },
            layout: 'noBorders'
        },
        {
        stack: [
            'Menunjuk Peraturan Menteri Keuangan Nomor : 182/PMK.05 Tahun 2018 tentang  Pengelolaan Rekening milik satuan kerja lingkup Kementerian Negaral/Lembaga dan surat saudara tanggal'+'<<9>>'+' Nomor '+'<<10>>'+'Hal Permohonan Persetujuan Pembukaan Rekening, dengan ini disampaikan bahwa :'
        ],
        style: 'paragraf'
        },
        {
            ol: [
				{
                    stack:[
                        'Kami memberikan persetujuan pembukaan rekening <<11>>, pada bank <<12>> untuk keperluan <<13>>\n',
                        'Rekening tersebut akan diberi nama :\n',
                        '<<14>>'
                    ],
                    style:'paragraf'
                },
                {
                    stack:[
                        'Dengan diterbitkan surat persetujuan ini segala akibat yang timbul menjadi tanggung jawab Saudara sepenuhnya.'
                    ],
                    style:'paragraf'
                },
                {
                    text : 'Selanjutnya Saudara diminta untuk memenuhi kewajiban sebagai berikut :',             
                    style:'paragraf'
                },
                
				]
        }
    ],

    styles: {

        kopsurat: {
            bold: true,
            color: 'black',
            alignment: 'center',
            fontSize: 15,
        },
        paragraf: {
            alignment: 'justify'
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
        tabelheader: {
            margin: [0, 0, 0, 20],
            fontSize: 12

        },
    },
}

var pdfDoc = printer.createPdfKitDocument(dd);
pdfDoc.pipe(fs.createWriteStream('pdfs/tes.pdf'));
pdfDoc.end();


function susunListTabel(data, columns, styles, judulKolom) {
    var body = [];

    body.push(judulKolom);
    data.forEach(function (row) {
        // console.log(row);

        var dataRow = [];
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].constructor === Array) {

                var barisTampung = '';
                var objKolomTampung = {};
                columns[i].forEach(function (isi) {
                    barisTampung = barisTampung + row[isi].toString() + '\n';
                    var objKolom2 = {};
                    var arrayTampung = [];
                    objKolom2['text'] = barisTampung.toString();
                    objKolom2['style'] = styles[i].toString();
                    objKolomTampung = objKolom2;
                })
                dataRow.push(objKolomTampung);
            } else {
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