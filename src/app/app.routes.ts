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

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'granjero', redirectTo: 'granjero/citas', pathMatch: 'full'},
  {path: 'asesor', redirectTo: 'asesor/citas', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: SignupComponent},
  {path: 'registro/granjero', component: SignupFarmerComponent},
  {path: 'registro/asesor', component: SignupAdvisorComponent},
  {path: 'granjero/asesores', component: ViewAdvisorsSearchComponent },
  {path: 'granjero/citas', component: MyAppointmentsComponent },
  {path: 'granjero/citas/:id', component: AppointmentDetailComponent },
  {path: 'granjero/historial-citas', component: MyAppointmentsHistoryComponent},
  {path: 'granjero/resena/:id', component: ViewReviewComponent },
  {path: 'granjero/resena-nueva/:id', component: NewReviewComponent },
  {path: 'granjero/editar-resena/:id', component: EditReviewComponent },
  {path: 'granjero/asesor-info/:id', component: AdvisorDetailComponent },
  {path: 'granjero/asesor-info/:id/reservar-cita', component: BookAppointmentComponent },
  {path: 'granjero/asesor-resenas/:id', component: ReviewsListComponent },
  {path: 'granjero/publicaciones', component: FarmerPostsComponent },
  {path: 'granjero/notificaciones', component: NotificationsViewComponent },
  {path: 'granjero/perfil', component: ProfilePageComponent },
  {path: 'asesor/citas', component: MyAppointmentsComponent },
  {path: 'asesor/citas/:id', component: AppointmentDetailComponent },
  {path: 'asesor/historial-citas', component: MyAppointmentsHistoryComponent},
  {path: 'asesor/resena/:id', component: ViewReviewComponent },
  {path: 'asesor/mis-publicaciones', component: AdvisorPostsComponent },
  {path: 'asesor/nueva-publicacion', component: CreatePostComponent },
  {path: 'asesor/mis-publicaciones/:id', component: PostDetailComponent },
  {path: 'asesor/notificaciones', component: NotificationsViewComponent },
  {path: 'asesor/horarios', component: ListAvailabilityScheduleComponent },
  {path: 'asesor/horarios/agregar', component: AddAvailabilityScheduleComponent },
  {path: 'asesor/perfil', component: ProfilePageComponent }
];
