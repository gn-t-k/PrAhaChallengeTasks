# SQL10本ノック

## 課題1

### 96年に3回以上注文した（Ordersが3つ以上紐づいている）Customerのidと、注文回数

```sql
SELECT Customers.CustomerID, COUNT(Orders.OrderID) AS OrderCount
FROM Customers JOIN Orders ON (Customers.CustomerID = Orders.CustomerID)
WHERE Orders.OrderDate LIKE '1996%'
GROUP BY Customers.CustomerID
HAVING OrderCount >= 3
ORDER BY OrderCount DESC
```

### 過去、最も多くのOrderDetailが紐づいたOrderを取得してください。何個OrderDetailが紐づいていたでしょうか？

```sql
SELECT OrderID, COUNT(OrderDetailID) AS OrderDetailCount
FROM OrderDetails
GROUP BY OrderID
ORDER BY OrderDetailCount DESC
LIMIT 1
```

### Order数が多い順番にShipperのidを並べてください。Order数も表示してください

```sql
SELECT ShipperID, COUNT(OrderID) AS ShippingCount
FROM Orders
GROUP BY ShipperID
ORDER BY ShippingCount DESC
```

### 売上が高い順番にCountryを並べてください。売上も表示してください

```sql
SELECT ROUND(SUM(Products.Price * OrderDetails.Quantity), 0) AS sales, Customers.Country AS Country
FROM OrderDetails
  JOIN Products ON (OrderDetails.ProductID = Products.ProductID)
  JOIN Orders ON (OrderDetails.OrderID = Orders.OrderID)
  JOIN Customers ON (Orders.CustomerID = Customers.CustomerID)
GROUP BY Customers.Country
```

### 国ごとの売上を年ごとに集計する

```sql
SELECT ROUND(SUM(Products.Price * OrderDetails.Quantity), 0) AS sales, STRFTIME('%Y', Orders.OrderDate) AS OrderYear, Customers.Country AS Country
FROM OrderDetails
  JOIN Products ON (OrderDetails.ProductID = Products.ProductID)
  JOIN Orders ON (OrderDetails.OrderID = Orders.OrderID)
  JOIN Customers ON (Orders.CustomerID = Customers.CustomerID)
GROUP BY Customers.Country, OrderYear
```

### Employeeテーブルに「Junior（若手）」カラム（boolean）を追加

カラム追加クエリ

```sql
ALTER TABLE Employees ADD Junior DEFAULT '0'
```

更新クエリ

```sql
UPDATE Employees SET Junior = '1' WHERE STRFTIME('%Y', BirthDate) > '1960'
```

### Shipperにlong_relationカラム（boolean）を追加

カラム追加クエリ

```sql
ALTER TABLE Shippers ADD long_relation DEFAULT 0
```

更新クエリ

```sql
UPDATE Shippers
SET long_relation = 1
WHERE ShipperID = (
  SELECT Shippers.ShipperID
  FROM Orders
  JOIN Shippers ON (Orders.ShipperID = Shippers.ShipperID)
  GROUP BY Orders.ShipperID
  HAVING COUNT(Shippers.ShipperID) >= 70
)
```

### それぞれのEmployeeが最後に担当したOrderと、その日付

```sql
SELECT Employees.EmployeeID, Orders.OrderDate AS LatestOrderDate, Orders.OrderID
FROM Orders JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
GROUP BY Employees.EmployeeID
HAVING MAX(Orders.OrderDate)
```

### NULLの扱いに慣れる

特定のCustomerNameをNULLにするクエリ（IDが1桁のCustomerのNameをNULLにする）

```sql
UPDATE Customers SET CustomerName = NULL WHERE CustomerID < 10
```

CustomerNameが存在するユーザーを取得するクエリ

```sql
SELECT * FROM Customers WHERE CustomerName IS NOT NULL
```

CustomerNameが存在しないユーザーを取得するクエリ

```sql
SELECT * FROM Customers WHERE CustomerName IS NULL
```

#### なぜ`SELECT * FROM Customers WHERE CustomerName = NULL;`では期待した結果が得られないか

NULLには比較演算子を利用できないため。NULL値は不明の値を表しているため、不明な値同士が同じかどうかは識別できない。NULLとNULLとを比較したとしても、等しい関係にはならない。

### JOINの扱いになれる

レコードを削除するクエリ

```sql
DELETE FROM Employees WHERE EmployeeID = 1
```

EmployeeID = 1が担当したOrderを表示しないクエリ
※完成イメージと異なる結果が表示されてしまったが、何が間違っているのかわからない…（完成イメージのCustomerIDとEmployeeIDが同一になっているのが気になる）

```sql
SELECT *
FROM Orders JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
```

EmployeeID = 1が担当したOrderを表示するクエリ

```sql
SELECT *
FROM Orders LEFT JOIN Employees ON Orders.EmployeeID = Employees.EmployeeID
```

## 課題2

### WHEREとHAVINGの違い/それぞれどのようなときに使うべきか

- `WHERE`は、`SELECT`・`FROM (テーブル名)`で指定したテーブルに条件を指定して絞り込みを行うときに使う
- `HAVING`は、`GROUP BY`でグルーピングした結果に条件を指定して絞り込みを行うときに使う

### SQLの文脈において、DDL、DML、DCL、TCLとはなにか

SQLのコマンドは処理内容によってDDL、DML、DCL、TCLの4種類に分類できる。

#### DDL

Data Definition Languageの略。テーブルなどの作成・削除・設定などを行う命令の総称。`CREATE`、`ALTER`、`DROP`、`TRUNCATE`などがある。

#### DML

Data Manipulation Languageの略。データに対して格納・取り出し・更新・削除などの操作を行う命令の総称。`SELECT`、`INSERT`、`UPDATE`、`DELETE`などがある。

#### DCL

Data Control Languageの略。DMLやDDLの利用に関する許可や禁止の設定を行う命令の総称。`GRANT`、`REVOKE`などがある。

#### TCL

Transaction Control Languageの略。トランザクションの開始や終了の命令の総称。`COMMIT`、`ROLLBACK`、`SET TRANSACTION`、`SAVEPOINT`などがある。

## 課題3

### クイズ1

SQLにおいて`NULL = NULL`は真か偽か。

<details>
  <summary>回答</summary>

  偽。SQLにおいてNULL値は不明の値を表しているため、不明な値同士が同じかどうかは識別できない。
</details>

### クイズ2

`DISTINCT`と`GROUP BY`どちらが先に実行されるか。

<details>
  <summary>回答</summary>

  `GROUP BY`。

</details>

### クイズ3

FirstNameがAから始まるEmployeesの中で、最年長の人は2021年2月22日時点で何歳か。

<details>
  <summary>回答</summary>

  92歳。下記のクエリで取得できる。

  ```sql
  SELECT * FROM Employees WHERE FirstName LIKE 'A%' ORDER BY BirthDate ASC LIMIT 1
  ```

</details>
