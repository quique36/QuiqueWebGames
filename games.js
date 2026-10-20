// ゲーム一覧。games/<id>/build/web/ に Godot の Web エクスポートを置き、ここに1件追加する。
// tools/update_games.py を実行すると games/ を走査して自動で追記される（既存の内容は保持）。
//   id       : games/ 配下のフォルダ名
//   title    : 表示名
//   genre    : ジャンル表記（任意）
//   badge    : タイトル横の小さなラベル（任意。例: "開発中"）
//   download : ブラウザで遊べないゲームのダウンロードページ URL（任意）。
//              指定するとカードのボタンが DOWNLOAD になり、クリックで別タブに開く。games/ にファイルは不要
//   desc     : 一言説明（任意）
//   info     : カードに並べる説明項目（任意。空の項目は表示しない）
//     time     : プレイ時間
//     status   : 遊べる状態
//     future   : 今後の開発予定
//     controls : 操作方法
//     models   : 主な利用モデル
//     comment  : ひとこと
//   cover    : カード全面に敷く画像（サイトルートからの相対パス。例: thumbs/xxx.png）任意
//   icon     : カード中央に置くアイコン（build/web からの相対パス）。cover も icon も無ければタイトル文字
//   pixel    : 画像がドット絵なら true（拡大時にぼかさない）
//   accent   : カードの差し色
window.GAMES = [
  {
    id: "retro-2d-action",
    title: "CRIMSON CRESCENT",
    genre: "RETRO ACTION",
    info: {
      time: "30〜60分",
      status: "ちゃんと遊べる",
      future: "開発継続する、チュートリアル後で作りたい",
      controls: "キーボード、パッドどちらでも",
      models: "Opus 5.5",
    },
    icon: "index.apple-touch-icon.png",
    pixel: true,
    accent: "#e0405a",
  },
  {
    id: "NOCTILE",
    title: "NOCTILE",
    genre: "スレスパライクゲーム",
    info: {
      time: "20分〜",
      status: "ちゃんと遊べる（1〜3人プレイ）",
      future: "開発継続予定あり",
      controls: "キーボード、パッドどちらでも",
      models: "Opus 5.5",
      comment: "協力ゲーの試作。Crimson Crescentと同じ世界観のつもり。まだ色々調整不足。スレスパに寄りすぎてると思う。",
    },
    cover: "thumbs/NOCTILE.png",
    icon: null,
    pixel: false,
    accent: "#7f9fd6",
  },
  {
    id: "BEAT_SHOOTER",
    title: "PULSE DIVER",
    genre: "縦シューティングゲーム",
    info: {
      time: "20〜30分",
      status: "ちゃんと遊べる",
      future: "開発継続予定なし",
      controls: "キーボード、マウス、パッドなんでも",
      models: "Opus 5.5",
      comment: "なんか作ってみたくなったやつ。タイトルのイラストがAI生成っぽいので直したい",
    },
    cover: "thumbs/BEAT_SHOOTER.png",
    icon: null,
    pixel: false,
    accent: "#ff4fa8",
  },
  {
    id: "rhythm_fight",
    title: "RHYTHM FIGHT",
    genre: "RHYTHM × BATTLE",
    badge: "開発中",
    info: {
      time: "やりこめば1時間以上",
      status: "開発中、ちゃんと遊べる",
      future: "開発継続予定あり（一番メインで進めてるやつ）",
      controls: "キーボード、パッドどちらでも",
      models: "Opus 5, Opus 5.5, Fable 5",
    },
    icon: "index.icon.png",
    pixel: false,
    accent: "#5bb8f0",
  },
  {
    id: "hina_action",
    title: "ひなリコイル",
    genre: "ACTION",
    info: {
      time: "10〜20分",
      status: "ちゃんと遊べる",
      future: "開発継続予定なし、あとでこのシステムでちゃんとしたやつ作りたい",
      controls: "パッド推奨",
      models: "Opus 5.5",
    },
    icon: "index.apple-touch-icon.png",
    pixel: true,
    accent: "#f2b279",
  },
  {
    id: "escape_from_GUNMA",
    title: "ESCAPE FROM GUNMA",
    genre: "ACTION",
    info: {
      time: "15〜30分",
      status: "ちゃんと遊べる",
      future: "開発継続予定ほぼなし、あとでキャラ追加だけしたい",
      controls: "キーボード、パッドどちらでも",
      models: "Opus 5.5",
    },
    cover: "thumbs/escape_from_GUNMA.png",
    icon: null,
    pixel: false,
    accent: "#ff7a5c",
  },
  {
    id: "P-PARTY",
    title: "P-PARTY",
    genre: "PARTY GAME",
    info: {
      time: "20〜30分",
      status: "ちゃんと遊べる（1〜4人プレイ）",
      future: "開発継続予定ほぼなし",
      controls: "キーボード、パッドどちらでも",
      models: "Opus 5.5",
    },
    cover: "thumbs/P-PARTY.png",
    icon: null,
    pixel: false,
    accent: "#a99bff",
  },
  {
    id: "P-LASER",
    title: "P-LASER",
    genre: "ハイスピードレース",
    download: "https://drive.google.com/drive/folders/1lilDnHEVIN4clqny92gyi6rXQQCggFO3?usp=drive_link",
    info: {
      time: "5分〜",
      status: "ちゃんと遊べる",
      future: "開発継続予定ほぼなし",
      controls: "キーボード、パッドどちらでも",
      models: "Opus 5.5",
      comment: "Opusの3Dお試しゲー",
    },
    cover: "thumbs/P-LASER.png",
    icon: null,
    pixel: false,
    accent: "#f0a030",
  },
  {
    id: "PenguinRush",
    title: "PENGUIN RUSH",
    genre: "ペンギンレース",
    download: "https://drive.google.com/drive/folders/1dgQ9oLIELDs3elogcZcv4izMylTnQuei?usp=drive_link",
    info: {
      time: "5分〜",
      status: "ちゃんと遊べる",
      future: "開発継続するかも",
      controls: "キーボード、パッドどちらでも",
      models: "Opus 5.5",
      comment: "Opusの3Dお試しゲー",
    },
    cover: "thumbs/PenguinRush.png",
    icon: null,
    pixel: false,
    accent: "#7fd4ff",
  },
];
