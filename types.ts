export interface CreatorStats {
  followers: number;
  engagementRate: number;
  platform: string;
  handle: string;
}

export interface GhostEvaluation {
  viralityCoefficient: number; // 0-100
  isHighAlpha: boolean;
  reasoning: string;
  decision: 'APPROVE' | 'DENY';
  grantAmount?: number;
}

export interface CreatorProfile {
  id: string;
  name: string;
  handle: string;
  platform: string;
  status: 'PENDING' | 'ANALYZING' | 'OFFER_MADE' | 'SIGNED' | 'REJECTED';
  stats: CreatorStats;
  evaluation?: GhostEvaluation;
}

export enum AppView {
  LANDING = 'LANDING',
  APPLY = 'APPLY', // We keep the enum name but the UI will be "Scanner"
  DASHBOARD = 'DASHBOARD',
  CONTRACT = 'CONTRACT'
}
