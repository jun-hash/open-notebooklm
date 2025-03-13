# Nari - Voice Generation App Implementation

## 1. 기술 스택

### Frontend
- Next.js 15.2.2 with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React Icons

### Backend
- Supabase (PostgreSQL 데이터베이스)
- Next.js API Routes
- Row-Level Security (RLS) 정책

## 2. 구현된 기능

### 2.1 기본 레이아웃
- 다크 테마 기반의 모던한 UI
- 왼쪽 사이드바 (Nari 브랜딩)
- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 최대 너비 제한 (max-w-3xl)
- 컨텐츠 영역 수직/수평 중앙 정렬
- 시각적 균형을 위한 미세 조정 (-mt-8)

### 2.2 탭 인터페이스
- Generate: 음성 생성 탭
- History: 생성 기록 탭
- Voices: 음성 관리 탭
- 각 탭에 적절한 아이콘 적용
- 활성 탭 시각적 표시 (배경색 변경)

### 2.3 텍스트 입력 기능
- 멀티라인 텍스트 입력
- 500자 제한
- 자동 리사이징 비활성화
- 투명 배경과 테두리 없는 깔끔한 디자인
- 안내 텍스트 포함

### 2.4 음성 생성 옵션
- 기본 음성 선택 (American Female, American Male)
- 언어 선택 (English US)
- Clone Voice 기능 (준비중)
- 오디오 파일 업로드 (준비중)
- 문자 수 표시
- Generate 버튼 (오렌지 계열 강조색)

### 2.5 상태 관리
- 텍스트 입력 상태
- 생성 중 로딩 상태
- 버튼 활성화/비활성화 상태

### 2.6 데이터베이스 구조
- `voices` 테이블: 사용 가능한 음성 목록 저장
- `generated_voices` 테이블: 생성된 음성 정보 저장
- `users` 테이블: 사용자 정보 저장

### 2.7 API 엔드포인트
- `/api/generate-voice` (POST): 텍스트로부터 음성 생성
- `/api/generated-voices` (GET): 생성된 음성 목록 조회
- `/api/generated-voices/[id]` (DELETE): 특정 음성 삭제
- `/api/test-connection` (GET): Supabase 연결 테스트

### 2.8 컴포넌트 구조 개선
- `VoiceGenerator`: 음성 생성 담당 컴포넌트
- `VoiceList`: 생성된 음성 목록 표시 컴포넌트
- `AudioPlayer`: 오디오 재생 컴포넌트
- 타입 안전성 강화 (TypeScript 인터페이스 활용)

## 3. 디자인 시스템

### 3.1 색상
- 배경: #0A0A0A (메인), #111111 (사이드바), #1A1A1A (카드)
- 강조: #D97A4D (Generate 버튼)
- 텍스트: white/90 (주요 텍스트), white/80 (보조 텍스트), white/60 (부가 정보)

### 3.2 컴포넌트
- TextInput: 텍스트 입력 컴포넌트
- GenerateButton: 생성 버튼 컴포넌트
- Tabs: shadcn/ui 탭 컴포넌트 커스터마이징
- AudioPlayer: 오디오 재생 컴포넌트

### 3.3 아이콘
- Mic: 음성 생성/클로닝
- History: 기록
- Volume2: 음성 관리
- Upload: 파일 업로드
- Loader2: 로딩 상태
- Play/Pause: 오디오 재생/일시정지
- Heart: 좋아요
- MessageSquare: 댓글
- Share2: 공유
- Trash2: 삭제

## 4. 백엔드 및 데이터 모델

### 4.1 Supabase 연동
- PostgreSQL 데이터베이스 구조 설계 및 구현
- Row-Level Security (RLS) 정책 구성
- 테이블 간 외래 키 제약 조건 설정
- 사용자 인증 준비 (샘플 사용자 ID 사용 중)

### 4.2 타입 시스템 강화
- Supabase 데이터베이스 타입 정의
- 음성 타입을 enum으로 관리 (VoiceType)
- 타입 안전성 확보 (TypeScript 인터페이스 활용)
- 일관된 오류 처리

### 4.3 API 로직
- 음성 생성 API (텍스트 → 오디오)
- Mock TTS 서비스 구현 (실제 TTS 서비스 연동 준비)
- 생성된 음성 저장 및 관리
- 오류 처리 및 사용자 피드백

## 5. 다음 구현 예정 기능
- 실제 TTS 서비스 연동
- 음성 클로닝 기능
- 파일 업로드 기능
- 사용자 인증 구현
- 공유 기능 구현
- 댓글 기능 구현

## 6. 성능 최적화
- Turbopack 사용으로 빠른 개발 환경
- 클라이언트 컴포넌트 최적화
- 이미지 및 아이콘 최적화 
- 데이터 페칭 최적화 

## 7. 최근 변경사항 (2024-03-19)
- 메인 컨텐츠 영역 레이아웃 개선
  - 컨텐츠를 화면 중앙에 배치하도록 수정
  - 레이아웃 컴포넌트에 flex, items-center, justify-center 적용
  - 시각적 균형을 위한 미세 조정 (-mt-8)
- UI/UX 개선
  - 사용자 경험을 고려한 여백 및 정렬 조정
  - 반응형 디자인 유지 