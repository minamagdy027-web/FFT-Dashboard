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
  qualityPct: number;
  slaDuration: string | number;
  meetingPct: number;
  offBoardPct: number;
  offBoardMins: number;
  availablePct: number;
  breakCount: number;
  latenessSum: number;
  latenessCount: number;
  sfLateness: number;
  total: number;
  needed: number | string;
  support: number;
  wkDays: number;
  casesBelow100?: string;
  leaves: AgentLeaves;
  // Raw breakdown
  raw_1g?: number;
  raw_auto?: number;
  raw_checkin?: number;
  raw_dmc?: number;
  raw_expired?: number;
  raw_failed?: number;
  raw_manual?: number;
  raw_refund?: number;
  raw_reissue?: number;
  raw_sch?: number;
  raw_wa?: number;
  avgCases?: number;
  calculatedKPI?: number;
}

export interface ScheduleGridRow {
  name: string;
  shifts: string[];
}

export interface ScheduleData {
  dates: string[];
  days: string[];
  grid: ScheduleGridRow[];
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
  schedule: ScheduleData;
  scheduleDate?: string;
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
  | 'view-schedule'
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
