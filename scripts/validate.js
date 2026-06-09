#!/usr/bin/env node
/**
 * validate.js — articles.json의 무결성을 검증한다.
 * 필수 필드 누락, 중복 ID, 존재하지 않는 파일 경로, 잘못된 카테고리를 탐지한다.
 * 실행: node scripts/validate.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'articles.json'), 'utf8'));

const errors = [];
const catIds = new Set(data.categories.map(c => c.id));
const seen = new Set();
const required = ['id', 'title', 'category', 'date', 'summary', 'path'];

data.articles.forEach((a, i) => {
  required.forEach(f => {
    if (!a[f]) errors.push(`[${i}] 필수 필드 누락: ${f}`);
  });
  if (a.id) {
    if (seen.has(a.id)) errors.push(`[${i}] 중복 ID: ${a.id}`);
    seen.add(a.id);
  }
  if (a.category && !catIds.has(a.category)) {
    errors.push(`[${i}] 알 수 없는 카테고리: ${a.category}`);
  }
  if (a.date && !/^\d{4}-\d{2}-\d{2}$/.test(a.date)) {
    errors.push(`[${i}] 날짜 형식 오류 (YYYY-MM-DD): ${a.date}`);
  }
  if (a.path && !fs.existsSync(path.join(ROOT, a.path))) {
    errors.push(`[${i}] 파일 없음: ${a.path}`);
  }
});

if (errors.length) {
  console.error('✗ 검증 실패:\n' + errors.map(e => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log(`✓ articles.json 검증 통과 (${data.articles.length} articles)`);
