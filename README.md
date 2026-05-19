# AR Music Poster Web : Posterify

프로젝트명 : Posterify
포스터 또는 앨범 커버를 모바일 카메라로 스캔하면 연결된 Spotify 플레이리스트를 실행하는 WebAR 기반 프로젝트.

---

# Project Overview

본 프로젝트는 모바일 웹 환경에서 동작하는 이미지 인식 기반 음악 연결 서비스이다.

사용자는 QR 코드를 통해 웹사이트에 접속한 뒤, 특정 포스터 또는 앨범 커버를 스캔하여 해당 이미지와 연결된 Spotify 플레이리스트를 열 수 있다.

관리자는 별도의 관리자 페이지에서 포스터 이미지와 Spotify 링크를 등록/수정/삭제할 수 있으며, 공개/비공개 설정도 가능하다.

본 프로젝트는 상업적 목적이 아닌 개인 취미 및 학습(웹서비스, 바이브코딩) 목적 프로젝트이다.

---

# User Types

## User

사용자 기능:
- QR 코드 스캔
- 웹사이트 접속
- 포스터 스캔
- Spotify 플레이리스트 열람

특징:
- 모바일 환경 전용
- 로그인 불필요

---

## Admin

관리자 기능:
- 포스터 등록
- 포스터 수정
- 포스터 삭제
- Spotify 링크 등록
- 공개/비공개 설정

특징:
- 로그인 필요
- 모바일 / PC 환경 지원

---

# Main Flow

## User Flow

1. QR 코드 스캔
2. 웹사이트 접속
3. 메인 페이지 진입
4. `스캔 시작` 버튼 클릭
5. 카메라 권한 허용
6. 포스터 또는 앨범 커버 스캔
7. 이미지 인식
8. Spotify 플레이리스트 연결

---

## Admin Flow

1. 관리자 페이지 접속
2. 로그인
3. 포스터 이미지 업로드
4. Spotify 링크 입력
5. 공개 / 비공개 설정
6. 저장

---

# Main Features

## QR Based Website Entry

QR 코드는 Spotify 링크 연결용이 아닌 웹사이트 진입용으로 사용된다.

---

## Image Recognition

- 포스터 및 앨범 커버 인식
- 이미지 특징점 기반 인식 방식 사용
- 등록된 이미지에 대해서만 동작

---

## Spotify Playlist Connection

이미지 인식 성공 시:
1. DB 조회
2. 공개 여부 확인
3. Spotify 앱 실행 시도
4. 앱 미설치 시 웹 링크 실행

---

## Visibility System

### Public
- 스캔 시 플레이리스트 연결 가능

### Private
- 인식되더라도 아무 반응 없음

---

## Unregistered Poster Handling

등록되지 않은 포스터 스캔 시:
- `등록되지 않은 포스터입니다`
- 다시 스캔 버튼
- 종료 버튼 출력

---

# Platform Scope

## User
- Mobile Web Only

## Admin
- Mobile Web
- PC Web

---

# Data Storage

클라우드 저장 방식 사용.

목적:
- 모바일 / PC 관리자 데이터 동기화
- 중앙 데이터 관리

---

# Data Structure

## Poster Data

| Field | Description |
|---|---|
| poster_id | 포스터 고유 ID |
| poster_name | 포스터 이름 |
| image_url | 업로드 이미지 |
| spotify_url | Spotify 플레이리스트 링크 |
| visibility | 공개 / 비공개 여부 |
| created_at | 생성일 |

---

## Admin Data

| Field | Description |
|---|---|
| admin_id | 관리자 고유 ID |
| login_id | 로그인 ID |
| password | 비밀번호 |

---

# Tech Stack

## Frontend
- React

## WebAR
- MindAR

## Backend
- Firebase

## Database
- Firebase Firestore

## Storage
- Firebase Storage

## Deployment
- Vercel

## Version Control
- GitHub

---

# MVP Scope

## Included
- QR 진입
- 메인 페이지
- 스캔 기능
- 이미지 인식
- Spotify 링크 실행
- 관리자 로그인
- 포스터 등록/수정/삭제
- 공개/비공개 설정
- 등록되지 않은 포스터 안내

## Excluded
- 사용자 계정
- SNS 기능
- 추천 시스템
- 통계 기능
- 좋아요 기능

---

# Development Steps

## Step 1
- 프로젝트 구조 설계
- Firebase 연동

## Step 2
- 관리자 인증 구현
- 관리자 페이지 구현

## Step 3
- 포스터 업로드 기능 구현

## Step 4
- 모바일 카메라 기능 구현

## Step 5
- 이미지 인식 기능 구현

## Step 6
- Spotify 연결 구현

## Step 7
- 예외 처리 및 UI 정리

---

# Expected Issues

## Camera Permission

문제:
- 모바일 브라우저별 권한 처리 차이 존재

대응:
- HTTPS 환경 적용
- 브라우저 테스트 진행

---

## Image Recognition Accuracy

문제:
- 특징점 부족 시 인식 실패 가능

대응:
- 특징점이 풍부한 포스터 사용
- 초기 등록 수 제한

---

## Lighting Environment

문제:
- 조명 환경에 따라 인식률 저하 가능

대응:
- 다양한 환경 테스트 진행

---

# Current Project Scope

현재 프로젝트 범위:
- 모바일 웹 기반 사용자 시스템
- 모바일 / PC 기반 관리자 시스템
- QR 기반 웹사이트 진입
- 이미지 인식 기반 포스터 식별
- Spotify 플레이리스트 연결
- 클라우드 기반 데이터 저장
- 최대 10개 이하 포스터 운영 기준 MVP 구현

---