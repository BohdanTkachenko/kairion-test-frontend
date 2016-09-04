User can add new product feeds (with fields like shopname, delimiter etc).
     - array of feed settings is saved in redux state (shopname,url)
     - new feed settings are sent to the server
     - server parses the feed with those settings and return list of ids
     - Opening concrete id shows price
User can navigate between already added feeds, see the list of products, see the price for the concrete product.

Please store all state in Redux. Think about error handling.
