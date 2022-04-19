Automatically email e-books to a customer on order settlement.

## Plugin installation
```ts
EBookPlugin.init(process.env.VENDURE_HOST!)
```

## How it works
1. Upload a PDF or Epub as asset via Vendure admin. Don't add it as asset to a product.
2. The e-book **productVariant** should have an SKU containing the string `e-book`
3. The **product** of the variant should have a facet value with code `e-book` and name `551`, where 551 is the assetId of the e-book.
4. On order settlement, the order confirmation handler will check if the order contains variants with SKU `e-book`.
5. If the order contains e-books, a link will be added to the confirmation email. `http://localhost:3000/e-book/op/1JU7M7C55SQFW94V?email=martijn@pinelab.studioo&ebook=4504)`
6. When the customer clicks the link, it will download the e-book.