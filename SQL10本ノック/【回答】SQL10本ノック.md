# SQL10本ノック

## 96年に3回以上注文した（Ordersが3つ以上紐づいている）Customerのidと、注文回数

```sql
SELECT Customers.CustomerID, COUNT(Orders.OrderID) AS OrderCount
FROM Customers JOIN Orders ON (Customers.CustomerID = Orders.CustomerID)
WHERE Orders.OrderDate LIKE '1996%'
GROUP BY Customers.CustomerID
HAVING OrderCount >= 3
ORDER BY OrderCount DESC
```

## 過去、最も多くのOrderDetailが紐づいたOrderを取得してください。何個OrderDetailが紐づいていたでしょうか？

```sql
SELECT OrderID, COUNT(OrderDetailID) AS OrderDetailCount
FROM OrderDetails
GROUP BY OrderID
ORDER BY OrderDetailCount DESC
LIMIT 1
```

## Order数が多い順番にShipperのidを並べてください。Order数も表示してください

```sql
SELECT ShipperID, COUNT(OrderID) AS ShippingCount
FROM Orders
GROUP BY ShipperID
ORDER BY ShippingCount DESC
```

## 売上が高い順番にCountryを並べてください。売上も表示してください

```sql
SELECT ROUND(SUM(Products.Price * OrderDetails.Quantity), 0) AS sales, Customers.Country AS Country
FROM OrderDetails
  JOIN Products ON (OrderDetails.ProductID = Products.ProductID)
  JOIN Orders ON (OrderDetails.OrderID = Orders.OrderID)
  JOIN Customers ON (Orders.CustomerID = Customers.CustomerID)
GROUP BY Customers.Country
```

## 国ごとの売上を年ごとに集計する

```sql
SELECT ROUND(SUM(Products.Price * OrderDetails.Quantity), 0) AS sales, STRFTIME('%Y', Orders.OrderDate) AS OrderYear, Customers.Country AS Country
FROM OrderDetails
  JOIN Products ON (OrderDetails.ProductID = Products.ProductID)
  JOIN Orders ON (OrderDetails.OrderID = Orders.OrderID)
  JOIN Customers ON (Orders.CustomerID = Customers.CustomerID)
GROUP BY Customers.Country, OrderYear
```

## Employeeテーブルに「Junior（若手）」カラム（boolean）を追加

カラム追加クエリ

```sql
ALTER TABLE Employees ADD Junior DEFAULT '0'
```

更新クエリ

```sql
UPDATE Employees SET Junior = '1' WHERE STRFTIME('%Y', BirthDate) > '1960'
```

## Shipperにlong_relationカラム（boolean）を追加

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

## それぞれのEmployeeが最後に担当したOrderと、その日付

## NULLの扱いに慣れる

## JOINの扱いになれる
