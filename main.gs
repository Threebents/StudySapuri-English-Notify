function myFunction() {
  // 環境変数からの読み込み
  var es_access_token = PropertiesService.getScriptProperties().getProperty("es_access_token");
  var webhook = PropertiesService.getScriptProperties().getProperty("webhook_url");
  var owner = PropertiesService.getScriptProperties().getProperty("owner");

  // Webhook設定
  var username = "スタディサプリEnglishお知らせbot"
  var colorCode = parseInt("1C80E7", 16);
  var message = ""

  // Webhook設定2
  header = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
    'authorization': 'JWT jwt_token="'+es_access_token+'",jwt_version="1",jwt_service="1"'
  }
  var options = {
     "method" : "get",
     "headers" : header,
     "muteHttpExceptions": true
  };

  //スタディサプリEnglish API取得&パース
  var requestUrl = "https://ecp-study-api.eigosapuri.jp/ecp/study-api/v1/homeworks?applicationType=6";
  var response = UrlFetchApp.fetch(requestUrl, options);
  var code = response.getResponseCode();
  var esapijson = JSON.parse(response);
  if(code == 200){
    //console.log("リクエストが成功しました。");
      var esapijson_count = Object.keys(esapijson.items).length
      var eshwarray = [];
      //var j = 0
      for (let i = 0; i < esapijson_count; i++) {
        //console.log("現在jsonパース" + (i+1) + "回目の処理です。");
        var esapijson_hw = esapijson.items[i];
        var esapi_endtime = Utilities.formatDate(new Date(esapijson_hw.endAt), 'Asia/Tokyo', 'yyyy/MM/dd/HH:mm:ss');
        if(esapijson_hw.isOpened == 1){
          // var j = j+1;
          eshwarray.push({"name": "課題名", "value": esapijson_hw.name, "inline": true}, {"name": "先生", "value": esapijson_hw.creatorName, "inline": true }, {"name": "課題締め切り", "value": esapi_endtime, "inline": true });
        }
      }
      if(eshwarray == ""){
        eshwarray.push({"name": "課題名", "value": "なし", "inline": true}, {"name": "先生", "value": "なし", "inline": true }, {"name": "課題締め切り", "value": "なし", "inline": true });
        //break;
      }
    var message = {
      "username": username,
      "tts": false,
      "embeds": [
        {
          "title": "スタディサプリEnglish課題お知らせ", 
          "color": colorCode,
          "fields": eshwarray,
          "footer": {
            "text": "https://github.com/Threebents/StudySapuri-English-Notify",
            "icon_url": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          }
        }
      ]
    }
  }else if(code == 401){
    console.log("権限がありません。");
    console.log(ownerid)
    var message = {
      "username": username,
      "content": "\@"+owner+" 、トークンの有効期限が切れました。コード401",
      "tts": false
    }
  }else{
    console.log("不明なエラーが発生しました。");
    var message = {
      "username": username,
      "content": "\@"+owner+"、不明なエラーが発生しました。コード"+code,
      "tts": false
    }
  }

  //送信
  const param = {
    "method": "POST",
    "headers": { 'Content-type': "application/json" },
    "payload": JSON.stringify(message)
  }
  UrlFetchApp.fetch(webhook, param);
}
