# Quique Web Games

Godot で作った Web ゲームを、タイトル画面から選んで遊べるポータルサイトです。

## ファイル構成

```
index.html / style.css / app.js   タイトル画面とプレイ画面
games.js                          ゲーム一覧（表示名・説明・アイコンなど）
coi-sw.js                         スレッド有効ビルド用の Service Worker（下記）
thumbs/                           カード用のサムネイル画像
games/<id>/build/web/             Godot の Web エクスポート一式（index.html など）
tools/update_games.py             games/ を走査して games.js に新しいゲームを追記
start-server.bat                  ローカル確認用サーバー
```

## ローカルで遊ぶ

Godot の Web ゲームは `file://` では動かないので、サーバー経由で開きます。

```bash
python -m http.server 8000
```

→ http://localhost:8000/ を開く（Windows なら `start-server.bat` をダブルクリックでも可）

## ゲームを追加する

1. Godot で Web エクスポートし、`games/<フォルダ名>/build/web/index.html` に出力する
2. `python tools/update_games.py` を実行（`games.js` に自動追記される）
3. `games.js` を好みに書き換える
   - `info`：カードに並ぶ説明（プレイ時間 / 状態 / 今後 / 操作 / 利用モデル）。空の項目は表示されません
   - `badge`：タイトル横のラベル（例: `"開発中"`）
   - アイコンが Godot 標準のままなら、タイトル画面のスクショを `thumbs/` に置いて `cover` に指定すると見栄えが良くなります

## GitHub Pages で公開する

1. このフォルダを GitHub リポジトリ（Public）に push する
2. リポジトリの **Settings → Pages** で
   Source: `Deploy from a branch` / Branch: `main`・`/ (root)` を選んで Save
3. 数分後に `https://<ユーザー名>.github.io/<リポジトリ名>/` で誰でも遊べるようになる

### 注意点

- **ファイルサイズ**：GitHub は 1 ファイル 100MB まで。50MB を超えると push 時に警告が出ますが公開は可能です。
  Git LFS に入れたファイルは GitHub Pages から正しく配信されないので、LFS は使わないでください。
- **スレッド有効ビルド**（現状 `rhythm_fight`）：SharedArrayBuffer のために COOP/COEP ヘッダーが必要ですが、
  GitHub Pages ではヘッダーを設定できません。`coi-sw.js`（Service Worker）がヘッダーを付け足して動かしています。
  そのため初回アクセス時に 1 度だけページが自動リロードされます。
  Godot のエクスポート設定で **Thread Support をオフ** にして書き出し直せば、この仕組みに頼らず動きます（iOS Safari などでの互換性も上がります）。
