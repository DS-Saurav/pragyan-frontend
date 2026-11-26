import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, Type } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  LucideAward,
  LucideBadgeCheck,
  LucideBanknote,
  LucideBook,
  LucideBookCopy,
  LucideBookOpen,
  LucideBox,
  LucideBoxes,
  LucideBriefcase,
  LucideCalendar,
  LucideCalendarDays,
  LucideClipboardCheck,
  LucideFileText,
  LucideFolderOpen,
  LucideGauge,
  LucideGlobe,
  LucideGraduationCap,
  LucideHeadset,
  LucideImage,
  LucideImages,
  LucideInfo,
  LucideLandmark,
  LucideLayers,
  LucideMapPin,
  LucideMegaphone,
  LucideMessageSquare,
  LucideNewspaper,
  LucideNotebookPen,
  LucidePenSquare,
  LucideRepeat,
  LucideSettings,
  LucideShieldAlert,
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
import { BehaviorSubject } from 'rxjs';
import type {
  AdminMenuSection,
  AdminNewsStory,
  AdminNotice,
  AdminSchoolClass,
  AdminSchoolSettings,
  AdminStudent,
  AdminTeacher,
  DashboardStat,
  StatTone,
  StudentStatus,
} from '../models/admin.models';

interface DashboardApiStat {
  label: string;
  value: number | string;
  icon: string;
  tone: StatTone;
}

interface DashboardApiResponse {
  academicYear: string;
  stats: DashboardApiStat[];
  badges: { helpdesk: number; complaints: number };
}

const ICON_MAP: Record<string, Type<unknown>> = {
  'graduation-cap': LucideGraduationCap,
  'user-plus': LucideUserPlus,
  'shield-alert': LucideShieldAlert,
  wallet: LucideWallet,
  users: LucideUsers,
  layers: LucideLayers,
};

@Injectable({ providedIn: 'root' })
export class AdminDataService {
  private readonly http = inject(HttpClient);

  readonly menuSections: AdminMenuSection[] = [
    {
      section: 'Overview',
      items: [{ label: 'Dashboard', icon: LucideGauge, route: '/admin/dashboard' }],
    },
    {
      section: 'Records',
      items: [
        { label: 'Admissions', icon: LucideUserPlus, route: '/admin/admissions' },
        { label: 'Students', icon: LucideGraduationCap, route: '/admin/students' },
        { label: 'Classes & Sections', icon: LucideLayers, route: '/admin/classes' },
        { label: 'Parents', icon: LucideUsers, route: '/admin/parents' },
        { label: 'Assets', icon: LucideBox, route: '/admin/assets' },
        { label: 'Stock / Inventory', icon: LucideBoxes, route: '/admin/inventory' },
        { label: 'Subjects', icon: LucideBook, route: '/admin/subjects' },
        { label: 'Teachers', icon: LucideBriefcase, route: '/admin/teachers' },
        { label: 'Substitutes', icon: LucideRepeat, route: '/admin/substitutes' },
      ],
    },
    {
      section: 'Library',
      items: [
        { label: 'Books Catalog', icon: LucideBookCopy, route: '/admin/library/books' },
        { label: 'Issue / Return', icon: LucideBookOpen, route: '/admin/library/circulation' },
      ],
    },
    {
      section: 'Daily',
      items: [
        { label: 'Timetable', icon: LucideCalendar, route: '/admin/timetable' },
        { label: 'Attendance', icon: LucideUserCheck, route: '/admin/attendance' },
        { label: 'School Notices', icon: LucideMegaphone, route: '/admin/notices' },
        { label: 'PTM', icon: LucideUsers, route: '/admin/ptm' },
        { label: 'Calendar', icon: LucideCalendarDays, route: '/admin/calendar' },
        { label: 'Lesson Planning', icon: LucidePenSquare, route: '/admin/lesson-plans' },
        { label: 'Teaching Logbook', icon: LucideNotebookPen, route: '/admin/teaching-logs' },
      ],
    },
    {
      section: 'Academic',
      items: [
        { label: 'Exams', icon: LucideClipboardCheck, route: '/admin/exams' },
        { label: 'Results / Marks', icon: LucideAward, route: '/admin/results' },
        { label: 'Hall Tickets', icon: LucideTicket, route: '/admin/hall-tickets' },
        { label: 'Discipline', icon: LucideShieldCheck, route: '/admin/discipline' },
        { label: 'Conduct', icon: LucideBadgeCheck, route: '/admin/conduct' },
        { label: 'Activities', icon: LucideTrophy, route: '/admin/activities' },
      ],
    },
    {
      section: 'Finance',
      items: [
        { label: 'Fees Collection', icon: LucideWallet, route: '/admin/fees' },
        { label: 'Fee Structure', icon: LucideSlidersHorizontal, route: '/admin/fee-structure' },
        { label: 'Payroll / Salary', icon: LucideBanknote, route: '/admin/payroll' },
        { label: 'Daily Accounts', icon: LucideLandmark, route: '/admin/accounts' },
      ],
    },
    {
      section: 'Support',
      items: [
        {
          label: 'Helpdesk',
          icon: LucideHeadset,
          route: '/admin/helpdesk',
          badgeKey: 'helpdesk',
        },
        {
          label: 'Complaints',
          icon: LucideMessageSquare,
          route: '/admin/complaints',
          badgeKey: 'complaints',
        },
        { label: 'Documents', icon: LucideFolderOpen, route: '/admin/documents' },
        { label: 'Notice Board', icon: LucideNewspaper, route: '/notices' },
      ],
    },
    {
      section: 'Administration',
      items: [
        { label: 'Users / Staff', icon: LucideUsers, route: '/admin/users' },
        { label: 'School Settings', icon: LucideSettings, route: '/admin/settings' },
        { label: 'Website Content', icon: LucideGlobe, route: '/admin/settings/website' },
        { label: 'Public Photographs', icon: LucideImage, route: '/admin/public-photos' },
        { label: 'Public Admissions', icon: LucideMegaphone, route: '/admin/public-admissions' },
        { label: 'Media Library', icon: LucideImages, route: '/admin/media' },
        { label: 'Public News', icon: LucideNewspaper, route: '/admin/news' },
        { label: 'Public Gallery', icon: LucideImages, route: '/admin/gallery' },
        { label: 'Public Pages', icon: LucideFileText, route: '/admin/public-pages' },
        { label: 'Public Team', icon: LucideUsers, route: '/admin/public-team' },
        { label: 'Public Identity & Visit', icon: LucideMapPin, route: '/admin/public-identity' },
      ],
    },
    {
      section: 'Account',
      items: [
        { label: 'My Account', icon: LucideUserCircle, route: '/admin/profile' },
        { label: 'About App', icon: LucideInfo, route: '/admin/about' },
      ],
    },
  ];

  readonly sidebarBadges = signal<{ helpdesk: number; complaints: number }>({
    helpdesk: 0,
    complaints: 0,
  });

  readonly classOptions = signal<string[]>([
    'Nursery',
    'LKG',
    'UKG',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
  ]);

  readonly academicYears = signal<string[]>(['2082-2083', '2081-2082', '2080-2081']);

  private readonly studentsSubject = new BehaviorSubject<AdminStudent[]>([]);
  readonly students = toSignal(this.studentsSubject.asObservable(), { initialValue: [] });

  private readonly classesSubject = new BehaviorSubject<AdminSchoolClass[]>([]);
  readonly classes = toSignal(this.classesSubject.asObservable(), { initialValue: [] });

  private readonly teachersSubject = new BehaviorSubject<AdminTeacher[]>([]);
  readonly teachers = toSignal(this.teachersSubject.asObservable(), { initialValue: [] });

  private readonly noticesSubject = new BehaviorSubject<AdminNotice[]>([]);
  readonly notices = toSignal(this.noticesSubject.asObservable(), { initialValue: [] });

  private readonly newsSubject = new BehaviorSubject<AdminNewsStory[]>([]);
  readonly newsStories = toSignal(this.newsSubject.asObservable(), { initialValue: [] });

  readonly settings = signal<AdminSchoolSettings>({
    schoolName: 'Pragyan Pathashala',
    tagline: 'Learn. Grow. Succeed.',
    address: 'Latikoili, Birendranagar-9, Surkhet, Karnali Province, Nepal',
    phone: '+977 83-520100',
    email: 'info@pragyanpathashala.edu.np',
    website: 'https://www.pragyanpathashala.edu.np',
    logoUrl: '',
    timeZone: 'Asia/Kathmandu',
    currencySymbol: 'रू',
    academicYear: '2082-2083',
    primaryColor: '#0f2248',
    accentColor: '#16a34a',
  });

  private readonly apiStatsSignal = signal<DashboardStat[] | null>(null);

  readonly dashboardStats = computed<DashboardStat[]>(() => {
    const apiStats = this.apiStatsSignal();
    if (apiStats) return apiStats;
    return [
      {
        label: 'Total students',
        value: this.students().length,
        icon: LucideGraduationCap,
        tone: 'emerald',
      },
      {
        label: 'System users',
        value: this.teachers().length,
        icon: LucideUsers,
        tone: 'indigo',
      },
      {
        label: 'Classes & sections',
        value: this.classes().length,
        icon: LucideLayers,
        tone: 'slate',
      },
    ];
  });

  loadAll(): void {
    this.loadDashboard();
    this.loadStudents();
    this.loadClasses();
    this.loadTeachers();
    this.loadNotices();
    this.loadNews();
    this.loadSettings();
  }

  loadDashboard(): void {
    this.http.get<DashboardApiResponse>('/api/admin/dashboard').subscribe({
      next: (res) => {
        this.sidebarBadges.set(res.badges);
        this.apiStatsSignal.set(
          res.stats.map((s) => ({
            label: s.label,
            value: s.value,
            icon: ICON_MAP[s.icon] ?? LucideLayers,
            tone: s.tone,
          })),
        );
      },
    });
  }

  loadStudents(): void {
    this.http
      .get<{
        students: AdminStudent[];
        classes: string[];
        academicYears: string[];
      }>('/api/admin/students')
      .subscribe({
        next: (res) => {
          this.studentsSubject.next(res.students);
          if (res.classes.length) this.classOptions.set(res.classes);
          if (res.academicYears.length) this.academicYears.set(res.academicYears);
        },
      });
  }

  loadClasses(): void {
    this.http.get<{ classes: AdminSchoolClass[] }>('/api/admin/classes').subscribe({
      next: (res) => this.classesSubject.next(res.classes),
    });
  }

  loadTeachers(): void {
    this.http.get<{ teachers: AdminTeacher[] }>('/api/admin/teachers').subscribe({
      next: (res) => this.teachersSubject.next(res.teachers),
    });
  }

  loadNotices(): void {
    this.http.get<{ notices: AdminNotice[] }>('/api/admin/notices').subscribe({
      next: (res) => this.noticesSubject.next(res.notices),
    });
  }

  loadNews(): void {
    this.http.get<{ stories: AdminNewsStory[] }>('/api/admin/news').subscribe({
      next: (res) => this.newsSubject.next(res.stories),
    });
  }

  loadSettings(): void {
    this.http.get<{ settings: AdminSchoolSettings }>('/api/admin/settings').subscribe({
      next: (res) => this.settings.set(res.settings),
    });
  }

  // --- Student Mutations ---
  addStudent(payload: Omit<AdminStudent, 'id' | 'admNumber'>): void {
    this.http
      .post<{ student: AdminStudent }>('/api/admin/students', this.toSnakeStudent(payload))
      .subscribe({
        next: (res) => {
          this.studentsSubject.next([res.student, ...this.studentsSubject.value]);
          this.loadDashboard();
        },
      });
  }

  updateStudent(id: number, payload: Partial<AdminStudent>): void {
    this.http
      .put<{ student: AdminStudent }>(`/api/admin/students/${id}`, this.toSnakeStudent(payload))
      .subscribe({
        next: (res) => {
          this.studentsSubject.next(
            this.studentsSubject.value.map((s) => (s.id === id ? res.student : s)),
          );
        },
      });
  }

  updateStudentStatus(id: number, status: StudentStatus): void {
    this.http
      .patch<{ student: AdminStudent }>(`/api/admin/students/${id}/status`, { status })
      .subscribe({
        next: (res) => {
          this.studentsSubject.next(
            this.studentsSubject.value.map((s) => (s.id === id ? res.student : s)),
          );
        },
      });
  }

  deleteStudent(id: number): void {
    this.http.delete(`/api/admin/students/${id}`).subscribe({
      next: () => {
        this.studentsSubject.next(this.studentsSubject.value.filter((s) => s.id !== id));
        this.loadDashboard();
      },
    });
  }

  // --- Class Mutations ---
  addClass(payload: Omit<AdminSchoolClass, 'id' | 'strength'>): void {
    this.http
      .post<{ schoolClass: AdminSchoolClass }>('/api/admin/classes', {
        name: payload.name,
        section: payload.section,
      })
      .subscribe({
        next: (res) => {
          this.classesSubject.next([...this.classesSubject.value, res.schoolClass]);
          this.loadDashboard();
        },
      });
  }

  deleteClass(id: number): void {
    this.http.delete(`/api/admin/classes/${id}`).subscribe({
      next: () => {
        this.classesSubject.next(this.classesSubject.value.filter((c) => c.id !== id));
        this.loadDashboard();
      },
    });
  }

  // --- Teacher Mutations ---
  addTeacher(
    payload: Omit<AdminTeacher, 'id' | 'username' | 'classesCount' | 'assignmentsCount'>,
  ): void {
    this.http
      .post<{ teacher: AdminTeacher }>('/api/admin/teachers', {
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        department: payload.department,
        specialization: payload.specialization,
        class_teacher_of: payload.classTeacherOf,
        status: payload.status,
      })
      .subscribe({
        next: (res) => {
          this.teachersSubject.next([res.teacher, ...this.teachersSubject.value]);
          this.loadDashboard();
        },
      });
  }

  updateTeacher(id: number, payload: Partial<AdminTeacher>): void {
    this.http
      .put<{ teacher: AdminTeacher }>(`/api/admin/teachers/${id}`, {
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        phone: payload.phone,
        department: payload.department,
        specialization: payload.specialization,
        class_teacher_of: payload.classTeacherOf,
        status: payload.status,
      })
      .subscribe({
        next: (res) => {
          this.teachersSubject.next(
            this.teachersSubject.value.map((t) => (t.id === id ? res.teacher : t)),
          );
        },
      });
  }

  // --- Notice Mutations ---
  saveNotice(
    id: number | null,
    payload: Pick<
      AdminNotice,
      'title' | 'slug' | 'content' | 'date' | 'audience' | 'priority' | 'isUrgent' | 'scheduledFor'
    >,
  ): AdminNotice {
    const body = {
      title: payload.title,
      slug: payload.slug,
      content: payload.content,
      date: payload.date,
      audience: payload.audience,
      priority: payload.priority,
      is_urgent: payload.isUrgent,
    };

    if (id === null) {
      this.http.post<{ notice: AdminNotice }>('/api/admin/notices', body).subscribe({
        next: (res) => this.noticesSubject.next([res.notice, ...this.noticesSubject.value]),
      });
      return {
        ...payload,
        id: 0,
        publicationState: 'draft',
        revisionNumber: 1,
        workflowState: 'draft',
        publishedAt: null,
        updatedAt: new Date().toISOString(),
      };
    }

    this.http.put<{ notice: AdminNotice }>(`/api/admin/notices/${id}`, body).subscribe({
      next: (res) => {
        this.noticesSubject.next(
          this.noticesSubject.value.map((n) => (n.id === id ? res.notice : n)),
        );
      },
    });
    return this.noticesSubject.value.find((n) => n.id === id)!;
  }

  transitionNotice(
    id: number,
    action: 'submit' | 'approve' | 'publish' | 'withdraw' | 'archive' | 'restore',
  ): void {
    this.http
      .patch<{ notice: AdminNotice }>(`/api/admin/notices/${id}/transition`, { action })
      .subscribe({
        next: (res) => {
          this.noticesSubject.next(
            this.noticesSubject.value.map((n) => (n.id === id ? res.notice : n)),
          );
        },
      });
  }

  // --- News Mutations ---
  saveNews(
    id: number | null,
    payload: Pick<AdminNewsStory, 'title' | 'slug' | 'category' | 'summary' | 'bodyMarkdown'>,
  ): AdminNewsStory {
    const body = {
      title: payload.title,
      slug: payload.slug,
      category: payload.category,
      summary: payload.summary,
      body_markdown: payload.bodyMarkdown,
    };

    if (id === null) {
      this.http.post<{ story: AdminNewsStory }>('/api/admin/news', body).subscribe({
        next: (res) => this.newsSubject.next([res.story, ...this.newsSubject.value]),
      });
      return {
        ...payload,
        id: 0,
        publicationState: 'draft',
        revisionNumber: 1,
        workflowState: 'draft',
        isFeatured: false,
        publishedAt: null,
        updatedAt: new Date().toISOString(),
      };
    }

    this.http.put<{ story: AdminNewsStory }>(`/api/admin/news/${id}`, body).subscribe({
      next: (res) => {
        this.newsSubject.next(
          this.newsSubject.value.map((s) => (s.id === id ? res.story : s)),
        );
      },
    });
    return this.newsSubject.value.find((s) => s.id === id)!;
  }

  transitionNews(
    id: number,
    action: 'submit' | 'approve' | 'publish' | 'withdraw' | 'archive' | 'restore',
  ): void {
    this.http
      .patch<{ story: AdminNewsStory }>(`/api/admin/news/${id}/transition`, { action })
      .subscribe({
        next: (res) => {
          this.newsSubject.next(
            this.newsSubject.value.map((s) => (s.id === id ? res.story : s)),
          );
        },
      });
  }

  setFeaturedNews(id: number | null): void {
    const req$ =
      id !== null
        ? this.http.patch(`/api/admin/news/${id}/feature`, {})
        : this.http.delete('/api/admin/news/feature');

    req$.subscribe({
      next: () => {
        this.newsSubject.next(
          this.newsSubject.value.map((s) => ({
            ...s,
            isFeatured: id !== null && s.id === id,
          })),
        );
      },
    });
  }

  // --- Settings ---
  updateSettings(next: AdminSchoolSettings): void {
    this.http.put<{ settings: AdminSchoolSettings }>('/api/admin/settings', next).subscribe({
      next: (res) => this.settings.set(res.settings),
    });
  }

  private toSnakeStudent(p: Partial<AdminStudent>): Record<string, unknown> {
    return {
      first_name: p.firstName,
      last_name: p.lastName,
      gender: p.gender,
      dob: p.dob,
      dob_bs: p.dobBs || null,
      languages_spoken: p.languagesSpoken || null,
      address: p.address || null,
      class_applied: p.classApplied,
      roll_no: p.rollNo ?? 1,
      academic_year: p.academicYear,
      status: p.status ?? 'active',
      house: p.house,
      eal: p.eal,
      admission_date: p.admissionDate || null,
      previous_school: p.previousSchool || null,
      blood_group: p.bloodGroup || null,
      emergency_contact: p.emergencyContact || null,
      hobbies: p.hobbies || null,
      has_allergies: Boolean(p.hasAllergies),
    };
  }
}
