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
import { AgendaDocScreenComponent } from './screens/agenda-doc-screen/agenda-doc-screen.component';
import { DoctorScreenComponent } from './screens/doctor-screen/doctor-screen.component';
import { RecepcionistaScreenComponent } from './screens/recepcionista-screen/recepcionista-screen.component';
import { ListaPacientesScreenComponent } from './screens/lista-pacientes-screen/lista-pacientes-screen.component';
import { InfoConsultaScreenComponent } from './screens/info-consulta-screen/info-consulta-screen.component';


const routes: Routes = [
  { path: '', component: LandingScreenComponent, pathMatch: 'full' }, // Pagina principal
  { path: 'Inicio', component: LandingScreenComponent, pathMatch: 'full' }, // Pagina principal
  { path: 'Nosotros', component: NosotrosScreenComponent, pathMatch: 'full' }, // Pagina nosotros
  { path: 'Servicios', component: ServiciosScreenComponent, pathMatch: 'full' }, // Pagina servicios
  { path: 'Contacto', component: ContactoScreenComponent, pathMatch: 'full' }, // Pagina contacto
  { path: 'Registro-pacientes', component: RegistroPacientesComponent, pathMatch: 'full' }, // Pagina registro
  { path: 'Login', component: LoginScreenComponent, pathMatch: 'full' }, // Pagina login

  // Vista Paciente
  { path: 'Paciente', component: PacientesScreenComponent, pathMatch: 'full' }, // Home del paciente
  { path: 'Perfil-paciente', component: PerfilPacienteScreenComponent, pathMatch: 'full' }, // Perfil del paciente
  { path: 'Agendar-cita', component: AgendarCitaScreenComponent, pathMatch: 'full' }, // Agendar cita, vista del paciente
  { path: 'Citas-agendadas', component: CitasAgendaScreenComponent, pathMatch: 'full' }, // Citas agendadas, vista del paciente
  { path: 'Historial-consultas', component: HistorialConsultasScreenComponent, pathMatch: 'full' }, // Historial de Consultas, vista del paciente
  { path: 'Historial-recetas', component: HistorialRecetasScreenComponent, pathMatch: 'full' }, // Historial de Recetas, vista del paciente

  // Vista Doctor
  { path: 'Doctor', component: DoctorScreenComponent, pathMatch: 'full' }, // Doctor, vista del doctor
  { path: 'Agenda', component: AgendaDocScreenComponent, pathMatch: 'full' }, // Agenda, vista del doctor
  { path: 'Lista-pacientes', component: ListaPacientesScreenComponent, pathMatch: 'full' }, // Lista de pacientes , vista del doctor
  { path: 'info-consulta', component: InfoConsultaScreenComponent, pathMatch: 'full' }, // Consulta, vista del doctor

  // Vista recepcionista
  { path: 'Recepcionista', component: RecepcionistaScreenComponent, pathMatch: 'full' }, // Vista del recepcionista , vista del doctor
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
