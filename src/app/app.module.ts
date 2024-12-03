import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LandingScreenComponent } from './screens/landing-screen/landing-screen.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { NosotrosScreenComponent } from './screens/nosotros-screen/nosotros-screen.component';
import { ServiciosScreenComponent } from './screens/servicios-screen/servicios-screen.component';
import { ContactoScreenComponent } from './screens/contacto-screen/contacto-screen.component';
import { RegistroPacientesComponent } from './partials/registro-pacientes/registro-pacientes.component';

// Este import es para los servicios HTTP
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Para el calendario
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';


// mat-form-field
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { PacientesScreenComponent } from './screens/pacientes-screen/pacientes-screen.component';
import { NavbarUsuarioComponent } from './partials/navbar-usuario/navbar-usuario.component';
import { PerfilPacienteScreenComponent } from './screens/perfil-paciente-screen/perfil-paciente-screen.component';
import { AgendarCitaScreenComponent } from './screens/agendar-cita-screen/agendar-cita-screen.component';
import { CitasAgendaScreenComponent } from './screens/citas-agenda-screen/citas-agenda-screen.component';
import { HistorialConsultasScreenComponent } from './screens/historial-consultas-screen/historial-consultas-screen.component';
import { HistorialRecetasScreenComponent } from './screens/historial-recetas-screen/historial-recetas-screen.component';
import { DoctorScreenComponent } from './screens/doctor-screen/doctor-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { RegistroDoctorComponent } from './partials/registro-doctor/registro-doctor.component';
import { RegistroRecepcionistaComponent } from './partials/registro-recepcionista/registro-recepcionista.component';
import { AgendarCitaRecepScreenComponent } from './screens/agendar-cita-recep-screen/agendar-cita-recep-screen.component';
import { RecepcionistaScreenComponent } from './screens/recepcionista-screen/recepcionista-screen.component';
import { AgendaDocScreenComponent } from './screens/agenda-doc-screen/agenda-doc-screen.component';
import { ListaPacientesScreenComponent } from './screens/lista-pacientes-screen/lista-pacientes-screen.component';
import { CitasAgendaRecepScreenComponent } from './screens/citas-agenda-recep-screen/citas-agenda-recep-screen.component';
import { InfoConsultaScreenComponent } from './screens/info-consulta-screen/info-consulta-screen.component';
import { PerfilDentistaScreenComponent } from './screens/perfil-dentista-screen/perfil-dentista-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingScreenComponent,
    NavbarComponent,
    NosotrosScreenComponent,
    ServiciosScreenComponent,
    ContactoScreenComponent,
    RegistroPacientesComponent,
    LoginScreenComponent,
    PacientesScreenComponent,
    NavbarUsuarioComponent,
    PerfilPacienteScreenComponent,
    AgendarCitaScreenComponent,
    CitasAgendaScreenComponent,
    HistorialConsultasScreenComponent,
    HistorialRecetasScreenComponent,
    DoctorScreenComponent,
    RegistroScreenComponent,
    HomeScreenComponent,
    RegistroDoctorComponent,
    RegistroRecepcionistaComponent,
    AgendarCitaRecepScreenComponent,
    RecepcionistaScreenComponent,
    AgendaDocScreenComponent,
    ListaPacientesScreenComponent,
    CitasAgendaRecepScreenComponent,
    InfoConsultaScreenComponent,
    PerfilDentistaScreenComponent
  ],
  imports: [
    MbscModule, // Calendario
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule, //es para fechas
    MatNativeDateModule,
    MatTableModule, // para tablas
    MatPaginatorModule, // paginacion de tablas
    MatDialogModule,
    HttpClientModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule, // mat-form-field
    MatExpansionModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
