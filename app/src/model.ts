export type Role = 'employee' | 'manager';
export type Leave = { id: string; person: string; kind: string; date: string; hours: number; reason: string; status: 'pending' | 'approved' | 'rejected' | 'withdrawn' };
export type Segment = { start: number; end: number | null };
export const people = [
  { name: '林小禾', job: '專案企劃', department: '營運企劃', kind: '正職', joined: '2024-04-01', initials: '禾' },
  { name: '陳予安', job: '空間營運', department: '空間服務', kind: '正職', joined: '2023-07-10', initials: '安' },
  { name: '黃以晴', job: '活動助理', department: '營運企劃', kind: '兼職', joined: '2025-02-17', initials: '晴' },
  { name: '吳沐恩', job: '場地支援', department: '空間服務', kind: '兼職', joined: '2025-08-01', initials: '恩' },
];
export const initialLeaves: Leave[] = [
  { id: 'DEMO-001', person: '林小禾', kind: '特休', date: '2026-10-27', hours: 8, reason: '個人行程安排（示範）', status: 'pending' },
  { id: 'DEMO-002', person: '黃以晴', kind: '事假', date: '2026-10-28', hours: 4, reason: '家庭事務（示範）', status: 'pending' },
  { id: 'DEMO-003', person: '陳予安', kind: '特休', date: '2026-10-20', hours: 8, reason: '休息充電（示範）', status: 'approved' },
];
export const initialSchedule = ['09:00–18:00', '09:00–18:00', '休息日', '09:00–18:00', '09:00–18:00', '13:00–22:00', '休息日'];
export function totalMinutes(segments: Segment[], now: number) { return segments.reduce((n, s) => n + Math.max(0, (s.end ?? now) - s.start), 0); }
export function clockText(n: number) { return `${n >= 1440 ? '翌日 ' : ''}${String(Math.floor(n / 60) % 24).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`; }
export function duration(n: number) { return `${Math.floor(n / 60)} 小時 ${n % 60} 分`; }
export function leaveBalance(leaves: Leave[]) { return 80 - leaves.filter(l => l.person === '林小禾' && l.kind === '特休' && (l.status === 'pending' || l.status === 'approved')).reduce((n,l) => n+l.hours,0); }
export function transition(leaves: Leave[], id: string, status: Leave['status']) { return leaves.map(l => l.id === id && l.status === 'pending' ? { ...l, status } : l); }
