import { describe, expect, it } from 'vitest';
import { totalMinutes, leaveBalance, initialLeaves, transition, clockText } from './model';
describe('示範工時與假勤狀態',()=>{
 it('累加多段且排除午休',()=>expect(totalMinutes([{start:540,end:720},{start:780,end:1080}],1080)).toBe(480));
 it('未結束區間只計至示範當下',()=>expect(totalMinutes([{start:540,end:720},{start:780,end:null}],895)).toBe(295));
 it('可表示翌日時間但不宣稱實作日期歸屬',()=>{expect(totalMinutes([{start:1320,end:1800}],1800)).toBe(480);expect(clockText(1800)).toBe('翌日 06:00');});
 it('待審特休預留、退回後釋放',()=>{expect(leaveBalance(initialLeaves)).toBe(72);expect(leaveBalance(transition(initialLeaves,'DEMO-001','rejected'))).toBe(80);});
 it('核准不會重複扣款，也不能覆寫已處理狀態',()=>{const approved=transition(initialLeaves,'DEMO-001','approved');expect(leaveBalance(approved)).toBe(72);expect(transition(approved,'DEMO-001','rejected')).toEqual(approved);});
});
