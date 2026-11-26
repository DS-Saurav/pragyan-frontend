import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LucideArrowRight,
  LucideBookOpen,
  LucideCheckCircle2,
  LucideGraduationCap,
  LucideTarget,
  LucideUsers,
} from '@lucide/angular';
import { ActionLinkComponent } from '../../../../shared/components/action-link/action-link.component';
import { EyebrowComponent } from '../../../../shared/components/eyebrow/eyebrow.component';

interface AcademicLevelDetail {
  id: string;
  step: string;
  title: string;
  grades: string;
  image: string;
  alt: string;
  shortDescription: string;
  highlights: string[];
  introduction: string;
  objectives: string[];
  teachingApproach: string;
  learningAreas: string[];
  studentActivities: string;
  learningOutcomes: string;
  highlight?: boolean;
}

@Component({
  selector: 'app-academic-levels',
  standalone: true,
  imports: [
    EyebrowComponent,
    ActionLinkComponent,
    LucideArrowRight,
    LucideBookOpen,
    LucideCheckCircle2,
    LucideGraduationCap,
    LucideTarget,
    LucideUsers,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './academic-levels.component.html',
})
export class AcademicLevelsComponent {
  protected readonly levels: AcademicLevelDetail[] = [
    {
      id: 'early-childhood',
      step: '01',
      title: 'Early Childhood Education',
      grades: 'Nursery, LKG and UKG',
      image: '/assets/images/early-learning.webp',
      alt: 'Teacher guiding young learners in early childhood classroom',
      shortDescription:
        'Our early childhood program provides a warm, playful and nurturing environment where young learners begin their educational journey. Through interactive activities, storytelling, creative expression and play-based learning, children develop communication, social interaction, confidence and essential early learning skills.',
      highlights: [
        'Play-based learning',
        'Language and communication',
        'Creative activities',
        'Social and emotional development',
      ],
      introduction:
        'Designed for young learners taking their first steps into school life, our Early Childhood program creates a joyful, safe, and welcoming classroom where curiosity is encouraged every day.',
      objectives: [
        'Build comfort, curiosity, and positive routines in a school setting',
        'Develop early listening, speaking, and pre-reading skills',
        'Strengthen fine and gross motor coordination through hands-on play',
      ],
      teachingApproach:
        'Play-based, activity-centered guidance with storytelling, songs, guided exploration, and caring individual attention.',
      learningAreas: [
        'Early language & phonics',
        'Pre-math & number sense',
        'Art, music & movement',
        'Social habits & motor skills',
      ],
      studentActivities:
        'Story circles, drawing and painting, building blocks, group games, and guided outdoor play.',
      learningOutcomes:
        'Children develop confidence, friendly social skills, curiosity, and readiness for primary school learning.',
    },
    {
      id: 'primary',
      step: '02',
      title: 'Primary Level',
      grades: 'Grades 1–5',
      image: '/assets/images/classroom.webp',
      alt: 'Primary students learning together in classroom',
      shortDescription:
        'Our primary education program focuses on developing essential academic skills and a genuine interest in learning. Students strengthen their understanding of core subjects while engaging in creative activities, classroom discussions, practical learning and collaborative experiences.',
      highlights: [
        'Literacy and numeracy development',
        'Core subject learning',
        'Creative and practical activities',
        'Confidence and learning habits',
      ],
      introduction:
        'The Primary Level builds strong academic foundations while keeping learning interactive and enjoyable so students develop steady study habits and curiosity.',
      objectives: [
        'Strengthen reading comprehension, writing, and numeracy skills',
        'Encourage curiosity, questioning, and clear expression in class',
        'Foster teamwork, discipline, and positive everyday learning habits',
      ],
      teachingApproach:
        'Structured classroom instruction combined with interactive discussions, visual aids, and hands-on activities.',
      learningAreas: [
        'English & Nepali languages',
        'Mathematics & logical thinking',
        'Science & our surroundings',
        'Social studies, arts & physical education',
      ],
      studentActivities:
        'Classroom presentations, creative writing, group projects, drawing, and outdoor games.',
      learningOutcomes:
        'Students gain solid literacy and numeracy foundations, active classroom confidence, and a love for learning.',
    },
    {
      id: 'lower-secondary',
      step: '03',
      title: 'Lower Secondary Level',
      grades: 'Grades 6–8',
      image: '/assets/images/learning-together.webp',
      alt: 'Students collaborating on a practical classroom project',
      shortDescription:
        'At the lower secondary level, students explore subjects in greater depth and develop the ability to think independently, analyze information and solve problems. We encourage active participation, teamwork, practical understanding and responsible learning habits to support their academic and personal growth.',
      highlights: [
        'Deeper subject understanding',
        'Critical and analytical thinking',
        'Project-based and collaborative learning',
        'Personal responsibility and leadership',
      ],
      introduction:
        'As learners transition into upper basic grades, our Lower Secondary program guides them toward deeper conceptual understanding, independent thinking, and teamwork.',
      objectives: [
        'Deepen understanding across core academic subjects',
        'Develop analytical reasoning, problem-solving, and research habits',
        'Build personal responsibility, teamwork, and student leadership',
      ],
      teachingApproach:
        'Concept-focused lessons paired with project-based tasks, practical demonstrations, and collaborative group work.',
      learningAreas: [
        'Languages & communication',
        'Mathematics & problem solving',
        'Science & practical inquiry',
        'Social studies, computer & co-curricular learning',
      ],
      studentActivities:
        'Model making, group projects, classroom discussions, sports, and club activities.',
      learningOutcomes:
        'Students become more independent, analytical learners prepared for the academic rigor of secondary school.',
    },
    {
      id: 'secondary',
      step: '04',
      title: 'Secondary Level',
      grades: 'Grades 9–10',
      image: '/assets/images/outdoor.webp',
      alt: 'Secondary students engaged in practical learning',
      shortDescription:
        'Our secondary education program helps students strengthen their academic knowledge, develop effective study habits and prepare for the Secondary Education Examination (SEE). With structured instruction, regular assessments, guidance and practical learning, students are encouraged to achieve their potential and approach their future with confidence.',
      highlights: [
        'SEE-focused academic preparation',
        'Subject-specific learning',
        'Regular assessment and feedback',
        'Academic guidance and study skills',
      ],
      introduction:
        'Our Secondary Level supports students in Grades 9 and 10 through focused subject learning, disciplined study routines, and constructive guidance toward the Secondary Education Examination (SEE).',
      objectives: [
        'Strengthen subject-specific mastery and exam readiness',
        'Develop effective time management, revision, and study skills',
        'Provide regular assessment feedback and academic mentoring',
      ],
      teachingApproach:
        'Structured subject teaching, practical application, regular practice assessments, and supportive teacher feedback.',
      learningAreas: [
        'Compulsory & optional secondary subjects',
        'Mathematics & science practicals',
        'Language proficiency & writing skills',
        'SEE preparation & guided revision',
      ],
      studentActivities:
        'Practical lab and project work, academic revision sessions, leadership roles, and school events.',
      learningOutcomes:
        'Students build strong subject competence, exam confidence, and readiness for higher secondary education.',
      highlight: true,
    },
  ];

  protected scrollToSection(id: string): void {
    if (typeof document === 'undefined') return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
