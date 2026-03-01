# Electron Template
Electron Templateは、Electronによるアプリケーション開発の前準備を効率化するために個人的に作成したテンプレートです。
electron-forge+TypeScript+Viteの技術スタック上に構成されたボイラープレートに、main, preload, renderer, global.dなどを加えたものです。

# 導入
```cmd
# リポジトリのクローン
git clone https://github.com/oyashiro846/ElectronTemplate.git

# ディレクトリへ移動
cd ElectronTemplate

# 依存関係のインストール
npm install

# 開発モードで起動
npm start

# メイク
npm run make
```

- `package.json`の下記の項目を編集してください
    - name
    - productName
    - description
    - author
    - license

- アプリを配布する場合は、コピーライト表示をあなた（利用者）の名前と発行年に書き換えてください。また、適用するライセンスの原文を`LICENSE`に記載してください。