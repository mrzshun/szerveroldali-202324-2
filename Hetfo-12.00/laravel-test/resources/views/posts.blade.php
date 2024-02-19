<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Blog</title>
</head>

<body>
    <h1>All blogposts</h1>
    @foreach ($posts as $post)
        <h2>{{$post['title']}}</h2>
        <p>{{$post['author']}}</p>
        <p><strong>{{$post['description']}}</strong></p>
        <p><a href="blog/{{$post['id']}}">Read more...</a></p>        
    @endforeach
</body>

</html>
