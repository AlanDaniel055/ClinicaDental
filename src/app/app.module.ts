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

// mat-form-field
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { PacientesScreenComponent } from './screens/pacientes-screen/pacientes-screen.component';
import { NavbarUsuarioComponent } from './partials/navbar-usuario/navbar-usuario.component';
import { PerfilPacienteScreenComponent } from './screens/perfil-paciente-screen/perfil-paciente-screen.component';
import { AgendarCitaScreenComponent } from './screens/agendar-cita-screen/agendar-cita-screen.component';
import { CitasAgendaScreenComponent } from './screens/citas-agenda-screen/citas-agenda-screen.component';
import { HistorialConsultasScreenComponent } from './screens/historial-consultas-screen/historial-consultas-screen.component';

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
    HistorialConsultasScreenComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
