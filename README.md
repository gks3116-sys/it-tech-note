
# IT Tech Note

기술사 토픽 · DB · IT 전반 지식을 정리하는 에이전틱 정적 블로그.
글 생성부터 SEO 검증, 발행, 검색엔진 제출까지 자동화된 구조로 운영된다.

## 구조

```
it-tech-note/
├─ index.html              # 홈 (articles.json 기반 목록 자동 렌더링)
├─ about.html              # 소개
├─ articles.json           # ★ Single Source of Truth (모든 기사 메타)
├─ posts/                  # 기사 HTML
├─ assets/css/style.css    # 디자인 시스템 (라이트/다크)
├─ assets/js/main.js       # 목록 렌더링·필터·테마
├─ scripts/
│  ├─ validate.js          # articles.json 검증
│  └─ generate.js          # sitemap.xml + rss.xml 생성
├─ .github/workflows/
│  ├─ deploy.yml           # 검증→생성→Pages 배포
│  └─ indexnow.yml         # 네이버·빙 URL 자동 제출
└─ .claude/skills/         # Claude Code 스킬
   ├─ new-post/            # MD → HTML 기사 생성
   ├─ seo-check/           # SEO 4계층 검증
   └─ publish/             # 발행 자동화
```

## 시작하기 (GitHub Pages)

1. 이 폴더를 GitHub 저장소로 푸시한다.
   ```bash
   git init && git add -A && git commit -m "init: IT Tech Note"
   git branch -M main
   git remote add origin https://github.com/<사용자>/<저장소>.git
   git push -u origin main
   ```
2. 저장소 **Settings → Pages → Source: GitHub Actions** 선택.
3. `articles.json`의 `site.url`을 실제 도메인으로 수정한다.
4. 커스텀 도메인을 쓰면 `CNAME` 파일을 추가한다.

## 새 글 발행 흐름

Claude Code에서:
```
/new-post   (원고 MD 전달 → posts/ HTML 생성 + articles.json 등록)
/seo-check  (SEO 검증)
/publish    (검증→생성→커밋→푸시, 이후 Actions가 자동 배포)
```

수동으로 할 경우:
```bash
node scripts/validate.js   # 검증
node scripts/generate.js   # sitemap/rss 생성
git add -A && git commit -m "post: 제목" && git push
```

## 로컬 미리보기

```bash
python3 -m http.server 8000
# http://localhost:8000 접속
```

## IndexNow (선택)

네이버·빙 자동 제출을 쓰려면:
1. 임의의 키 문자열 생성 → `<키>.txt` 파일을 루트에 두고 내용에 키를 적는다.
2. 저장소 Settings → Secrets에 `INDEXNOW_KEY` 등록.
