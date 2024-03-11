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
        <h1>Nincsenek blogpostok</h1>
    @else
        <h1>Categories</h1>
        @foreach ($categories as $category)
            <span style="color:{{$category->txt_color}}; background-color:{{$category->bg_color}}">{{$category->name}}</span>
        @endforeach
        <h1>Posts</h1>
        @foreach ($posts as $post)
            <h2>{{$post->title}}</h2>
            <cite>{{$post->author->name}}</cite>
            @foreach ($post->categories as $category)
                <span style="color:{{$category->txt_color}}; background-color:{{$category->bg_color}}">{{$category->name}}</span>
            @endforeach
            <p><strong>{{$post->description}}</strong></p>
            <p>{{$post->text}}</p>
        @endforeach
    @endempty
</body>
</html>