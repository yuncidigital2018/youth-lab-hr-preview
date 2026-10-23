// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import App from './App';
afterEach(cleanup);
const nav = async(name:string) => userEvent.click(screen.getAllByRole('button',{name})[0]);
describe('原型操作',()=>{
 it('可取消申請，重新開啟清空內容',async()=>{render(<App/>);await nav('新增請假');await userEvent.type(screen.getByLabelText('請假原因'),'測試');await nav('取消');expect(screen.queryByRole('dialog')).not.toBeInTheDocument();await nav('新增請假');expect(screen.getByLabelText('請假原因')).toHaveValue('');});
 it('送出、主管核准與重複核准保護',async()=>{render(<App/>);await nav('新增請假');await userEvent.type(screen.getByLabelText('請假原因'),'測試行程');await userEvent.dblClick(screen.getByRole('button',{name:'送出申請'}));expect(screen.getAllByText(/2026-10-29 · 測試行程/)).toHaveLength(1);await userEvent.selectOptions(screen.getByLabelText('切換角色'),'manager');await nav('請假與簽核');const row=screen.getByText(/2026-10-29 · 測試行程/).closest('.request')!;await userEvent.click(within(row as HTMLElement).getByRole('button',{name:'核准'}));expect(within(row as HTMLElement).queryByRole('button',{name:'核准'})).not.toBeInTheDocument();expect(within(row as HTMLElement).getAllByText('已核准').length).toBeGreaterThan(0);});
 it('多段打卡休息、恢復與下班都產生狀態',async()=>{render(<App/>);await nav('出勤打卡');await nav('休息開始');expect(screen.getByText('休息中')).toBeInTheDocument();await nav('休息結束');expect(screen.getByText('工作時段 3')).toBeInTheDocument();await nav('下班打卡');expect(screen.getByText('已下班')).toBeInTheDocument();await nav('新增上班段');expect(screen.getByText('工作時段 4')).toBeInTheDocument();});
 it('缺卡可申請補卡，重複入口消失',async()=>{render(<App/>);await nav('出勤打卡');await nav('申請補卡');await userEvent.type(screen.getByLabelText('補卡原因'),'忘記打卡示範');await nav('送出補卡');expect(screen.getByText('補卡待確認')).toBeInTheDocument();expect(screen.queryByRole('button',{name:'申請補卡'})).not.toBeInTheDocument();await userEvent.selectOptions(screen.getByLabelText('出勤狀態篩選'),'issue');expect(screen.getByText('目前沒有未處理的缺卡')).toBeInTheDocument();});
 it('主管修改班別、搜尋空狀態，切換員工隱藏人員頁',async()=>{render(<App/>);await userEvent.selectOptions(screen.getByLabelText('切換角色'),'manager');await nav('團隊班表');await userEvent.click(screen.getAllByRole('button',{name:'調整班別'})[0]);await userEvent.selectOptions(screen.getByLabelText('班別'),'休息日');await nav('儲存班別');expect(screen.queryByRole('dialog')).not.toBeInTheDocument();await nav('人員名單');await userEvent.type(screen.getByLabelText('搜尋人員'),'不存在');expect(screen.getByText('找不到符合的人員')).toBeInTheDocument();await nav('清除搜尋');expect(screen.getByRole('button',{name:/林小禾/})).toBeInTheDocument();await userEvent.selectOptions(screen.getByLabelText('切換角色'),'employee');expect(screen.queryByRole('button',{name:'人員名單'})).not.toBeInTheDocument();});
 it('月曆、未發布班表及未發布薪資可返回',async()=>{render(<App/>);await nav('我的班表');await nav('月曆');expect(screen.getByText('2026 年 10 月')).toBeInTheDocument();await nav('週班表');await nav('下一週');expect(screen.getByText('下週班表尚未發布')).toBeInTheDocument();await nav('返回本週');await nav('薪資明細');await userEvent.selectOptions(screen.getByLabelText('薪資月份'),'2026-10');expect(screen.getByText('本月薪資尚未發布')).toBeInTheDocument();});
});
