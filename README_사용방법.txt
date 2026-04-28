# HADES STOCK PRO V5 API/Auth/Pay Ready

## V5 목적
V4 운영판을 실제 서비스화하기 직전 단계로 확장한 버전입니다.

## 포함 기능
- FREE / PRO / VIP 등급 테스트
- 데모 로그인
- 결제 상품 화면
- 추천종목 등급별 잠금
- 실제 API 연결 준비
- 관리자 추천종목 입력
- 모바일 PWA 구조
- Vercel 배포 준비
- 환경변수 예시
- API 계약서 포함

## 실행 방법
npm install
npm run dev

접속:
http://localhost:5173

## 등급 테스트
- free@hades.local 입력: FREE
- pro@hades.local 입력: PRO
- vip@hades.local 입력: VIP

## Vercel 환경변수
Vercel > Project > Settings > Environment Variables에서 아래를 추가합니다.

VITE_API_BASE_URL=https://your-api-server.example.com

현재 API가 없으면 자동으로 데모 데이터가 표시됩니다.

## 다음 V6 목표
- Supabase/Firebase 로그인
- DB 저장형 관리자 화면
- 실제 결제 연결
- 추천종목 API 서버
- 이용자별 권한검사
