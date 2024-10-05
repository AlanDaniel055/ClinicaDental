import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingScreenComponent } from './screens/landing-screen/landing-screen.component';
import { NosotrosScreenComponent } from './screens/nosotros-screen/nosotros-screen.component';
import { ServiciosScreenComponent } from './screens/servicios-screen/servicios-screen.component';
import { ContactoScreenComponent } from './screens/contacto-screen/contacto-screen.component';
import { RegistroPacientesComponent } from './partials/registro-pacientes/registro-pacientes.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { PacientesScreenComponent } from './screens/pacientes-screen/pacientes-screen.component';
import { PerfilPacienteScreenComponent } from './screens/perfil-paciente-screen/perfil-paciente-screen.component';
import { AgendarCitaScreenComponent } from './screens/agendar-cita-screen/agendar-cita-screen.component';
import { CitasAgendaScreenComponent } from './screens/citas-agenda-screen/citas-agenda-screen.component';
import { HistorialConsultasScreenComponent } from './screens/historial-consultas-screen/historial-consultas-screen.component';
import { HistorialRecetasScreenComponent } from './screens/historial-recetas-screen/historial-recetas-screen.component';
import { DoctorScreenComponent } from './screens/doctor-screen/doctor-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { RegistroRecepcionistaComponent } from './partials/registro-recepcionista/registro-recepcionista.component';
import { RecepcionistaScreenComponent } from './screens/recepcionista-screen/recepcionista-screen.component';
import { AgendarCitaRecepScreenComponent } from './screens/agendar-cita-recep-screen/agendar-cita-recep-screen.component';
import { AgendaDocScreenComponent } from './screens/agenda-doc-screen/agenda-doc-screen.component';
import { ListaPacientesScreenComponent } from './screens/lista-pacientes-screen/lista-pacientes-screen.component';

const routes: Routes = [
  { path: '', component: LandingScreenComponent, pathMatch: 'full' }, // Pagina principal
  { path: 'Inicio', component: LandingScreenComponent, pathMatch: 'full' }, // Pagina principal
  { path: 'Nosotros', component: NosotrosScreenComponent, pathMatch: 'full' }, // Pagina nosotros
  { path: 'Servicios', component: ServiciosScreenComponent, pathMatch: 'full' }, // Pagina servicios
  { path: 'Contacto', component: ContactoScreenComponent, pathMatch: 'full' }, // Pagina contacto
  { path: 'Registro', component: RegistroScreenComponent, pathMatch: 'full' }, // Se agrupan los distintos registros
  { path: 'Login', component: LoginScreenComponent, pathMatch: 'full' }, // Pagina login
  { path: 'Home', component: HomeScreenComponent, pathMatch: 'full' }, // Home de todos los usurios

  // Vista Paciente
  { path: 'Registro-pacientes', component: RegistroPacientesComponent, pathMatch: 'full' }, // Pagina registro para pacientes
  { path: 'Paciente', component: PacientesScreenComponent, pathMatch: 'full' }, // Home del paciente
  { path: 'Paciente/:rol/:id', component: PacientesScreenComponent, pathMatch: 'full' }, // Home del paciente por ID
  { path: 'Perfil-paciente', component: PerfilPacienteScreenComponent, pathMatch: 'full' }, // Perfil del paciente
  { path: 'Agendar-cita', component: AgendarCitaScreenComponent, pathMatch: 'full' }, // Agendar cita, vista del paciente
  { path: 'Citas-agendadas', component: CitasAgendaScreenComponent, pathMatch: 'full' }, // Citas agendadas, vista del paciente
  { path: 'Historial-consultas', component: HistorialConsultasScreenComponent, pathMatch: 'full' }, // Historial de Consultas, vista del paciente
  { path: 'Historial-recetas', component: HistorialRecetasScreenComponent, pathMatch: 'full' }, // Historial de Recetas, vista del paciente

  // Vista Doctor
  { path: 'Doctor', component: DoctorScreenComponent, pathMatch: 'full' }, // Home del doctor
  { path: 'Doctor/:rol/:id', component: DoctorScreenComponent, pathMatch: 'full' }, // Home del doctor por ID
  { path: 'Registro-doctor', component: DoctorScreenComponent, pathMatch: 'full' }, // Pagina registro para el doctor
  { path: 'Agenda', component: AgendaDocScreenComponent, pathMatch: 'full' }, // Agenda del doctor
  { path: 'Lista-pacientes', component: ListaPacientesScreenComponent, pathMatch: 'full' }, // Lista pacientes del doctor

  // Vista Recepcionista
  { path: 'Recepcionista', component: RecepcionistaScreenComponent, pathMatch: 'full' }, // Home del recepcionista
  { path: 'Recepcionista/:rol/:id', component: RecepcionistaScreenComponent, pathMatch: 'full' }, // Home del recepcionista por ID
  { path: 'Registro-recepcionista', component: RegistroRecepcionistaComponent, pathMatch: 'full' }, // Registro para el recepcionista
  { path: 'Agendar-cita-recep', component: AgendarCitaRecepScreenComponent, pathMatch: 'full' }, // Registro para el recepcionista


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
