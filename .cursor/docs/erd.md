# Entity Relationship Diagram (ERD)

## Tables

### 1. generated_voices
음성 생성 기록을 저장하는 테이블

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary Key |
| user_id | uuid | 사용자 ID (옵션) |
| text | text | 생성에 사용된 텍스트 |
| voice | text | 사용된 음성 유형 (예: "British Female") |
| audio_url | text | 생성된 오디오 파일 URL |
| duration | integer | 오디오 길이(초) |
| timestamp | timestamptz | 생성 시간 |
| is_public | boolean | 공개 여부 |
| likes_count | integer | 좋아요 수 |
| comments | text[] | 댓글 (옵션) |

### 2. voices
사용 가능한 음성 목록을 저장하는 테이블

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary Key |
| name | text | 음성 이름 (예: "British Female") |
| description | text | 음성 설명 |
| is_default | boolean | 기본 음성 여부 |
| is_cloned | boolean | 클론된 음성 여부 |
| original_audio_url | text | 원본 오디오 URL (클론된 경우) |
| user_id | uuid | 소유자 ID (클론된 경우) |
| created_at | timestamptz | 생성 시간 |

### 3. users (향후 확장)
사용자 정보를 저장하는 테이블

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary Key |
| email | text | 이메일 |
| created_at | timestamptz | 가입 시간 |

## Relationships

1. `generated_voices.user_id` -> `users.id` (Many-to-One)
2. `generated_voices.voice` -> `voices.name` (Many-to-One)
3. `voices.user_id` -> `users.id` (Many-to-One)

## 초기 데이터

### voices 테이블 초기 데이터
```sql
INSERT INTO voices (id, name, description, is_default, is_cloned, created_at)
VALUES 
  (uuid_generate_v4(), 'British Female', 'British accent female voice', true, false, now()),
  (uuid_generate_v4(), 'American Male', 'American accent male voice', true, false, now()),
  (uuid_generate_v4(), 'American Female', 'American accent female voice', true, false, now());
``` 