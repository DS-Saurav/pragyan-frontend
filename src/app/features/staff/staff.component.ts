import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { EyebrowComponent } from '../../shared/components/eyebrow/eyebrow.component';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { PageIntroComponent } from '../../shared/components/page-intro/page-intro.component';

interface StaffMember {
  name: string;
  role: string;
  department: string;
  grades: string;
  bio: string;
  image: string;
  alt: string;
}

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [PageIntroComponent, EyebrowComponent, FiltersComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './staff.component.html',
})
export class StaffComponent {
  protected readonly department = signal('All');

  protected readonly staff: StaffMember[] = [
    {
      name: 'Sita Sharma',
      role: 'Principal & Academic Lead',
      department: 'Leadership',
      grades: 'Nursery – Grade 8',
      bio: 'Guides curriculum planning, teacher mentoring, and a supportive, child-friendly school culture.',
      image: '/images/teacher-1.jpg',
      alt: 'Portrait of a Nepali female school principal smiling in a sunlit classroom',
    },
    {
      name: 'Ramesh Adhikari',
      role: 'Mathematics & Science Teacher',
      department: 'Primary & Middle',
      grades: 'Grades 4 – 8',
      bio: 'Encourages practical inquiry, problem-solving, and hands-on experiments in everyday learning.',
      image: '/images/teacher-2.jpg',
      alt: 'Portrait of a Nepali male teacher smiling in a bright classroom with bookshelves',
    },
    {
      name: 'Anita Gurung',
      role: 'Early Childhood Educator',
      department: 'Early Childhood',
      grades: 'Nursery – UKG',
      bio: 'Creates warm, play-based routines where young learners explore, ask questions, and build confidence.',
      image: '/images/teacher-3.jpg',
      alt: 'Portrait of a Nepali female early childhood teacher in a bright Montessori classroom',
    },
    {
      name: 'Bikash Thapa',
      role: 'Arts & Physical Education',
      department: 'Arts & Sports',
      grades: 'Grades 1 – 8',
      bio: 'Leads creative arts, teamwork, and outdoor games that help children stay active and expressive.',
      image: '/images/teacher-4.jpg',
      alt: 'Portrait of a Nepali male arts and sports teacher standing in a sunny school courtyard',
    },
  ];

  protected readonly departments = computed(() => [
    ...new Set(this.staff.map((member) => member.department)),
  ]);

  protected readonly visibleStaff = computed(() => {
    const active = this.department();
    return active === 'All'
      ? this.staff
      : this.staff.filter((member) => member.department === active);
  });
}
