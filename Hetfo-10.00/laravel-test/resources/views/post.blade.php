<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>One blogpost</title>
</head>

<body>
    @if ($post == null)
        <h1>There is no blogpost with #ID{{ $id }}</h1>
    @else
        <h1>Blogpost #ID{{ $id }}</h1>
        <h2>{{ $post['title'] }}</h2>
        <p><strong>{{ $post['author'] }}</strong></p>
        <p>{{ $post['text'] }}</p>
        <a href="/blog">
            << Back</a>
    @endif
</body>

</html>
