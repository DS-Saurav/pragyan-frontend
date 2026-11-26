import type { Type } from '@angular/core';
import {
  LucideAward,
  LucideBookOpen,
  LucideBrain,
  LucideCalculator,
  LucideCompass,
  LucideFlaskConical,
  LucideGlobe,
  LucideHeartPulse,
  LucideLaptop,
  LucideLightbulb,
  LucideMessageSquare,
  LucidePalette,
  LucidePresentation,
  LucideSparkles,
  LucideTrophy,
  LucideUsers,
  LucideWrench,
} from '@lucide/angular';

export interface AcademicLevelItem {
  id: string;
  step: string;
  title: string;
  badge?: string;
  shortDescription: string;
  detailDescription: string;
  highlights: string[];
  image: string;
  alt: string;
  highlight?: boolean;
}

export interface AcademicIconCard {
  title: string;
  description: string;
  icon: Type<unknown>;
}

export interface AcademicActivityItem {
  title: string;
  description: string;
  icon: Type<unknown>;
  image?: string;
  alt?: string;
}

export interface AcademicGalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  spanClass: string;
}

export const ACADEMIC_LEVELS: AcademicLevelItem[] = [
  {
    id: 'early-childhood',
    step: '01',
    title: 'Early Childhood Education',
    shortDescription:
      'Building curiosity, creativity, communication, social interaction, and foundational learning skills through age-appropriate experiences.',
    detailDescription:
      'Early childhood education focuses on helping children explore, discover, communicate, interact, and develop foundational skills through engaging and age-appropriate learning experiences.',
    highlights: [
      'Curiosity and exploration',
      'Social interaction',
      'Creativity',
      'Communication',
      'Foundational learning',
    ],
    image: '/assets/images/early-learning.webp',
    alt: 'Young children exploring wooden learning materials with a teacher',
  },
  {
    id: 'primary-level',
    step: '02',
    title: 'Primary Level',
    shortDescription:
      'Developing strong foundations in literacy, numeracy, communication, creativity, problem-solving, and essential academic knowledge.',
    detailDescription:
      'The primary years play an important role in building a strong academic foundation. Learning experiences aim to develop literacy, numeracy, communication, creativity, problem-solving, and essential knowledge.',
    highlights: [
      'Foundational knowledge',
      'Literacy and numeracy',
      'Communication',
      'Creativity',
      'Positive learning habits',
    ],
    image: '/assets/images/learning-together.webp',
    alt: 'Children working together on a classroom learning activity',
  },
  {
    id: 'lower-secondary',
    step: '03',
    title: 'Lower Secondary Level',
    shortDescription:
      'Encouraging deeper understanding, independent thinking, exploration, collaboration, and academic and personal skill growth.',
    detailDescription:
      'Lower secondary education encourages students to deepen their understanding, explore ideas, develop independent thinking, and strengthen their academic and personal skills.',
    highlights: [
      'Deeper understanding',
      'Critical thinking',
      'Collaboration',
      'Independent learning',
      'Skill development',
    ],
    image: '/assets/images/outdoor.webp',
    alt: 'Students exploring and learning together outdoors',
  },
  {
    id: 'secondary-level',
    step: '04',
    title: 'Secondary Level',
    badge: 'Grades 9–10',
    shortDescription:
      'Preparing students for higher academic challenges, SEE preparation, critical thinking, independent learning, and future opportunities.',
    detailDescription:
      'Grades 9 and 10 represent an important stage of academic development. Students work toward strengthening subject knowledge, developing discipline, improving problem-solving skills, and preparing for the Secondary Education Examination (SEE) and future educational opportunities.',
    highlights: [
      'Grades 9 and 10',
      'Academic development',
      'Independent learning',
      'Critical thinking',
      'SEE preparation',
    ],
    image: '/assets/images/classroom.webp',
    alt: 'Students collaborating at a desk in a Pragyan Paathshala classroom',
    highlight: true,
  },
];

export const TEACHING_PRINCIPLES: AcademicIconCard[] = [
  {
    title: 'Interactive Learning',
    description:
      'Encourage students to actively participate, ask questions, engage in discussions, and contribute to classroom activities.',
    icon: LucideMessageSquare,
  },
  {
    title: 'Learning Through Exploration',
    description:
      'Encourage curiosity, exploration, discovery, and understanding through meaningful learning experiences.',
    icon: LucideCompass,
  },
  {
    title: 'Critical Thinking',
    description:
      'Help students develop the ability to question, analyze, understand problems, and think independently.',
    icon: LucideBrain,
  },
  {
    title: 'Collaborative Learning',
    description: 'Promote teamwork, communication, cooperation, and peer learning.',
    icon: LucideUsers,
  },
  {
    title: 'Practical Learning',
    description:
      'Connect knowledge with practical activities, projects, demonstrations, and real-world learning experiences.',
    icon: LucideWrench,
  },
  {
    title: 'Personal Development',
    description:
      'Encourage confidence, responsibility, creativity, discipline, respect, and positive learning habits.',
    icon: LucideSparkles,
  },
];

export const LEARNING_AREAS: AcademicIconCard[] = [
  {
    title: 'Language and Communication',
    description: 'Building reading, writing, listening, and confident expression.',
    icon: LucideBookOpen,
  },
  {
    title: 'Mathematics and Logical Thinking',
    description: 'Developing numeracy, reasoning, and everyday problem-solving.',
    icon: LucideCalculator,
  },
  {
    title: 'Science and Exploration',
    description: 'Encouraging observation, inquiry, and curiosity about the natural world.',
    icon: LucideFlaskConical,
  },
  {
    title: 'Social Studies and General Knowledge',
    description: 'Understanding community, culture, citizenship, and the wider world.',
    icon: LucideGlobe,
  },
  {
    title: 'Information and Technology',
    description: 'Introducing digital literacy and responsible technology skills.',
    icon: LucideLaptop,
  },
  {
    title: 'Creative Arts and Expression',
    description: 'Nurturing imagination through art, craft, music, and creative expression.',
    icon: LucidePalette,
  },
  {
    title: 'Physical Education and Health',
    description: 'Supporting active habits, teamwork, coordination, and overall wellbeing.',
    icon: LucideHeartPulse,
  },
];

export const STUDENT_ACTIVITIES: AcademicActivityItem[] = [
  {
    title: 'Project-Based Learning',
    description:
      'Encourage students to explore ideas, work on projects, develop creativity, and apply knowledge.',
    icon: LucideLightbulb,
    image: '/assets/images/learning-together.webp',
    alt: 'Students collaborating on a handmade learning project',
  },
  {
    title: 'Student Presentations',
    description:
      'Help students develop communication skills, confidence, expression, and presentation abilities.',
    icon: LucidePresentation,
  },
  {
    title: 'Creative Learning',
    description: 'Encourage imagination, creativity, exploration, and expression.',
    icon: LucidePalette,
    image: '/assets/images/art.webp',
    alt: 'Child painting with bright colors during a creative session',
  },
  {
    title: 'Academic Competitions',
    description:
      'Provide opportunities for students to challenge themselves, demonstrate knowledge, and develop confidence, where applicable.',
    icon: LucideTrophy,
  },
  {
    title: 'Collaborative Activities',
    description:
      'Encourage teamwork, cooperation, communication, and shared learning experiences.',
    icon: LucideUsers,
    image: '/assets/images/sports.webp',
    alt: 'Children participating in group activities outdoors',
  },
  {
    title: 'Educational Experiences',
    description:
      'Showcase learning experiences that help students explore, discover, and understand different aspects of the world.',
    icon: LucideAward,
  },
];

export const ENVIRONMENT_GALLERY: AcademicGalleryPhoto[] = [
  {
    src: '/assets/images/learning-together.webp',
    alt: 'Students working together on a classroom project',
    caption: 'Classroom Learning & Collaboration',
    spanClass: 'md:col-span-2 md:row-span-2 min-h-[260px] md:min-h-[410px]',
  },
  {
    src: '/assets/images/early-learning.webp',
    alt: 'Teacher interacting closely with young learners',
    caption: 'Teacher–Student Interaction',
    spanClass: 'min-h-[195px]',
  },
  {
    src: '/assets/images/classroom.webp',
    alt: 'Students reading and discussing together at a desk',
    caption: 'Reading & Guided Study',
    spanClass: 'min-h-[195px]',
  },
  {
    src: '/assets/images/art.webp',
    alt: 'Student engaged in practical creative work',
    caption: 'Practical & Creative Activities',
    spanClass: 'min-h-[195px]',
  },
  {
    src: '/assets/images/sports.webp',
    alt: 'Students enjoying outdoor activities together',
    caption: 'Active School Life',
    spanClass: 'min-h-[195px]',
  },
];
