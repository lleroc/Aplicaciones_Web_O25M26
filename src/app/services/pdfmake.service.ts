import { Injectable } from '@angular/core';
import { AlumnoInterface } from '../interfaces/alumno.interface';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import pdfMake from 'pdfMake/build/pdfMake'
import pdfFonts from 'pdfMake/build/vfs_fonts'


const vfs = (pdfFonts as unknown as { [key: string]: any })['vfs'];
(pdfMake as any).vfs = vfs;


@Injectable({
  providedIn: 'root',
})
export class PdfmakeService {
  exportarAlumnos(alumnos:AlumnoInterface[]){
    const doc:TDocumentDefinitions ={
      pageSize: 'A4',
      pageMargins:[40, 60,40,60],
      content:[
        {
          text: "Lista de Alumnos", fontSize: 16, bold:true,margin:[0,0,0,10]
        },
        {
          text:`Total: ${alumnos.length}`, margin:[0,0,0,10]
        },
        this.construirtabla(alumnos)
      ], 
      footer:(paginaActual: number, numeroPaginas:number )=>({
        margin:[40,0,40,20],
        columns:[
          {
            text:"Sistema de Alumnos",fontSize:9,color:'#666'
          },
          {
            text:`Pagina ${paginaActual} de ${numeroPaginas}`,alignment:'right', fontSize:9, color:"#666"
          }
        ]
      })
    }
    //pdfMake.createPdf(doc).open()
    //pdfMake.createPdf(doc).download("lista Alumnos.pdf")
    pdfMake.createPdf(doc).print()
  }

  private construirtabla(alumnos: AlumnoInterface[]) {
    return {
      table: {
        headerRows: 1,
        widths: [35, '*', '*', 75, '*'],
        body: [
          [
            { text: 'ID', bold: true, fillColor: '#5574c2' },
            { text: 'Nombres', bold: true, fillColor: '#5574c2' },
            { text: 'Dirección', bold: true, fillColor: '#5574c2' },
            { text: 'Teléfono', bold: true, fillColor: '#5574c2' },
            { text: 'Email', bold: true, fillColor: '#5574c2' },
          ],
          ...alumnos.map(a => ([
            a.id ?? '',
            a.nombres ?? '',
            a.direccion ?? '',
            a.telefono ?? '',
            a.email ?? '',
          ])),
        ],
         layout: {
      hLineWidth: () => 0.5,
      vLineWidth: () => 0.5,
      paddingLeft: () => 4,
      paddingRight: () => 4,
      paddingTop: () => 2,
      paddingBottom: () => 2,
    },
      },
    };
  }

}
