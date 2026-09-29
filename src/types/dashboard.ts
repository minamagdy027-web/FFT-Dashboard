export interface AgentLeaves {
  casual: number;
  sick: number;
  annual: number;
  ph: number;
  upl: number;
}

export interface Agent {
  name: string;
  tl: string;
  email?: string;
  sfId: string;
  newPct: number; // Occupancy percentage
  newKpiPct?: number;
  qualityPct: number;
  slaDuration: string | number;
  meetingPct: number;
  offBoardPct: number;
  offBoardMins: number | string;
  availablePct: number;
  breakCount: number | string;
  latenessSum: number;
  latenessCount: number;
  sfLateness: number;
  total: number | string;
  totalPoints?: number | string;
  achieved?: number | string;
  needed: number | string;
  support: number | string;
  wkDays: number;
  casesBelow100?: string | number;
  leaves: AgentLeaves;
  // Raw breakdown
  raw_1g?: number | string;
  raw_auto?: number | string;
  raw_checkin?: number | string;
  raw_dmc?: number | string;
  raw_expired?: number | string;
  raw_failed?: number | string;
  raw_manual?: number | string;
  raw_refund?: number | string;
  raw_reissue?: number | string;
  raw_sch?: number | string;
  raw_wa?: number | string;
  avgCases?: number | string;
  calculatedKPI?: number;
}

export interface Overrides {
  quality?: boolean;
  sla?: boolean;
  occupancy?: boolean;
  productivity?: boolean;
  adherence?: boolean;
}

export interface GlobalDashboardData {
  agents: Agent[];
  latenessDate?: string;
  overrides?: Overrides;
}

export interface KPIRationaleItem {
  metric: string;
  max: number;
  earned: number;
  reason: string;
  isWaived: boolean;
}

export type ViewType =
  | 'view-dashboard'
  | 'view-manager'
  | 'view-detail'
  | 'view-policies'
  | 'view-process'
  | 'view-helpers'
  | 'view-cheatsheet'
  | 'view-links'
  | 'view-manual';

export interface KBSubItem {
  title: string;
  content: string;
}

export interface KBCategory {
  cat: string;
  subs: KBSubItem[];
}

export interface GDSItem {
  d: string;
  g?: string;
  a?: string;
}
