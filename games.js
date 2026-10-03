// ゲーム一覧。games/<id>/build/web/ に Godot の Web エクスポートを置き、ここに1件追加する。
// tools/update_games.py を実行すると games/ を走査して自動で追記される（既存の内容は保持）。
//   id       : games/ 配下のフォルダ名
//   title    : 表示名
//   genre    : ジャンル表記（任意）
//   badge    : タイトル横の小さなラベル（任意。例: "開発中"）
//   desc     : 一言説明（任意）
//   info     : カードに並べる説明項目（任意。空の項目は表示しない）
//     time     : プレイ時間
//     status   : 遊べる状態
//     future   : 今後の開発予定
//     controls : 操作方法
//     models   : 主な利用モデル
//   cover    : カード全面に敷く画像（サイトルートからの相対パス。例: thumbs/xxx.png）任意
//   icon     : カード中央に置くアイコン（build/web からの相対パス）。cover も icon も無ければタイトル文字
//   pixel    : 画像がドット絵なら true（拡大時にぼかさない）
//   accent   : カードの差し色
window.GAMES = [
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
    id: "horror_3D",
    title: "ヴァルナ",
    genre: "3D HORROR",
    info: {
      time: "10〜20分",
      status: "バグとか雑に残ってる",
      future: "開発継続予定なし、バグだけ何とかするかも",
      controls: "マウス＆キーボード、パッドどちらでも",
      models: "Opus 5",
    },
    cover: "thumbs/horror_3D.png",
    icon: null,
    pixel: false,
    accent: "#c9a14a",
  },
  {
    id: "robot_srpg",
    title: "STEEL VANGUARD",
    genre: "ROBOT SRPG",
    info: {
      time: "20〜30分",
      status: "バグとか雑に残ってる、難易度調整してない",
      future: "開発継続予定なし",
      controls: "マウス＆キーボードのみ",
      models: "Opus 5",
    },
    cover: "thumbs/robot_srpg.png",
    icon: null,
    pixel: false,
    accent: "#3fd0f5",
  },
];
