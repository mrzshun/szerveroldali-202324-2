<h1>Hello World! <?php echo $id; ?></h1>
@foreach ($technologies as $key => $item)
    {{$key.' => '.$item}} <br/>
@endforeach