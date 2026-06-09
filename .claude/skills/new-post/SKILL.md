---
name: new-post
description: 마크다운 원고를 IT Tech Note 블로그의 HTML 기사로 변환하고 articles.json에 등록한다. 사용자가 새 글 작성, 기사 발행, 포스트 생성을 요청할 때 사용.
---

# new-post — 기사 생성 스킬

마크다운 원고(또는 본문 텍스트)를 받아 블로그 기사 HTML을 생성하고, `articles.json`에 메타데이터를 등록한다.

## 입력
- 원고: 마크다운 텍스트 또는 .md 파일 경로
- 카테고리: `engineer`(기술사 토픽) / `database`(DB 토픽) / `general`(IT 전반) 중 하나

## 절차

1. **메타 추출**: 원고에서 제목(첫 H1), 요약(첫 문단 또는 인용구)을 뽑는다. slug(영문 id)는 제목을 기반으로 생성하되 사용자에게 확인한다.

2. **HTML 생성**: `posts/welcome-it-tech-note.html`을 템플릿으로 삼아 새 파일 `posts/{slug}.html`을 만든다. 다음을 반드시 채운다:
   - `<title>`, `<meta name="description">`, `<link rel="canonical">`
   - Open Graph 태그 (og:title, og:description, og:url, og:type=article)
   - JSON-LD Article 스키마 (headline, datePublished, author, description)
   - `.article-head`의 카테고리 태그, 날짜, 제목, lead
   - `.article-body`에 마크다운을 변환한 본문
   - 상대경로는 `../` 기준 (posts/ 하위이므로)

3. **마크다운 변환 규칙**:
   - `## ` → `<h2>`, `### ` → `<h3>`
   - `**bold**` → `<strong>`, 백틱 code → `<code>`
   - `>` 인용 → `<blockquote>`
   - 표 → `<table>` (article-body 스타일 자동 적용)
   - 목록 → `<ul>`/`<ol>`

4. **articles.json 등록**: `articles` 배열 맨 앞에 새 객체를 추가한다:
   - id, title, category, date, summary, keywords, path, readingMinutes

5. **검증 안내**: 완료 후 `/seo-check`로 검증하고 `/publish`로 발행하라고 안내한다.

## 주의
- 제목과 description은 검색 키워드를 포함하도록 다듬는다.
- canonical/og:url의 도메인은 articles.json의 site.url을 따른다.
- 날짜는 오늘 날짜를 기본값으로 한다.
