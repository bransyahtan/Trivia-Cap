package microservice

type ArticleApi struct {
	UrlGet string
}

var BaseUrl = ArticleApi{
	UrlGet: "https://jsonplaceholder.typicode.com/posts",
}
