---
name: publish
description: 블로그를 발행한다. articles.json 검증 후 sitemap/rss를 생성하고 커밋·푸시한다. 사용자가 발행, 배포, publish를 요청할 때 사용.
---

# publish — 발행 자동화 스킬

새 기사를 등록한 뒤 사이트 전체를 발행 상태로 갱신한다.

## 절차

1. 검증: node scripts/validate.js 실행. 실패 시 중단하고 오류를 보고한다.
2. 생성: node scripts/generate.js 실행 → sitemap.xml, rss.xml 갱신.
3. 커밋 & 푸시: git add -A → conventional 커밋(post: 제목) → git push
4. 자동 배포 안내: push 이후 GitHub Actions가 자동으로 검증·생성·배포하고, indexnow가 검색엔진에 URL을 제출한다고 안내한다.

## 주의
- 푸시 전 git status로 변경 파일을 확인한다.
- 커밋 메시지는 conventional 형식(post:, fix:, chore:)을 따른다.
