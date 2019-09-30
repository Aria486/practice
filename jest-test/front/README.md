This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 開発環境構築

1. node の install
     - [node 公式](https://nodejs.org/ja/download/)から LTS 版の node をインストール
2. npm コマンドが使えるコンソールで以下を実行します

    ```
    cd <path to /hoge/agossm/front/> # frontディレクトリへのパス
    npm install -g yarn
    yarn install
    ```
3. JSON server起動
    - [JSON Server起動](../tools/json-server/README.md)

#### [vscodeの場合]

3. VisualStudioCode の install(以下 VSCode)
     - https://code.visualstudio.com/
4. VSCode で「front ディレクトリ」を開いて Ctrl+Shift+P → 「Extensions: Show Recommended Extensions」を選択
5. 左側に表示される「ワークスペースの推奨事項」の拡張機能を全てインストール
6. VSCode を再起動

#### [他エディタの場合]
3. カレントディレクトリにある.eslintrc.jsonと.stylelintrc.jsonを利用してeslintとstylelintを行うように設定してください
4. .prettierignoreを利用してprettierのformatを行うように設定してください

---

# フロントエンドアーキテクチャ

## 1. パッケージ管理ツール

- npm ではなく yarn を使ってください
    - yarn の方が早いため

## 2. ディレクトリ構成

- 各 README を参照してください。また、各ディレクトリの sample を参考にしてください。
    - [components](./src/components/README.md)
    - [constants](./src/constants)
    - [containers](./src/containers/README.md)
    - [design](./src/design/README.md)
    - [layouts](./src/layouts/README.md)
    - [locales](./src/locales/README.md)
    - [pages](./src/pages/README.md)
    - [store](./src/store/README.md)
    - [utils](./src/utils/README.md)

## 3. 命名規則

- 基本的にサンプルの命名に従ってください

### 拡張子
- ファイル拡張子の命名規則はこの次の[ファイル拡張子]を参考にしてください

### ファイル名
- Component名はPascalCaseです
    - つまりmodule cssやComponentのtest名もPascalCaseになります
- それ以外のファイルは特に理由がなければlowerCamelCaseです

### 変数名
- 変数名はlowerCamelCaseです

### 定数名
- 定数名はCONSTANT_CASEです

### scss
- クラス名はシンプルにしてください
- 長くなりそうな場合は階層(scssの記法)をつくってください

```scss
// good
.search-panel {
  .title {
    // etc
  }
}

// bad
.top-search-panel-header-title {
  // etc
}
```

- この次の[ファイル拡張子]の項目にもありますが、scssはモジュールcssとして扱われるので、ファイル間での名前の競合はありません

## 4. ファイル拡張子

- .jsx は使わず.js にしてください
    - [create-react-app issue #87 No .jsx extension?](https://github.com/facebook/create-react-app/issues/87)
- cssではなくscssを使ってください
    - 変数や@ルールなど、cssよりも柔軟なスタイルの指定が可能です
    - 実行時には自動でcssに変換されるため、互換性を気にする必要はありません
- scss は css modules を使うために .modules.scss にしてください
    - [Adding a CSS Modules Stylesheet](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet)
- test コードは .test.js にしてください

## 5. コンポーネントの作り方
* 「1.containersから作り始めて、共通化できるものをcomponentsに分割する」「2.小さいcomponentsをいくつか作り、それを組み合わせてcontainersにする」など、どの方法で作っても構いません
* テストコードをできるだけ書きましょう
    * テストコードの方針は次の[テストコードの方針]を参考にしてください

## 6. テストコードの方針
* テストコードの種類は大きく分けて以下のようになります(☆はfrontの担当)
    1. front 単体テスト ☆
    2. server 単体テスト
    3. 結合テスト ☆
    4. E2Eテスト ☆
    5. 手動テスト(非常に複雑なコンポーネントなど、E2Eで自動化できない物のみ)

### front 単体テスト
* ここでいう「単体テスト」は、javascriptロジックのようなものをテストするテストと、ComponentのDOMをテストするUIテストの両方を表します
* front単体テストはjest + enzymeで書きます
* mockはsinon、もしくはjestのmock機能を利用します
    * 状況に応じて使いやすい方を使う
    * 例えば単にfunctionのmockをするならsinonの方が簡潔だが、componentのmockはjestでないと書くのが難しい
* TODO:通信処理のテストは現在実装中
    * agossm/tools/json-server/json以下のjsonファイルを読み込んでaxios-mock-adapterでmock化する予定
    * 上記のjsonファイルはfrontとserverで共通利用するもの

### front 結合テスト
* 結合テストではserverを裏で立ち上げて、frontからserverに対して実際にapiを投げるようなテストを行います
* proxy系api、お気に入り系api、代理店系apiなどのまとまりでテストするつもりです
    * 特にproxy系を一つにまとめることでできるだけ無駄な工数がかからないようにしたい
    * 実際に通信している分、ケース数が増えるとそれだけ時間がかかるので、無駄なケースは増やさないようにする
* 結合テストの目的は「frontとserverで相互通信したことがないAPIをなくす」ことです
    * 基本的なロジックはfront側もserver側も単体テストで保証できるので、ロジックの確認をするわけではありません
* 結合テストはjestで行う予定です

### E2Eテスト
* E2Eテストの詳細に関しては別途READMEを用意します
* 仕様変更が少なそうなものは実装しながら書き、仕様変更の可能性が大きいものは仕様が確定してから書く予定です
* E2EテストはWebdriver.ioを利用する予定です

## 7. json-serverについて
* apiレスポンスがどのようなものなのか確認したい場合はjson-serverを利用してください
    * agossm/tools/json-server
* 起動方法は上記ディレクトリのREADMEを見て下さい

## 8. カバレッジ

1. `yarn test` を実行してください
    - 画面上にカバレッジが表示されます

### [vscodeの場合]

2. vscode 上で以下のボタンを押してください
     ![img](https://dojoin.backlog.jp/git/DEV_AGOSSM/agossm/raw/master/front/readme_contents/1.png)
3. カバレッジを見たいファイルを開くと、エディタ上でハイライトされます
4. ハイライトを消したいときはもう一度同じボタンを押してください
