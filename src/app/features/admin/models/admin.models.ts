import type { Type } from '@angular/core';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  roleLabel: string;
  avatarUrl: string | null;
}

export interface AdminMenuItem {
  label: string;
  icon: Type<unknown>;
  route: string;
  badgeKey?: 'helpdesk' | 'complaints';
}

export interface AdminMenuSection {
  section: string;
  items: AdminMenuItem[];
}

export type StatTone = 'blue' | 'emerald' | 'sky' | 'amber' | 'rose' | 'indigo' | 'slate';
export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'brand';

export interface DashboardStat {
  label: string;
  value: number | string;
  icon: Type<unknown>;
  tone: StatTone;
}

export type StudentStatus = 'active' | 'inactive' | 'transferred' | 'passed_out' | 'suspended';
export type StudentHouse = 'Red' | 'Blue' | 'Green' | 'Yellow';

export interface AdminStudent {
  id: number;
  admNumber: string;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  dobBs: string;
  languagesSpoken: string;
  address: string;
  classApplied: string;
  rollNo: number;
  academicYear: string;
  status: StudentStatus;
  house: StudentHouse;
  eal: string;
  admissionDate: string;
  previousSchool: string;
  bloodGroup: string;
  emergencyContact: string;
  hobbies: string;
  hasAllergies: boolean;
}

export interface AdminSchoolClass {
  id: number;
  name: string;
  section: 'A' | 'B' | 'C' | 'D';
  academicYear: string;
  room: string;
  capacity: number;
  strength: number;
  classTeacher: string;
  status: 'active' | 'inactive';
}

export type TeacherStatus = 'active' | 'inactive' | 'suspended';

export interface AdminTeacher {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  department: string;
  specialization: string;
  classesCount: number;
  assignmentsCount: number;
  classTeacherOf: string | null;
  status: TeacherStatus;
}

export type PublicationState = 'draft' | 'review' | 'approved' | 'scheduled' | 'published' | 'withdrawn' | 'archived';

export interface AdminNotice {
  id: number;
  title: string;
  slug: string | null;
  content: string;
  date: string;
  audience: 'all' | 'public' | 'teachers' | 'parents' | 'students' | 'staff';
  priority: number | null;
  publicationState: PublicationState;
  revisionNumber: number;
  workflowState: 'draft' | 'review' | 'approved' | 'published';
  isUrgent: boolean;
  publishedAt: string | null;
  scheduledFor: string | null;
  updatedAt: string;
}

export interface AdminNewsStory {
  id: number;
  title: string;
  slug: string | null;
  category: string;
  summary: string;
  bodyMarkdown: string;
  publicationState: PublicationState;
  revisionNumber: number;
  workflowState: 'draft' | 'review' | 'approved' | 'published';
  isFeatured: boolean;
  publishedAt: string | null;
  updatedAt: string;
}

export interface AdminSchoolSettings {
  schoolName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logoUrl: string;
  timeZone: string;
  currencySymbol: string;
  academicYear: string;
  primaryColor: string;
  accentColor: string;
}

export interface FlashMessage {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  text: string;
}
