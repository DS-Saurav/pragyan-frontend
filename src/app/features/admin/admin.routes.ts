import { Routes } from '@angular/router';
import {
  LucideAward,
  LucideBadgeCheck,
  LucideBanknote,
  LucideBook,
  LucideBookCopy,
  LucideBookOpen,
  LucideBox,
  LucideBoxes,
  LucideCalendar,
  LucideCalendarDays,
  LucideClipboardCheck,
  LucideFileText,
  LucideFolderOpen,
  LucideGlobe,
  LucideHeadset,
  LucideImage,
  LucideImages,
  LucideInfo,
  LucideLandmark,
  LucideMapPin,
  LucideMegaphone,
  LucideMessageSquare,
  LucideNotebookPen,
  LucidePenSquare,
  LucideLayoutTemplate,
  LucideRepeat,
  LucideShieldCheck,
  LucideSlidersHorizontal,
  LucideTicket,
  LucideTrophy,
  LucideUserCheck,
  LucideUserCircle,
  LucideUserPlus,
  LucideUsers,
  LucideWallet,
} from '@lucide/angular';
import { adminAuthGuard } from './guards/admin-auth.guard';
import { AdminLayoutComponent } from './layout/admin-layout.component';

const placeholder = () =>
  import('./pages/placeholder/admin-module-placeholder.component').then(
    (m) => m.AdminModulePlaceholderComponent,
  );

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/admin-login.component').then((m) => m.AdminLoginComponent),
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [adminAuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent,
          ),
      },
      {
        path: 'students',
        loadComponent: () =>
          import('./pages/students/admin-students.component').then((m) => m.AdminStudentsComponent),
      },
      {
        path: 'students/:id',
        loadComponent: () =>
          import('./pages/students/admin-student-detail.component').then(
            (m) => m.AdminStudentDetailComponent,
          ),
      },
      {
        path: 'classes',
        loadComponent: () =>
          import('./pages/classes/admin-classes.component').then((m) => m.AdminClassesComponent),
      },
      {
        path: 'teachers',
        loadComponent: () =>
          import('./pages/teachers/admin-teachers.component').then((m) => m.AdminTeachersComponent),
      },
      {
        path: 'notices',
        loadComponent: () =>
          import('./pages/notices/admin-notices.component').then((m) => m.AdminNoticesComponent),
      },
      {
        path: 'notices/create',
        loadComponent: () =>
          import('./pages/notices/admin-notice-form.component').then(
            (m) => m.AdminNoticeFormComponent,
          ),
      },
      {
        path: 'notices/:id/edit',
        loadComponent: () =>
          import('./pages/notices/admin-notice-form.component').then(
            (m) => m.AdminNoticeFormComponent,
          ),
      },
      {
        path: 'news',
        loadComponent: () =>
          import('./pages/news/admin-news.component').then((m) => m.AdminNewsComponent),
      },
      {
        path: 'news/create',
        loadComponent: () =>
          import('./pages/news/admin-news-form.component').then((m) => m.AdminNewsFormComponent),
      },
      {
        path: 'news/:id/edit',
        loadComponent: () =>
          import('./pages/news/admin-news-form.component').then((m) => m.AdminNewsFormComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/admin-settings.component').then((m) => m.AdminSettingsComponent),
      },
      // Placeholder routes for all remaining Laravel admin modules
      { path: 'assets', loadComponent: placeholder, data: { title: 'Assets', section: 'Records', icon: LucideBox } },
      { path: 'inventory', loadComponent: placeholder, data: { title: 'Stock / Inventory', section: 'Records', icon: LucideBoxes } },
      { path: 'subjects', loadComponent: placeholder, data: { title: 'Subjects', section: 'Records', icon: LucideBook } },
      { path: 'substitutes', loadComponent: placeholder, data: { title: 'Substitutes', section: 'Records', icon: LucideRepeat } },
      { path: 'library/books', loadComponent: placeholder, data: { title: 'Books Catalog', section: 'Library', icon: LucideBookCopy } },
      { path: 'library/circulation', loadComponent: placeholder, data: { title: 'Issue / Return', section: 'Library', icon: LucideBookOpen } },
      { path: 'timetable', loadComponent: placeholder, data: { title: 'Timetable', section: 'Daily', icon: LucideCalendar } },
      { path: 'attendance', loadComponent: placeholder, data: { title: 'Attendance', section: 'Daily', icon: LucideUserCheck } },
      { path: 'ptm', loadComponent: placeholder, data: { title: 'Parent-Teacher Meetings (PTM)', section: 'Daily', icon: LucideUsers } },
      { path: 'calendar', loadComponent: placeholder, data: { title: 'Calendar', section: 'Daily', icon: LucideCalendarDays } },
      { path: 'lesson-plans', loadComponent: placeholder, data: { title: 'Lesson Planning', section: 'Daily', icon: LucidePenSquare } },
      { path: 'teaching-logs', loadComponent: placeholder, data: { title: 'Teaching Logbook', section: 'Daily', icon: LucideNotebookPen } },
      { path: 'exams', loadComponent: placeholder, data: { title: 'Exams', section: 'Academic', icon: LucideClipboardCheck } },
      { path: 'results', loadComponent: placeholder, data: { title: 'Results / Marks', section: 'Academic', icon: LucideAward } },
      { path: 'hall-tickets', loadComponent: placeholder, data: { title: 'Hall Tickets', section: 'Academic', icon: LucideTicket } },
      { path: 'discipline', loadComponent: placeholder, data: { title: 'Discipline', section: 'Academic', icon: LucideShieldCheck } },
      { path: 'conduct', loadComponent: placeholder, data: { title: 'Conduct', section: 'Academic', icon: LucideBadgeCheck } },
      { path: 'activities', loadComponent: placeholder, data: { title: 'Activities', section: 'Academic', icon: LucideTrophy } },
      { path: 'fees', loadComponent: placeholder, data: { title: 'Fees Collection', section: 'Finance', icon: LucideWallet } },
      { path: 'fee-structure', loadComponent: placeholder, data: { title: 'Fee Structure', section: 'Finance', icon: LucideSlidersHorizontal } },
      { path: 'payroll', loadComponent: placeholder, data: { title: 'Payroll / Salary', section: 'Finance', icon: LucideBanknote } },
      { path: 'accounts', loadComponent: placeholder, data: { title: 'Daily Accounts', section: 'Finance', icon: LucideLandmark } },
      { path: 'helpdesk', loadComponent: placeholder, data: { title: 'Helpdesk', section: 'Support', icon: LucideHeadset } },
      { path: 'complaints', loadComponent: placeholder, data: { title: 'Complaints', section: 'Support', icon: LucideMessageSquare } },
      { path: 'documents', loadComponent: placeholder, data: { title: 'Documents', section: 'Support', icon: LucideFolderOpen } },
      { path: 'users', loadComponent: placeholder, data: { title: 'Users / Staff', section: 'Administration', icon: LucideUsers } },
      { path: 'settings/marksheet', loadComponent: placeholder, data: { title: 'Marksheet Layout', section: 'Administration', icon: LucideLayoutTemplate } },
      { path: 'settings/website', loadComponent: placeholder, data: { title: 'Website Content', section: 'Administration', icon: LucideGlobe } },
      {
        path: 'public-photos',
        loadComponent: () =>
          import('./pages/public-photos/admin-public-photos.component').then(
            (m) => m.AdminPublicPhotosComponent,
          ),
      },
      { path: 'public-admissions', loadComponent: placeholder, data: { title: 'Public Admissions', section: 'Administration', icon: LucideMegaphone } },
      { path: 'media', loadComponent: placeholder, data: { title: 'Media Library', section: 'Administration', icon: LucideImages } },
      { path: 'gallery', loadComponent: placeholder, data: { title: 'Public Gallery', section: 'Administration', icon: LucideImages } },
      { path: 'public-pages', loadComponent: placeholder, data: { title: 'Public Pages', section: 'Administration', icon: LucideFileText } },
      { path: 'public-team', loadComponent: placeholder, data: { title: 'Public Team', section: 'Administration', icon: LucideUsers } },
      { path: 'public-identity', loadComponent: placeholder, data: { title: 'Public Identity & Visit', section: 'Administration', icon: LucideMapPin } },
      { path: 'profile', loadComponent: placeholder, data: { title: 'My Account', section: 'Account', icon: LucideUserCircle } },
      { path: 'about', loadComponent: placeholder, data: { title: 'About App', section: 'Account', icon: LucideInfo } },
    ],
  },
];
