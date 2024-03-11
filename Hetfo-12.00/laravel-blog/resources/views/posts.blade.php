<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Posts</title>
</head>

<body>

    @empty($posts->toArray())
        <h1>No blogposts :(</h1>
    @else
        <h1>Categories</h1>
        <p>
            @foreach ($categories as $category)
                <span
                    style="color:{{ $category->txt_color }};background-color:{{ $category->bg_color }}">{{ $category->name }}</span>
            @endforeach
        <p>
        <h1>Posts</h1>
        @foreach ($posts as $post)
            <h2>{{ $post->title }}</h2>
            <cite>{{ $post->author->name }}</cite>
            <p>
                @foreach ($post->categories as $category)
                    <span
                        style="color:{{ $category->txt_color }};background-color:{{ $category->bg_color }}">{{ $category->name }}</span>
                @endforeach
            </p>
            <p><strong>{{ $post->description }}</strong></p>
            <p>{{ $post->text }}</p>
        @endforeach
    @endempty
</body>

</html>
