import { Component, OnInit, signal } from '@angular/core';
import { AlumnoInterface } from '../interfaces/alumno.interface';
import { AlumnoService } from '../services/alumno.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PdfmakeService } from '../services/pdfmake.service';


@Component({
  selector: 'app-alumno.component',
  imports: [RouterLink, FormsModule],
  templateUrl: './alumno.component.html',
  styleUrl: './alumno.component.css',
})
export class AlumnoComponent implements OnInit {
  listaalumnos = signal<AlumnoInterface[]>([])

  constructor(private alumnoService:AlumnoService, private pdfService:PdfmakeService) {}

  ngOnInit(): void {
    this.cargalista()
  }
  cargalista(){
    this.alumnoService.todos().subscribe(lista =>
      {
        console.table(lista)
        this.listaalumnos.set(Array.isArray(lista) ? lista : [])
      }
    )
  }
   
  exportarPdf(){
    const data = this.listaalumnos();
    if(!data.length){
      alert("No existes registros")
      return
    }
    this.pdfService.exportarAlumnos(data)
  }

  imprimir(){
    window.print()
  }
 
}
