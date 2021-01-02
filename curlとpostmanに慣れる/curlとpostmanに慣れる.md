# curlとpostmanに慣れる

## 主要そうな（？）curlコマンドのオプション

### `-o <file> / --output <file>`と`-O / --remote-name`

`--output`はcurlで取得したデータを`<file>`で指定したファイル名でファイルを保存する。`--remote-name`はファイル名を指定せず、URLの末尾のファイル名でファイルを保存する。

複数のファイルのダウンロードも可能。

```
$ curl -O http://example.com/file1-1.tar.gz \
-O http://example.com/file2-2.tar.gz
```

```
$ curl -o file1.tar.gz http://example.com/file1-1.tar.gz \
-o file2 http://example.com/file2-2.tar.gz
```

### `-d "<key-value data>" / --data "<key-value data>"`と`--data-urlencode "<key-value data>"`

`--data`オプションを指定すると、curlはPOSTでリクエストを送る。`key=value`の形式で指定された`<key-value data>`がリクエストボディに設定される。

```
$ curl -d "key=\"value\"" http://example.com
```

`Content-Type`ヘッダに`application/x-www-form-urlencoded`が設定されている場合、必要に応じて文字をURLエンコードしてから送る。

### `-c <cookie file> / --cookie-jar <cookie file> `と `-b <cookie file> / --cookie <cookie file>`

`--cookie-jar`でファイルにcookieを保存し、`--cookie`でそのファイルを利用する。

```
$ curl --cookie-jar cookie.txt http://httpbin.org/cookies/set/Name/Value
$ curl --cookie cookie.txt http://httpbin.org/cookies           
{"cookies":{"Name":"Value"}}
```

### `-H "<header info>" / --header "<header info>"`

`--header`でリクエストにヘッダー情報を付与することができる。例えば`Content-tType`でjsonを指定してpostする場合は次のようになる。

```
$ curl -H "Content-Type: application/json" -d "{\"name\": \"hoge\"}" "https://httpbin.org/post"
```

### `-X <method> / --request <method>`

### `-u / --user`

curlは、`-request`でメソッドを指定しなかった場合GETメソッドでリクエストを発行する。GET以外のメソッドを指定したい場合は`--request`オプションを使う。

```
$ curl -X PUT -d "name=update-name" http://example.com
```



## shell scriptでよく使われてそうな（？）curlコマンドのオプション

### `-s / silent`

`--silent`オプションを付けると、ダウンロードの進捗やエラーが出力されなくなる。shell scriptでcurlを利用するときに、不要な出力を表示しなくないときに使う。

### `-f / --fail`

`--fail`オプションを付けると、エラーのレスポンスが返ってきたときに何も表示されなくなる。shell scriptでcurlを利用してエラーが返ってきたときにエラーページのhtmlを返されても利用しない場合が多いので、そういうときに使うオプション。

### `-L / --location`

curlは、リダイレクト設定されているURLにアクセスしたとき、デフォルトではリダイレクト先のURLにはリクエストを発行しない。リダイレクトされている場合にリダイレクト先にもリクエストを発行したい場合は`--location`オプションを付ける。