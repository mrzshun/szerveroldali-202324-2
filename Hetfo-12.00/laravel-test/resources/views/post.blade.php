<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Blog</title>
</head>

<body>
    @if ($post != null)
        <h1>Blogpost #{{ $id }}</h1>
        <h2>{{ $post['title'] }}</h2>
        <p>{{ $post['author'] }}</p>
        <p><strong>{{ $post['description'] }}</strong></p>
        <p>{{ $post['text'] }}</p>
    @else
        <h1>Blogpost #{{ $id }} does not exist!</h1>
    @endif
    <p><a href="/blog"><< Back</a></p>
</body>

</html>
