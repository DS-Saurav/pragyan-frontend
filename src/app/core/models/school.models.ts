import type { Type } from '@angular/core';

export interface SchoolInfo {
  name: string;
  nepali: string;
  location: string;
  address: string;
  established: string;
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  officeHours: string | null;
  social: { name: string; url: string }[];
  mission: string;
  welcome: string;
  vision: string;
  philosophy: string;
}

export interface AcademicLevel {
  id: string;
  title: string;
  grades: string;
  description: string;
  image: string;
  alt: string;
}

export interface PillarItem {
  title: string;
  icon: Type<unknown>;
  description: string;
}

export interface FacilityItem {
  title: string;
  icon: Type<unknown>;
}

export interface ActivityItem {
  title: string;
  icon: Type<unknown>;
  image?: string;
  description: string;
}

export interface GalleryPhoto {
  src: string;
  title: string;
  category: string;
  alt: string;
}

export type UpdateKind = 'news' | 'events' | 'notices';

export interface UpdateSectionMeta {
  label: string;
  description: string;
}

export interface SchoolUpdate {
  kind: UpdateKind;
  slug: string;
  category: string;
  title: string;
  image: string;
  summary: string;
  body: string;
  date?: { gregorian: string; bikramSambat?: string };
  sample: boolean;
}

export interface QuickLinkItem {
  title: string;
  detail: string;
  to: string;
  icon: Type<unknown>;
}

export interface NavLinkItem {
  to: string;
  title: string;
  children?: { to: string; title: string }[];
}
