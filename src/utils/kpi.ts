import { Agent, Overrides, KPIRationaleItem } from '../types/dashboard';

export function calculateAgentKPI(agent: Agent, overrides?: Overrides): {
  total: number;
  breakdown: KPIRationaleItem[];
} {
  const o = overrides || {};
  let totalScore = 0;
  const breakdown: KPIRationaleItem[] = [];

  // 1. Quality (20%)
  const rawQual = parseFloat(((agent.qualityPct / 100) * 20).toFixed(2));
  const qualEarned = o.quality ? 20 : rawQual;
  const qualReason = o.quality
    ? 'Metric manually waived. Full score awarded.'
    : `Score is ${agent.qualityPct}% of 20 maximum points.`;
  breakdown.push({
    metric: 'Quality',
    max: 20,
    earned: qualEarned,
    reason: qualReason,
    isWaived: Boolean(o.quality),
  });
  totalScore += qualEarned;

  // 2. Processing (10%)
  breakdown.push({
    metric: 'Processing',
    max: 10,
    earned: 10,
    reason: 'Default full score assigned.',
    isWaived: false,
  });
  totalScore += 10;

  // 3. SLA (10%)
  const slaMins = parseFloat(String(agent.slaDuration || '0').replace(/[^0-9.-]/g, '')) || 0;
  let slaEarned = 0;
  let slaReason = '> 15 mins';
  if (o.sla) {
    slaEarned = 10;
    slaReason = 'Metric manually waived. Full score awarded.';
  } else if (slaMins === 0 || slaMins <= 10) {
    slaEarned = 10;
    slaReason = '<= 10 mins or unlisted';
  } else if (slaMins <= 15) {
    slaEarned = 5;
    slaReason = 'Between 10-15 mins';
  }
  breakdown.push({
    metric: 'SLA',
    max: 10,
    earned: slaEarned,
    reason: slaReason,
    isWaived: Boolean(o.sla),
  });
  totalScore += slaEarned;

  // 4. Occupancy (25%)
  const occP = agent.newPct || 0;
  let occEarned = 0;
  let occReason = '< 85%';
  if (o.occupancy) {
    occEarned = 25;
    occReason = 'Metric manually waived. Full score awarded.';
  } else if (occP >= 125) {
    occEarned = 25;
    occReason = '>= 124.99%';
  } else if (occP >= 115) {
    occEarned = 22;
    occReason = '115 - 124.99%';
  } else if (occP >= 105) {
    occEarned = 18;
    occReason = '105 - 114.99%';
  } else if (occP >= 95) {
    occEarned = 15;
    occReason = '95 - 104.99%';
  } else if (occP >= 85) {
    occEarned = 12;
    occReason = '85 - 94.99%';
  }
  breakdown.push({
    metric: 'Occupancy',
    max: 25,
    earned: occEarned,
    reason: occReason,
    isWaived: Boolean(o.occupancy),
  });
  totalScore += occEarned;

  // 5. Productivity (15%) + Break Penalty
  const meet = agent.meetingPct || 0;
  const brk = agent.breakCount || 0;
  let prodEarned = 0;
  let prodReason = '';
  if (o.productivity) {
    prodEarned = 15;
    prodReason = 'Metric manually waived. Full score awarded.';
  } else {
    if (meet < 20) {
      prodEarned = 15;
      prodReason = 'Meeting < 20%.';
    } else if (meet <= 25) {
      prodEarned = 10;
      prodReason = 'Meeting 20-25%.';
    } else if (meet <= 30) {
      prodEarned = 5;
      prodReason = 'Meeting 25-30%.';
    } else {
      prodEarned = 0;
      prodReason = 'Meeting > 30%.';
    }
    if (brk > 2) {
      prodEarned -= 5;
      prodReason += ` [PENALTY: Break exceeded ${brk} times].`;
    }
  }
  prodEarned = Math.max(0, prodEarned);
  breakdown.push({
    metric: 'Productivity',
    max: 15,
    earned: prodEarned,
    reason: prodReason,
    isWaived: Boolean(o.productivity),
  });
  totalScore += prodEarned;

  // 6. Attendance (10%)
  breakdown.push({
    metric: 'Attendance',
    max: 10,
    earned: 10,
    reason: 'Default full score assigned.',
    isWaived: false,
  });
  totalScore += 10;

  // 7. Adherence (10%)
  const late = agent.latenessSum || 0;
  const sfL = agent.sfLateness || 0;
  let adEarned = 10;
  let adReason = 'No extreme lateness detected.';
  if (o.adherence) {
    adEarned = 10;
    adReason = 'Metric manually waived. Full score awarded.';
  } else if (late > 22 || sfL > 60) {
    adEarned = 5;
    adReason = 'Late from Fingerprint > 22m OR Salesforce > 60m.';
  }
  breakdown.push({
    metric: 'Adherence',
    max: 10,
    earned: adEarned,
    reason: adReason,
    isWaived: Boolean(o.adherence),
  });
  totalScore += adEarned;

  return {
    total: Math.round(totalScore),
    breakdown,
  };
}

// Creative Shift Time Color Hashing
export function getShiftColorClass(shiftTime: string): string {
  const colors = [
    'text-blue-600 bg-blue-500/10 dark:text-blue-300 dark:bg-blue-500/20',
    'text-teal-600 bg-teal-500/10 dark:text-teal-300 dark:bg-teal-500/20',
    'text-fuchsia-600 bg-fuchsia-500/10 dark:text-fuchsia-300 dark:bg-fuchsia-500/20',
    'text-sky-600 bg-sky-500/10 dark:text-sky-300 dark:bg-sky-500/20',
    'text-indigo-600 bg-indigo-500/10 dark:text-indigo-300 dark:bg-indigo-500/20',
    'text-emerald-600 bg-emerald-500/10 dark:text-emerald-300 dark:bg-emerald-500/20',
    'text-purple-600 bg-purple-500/10 dark:text-purple-300 dark:bg-purple-500/20',
    'text-rose-600 bg-rose-500/10 dark:text-rose-300 dark:bg-rose-500/20',
    'text-amber-600 bg-amber-500/10 dark:text-amber-300 dark:bg-amber-500/20',
    'text-cyan-600 bg-cyan-500/10 dark:text-cyan-300 dark:bg-cyan-500/20',
  ];
  let hash = 0;
  for (let i = 0; i < shiftTime.length; i++) {
    hash = shiftTime.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function getFirstAndLastName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length <= 1) return fullName;
  return parts[0] + ' ' + parts[parts.length - 1];
}
