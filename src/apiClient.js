export const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export async function fetchPicks() {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}/picks/today`);
    if (!res.ok) throw new Error(`API 오류: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn('API 연결 실패, 데모 데이터 사용:', error);
    return null;
  }
}

export async function mockLogin(email) {
  const lower = (email || '').toLowerCase();
  if (lower.includes('vip')) return { email, plan: 'VIP', name: 'VIP 사용자' };
  if (lower.includes('pro')) return { email, plan: 'PRO', name: 'PRO 사용자' };
  return { email, plan: 'FREE', name: 'FREE 사용자' };
}
