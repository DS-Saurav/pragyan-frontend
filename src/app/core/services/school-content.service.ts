import { computed, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  LucideBell,
  LucideBlocks,
  LucideBookOpen,
  LucideDroplets,
  LucideFootprints,
  LucideGraduationCap,
  LucideHeartHandshake,
  LucideLaptop,
  LucideLeaf,
  LucideLightbulb,
  LucideMapPin,
  LucidePaintbrush,
  LucidePuzzle,
  LucideShapes,
  LucideSparkles,
  LucideTarget,
  LucideUsersRound,
  LucideUtensils,
  LucideVolleyball,
} from '@lucide/angular';
import { BehaviorSubject, map, of } from 'rxjs';
import type {
  AcademicLevel,
  ActivityItem,
  FacilityItem,
  GalleryPhoto,
  NavLinkItem,
  PillarItem,
  QuickLinkItem,
  SchoolInfo,
  SchoolUpdate,
  UpdateKind,
  UpdateSectionMeta,
} from '../models/school.models';

@Injectable({ providedIn: 'root' })
export class SchoolContentService {
  readonly navigation: NavLinkItem[] = [
    { to: '/', title: 'Home' },
    {
      to: '/about',
      title: 'About Us',
      children: [
        { to: '/about', title: 'About Our School' },
        { to: '/staff', title: 'Teachers & Staff' },
      ],
    },
    { to: '/academics', title: 'Academics' },
    { to: '/activities', title: 'Student Life' },
    { to: '/gallery', title: 'Gallery' },
    { to: '/news', title: 'Events & News' },
    { to: '/contact', title: 'Contact' },
  ];

  readonly school = signal<SchoolInfo>({
    name: 'Pragyan Paathshala',
    nepali: 'प्रज्ञा पाठशाला',
    location: 'Latikoili, Birendranagar-9, Surkhet',
    address: 'Latikoili, Birendranagar-9, Surkhet, Karnali Province, Nepal',
    established: '2073 BS',
    phone: '984-1920320',
    email: 'pathashalap@gmail.com',
    whatsapp: '+977 984-1920320',
    officeHours: null,
    social: [],
    mission:
      'Make learning enjoyable and useful, and help children become confident, creative and responsible individuals.',
    welcome:
      'Pragyan Paathshala is committed to providing a supportive and child-friendly educational environment where children can explore their interests, develop their abilities and enjoy meaningful learning experiences. We believe every child is unique and deserves opportunities to grow academically, creatively, socially and physically.',
    vision:
      'To become a model quality school with social responsibility that identifies and nurtures the inherent talents of children, enabling them to become capable, responsible and good citizens of society and the nation.',
    philosophy:
      'Every child is unique. We believe children should learn according to their abilities, interests, pace and individual needs in an environment that encourages exploration, creativity, collaboration and personal growth.',
  });

  readonly mapsUrl = computed(() => {
    const info = this.school();
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${info.name}, ${info.address}`)}`;
  });

  readonly levels = signal<AcademicLevel[]>([
    {
      id: 'early-learning',
      title: 'Early Childhood Development',
      grades: 'Nursery & early learning',
      description:
        'Play and hands-on exploration give young children space to ask questions, try new things and build confidence at their own pace.',
      image: '/assets/images/early-learning.webp',
      alt: 'Children exploring wooden learning materials with an adult',
    },
    {
      id: 'grades-1-8',
      title: 'School Years',
      grades: 'Grades 1–8',
      description:
        'As children grow, practical work and collaboration help them think creatively, take more responsibility and connect what they learn to daily life.',
      image: '/assets/images/classroom.webp',
      alt: 'Three children working together at a classroom desk',
    },
  ]);

  readonly gradeOptions = signal<string[]>([
    'Nursery',
    'Other early learning level (to confirm)',
    ...Array.from({ length: 8 }, (_, i) => `Grade ${i + 1}`),
  ]);

  readonly quickLinks = signal<QuickLinkItem[]>([
    {
      title: 'Nursery to Grade 8',
      detail: 'Explore academics',
      to: '/academics',
      icon: LucideGraduationCap,
    },
    {
      title: 'Notice Board',
      detail: 'Information for families',
      to: '/notices',
      icon: LucideBell,
    },
    {
      title: 'Admissions',
      detail: 'Start your inquiry',
      to: '/admissions',
      icon: LucideBookOpen,
    },
    {
      title: 'Visit the school',
      detail: 'Find us in Surkhet',
      to: '/contact',
      icon: LucideMapPin,
    },
  ]);

  readonly pillars = signal<PillarItem[]>([
    {
      title: 'Child-Centered Learning',
      icon: LucideHeartHandshake,
      description:
        'Room to learn at an individual pace, guided by each child’s abilities, interests and needs.',
    },
    {
      title: 'Creative Learning Experiences',
      icon: LucidePaintbrush,
      description:
        'Practical, open-ended learning that invites children to imagine, make and ask why.',
    },
    {
      title: 'Montessori-Inspired Approaches',
      icon: LucideBlocks,
      description: 'Hands-on exploration that encourages independence in the early years.',
    },
    {
      title: 'Individual Talent Development',
      icon: LucideTarget,
      description: 'Attention to each child’s strengths and opportunities to develop them.',
    },
    {
      title: 'Collaborative Learning',
      icon: LucideUsersRound,
      description:
        'Learning with others builds empathy, cooperation and the confidence to share ideas.',
    },
    {
      title: 'Holistic Development',
      icon: LucideLeaf,
      description:
        'Academic, creative, social and physical growth are all part of a child’s education.',
    },
    {
      title: 'Technology-Assisted Learning',
      icon: LucideLaptop,
      description: 'A focus on using technology purposefully to support curiosity and understanding.',
    },
    {
      title: 'Extracurricular Activities',
      icon: LucideVolleyball,
      description: 'A belief in the value of movement and experiences beyond classroom lessons.',
    },
  ]);

  readonly facilities = signal<FacilityItem[]>([
    { title: 'Child-friendly spaces', icon: LucideHeartHandshake },
    { title: 'Flexible classroom arrangements', icon: LucideShapes },
    { title: 'Clean drinking water', icon: LucideDroplets },
    { title: 'Child-accessible toilets', icon: LucideFootprints },
    { title: 'Nutrition-oriented snacks', icon: LucideUtensils },
    { title: 'Learning materials & technology', icon: LucideLaptop },
    { title: 'Physical & extracurricular activities', icon: LucideVolleyball },
  ]);

  readonly activities = signal<ActivityItem[]>([
    {
      title: 'Sports',
      icon: LucideVolleyball,
      image: '/assets/images/sports.webp',
      description: 'Movement, fair play and teamwork.',
    },
    {
      title: 'Art and Creativity',
      icon: LucidePaintbrush,
      image: '/assets/images/art.webp',
      description: 'Making, experimenting and expressing ideas.',
    },
    {
      title: 'Outdoor Learning',
      icon: LucideLeaf,
      image: '/assets/images/outdoor.webp',
      description: 'Curiosity and care for the world around us.',
    },
    {
      title: 'Educational Activities',
      icon: LucideBookOpen,
      image: '/assets/images/early-learning.webp',
      description: 'Hands-on experiences that connect ideas to everyday life.',
    },
    {
      title: 'Cultural Activities',
      icon: LucideSparkles,
      description: 'Exploring stories, traditions and community.',
    },
    {
      title: 'Science and Technology',
      icon: LucideLightbulb,
      description: 'Asking questions and testing ideas.',
    },
    {
      title: 'Celebrations',
      icon: LucideHeartHandshake,
      description: 'Making space for shared moments and belonging.',
    },
    {
      title: 'Student Participation',
      icon: LucidePuzzle,
      description: 'Building confidence by taking part and contributing.',
    },
  ]);

  readonly photos = signal<GalleryPhoto[]>([
    {
      src: '/assets/images/classroom.webp',
      title: 'Learning together',
      category: 'Classroom',
      alt: 'Three children sharing an activity at a wooden classroom desk',
    },
    {
      src: '/assets/images/art.webp',
      title: 'Making with color',
      category: 'Creative Arts',
      alt: 'A child painting with bright colors',
    },
    {
      src: '/assets/images/sports.webp',
      title: 'Learning through play',
      category: 'Sports',
      alt: 'Children running together with a ball outdoors',
    },
    {
      src: '/assets/images/early-learning.webp',
      title: 'Hands-on discovery',
      category: 'Classroom',
      alt: 'Young children exploring blocks at a low table with an adult',
    },
    {
      src: '/assets/images/outdoor.webp',
      title: 'Growing curiosity',
      category: 'Outdoors',
      alt: 'Two children examining a seedling together outside',
    },
  ]);

  readonly updateSections: Record<UpdateKind, UpdateSectionMeta> = {
    news: {
      label: 'School News',
      description: 'School stories, academic updates and community highlights.',
    },
    events: {
      label: 'Upcoming Events',
      description: 'Find dates and details for school events when they are confirmed.',
    },
    notices: {
      label: 'Notice Board',
      description: 'A place for families to find official notices, schedules and admission updates.',
    },
  };

  private readonly updatesSubject = new BehaviorSubject<SchoolUpdate[]>([
    {
      kind: 'news',
      slug: 'learning-stories',
      category: 'Learning',
      title: 'Learning through making and doing',
      image: '/assets/images/learning-together.webp',
      summary: 'An example space for sharing classroom stories and practical learning projects.',
      body: 'Use this space to publish a school-approved story about how students explored an idea, worked together and reflected on what they learned. This sample does not describe a specific school activity.',
      sample: true,
    },
    {
      kind: 'news',
      slug: 'student-highlights',
      category: 'Student life',
      title: 'Student work and achievements',
      image: '/assets/images/art.webp',
      summary: 'A space to share verified student projects and celebrate their progress.',
      body: 'No achievements or competition results have been published. This example shows how a future update could be presented.',
      sample: true,
    },
    {
      kind: 'notices',
      slug: 'school-notice',
      category: 'School schedule',
      title: 'Term schedules and holidays',
      image: '/assets/images/classroom.webp',
      summary: 'A space for school-approved notices and important reminders.',
      body: 'This example shows where families will be able to find school notices. No dates, schedule changes or instructions have been published here.',
      sample: true,
    },
    {
      kind: 'notices',
      slug: 'admission-updates',
      category: 'Admissions',
      title: 'Admission updates',
      image: '/assets/images/early-learning.webp',
      summary: 'A space for confirmed admission information and announcements.',
      body: 'Admissions information, including timelines and any requirements, must be confirmed by the school. This example is not an announcement that admissions are open.',
      sample: true,
    },
    {
      kind: 'notices',
      slug: 'examination-notices',
      category: 'Academics',
      title: 'Examination information',
      image: '/assets/images/classroom.webp',
      summary: 'A placeholder for examination schedules and guidance for families.',
      body: 'No examination dates or instructions have been published. This is a sample notice only.',
      sample: true,
    },
    {
      kind: 'events',
      slug: 'school-activities',
      category: 'Events',
      title: 'School activities and events',
      image: '/assets/images/art.webp',
      summary: 'A space for school-approved event details and activity updates.',
      body: 'This example shows the layout for a future school event or activity update. No upcoming event is being announced.',
      sample: true,
    },
  ]);

  readonly updates$ = this.updatesSubject.asObservable();
  readonly updates = toSignal(this.updates$, { initialValue: [] as SchoolUpdate[] });

  readonly newsUpdates = computed(() => this.updates().filter((u) => u.kind === 'news'));
  readonly eventUpdates = computed(() => this.updates().filter((u) => u.kind === 'events'));
  readonly noticeUpdates = computed(() => this.updates().filter((u) => u.kind === 'notices'));

  getUpdateByKindAndSlug$(kind: string, slug: string) {
    return this.updates$.pipe(
      map((items) =>
        items.find((post) => post.slug === slug && (post.kind === kind || kind === 'news')),
      ),
    );
  }

  updatePath(item: SchoolUpdate): string {
    return `/${item.kind}/${item.slug}`;
  }

  getPageTitle$(pathname: string) {
    return of(pathname).pipe(
      map((path) => {
        const items = this.updates();
        const article = items.find(
          (item) => path === this.updatePath(item) || path === `/news/${item.slug}`,
        );
        const navTitle = this.navigation.find((nav) => nav.to === path)?.title;
        const extraTitles: Record<string, string> = {
          '/notices': 'Notice Board',
          '/events': 'Upcoming Events',
          '/facilities': 'Facilities',
          '/staff': 'Teachers & Staff',
        };
        const page = article?.title ?? navTitle ?? extraTitles[path] ?? 'Page not found';
        return path === '/'
          ? `${this.school().name} · Surkhet, Nepal`
          : `${page} · ${this.school().name}`;
      }),
    );
  }
}
