#!/usr/bin/env bash
# Request the home page, robots.txt and the sitemap with the user-agent of each AI and search crawler.
# Usage: scripts/check-crawlers.sh [base-url]      default: https://www.benormedia.com
# A UA-only test from your own IP exercises UA-based CDN/WAF rules, not IP-verified "known bot" rules:
# 200 here is necessary, not sufficient.
BASE="${1:-https://www.benormedia.com}"
BASE="${BASE%/}"

UAS='Browser (baseline)|Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36
OAI-SearchBot|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot
GPTBot|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.1; +https://openai.com/gptbot
ChatGPT-User|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot
PerplexityBot|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)
ClaudeBot|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)
Claude-SearchBot|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-SearchBot/1.0; +Claude-SearchBot@anthropic.com)
Googlebot|Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
Bingbot|Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'

fail=0
base_size=""
printf '%-20s %-6s %-10s %-6s %-6s %s\n' "user-agent" "home" "bytes" "robots" "sitemap" "note"
while IFS='|' read -r name ua; do
  home=$(curl -s -o /tmp/bm-home.$$ -w '%{http_code} %{size_download}' -A "$ua" "$BASE/")
  code=${home% *}; size=${home#* }
  robots=$(curl -s -o /dev/null -w '%{http_code}' -A "$ua" "$BASE/robots.txt")
  sitemap=$(curl -s -o /dev/null -w '%{http_code}' -A "$ua" "$BASE/sitemap-index.xml")
  [ -z "$base_size" ] && base_size=$size
  note=""
  [ "$code" != "200" ] && { note="BLOCKED or redirected"; fail=1; }
  # a bot-challenge page is usually a 200 with a much smaller body
  if [ "$code" = "200" ] && [ "$base_size" -gt 0 ] && [ $((size * 100 / base_size)) -lt 70 ]; then note="body <70% of the browser response: possible challenge page"; fail=1; fi
  grep -qiE 'just a moment|attention required|verify you are human|access denied' /tmp/bm-home.$$ && { note="challenge text in body"; fail=1; }
  [ "$robots" != "200" ] && { note="$note robots.txt $robots"; fail=1; }
  [ "$sitemap" != "200" ] && { note="$note sitemap $sitemap"; fail=1; }
  printf '%-20s %-6s %-10s %-6s %-6s %s\n' "$name" "$code" "$size" "$robots" "$sitemap" "$note"
done <<< "$UAS"
rm -f /tmp/bm-home.$$
[ $fail -eq 0 ] && echo "all crawlers got 200 with a normal-sized body" || echo "problems found: see the note column"
exit $fail
