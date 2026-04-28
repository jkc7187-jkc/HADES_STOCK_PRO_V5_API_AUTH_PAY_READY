
import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AlertTriangle, Crown, Database, KeyRound, Lock, LogIn, Smartphone, TrendingUp, Unlock, Wallet } from 'lucide-react'
import { DEFAULT_PICKS } from './defaultData'
import { fetchPicks, mockLogin } from './apiClient'
import './style.css'

const LEVEL = { FREE: 1, PRO: 2, VIP: 3 }

function canView(userPlan, itemPlan) {
  return LEVEL[userPlan] >= LEVEL[itemPlan]
}

function App() {
  const [user, setUser] = useState({ email: 'free@hades.local', name: 'FREE 사용자', plan: 'FREE' })
  const [email, setEmail] = useState('pro@hades.local')
  const [picks, setPicks] = useState(DEFAULT_PICKS)
  const [apiStatus, setApiStatus] = useState('DEMO')
  const [adminJson, setAdminJson] = useState(JSON.stringify(DEFAULT_PICKS, null, 2))

  useEffect(() => {
    fetchPicks().then(data => {
      if (data && Array.isArray(data.picks)) {
        setPicks(data.picks)
        setApiStatus('LIVE API')
      }
    })
  }, [])

  const revenue = useMemo(() => {
    const pro = 100, vip = 20
    return pro * 29000 + vip * 99000
  }, [])

  async function login() {
    const u = await mockLogin(email)
    setUser(u)
  }

  function applyAdmin() {
    try {
      const parsed = JSON.parse(adminJson)
      if (!Array.isArray(parsed)) throw new Error('배열이 아닙니다.')
      setPicks(parsed)
      alert('관리자 입력값이 화면에 반영되었습니다. V6에서 DB 저장형으로 확장합니다.')
    } catch (e) {
      alert('JSON 오류: ' + e.message)
    }
  }

  return (
    <main className="app">
      <section className="hero">
        <div>
          <p className="eyebrow">HADES ENGINEERING · STOCK BUSINESS UNIT</p>
          <h1>HADES STOCK PRO V5</h1>
          <p className="subtitle">실전 돈버는 완성판 진입 단계 · API/Auth/Payment Ready</p>
        </div>
        <div className="badge"><Crown size={18}/> {apiStatus}</div>
      </section>

      <section className="grid">
        <div className="card">
          <KeyRound />
          <h3>로그인/등급</h3>
          <p>{user.name} · {user.plan}</p>
          <div className="loginRow">
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="pro@hades.local" />
            <button onClick={login}><LogIn size={15}/> 로그인</button>
          </div>
          <small>이메일에 pro 또는 vip를 넣으면 등급 테스트 가능</small>
        </div>
        <div className="card">
          <Database />
          <h3>추천 API</h3>
          <p>{apiStatus === 'LIVE API' ? '실제 API 연결됨' : '데모 데이터 사용 중'}</p>
          <small>VITE_API_BASE_URL 설정 시 실제 API 호출</small>
        </div>
        <div className="card">
          <Wallet />
          <h3>목표 월매출</h3>
          <p className="money">{revenue.toLocaleString()}원</p>
          <small>PRO 100명 + VIP 20명 기준</small>
        </div>
      </section>

      <section className="panel">
        <h2>결제 준비 화면</h2>
        <p className="muted">V5는 결제 버튼과 상품구조를 포함합니다. 실제 결제승인은 V6에서 Stripe/Toss/PortOne 중 하나로 연결합니다.</p>
        <div className="pricing">
          <div className="price">
            <b>FREE</b><span>0원</span><small>1종목 공개</small>
            <button onClick={() => setUser({email:'free@hades.local', name:'FREE 사용자', plan:'FREE'})}>FREE 체험</button>
          </div>
          <div className="price highlight">
            <b>PRO</b><span>월 29,000원</span><small>TOP8 + 전략 공개</small>
            <button onClick={() => setUser({email:'pro@hades.local', name:'PRO 사용자', plan:'PRO'})}>PRO 결제 테스트</button>
          </div>
          <div className="price vip">
            <b>VIP</b><span>월 99,000원</span><small>TOP10 + 집중종목</small>
            <button onClick={() => setUser({email:'vip@hades.local', name:'VIP 사용자', plan:'VIP'})}>VIP 결제 테스트</button>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="head">
          <div>
            <h2>오늘의 한국주식 추천</h2>
            <p className="muted">등급별 잠금 구조가 적용된 실전 운영 화면입니다.</p>
          </div>
          <div className="userBadge"><Unlock size={15}/> 현재 등급: {user.plan}</div>
        </div>
        <div className="list">
          {picks.map((p, idx) => {
            const locked = !canView(user.plan, p.plan || 'PRO')
            return (
              <article className={locked ? 'pick locked' : 'pick'} key={`${p.code}-${idx}`}>
                <div className="rank">{p.rank}</div>
                <div className="body">
                  <div className="top">
                    <h3>{p.name} <span>{p.code}</span></h3>
                    <strong>{p.score}점</strong>
                  </div>
                  {locked ? (
                    <p className="lockedText"><Lock size={15}/> {p.plan} 이상 공개 종목입니다.</p>
                  ) : (
                    <div className="meta">
                      <span>{p.sector}</span><span>{p.type}</span><span><TrendingUp size={14}/> {p.style}</span>
                      <span>매수: {p.entry}</span><span>목표: {p.target}</span><span>손절: {p.stop}</span>
                      <p>{p.memo}</p>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="panel">
        <h2>관리자 입력</h2>
        <p className="muted">V5는 관리자 입력 구조를 유지합니다. V6에서는 Supabase/Firebase DB 저장형으로 변경합니다.</p>
        <textarea value={adminJson} onChange={e => setAdminJson(e.target.value)} />
        <button className="primary" onClick={applyAdmin}>추천종목 적용</button>
      </section>

      <section className="notice">
        <AlertTriangle size={18}/>
        <p>본 서비스는 투자 정보 제공 및 학습용입니다. 수익 보장 표현을 금지하며, 실제 투자 판단과 책임은 이용자 본인에게 있습니다.</p>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
