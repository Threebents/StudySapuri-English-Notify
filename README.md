# StudySapuri-English-Notify
スタディサプリEnglishで出ている宿題をGASで取得してWebhookに流すやつ
##実行環境
Google Apps Scriptのデフォルトで動きます。
Discordに投稿されることを目的としていますが、多分Slackでも動きます(未確認)。
##環境変数
新エディタの方法はよくわからないので、旧エディタの説明を
https://note.com/tokifujp/n/na20b8b954e50
それぞれ以下の表の通り設定してください。
|  環境変数名  |  設定すべき値  |
| ---- | ---- |
|  es_access_token  |  下記参照  |
|  webhook_url  |  Webhook URL  |
|  owner_id  |  Discordの自分のid(エラー時にメンションされます。)  |
##スタディサプリEnglish tokenについて
スタディサプリEnglishをリロードしたときにDeveloperToolでapiを見ると、``authorization``から始まる列があるので、そこの``JWT jwt_token=``から``,jwt_version="1"``までをコピーして、環境変数へ入れてください。
##使い方
GASに入れて環境変数を設定すればすぐ使えると思います。
