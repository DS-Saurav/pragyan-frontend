import { Routes } from '@angular/router';
import { SchoolLayoutComponent } from './layout/school-layout.component';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: '',
    component: SchoolLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'academics',
        loadComponent: () =>
          import('./features/academics/academics.component').then((m) => m.AcademicsComponent),
      },
      {
        path: 'academics/levels',
        loadComponent: () =>
          import('./features/academics/pages/levels/academic-levels.component').then(
            (m) => m.AcademicLevelsComponent,
          ),
      },
      {
        path: 'academics/curriculum',
        loadComponent: () =>
          import('./features/academics/pages/curriculum/curriculum.component').then(
            (m) => m.CurriculumComponent,
          ),
      },
      {
        path: 'academics/teaching-learning',
        loadComponent: () =>
          import('./features/academics/pages/teaching-learning/teaching-learning.component').then(
            (m) => m.TeachingLearningComponent,
          ),
      },
      {
        path: 'academics/student-activities',
        loadComponent: () =>
          import('./features/academics/pages/student-activities/student-activities.component').then(
            (m) => m.StudentActivitiesComponent,
          ),
      },
      {
        path: 'activities',
        loadComponent: () =>
          import('./features/activities/activities.component').then((m) => m.ActivitiesComponent),
      },
      {
        path: 'facilities',
        loadComponent: () =>
          import('./features/facilities/facilities.component').then((m) => m.FacilitiesComponent),
      },
      {
        path: 'gallery',
        loadComponent: () =>
          import('./features/gallery/gallery.component').then((m) => m.GalleryComponent),
      },
      {
        path: 'news',
        data: { kind: 'news' },
        loadComponent: () =>
          import('./features/updates/updates-directory.component').then(
            (m) => m.UpdatesDirectoryComponent,
          ),
      },
      {
        path: 'news/:slug',
        loadComponent: () =>
          import('./features/updates/update-detail.component').then((m) => m.UpdateDetailComponent),
      },
      {
        path: 'events',
        data: { kind: 'events' },
        loadComponent: () =>
          import('./features/updates/updates-directory.component').then(
            (m) => m.UpdatesDirectoryComponent,
          ),
      },
      {
        path: 'events/:slug',
        loadComponent: () =>
          import('./features/updates/update-detail.component').then((m) => m.UpdateDetailComponent),
      },
      {
        path: 'notices',
        data: { kind: 'notices' },
        loadComponent: () =>
          import('./features/updates/updates-directory.component').then(
            (m) => m.UpdatesDirectoryComponent,
          ),
      },
      {
        path: 'notices/:slug',
        loadComponent: () =>
          import('./features/updates/update-detail.component').then((m) => m.UpdateDetailComponent),
      },
      {
        path: 'admissions',
        loadComponent: () =>
          import('./features/admissions/admissions.component').then((m) => m.AdmissionsComponent),
      },
      {
        path: 'staff',
        loadComponent: () =>
          import('./features/staff/staff.component').then((m) => m.StaffComponent),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact.component').then((m) => m.ContactComponent),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
      },
    ],
  },
];
