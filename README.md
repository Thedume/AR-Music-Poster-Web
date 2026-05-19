# Posterify

포스터 또는 앨범 커버를 모바일 카메라로 스캔하면 연결된 Spotify 플레이리스트를 열어주는 WebAR 기반 프로젝트입니다.

## 배포 주소

https://ar-music-poster-web.vercel.app/ 

---

## 프로젝트 개요

Posterify는 실제 포스터 또는 앨범 커버를 모바일 카메라로 스캔하면,
연결된 Spotify 플레이리스트를 열어주는 WebAR 기반 프로젝트입니다.

QR 코드 기반 연결 방식이 아닌,
이미지 자체를 인식하여 음악 콘텐츠와 연결하는 경험을 목표로 제작했습니다.

---

## 문제 정의

일반적인 포스터 기반 음악 연결 서비스는 대부분 QR 코드를 사용합니다.

하지만 QR 방식은:

- 디자인 몰입감을 해칠 수 있고
- 포스터 자체를 인식 대상으로 사용하지 못하며
- 동일 공간 내 여러 포스터를 자연스럽게 구분하기 어렵습니다.

Posterify는 이미지 인식 기반 WebAR 구조를 통해
포스터 자체를 인터랙션 요소로 활용하는 방식을 목표로 했습니다.

---

## 주요 기능

- 모바일 웹 기반 포스터 스캔
- MindAR 기반 이미지 인식
- Spotify 플레이리스트 연결
- Firebase 이메일/비밀번호 로그인
- 관리자 페이지 제공
- 포스터 등록/수정/삭제
- 공개/비공개 설정
- targetIndex 기반 이미지 매칭
- 중복 스캔 방지
- 모바일 환경 최적화

---

## 서비스 흐름

### 사용자 흐름

```txt
메인 페이지 접속
→ 스캔 시작
→ 포스터 인식
→ Spotify 플레이리스트 연결
```

### 관리자 흐름

```txt
로그인
→ 포스터 등록
→ 이미지 URL 입력
→ Spotify 링크 입력
→ targetIndex 설정
→ 공개 여부 설정
→ 저장
```

---

## 시스템 구조

```txt
React (Frontend)
│
├── Firebase Authentication
├── Firebase Firestore
│
└── MindAR + Three.js
        │
        └── targets.mind 기반 이미지 인식
```

---

## 기술 스택

- React
- Vite
- React Router DOM
- Firebase Authentication
- Firebase Firestore
- MindAR
- Three.js
- Vercel

---

## 기술 선택 이유

### React + Vite

빠른 개발 속도와 모바일 웹 기반 UI 구성을 위해 선택했습니다.

### Firebase

별도 서버 구축 없이:

- 로그인
- 데이터 저장
- 관리자 인증

구조를 빠르게 구현하기 위해 사용했습니다.

### MindAR

앱 설치 없이 모바일 브라우저에서 WebAR 이미지 인식을 구현하기 위해 사용했습니다.

### Vercel

React/Vite 프로젝트와 GitHub 연동 배포가 간단하고,
HTTPS 환경을 기본 제공하기 때문에 선택했습니다.

---

## 핵심 구현 포인트

- 모바일 WebAR 이미지 인식 구현
- MindAR 기반 targetIndex 매칭 구조
- Firebase 기반 관리자 CRUD
- 공개/비공개 포스터 관리
- 중복 스캔 방지 로직
- 모바일 환경 최적화
- 실제 HTTPS 배포 환경 동작 확인

---

## 프로젝트 구조

```txt
src
├── components
├── firebase
├── pages
├── assets
└── App.jsx

public
└── mind
    └── targets.mind
```

---

## 실행 방법

### 1. 프로젝트 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 빌드

```bash
npm run build
```

### 4. Preview 실행

```bash
npm run preview
```

---

## 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성합니다.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

`.env` 파일은 GitHub에 업로드하지 않습니다.

GitHub에는 `.env.example`만 포함합니다.

---

## Firebase 설정

### Authentication

Firebase Console에서:

```txt
Authentication
→ Sign-in method
→ Email/Password 활성화
```

### Firestore

사용 컬렉션:

```txt
posters
```

문서 구조:

```js
{
  title: string,
  artist: string,
  spotifyUrl: string,
  imageUrl: string,
  targetIndex: number,
  isPublic: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Firestore Rules (개발용)

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /posters/{posterId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }

  }
}
```

---

## MindAR 설정

MindAR는 등록된 이미지를 즉시 URL로 인식하는 구조가 아니라,
사전에 컴파일된 `.mind` 파일을 사용합니다.

파일 위치:

```txt
public/mind/targets.mind
```

---

## targetIndex 관리 규칙

MindAR 컴파일 시 이미지 순서와
Firestore의 `targetIndex` 값은 반드시 일치해야 합니다.

예시:

```txt
targets.mind 컴파일 순서

1번째 이미지 → targetIndex 0
2번째 이미지 → targetIndex 1
3번째 이미지 → targetIndex 2
```

Firestore 데이터도 동일하게 설정해야 합니다.

```txt
새벽 감성 포스터 → targetIndex 0
여름 드라이브 포스터 → targetIndex 1
밤 산책 포스터 → targetIndex 2
```

---

## 주요 라우트

```txt
/                       메인 페이지
/scan                   포스터 스캔 페이지
/login                  관리자 로그인
/admin                  관리자 대시보드
/admin/posters/new      포스터 등록
/admin/posters/:id/edit 포스터 수정
```

---

## 관리자 기능

- 로그인
- 포스터 등록
- 포스터 수정
- 포스터 삭제
- 공개/비공개 설정
- targetIndex 검증
- targetIndex 중복 방지

---

## 사용자 기능

- 모바일 카메라 스캔
- 포스터 이미지 인식
- Spotify 플레이리스트 연결
- 인식 성공 모달
- 재스캔 기능
- 중복 인식 방지

---

## 트러블슈팅

### canvas 패키지 설치 오류

MindAR 설치 과정에서 `canvas` 패키지가
Node.js 최신 버전 환경에서 빌드 실패 문제를 발생시켰습니다.

#### 해결

- Node.js 20 LTS 사용
- package.json에 engines.node 지정

```json
"engines": {
  "node": "20.x"
}
```

---

### Firestore 복합 인덱스 오류

`where + orderBy` 조합 사용 시
Firestore 인덱스 오류가 발생했습니다.

#### 해결

- 클라이언트 정렬 방식으로 변경
- targetIndex 기준 sort 적용

---

### MindAR 중복 인식 문제

동일 포스터를 계속 비출 경우
모달이 반복 생성되는 문제가 발생했습니다.

#### 해결

- scanLockedRef 기반 중복 인식 방지
- 재스캔 시에만 lock 해제

---

### Vercel 배포 실패

Vercel이 Node 24 환경으로 빌드하면서
canvas 패키지 빌드 오류가 발생했습니다.

#### 해결

package.json에 Node 버전 명시:

```json
"engines": {
  "node": "20.x"
}
```

---

## 배포

### Vercel 배포

Build Command:

```bash
npm run build
```

Output Directory:

```txt
dist
```

환경변수 등록:

```txt
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

---

## 배포 전 체크리스트

- `.env`가 GitHub에 업로드되지 않았는지 확인
- `.env.example` 존재 여부 확인
- `targets.mind` 존재 여부 확인
- Firebase Authentication 활성화 확인
- Firestore Rules 확인
- 모바일 카메라 권한 확인
- 실제 모바일 환경 테스트 완료

---

## 향후 개선 방향

- Spotify API 연동
- 관리자 targetIndex 자동화
- PWA 적용
- 이미지 업로드 기능 복구
- 관리자 Role 기반 접근 제어
- 포스터 인식 시 AR 애니메이션 추가
- 포스터별 동적 효과 추가

---

## 테스트 환경

### Desktop

- Windows 11
- Chrome

### Mobile

- Android Chrome
- HTTPS 환경 테스트 완료

---

## 라이선스

개인 학습 및 프로젝트 용도로 제작되었습니다.