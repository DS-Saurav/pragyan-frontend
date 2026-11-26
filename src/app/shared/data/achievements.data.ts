export type AchievementCategory =
  | 'Academic Excellence'
  | 'Sports & Athletics'
  | 'Creativity & Arts'
  | 'Competitions & Activities';

export type AchievementFilter = 'All Achievements' | AchievementCategory;

export const ACHIEVEMENT_CATEGORIES: readonly AchievementFilter[] = [
  'All Achievements',
  'Academic Excellence',
  'Sports & Athletics',
  'Creativity & Arts',
  'Competitions & Activities',
];

export interface StudentAchievement {
  id: string;
  title: string;
  category: AchievementCategory;
  description: string;
  image: string;
  alt: string;
  date?: string;
  studentName?: string;
  grade?: string;
  details?: string;
  featured?: boolean;
  isDemo?: boolean;
}

/**
 * Structured student achievement records.
 * Entries marked `isDemo: true` are illustrative showcase placeholders and can
 * be replaced directly with verified student achievements and photos.
 */
export const STUDENT_ACHIEVEMENTS: readonly StudentAchievement[] = [
  {
    id: 'practical-science-model-showcase',
    title: 'Hands-On Classroom Models & Inquiry Projects',
    category: 'Academic Excellence',
    description:
      'Students collaborate in small groups to build practical classroom models, applying science and mathematics concepts through teamwork and curiosity.',
    details:
      'Project-based learning helps students move beyond memorization. Working together on physical models encourages observation, problem-solving, communication, and confidence in presenting ideas to peers and teachers.',
    image: '/assets/images/learning-together.webp',
    alt: 'Students collaborating on a handmade classroom model at Pragyan Paathshala',
    date: 'Academic Session 2082/83',
    featured: true,
    isDemo: true,
  },
  {
    id: 'outdoor-sports-teamwork',
    title: 'School Sports, Athletics & Team Spirit',
    category: 'Sports & Athletics',
    description:
      'Regular outdoor games and friendly inter-house sports build physical fitness, coordination, discipline, and mutual respect among students.',
    details:
      'Physical education and team sports are an essential part of student growth at Pragyan Paathshala, helping children learn fair play, resilience, and leadership on the field.',
    image: '/assets/images/sports.webp',
    alt: 'Students playing outdoor football together on the school ground',
    date: 'Annual Sports Week',
    isDemo: true,
  },
  {
    id: 'creative-painting-expression',
    title: 'Visual Arts, Drawing & Creative Expression',
    category: 'Creativity & Arts',
    description:
      'Through painting, sketching, and craft workshops, students explore their imagination and share original visual stories with the school community.',
    details:
      'Creative arts sessions give every learner space to express ideas freely while developing focus, fine motor skills, and appreciation for culture and color.',
    image: '/assets/images/art.webp',
    alt: 'Student painting colorful artwork during a school arts activity',
    date: 'Arts & Craft Showcase',
    isDemo: true,
  },
  {
    id: 'nature-observation-discovery',
    title: 'Environmental Discovery & Outdoor Learning',
    category: 'Competitions & Activities',
    description:
      'Guided outdoor activities connect classroom lessons with nature, encouraging students to observe plants, ask questions, and care for their surroundings.',
    details:
      'Eco-club and outdoor discovery activities help students develop curiosity about the natural world and practical habits of environmental stewardship.',
    image: '/assets/images/outdoor.webp',
    alt: 'Students observing a young plant outdoors as part of practical learning',
    date: 'Eco & Discovery Activity',
    isDemo: true,
  },
  {
    id: 'foundational-literacy-numeracy',
    title: 'Guided Early Learning & Classroom Milestones',
    category: 'Academic Excellence',
    description:
      'Supportive teacher guidance and hands-on learning materials help young learners build strong early literacy, numeracy, and social confidence.',
    details:
      'Small-group activities in our early grades nurture curiosity and steady progress at each child’s own pace.',
    image: '/assets/images/early-learning.webp',
    alt: 'Teacher guiding young learners with wooden learning blocks in class',
    date: 'Early Childhood & Primary',
    isDemo: true,
  },
];
