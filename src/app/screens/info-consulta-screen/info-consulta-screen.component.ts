import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PacientesService } from 'src/app/services/pacientes.service';
import { RecetasService } from 'src/app/services/recetas.service';
import { TratamientosService } from 'src/app/services/tratamientos.service';
import { HistorialMedicoService } from 'src/app/services/historial-medico.service';
import { ArchivosService } from 'src/app/services/archivos.service';

declare var $: any;

@Component({
  selector: 'app-info-consulta-screen',
  templateUrl: './info-consulta-screen.component.html',
  styleUrls: ['./info-consulta-screen.component.scss']
})
export class InfoConsultaScreenComponent implements OnInit {

  //Variables
  public receta: any = {};
  public receta_nota: any = {};
  public editar: boolean = false;
  public errors: any = {};
  public tratamiento: any = {};
  tratamientos: any[] = []; // Variable para almacenar la lista de tratamientos
  historial: any = {}; // Almacena el historial médico
  historiales: any[] = []; // Variable para almacenar la lista de tratamientos

  // Archivos
  public archivos: any = {};
  archivo: any[] = []; // Variable para almacenar la lista de archivos
  imagePreview: string | ArrayBuffer | null = null; // Imagenes
  pdfFileName: string | null = null; // Variable para almacenar el nombre del archivo PDF
  archivosPaciente: any[] = [];

  idPaciente!: number;
  datosPaciente: any;  // Variable para almacenar los datos del paciente

  seccionActual: string = 'infoGeneral';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private pacientesService: PacientesService,
    private recetasService: RecetasService,
    private tratamientosService: TratamientosService,
    private historialMedicoService: HistorialMedicoService,
    private archivosService: ArchivosService
  ) { }

  ngOnInit(): void {
    // Obtener el parámetro de la ruta
    this.route.params.subscribe(params => {
      this.idPaciente = +params['idPaciente'];
      this.obtenerDatosPaciente(this.idPaciente);
      this.obtenerListaTratamientos(); // Carga los tratamientos del paciente
      this.obtenerListaHistorial(); // Carga los tratamientos del paciente
      this.obtenerUltimaReceta(this.idPaciente); // Nueva función
      // this.cargarArchivos();
    });

    // Definir el esquema a mi JSON para recetas
    this.receta = this.recetasService.esquemaRecetas();
    console.log("Receta: ", this.receta);

    // Definir el esquema a mi JSON para tratamientos
    this.tratamiento = this.tratamientosService.esquemaTratamientos();
    console.log("Tratamiento: ", this.tratamiento);

    // Definir el esquema a mi JSON para archivos
    this.archivos = this.archivosService.esquemaArchivos();
    console.log("Archivo: ", this.tratamiento);
  }

  obtenerListaTratamientos(): void {
    this.tratamientosService.obtenerListaTratamientos().subscribe({
      next: (data) => {
        this.tratamientos = data; // Asignar la lista de tratamientos
        console.log('Tratamientos obtenidos:', this.tratamientos);
      },
      error: (error) => {
        console.error('Error al obtener la lista de tratamientos:', error);
      }
    });
  }

  obtenerListaHistorial(): void {
    this.historialMedicoService.obtenerListaHistorial().subscribe({
      next: (data) => {
        this.historiales = data; // Asignar la lista
        console.log('Historiales obtenidos:', this.historiales);
      },
      error: (error) => {
        console.error('Error al obtener la lista de historiales:', error);
      }
    });
  }

  obtenerDatosPaciente(id: number): void {
    // Llamada al servicio para obtener datos del paciente
    this.pacientesService.getPacienteByID(id).subscribe({
      next: (data) => {
        this.datosPaciente = data;
        console.log('Datos del paciente:', this.datosPaciente);
        // Inicializar receta y tratamiento con los datos del paciente
        this.receta = this.recetasService.esquemaRecetas(this.datosPaciente);
        this.tratamiento = this.tratamientosService.esquemaTratamientos(this.datosPaciente);
        this.cargarArchivosPaciente();

      },
      error: (error) => {
        console.error('Error al obtener los datos del paciente:', error);
      }
    });
  }

  cambiarSeccion(seccion: string): void {
    this.seccionActual = seccion;
  }

  calcularEdad(fechaNacimiento: string): number {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const edadDifMs = Date.now() - fechaNacimientoDate.getTime();
    const edadDate = new Date(edadDifMs);
    return Math.abs(edadDate.getUTCFullYear() - 1970);
  }

  public cancelar() {
    // this.location.back(); // Por el momento
    window.location.reload();
  }

  public guardar() { // Receta
    // Validar
    this.errors = [];

    this.errors = this.recetasService.validarReceta(this.receta, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return;
    }

    // Asignar el ID del paciente a la receta
    this.receta.paciente = this.datosPaciente?.id;

    // Llamar al servicio para registrar la receta
    this.recetasService.registrarReceta(this.receta).subscribe({
      next: (response) => {
        alert("Receta registrada correctamente");
        console.log("Receta registrada:", response);

        // Recargar la página después de guardar exitosamente
        window.location.reload();
      },
      error: (error) => {
        alert("No se pudo registrar la receta");
        console.error("Error al registrar la receta", error);
      }
    });

  }

  // Funcion para detectar el cambio de fecha
  public changeFecha(event: any) {
    console.log(event);
    console.log(event.value.toISOString());

    this.receta.fecha_receta = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.receta.fecha_receta);
  }

  public changeFechaTratamiento(event: any) {
    console.log(event);
    console.log(event.value.toISOString());

    this.tratamiento.fecha_tratamiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.tratamiento.fecha_tratamiento);
  }

  public guardarTratamiento() {
    // Limpiar los errores previos
    this.errors = {};

    // Validar el tratamiento antes de guardar
    this.errors = this.tratamientosService.validarTratamiento(this.tratamiento, this.editar);
    if (Object.keys(this.errors).length > 0) {
      console.error("Errores de validación:", this.errors);
      alert("Por favor, revisa los campos obligatorios.");
      return;
    }

    // Asignar el ID del paciente al tratamiento
    this.tratamiento.paciente = this.datosPaciente?.id;

    // Llamar al servicio para registrar el tratamiento
    this.tratamientosService.registrarTratamiento(this.tratamiento).subscribe({
      next: (response) => {
        alert("Tratamiento registrado correctamente");
        console.log("Tratamiento registrado:", response);

        // Recargar la página después de guardar exitosamente
        window.location.reload();
      },
      error: (error) => {
        alert("No se pudo registrar el tratamiento");
        console.error("Error al registrar el tratamiento", error);
      }
    });
  }

  public guardarHistorial() {
    // Limpiar los errores previos
    this.errors = {};

    // Validar
    this.errors = this.historialMedicoService.validarHistorial(this.historial, this.editar);
    if (Object.keys(this.errors).length > 0) {
      console.error("Errores de validación:", this.errors);
      alert("Por favor, revisa los campos obligatorios.");
      return;
    }

    // Asignar el ID del paciente al tratamiento
    this.historial.paciente = this.datosPaciente?.id;

    // Llamar al servicio para registrar el tratamiento
    this.historialMedicoService.registrarHistorial(this.historial).subscribe({
      next: (response) => {
        alert("Historial médico registrado correctamente");
        console.log("Historial registrado:", response);
        window.location.reload();
      },
      error: (error) => {
        alert("No se pudo registrar el historial médico");
        console.error("Error al registrar historial médico:", error);
      }
    });
  }

  // Nueva función para obtener la última receta
  obtenerUltimaReceta(idPaciente: number): void {
    this.recetasService.obtenerUltimaRecetaPorPaciente(idPaciente).subscribe({
      next: (receta_nota) => {
        this.receta_nota = receta_nota; // Asigna la receta obtenida
        console.log('Última receta del paciente:', this.receta_nota);
      },
      error: (error) => {
        console.error('Error al obtener la última receta:', error);
      }
    });
  }

  // Método para la imagen
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.archivos.imagen = file; // Asignar el archivo completo.

      // Vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Método para el archivo PDF
  onPdfSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.archivos.pdf = file; // Asignar directamente el archivo PDF.
      this.pdfFileName = file.name; // Actualizar el nombre del archivo.
    }
  }

  // Método para guardar el archivo
  guardarArchivo(): void {
    if (!this.archivos.imagen && !this.archivos.pdf) {
      alert('Por favor, selecciona al menos un archivo.');
      return;
    }
    if (!this.archivos.descripcion) {
      alert('Por favor, ingresa una descripción.');
      return;
    }

    const formData = new FormData();
    formData.append('descripcion', this.archivos.descripcion);
    if (this.archivos.imagen) {
      formData.append('archivo', this.archivos.imagen); // Archivo de imagen.
    }
    if (this.archivos.pdf) {
      formData.append('archivo', this.archivos.pdf); // Archivo PDF.
    }
    formData.append('paciente', String(this.datosPaciente?.id));

    // Depurar FormData
    console.log('FormData a enviar:');
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.archivosService.subirArchivo(formData).subscribe({
      next: (response) => {
        alert('Archivo subido correctamente.');
        console.log('Respuesta del servidor:', response);
        this.archivos = {};
        this.imagePreview = null;
        this.pdfFileName = null;
        window.location.reload();
      },
      error: (error) => {
        console.error('Error al subir el archivo:', error);
        alert('Hubo un error al subir el archivo.');
      },
    });
  }

  // Método archivos por paciente
  cargarArchivosPaciente(): void {
    if (!this.datosPaciente?.id) {
      alert('El ID del paciente no está disponible.');
      return;
    }

    this.archivosService.obtenerArchivosPorPaciente(this.datosPaciente.id).subscribe({
      next: (archivos) => {
        this.archivosPaciente = archivos;
        console.log('Archivos del paciente:', this.archivosPaciente);
      },
      error: (error) => {
        console.error('Error al obtener archivos:', error);
        alert('Hubo un error al cargar los archivos.');
      }
    });
  }

}
