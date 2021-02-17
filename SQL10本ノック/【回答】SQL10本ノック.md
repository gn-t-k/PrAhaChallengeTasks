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

## 売上が高い順番にCountryを並べてください。売上も表示してください

## 国ごとの売上を年ごとに集計する

## Employeeテーブルに「Junior（若手）」カラム（boolean）を追加

## Shipperにlong_relationカラム（boolean）を追加

## それぞれのEmployeeが最後に担当したOrderと、その日付

## NULLの扱いに慣れる

## JOINの扱いになれる
