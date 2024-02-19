<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>All blogposts</title>
</head>

<body>
    <h1>All blogposts:</h1>
    @foreach ($posts as $post)
        <h2>{{$post['title']}}</h2>
        <p>{{$post['author']}}</p>
        <a href="blog/{{$post['id']}}">read more...</a>
    @endforeach
</body>

</html>
