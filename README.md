# Basket API

### Create an item in basket

```js
POST /items

{
  "id": integer,
  "name": string,
  "price": float,
  "description": string
}
```

### Delete an item from basket

```js
DELETE /items/:id
```

### Get all items in basket

```js
GET /items
```
