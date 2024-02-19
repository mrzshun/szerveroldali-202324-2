<h1>Hello World</h1>
@foreach ($animals as $key => $animal)
    <p>{{$key}} => {{$animal}}</p>
@endforeach
