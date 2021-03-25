# Retrospective

## Front-end

Hosting は Firebase Hosting を利用し、
GitHub Actions を使って自動デプロイする。
Firebase プロジェクトが存在しない場合は、プロジェクトを作成する必要がある。

GitHub Actions から自動的にデプロイするためには、
Service account の準備が必要。

- Google Cloud Console => IAM & Admin => Service Accounts

Permission はデプロイに必要なものだけ付与してください。
Service account から新しい Key を発行し、GitHub Secrets に登録します。
デプロイ用のアクション `FirebaseExtended/action-hosting-deploy@v0` に、
登録した Key を設定します。

Workflow の定義はこちらを参考:  
https://github.com/komiyak/ec-elasticsearch-sample-1/tree/master/.github/workflows

App Engine の起動に必要な設定ファイル `app.yaml` を生成するスクリプトをセットアップします。
App Engine に環境変数を設定するには `app.yaml` の中に記述するしかないため、
GitHub Secrets から app.yaml に環境変数を伝達させるためのスクリプト実行が必要になる。

https://github.com/komiyak/ec-elasticsearch-sample-1-api/tree/master/appengine



## Back-end

Hosting は App Engine を利用し、
GitHub Actions を使って自動デプロイする。
Google Cloud Console から新しいプロジェクトを作成し、
デプロイ用の Service account を準備する。

- Google Cloud Console => IAM & Admin => Service Accounts

Service account の作成に必要な Roles の情報などは、
こちらを参照:  
https://github.com/google-github-actions/deploy-appengine#authorization

ローカル環境で開発する場合は、Elasticsearch をローカルで動かす。
ステージング環境は、無料の Sandbox 環境が利用できる bonsai.io を使う。

bonsai.io は Elasticaserch の Index Auto-creation が無効化されているため、
マニュアルで Index を作成しなければならない。
Index の作成手順:  
https://docs.bonsai.io/article/96-creating-your-first-index

bonsai.io で作成した Cluster から Credential を取得し、
GitHub Secrets に設定し、app.yaml の環境変数に反映されるようにする。



## Firestore

Web フロントエンドから利用するためには
[Firebase JavaScript SDK](https://firebase.google.com/docs/reference/js) をインポートする。
このライブラリを利用するために、Public API Key の取得と設定が必要である。
Web フロントエンドから Firestore に対して許可する操作は
[Firestore Security Rules](https://firebase.google.com/docs/firestore/security/rules-structure) で決定する。

それ以外の環境で Firestore を完全にコントロールする場合は、
[Firebase Admin SDK](https://firebase.google.com/docs/firestore/client/libraries#firebase_admin_sdks) か
[Google Cloud client libraries](https://cloud.google.com/firestore/docs/quickstart-servers) を利用する。
前者は Firebase に関する全般的なライブラリであるのに対して、
後者は例えば `google-cloud-firestore` のような名前で Firestore に
直接関係しているような名称となっている。
それぞれ対応している言語の数も異なる。
前者は `Java`, `Python`, `Node.js`, `Go` に対応しているが、
後者はより多くの言語から利用できる。
ちなみに今回のプロジェクトでは、後者の Client library を採用した。

Client library を使用する場合、Google Cloud の Service account が必要。
Service account の Permission は、Firestore を利用するだけであれば、
`Datastore Developer` のようなロールをつけておけば OK。
あとは、実際に動かしている最中に、ライブラリが不足している Permission などを
随時指摘してくれるので、都度対応すれば良い。
