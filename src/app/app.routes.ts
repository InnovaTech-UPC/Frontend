import { Routes } from '@angular/router';

import {NotificationsViewComponent} from "./profile/pages/notifications-view/notifications-view.component";
import {ViewAdvisorsSearchComponent} from "./appointment/pages/view-advisors-search/view-advisors-search.component";
import {ViewReviewComponent} from "./appointment/components/view-review/view-review.component";
import {LoginComponent} from "./iam/pages/login/login.component";
import {SignupComponent} from "./iam/pages/signup/signup.component";
import {SignupFarmerComponent} from "./iam/pages/signup-farmer/signup-farmer.component";
import {SignupAdvisorComponent} from "./iam/pages/signup-advisor/signup-advisor.component";
import {ListAvailabilityScheduleComponent} from "./appointment/pages/list-availability-schedule/list-availability-schedule.component";
import {AddAvailabilityScheduleComponent} from "./appointment/components/add-availability-schedule/add-availability-schedule.component";
import {MyAppointmentsComponent} from "./appointment/pages/my-appointments/my-appointments.component";
import {AppointmentDetailComponent} from "./appointment/components/appointment-detail/appointment-detail.component";
import {AdvisorDetailComponent} from "./appointment/components/advisor-detail/advisor-detail.component";
import {MyAppointmentsHistoryComponent} from "./appointment/pages/my-appointments-history/my-appointments-history.component";
import {NewReviewComponent} from "./appointment/components/new-review/new-review.component";
import {EditReviewComponent} from "./appointment/components/edit-review/edit-review.component";
import {ReviewsListComponent} from "./appointment/pages/reviews-list/reviews-list.component";
import {BookAppointmentComponent} from "./appointment/pages/book-appointment/book-appointment.component";
import {AdvisorPostsComponent} from "./post/pages/advisor-posts/advisor-posts.component";
import {CreatePostComponent} from "./post/pages/create-post/create-post.component";
import {PostDetailComponent} from "./post/pages/post-detail/post-detail.component";
import {FarmerPostsComponent} from "./post/pages/farmer-posts/farmer-posts.component";
import {ProfilePageComponent} from "./profile/pages/profile-page/profile-page.component";
import {EnclosureListComponent} from "./management/pages/enclosure-list/enclosure-list.component";
import {AnimalListComponent} from "./management/pages/animal-list/animal-list.component";
import {AnimalInformationComponent} from "./management/pages/animal-information/animal-information.component";
import {EnclosureEditorComponent} from "./management/pages/enclosure-editor/enclosure-editor.component";
import {RegisterEnclosureComponent} from "./management/components/register-enclosure/register-enclosure.component";
import {RegisterAnimalComponent} from "./management/components/register-animal/register-animal.component";
import {UserGuard} from "./profile/services/user.guard";

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'granjero', redirectTo: 'granjero/citas', pathMatch: 'full'},
  {path: 'asesor', redirectTo: 'asesor/citas', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: SignupComponent},
  {path: 'registro/granjero', component: SignupFarmerComponent},
  {path: 'registro/asesor', component: SignupAdvisorComponent},
  {path: 'granjero/asesores', component: ViewAdvisorsSearchComponent, canActivate: [UserGuard] },
  {path: 'granjero/citas', component: MyAppointmentsComponent, canActivate: [UserGuard] },
  {path: 'granjero/citas/:id', component: AppointmentDetailComponent, canActivate: [UserGuard] },
  {path: 'granjero/historial-citas', component: MyAppointmentsHistoryComponent, canActivate: [UserGuard] },
  {path: 'granjero/resena/:id', component: ViewReviewComponent, canActivate: [UserGuard] },
  {path: 'granjero/resena-nueva/:id', component: NewReviewComponent, canActivate: [UserGuard] },
  {path: 'granjero/editar-resena/:id', component: EditReviewComponent, canActivate: [UserGuard] },
  {path: 'granjero/asesor-info/:id', component: AdvisorDetailComponent, canActivate: [UserGuard] },
  {path: 'granjero/asesor-info/:id/reservar-cita', component: BookAppointmentComponent, canActivate: [UserGuard] },
  {path: 'granjero/asesor-resenas/:id', component: ReviewsListComponent, canActivate: [UserGuard] },
  {path: 'granjero/publicaciones', component: FarmerPostsComponent, canActivate: [UserGuard] },
  {path: 'granjero/mi-granja', component: EnclosureListComponent, canActivate: [UserGuard] },
  {path: 'granjero/mi-granja/recinto/:id', component: AnimalListComponent, canActivate: [UserGuard] },
  {path: 'granjero/mi-granja/recinto/:id/animal/:animalId', component: AnimalInformationComponent, canActivate: [UserGuard] },
  {path: 'granjero/mi-granja/recinto/:id/editar', component: EnclosureEditorComponent, canActivate: [UserGuard] },
  {path: 'granjero/mi-granja/nuevo-recinto', component: RegisterEnclosureComponent, canActivate: [UserGuard] },
  {path: 'granjero/mi-granja/recinto/:id/nuevo-animal', component: RegisterAnimalComponent, canActivate: [UserGuard] },
  {path: 'granjero/notificaciones', component: NotificationsViewComponent, canActivate: [UserGuard] },
  {path: 'granjero/perfil', component: ProfilePageComponent, canActivate: [UserGuard] },
  {path: 'asesor/citas', component: MyAppointmentsComponent, canActivate: [UserGuard] },
  {path: 'asesor/citas/:id', component: AppointmentDetailComponent, canActivate: [UserGuard] },
  {path: 'asesor/historial-citas', component: MyAppointmentsHistoryComponent, canActivate: [UserGuard] },
  {path: 'asesor/resena/:id', component: ViewReviewComponent, canActivate: [UserGuard] },
  {path: 'asesor/mis-publicaciones', component: AdvisorPostsComponent, canActivate: [UserGuard] },
  {path: 'asesor/nueva-publicacion', component: CreatePostComponent, canActivate: [UserGuard] },
  {path: 'asesor/mis-publicaciones/:id', component: PostDetailComponent, canActivate: [UserGuard] },
  {path: 'asesor/notificaciones', component: NotificationsViewComponent, canActivate: [UserGuard] },
  {path: 'asesor/horarios', component: ListAvailabilityScheduleComponent, canActivate: [UserGuard] },
  {path: 'asesor/horarios/agregar', component: AddAvailabilityScheduleComponent, canActivate: [UserGuard] },
  {path: 'asesor/perfil', component: ProfilePageComponent, canActivate: [UserGuard] }
];
