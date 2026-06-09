---
name: seo-check
description: 블로그 기사 HTML의 SEO 요소를 검증한다. 메타 태그, Open Graph, JSON-LD, 제목 계층 구조를 점검. 사용자가 SEO 검증, 기사 점검을 요청할 때 사용.
---

# seo-check — SEO 검증 스킬

기사 HTML 파일을 받아 4계층 SEO 요소를 점검하고 누락/오류를 보고한다.

## 점검 항목 (4-Layer)

### Layer 1 — Meta
- title 존재, 60자 이내 권장, 핵심 키워드 포함
- meta description 존재, 120~160자, 키워드 포함
- canonical 존재, 절대 URL
- html lang="ko" 설정

### Layer 2 — Open Graph
- og:type = article
- og:title, og:description, og:url, og:site_name 존재
- og:url이 canonical과 일치

### Layer 3 — JSON-LD
- application/ld+json 존재
- @type = Article
- headline, datePublished, author, description 포함
- JSON 파싱 오류 없음

### Layer 4 — Heading Hierarchy
- h1 정확히 1개
- h2 → h3 순서가 건너뛰지 않음
- 빈 제목 태그 없음

## 출력
각 항목을 통과/실패로 표시하고, 실패 항목은 수정 방법을 함께 제시한다. 모두 통과하면 "발행 준비 완료"를 안내한다.

## articles.json 정합성 추가 점검
- 해당 기사가 articles.json에 등록되어 있는가
- path가 실제 파일 위치와 일치하는가
- 날짜 형식이 YYYY-MM-DD인가
