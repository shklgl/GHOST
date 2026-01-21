export interface CreatorStats {
  followers: number;
  engagementRate: number;
  platform: string;
  handle: string;
}

export interface GhostEvaluation {
  score: number;
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
  APPLY = 'APPLY',
  DASHBOARD = 'DASHBOARD',
  CONTRACT = 'CONTRACT'
}
