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

### `-F "<key-value data>" / --form "<key-value data>"`

### `-X <method> / --request <method>`

### `-u / --user`

## shell scriptでよく使われてそうな（？）curlコマンドのオプション

### `-s / silent`

### `-f / --fail`

### `-L / --location`

