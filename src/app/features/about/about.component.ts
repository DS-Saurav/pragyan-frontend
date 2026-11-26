import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideArrowDown,
  LucideArrowRight,
  LucideAward,
  LucideBookOpen,
  LucideCheckCircle2,
  LucideCompass,
  LucideEye,
  LucideGraduationCap,
  LucideHeartHandshake,
  LucideLightbulb,
  LucideMapPin,
  LucidePalette,
  LucideShieldCheck,
  LucideSparkles,
  LucideTarget,
  LucideUsers,
  LucideWrench,
} from '@lucide/angular';
import { EyebrowComponent } from '../../shared/components/eyebrow/eyebrow.component';

interface IconCardItem {
  title: string;
  description?: string;
  icon: Type<unknown>;
}

interface JourneyStep {
  step: string;
  stage: string;
  subtitle: string;
  icon: Type<unknown>;
  highlight?: boolean;
}

interface EnvironmentPhoto {
  src: string;
  alt: string;
  caption: string;
  spanClass: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    RouterLink,
    NgComponentOutlet,
    EyebrowComponent,
    LucideArrowDown,
    LucideArrowRight,
    LucideEye,
    LucideMapPin,
    LucideTarget,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
})
export class AboutComponent {
  protected readonly journeySteps: JourneyStep[] = [
    {
      step: '01',
      stage: 'EARLY CHILDHOOD',
      subtitle: 'Foundational curiosity, play-based discovery, and joyful early habits.',
      icon: LucideSparkles,
    },
    {
      step: '02',
      stage: 'BASIC LEVEL',
      subtitle: 'Building strong literacy, numeracy, creativity, and collaborative skills.',
      icon: LucideBookOpen,
    },
    {
      step: '03',
      stage: 'SECONDARY LEVEL',
      subtitle: 'Deepening analytical thinking, practical inquiry, and personal responsibility.',
      icon: LucideCompass,
    },
    {
      step: '04',
      stage: 'GRADE 10',
      subtitle: 'Preparing confident, capable graduates ready for their next chapter.',
      icon: LucideGraduationCap,
      highlight: true,
    },
  ];

  protected readonly approachHighlights: IconCardItem[] = [
    { title: 'Interactive Learning', icon: LucideUsers },
    { title: 'Creativity and Exploration', icon: LucidePalette },
    { title: 'Student-Centered Education', icon: LucideHeartHandshake },
    { title: 'Practical Learning', icon: LucideWrench },
    { title: 'Confidence Building', icon: LucideCheckCircle2 },
    { title: 'Lifelong Learning', icon: LucideLightbulb },
  ];

  protected readonly coreValues: IconCardItem[] = [
    {
      title: 'Curiosity & Creativity',
      description: 'Encouraging students to explore, question, imagine and discover new possibilities.',
      icon: LucideLightbulb,
    },
    {
      title: 'Respect & Empathy',
      description: 'Developing kindness, respect, cooperation and understanding toward others.',
      icon: LucideHeartHandshake,
    },
    {
      title: 'Discipline & Responsibility',
      description: 'Building good habits, self-discipline, honesty, independence and responsibility.',
      icon: LucideShieldCheck,
    },
    {
      title: 'Growth & Excellence',
      description: 'Helping every student develop their abilities and strive for continuous improvement.',
      icon: LucideAward,
    },
    {
      title: 'Collaboration',
      description: 'Promoting teamwork, sharing ideas, mutual learning and a sense of belonging.',
      icon: LucideUsers,
    },
    {
      title: 'Holistic Development',
      description: 'Supporting academic, physical, emotional, social and creative growth.',
      icon: LucideSparkles,
    },
  ];

  protected readonly environmentPhotos: EnvironmentPhoto[] = [
    {
      src: '/assets/images/classroom.webp',
      alt: 'Students learning together at a classroom desk',
      caption: 'Classroom Learning',
      spanClass: 'md:col-span-2 md:row-span-2 min-h-[260px] md:min-h-[400px]',
    },
    {
      src: '/assets/images/art.webp',
      alt: 'Student painting with bright colors during creative arts',
      caption: 'Creative Learning',
      spanClass: 'min-h-[200px]',
    },
    {
      src: '/assets/images/early-learning.webp',
      alt: 'Teacher interacting with young students during hands-on activities',
      caption: 'Guided Exploration',
      spanClass: 'min-h-[200px]',
    },
    {
      src: '/assets/images/sports.webp',
      alt: 'Students participating in outdoor sports activities',
      caption: 'Active Participation',
      spanClass: 'min-h-[200px]',
    },
    {
      src: '/assets/images/outdoor.webp',
      alt: 'Students exploring nature together outdoors',
      caption: 'Learning Together',
      spanClass: 'min-h-[200px]',
    },
  ];

  protected scrollToStory(): void {
    if (typeof document === 'undefined') return;
    document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
