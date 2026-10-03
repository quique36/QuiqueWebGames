"""games/ 配下を走査して、games.js に未登録のゲームを追記する。

使い方（リポジトリのルートで）:
    python tools/update_games.py

- games/<id>/build/web/index.html があるフォルダを Godot の Web ゲームとみなす
- 表示名は index.html の <title> から取る
- 既に登録済みのゲームには触らない（説明文などの手直しはそのまま残る）
- GitHub の 100MB/ファイル 制限に引っかかるファイルがあれば警告する
"""

import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GAMES_DIR = ROOT / "games"
MANIFEST = ROOT / "games.js"
GITHUB_HARD_LIMIT = 100 * 1024 * 1024
GITHUB_WARN_LIMIT = 50 * 1024 * 1024
ACCENTS = ["#7c86ff", "#5fd39a", "#ffb84d", "#ff7ab8", "#4dd2e0", "#c792ff"]


def read_title(index_html: Path, fallback: str) -> str:
    m = re.search(r"<title>(.*?)</title>", index_html.read_text(encoding="utf-8"), re.S)
    return html.unescape(m.group(1).strip()) if m and m.group(1).strip() else fallback


def uses_threads(index_html: Path) -> bool:
    return "GODOT_THREADS_ENABLED = true" in index_html.read_text(encoding="utf-8")


def main() -> int:
    text = MANIFEST.read_text(encoding="utf-8")
    known = set(re.findall(r'\bid:\s*"([^"]+)"', text))

    found = sorted(p.parent.parent.parent for p in GAMES_DIR.glob("*/build/web/index.html"))
    added = []
    for game_dir in found:
        gid = game_dir.name
        web = game_dir / "build" / "web"

        for f in web.iterdir():
            size = f.stat().st_size
            if size > GITHUB_HARD_LIMIT:
                print(f"[NG] {f.relative_to(ROOT)} は {size / 2**20:.0f}MB。GitHub には 100MB 超のファイルを置けません")
            elif size > GITHUB_WARN_LIMIT:
                print(f"[注意] {f.relative_to(ROOT)} は {size / 2**20:.0f}MB（push 時に警告が出ますが公開は可能）")

        if uses_threads(web / "index.html"):
            print(f"[情報] {gid} はスレッド有効ビルドです（coi-sw.js により GitHub Pages でも動作します）")

        if gid in known:
            continue
        title = read_title(web / "index.html", gid)
        icon = "index.icon.png" if (web / "index.icon.png").exists() else None
        entry = {
            "id": gid,
            "title": title,
            "genre": "GAME",
            "info": {"time": "", "status": "", "future": "", "controls": "", "models": ""},
            "icon": icon,
            "pixel": False,
            "accent": ACCENTS[(len(known) + len(added)) % len(ACCENTS)],
        }
        added.append(entry)

    if not added:
        print("新しいゲームはありませんでした。")
        return 0

    blocks = []
    for e in added:
        lines = []
        for k, v in e.items():
            if isinstance(v, dict):
                lines.append(f"    {k}: {{")
                lines += [f"      {ik}: {json.dumps(iv, ensure_ascii=False)}," for ik, iv in v.items()]
                lines.append("    },")
            else:
                lines.append(f"    {k}: {json.dumps(v, ensure_ascii=False)},")
        blocks.append("  {\n" + "\n".join(lines) + "\n  },\n")

    end = text.rstrip().rfind("];")
    if end < 0:
        print("games.js の末尾 '];' が見つかりません", file=sys.stderr)
        return 1
    head = text[:end].rstrip()
    if not head.endswith(","):
        head += ","
    MANIFEST.write_text(head + "\n" + "".join(blocks) + "];\n", encoding="utf-8")

    for e in added:
        print(f"[追加] {e['id']}  「{e['title']}」 → games.js の genre / info / icon を必要に応じて編集してください")
    return 0


if __name__ == "__main__":
    sys.exit(main())
