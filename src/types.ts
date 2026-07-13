/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TabId = 'home' | 'location';

export type Language = 'ko' | 'en' | 'zh';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface PharmacistProfile {
  id: string;
  name: string;
  role: string;
  image: string;
  specialty: string[];
  education: string[];
  greetings: string;
}

export interface FacilityZone {
  id: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
}

export interface DiagnosisQuestion {
  id: number;
  question: string;
  category: 'fatigue' | 'sleep' | 'stress' | 'digestive';
  options: {
    text: string;
    score: number;
  }[];
}
