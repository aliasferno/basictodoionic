<?php

include('config.php');

header ('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Credentials:true');
header ('Access-Control-Allow-Methods: PUT,GET,POST,DELETE,OPTIONS');
header ('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token');
header ('ContentType:application/json; charset=utf-8');


$post = json_decode(file_get_contents('php://input'), true);


if($post['action'] == 'lproyectos'){
    $sentencia = sprintf("SELECT * FROM proyectos");
    $rs = mysqli_query($mysqli, $sentencia);
    if(mysqli_num_rows($rs) > 0){
        while($row = mysqli_fetch_array($rs)){
            $datos[] = array(
                'codigo' => $row['idproyectos'],
                'nombre' => $row['nombre'],
                'descripcion' => $row['descripcion']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'data' => $datos));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No hay proyectos'));
    }
    echo $respuesta;
}

if($post['action'] == 'ltareas'){
    $sentencia = sprintf("SELECT * FROM tareas");
    $rs = mysqli_query($mysqli, $sentencia);
    if(mysqli_num_rows($rs) > 0){
        while($row = mysqli_fetch_array($rs)){
            $datos[] = array(
                'codigo' => $row['idtareas'],
                'nombre' => $row['nombre'],
                'descripcion' => $row['descripcion'],
                'fecha' => $row['fecha'],
                'proyecto' => $row['proyecto'],
                'completada' => $row['completada']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'data' => $datos));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No hay tareas'));
    }
    echo $respuesta;
}
if($post['action'] == 'dtarea'){
    $sentencia = sprintf("SELECT * FROM tareas WHERE idtareas = '%s'", $post['idtarea']);
    $rs = mysqli_query($mysqli, $sentencia);
    if(mysqli_num_rows($rs) > 0){
        while($row = mysqli_fetch_array($rs)){
            $datos = array(
                'codigo' => $row['idtareas'],
                'nombre' => $row['nombre'],
                'descripcion' => $row['descripcion'],
                'fecha' => $row['fecha'],
                'proyecto' => $row['proyecto'],
                'completada' => $row['completada']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'data' => $datos));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No hay tarea'));
    }
    echo $respuesta;
}

if($post['action'] == 'nuevat'){
    $sentencia = sprintf("INSERT INTO tareas (nombre, descripcion, fecha, completada, proyecto)
    VALUES ('%s', '%s', '%s', '%s', '%s')", $post['nombre'],$post['descripcion'],$post['fecha'],$post['completado'],$post['proyecto']);
    $rs = mysqli_query($mysqli, $sentencia);
    if($rs){
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Registro exitoso'));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al registrar'));
    }
    echo $respuesta;
}

if($post['action'] == 'nuevop'){
    $sentencia = sprintf("INSERT INTO proyectos (nombre, descripcion)
    VALUES ('%s', '%s')", $post['nombre'],$post['descripcion']);
    $rs = mysqli_query($mysqli, $sentencia);
    if($rs){
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Registro exitoso'));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al registrar'));
    }
    echo $respuesta;
}
if($post['action'] == 'atarea'){
    $sentencia = sprintf("UPDATE tareas set nombre='%s', descripcion='%s' , fecha='%s', completada='%s', proyecto='%s' WHERE idtareas='%s'",
    $post['nombre'],
    $post['descripcion'],
    $post['fecha'],
    $post['completado'],
    $post['proyecto'],
    $post['idTareas']);
    $rs = mysqli_query($mysqli, $sentencia);
    if($rs){
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Actualizacion exitosa'));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar'));
    }
    echo $respuesta;
}

if($post['action'] == 'aproyecto'){
    $sentencia = sprintf("UPDATE proyectos set nombre='%s', descripcion='%s'WHERE idproyectos='%s'",
    $post['nombre'],
    $post['descripcion'],
    $post['idproyecto']);
    $rs = mysqli_query($mysqli, $sentencia);
    if($rs){
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Actualizacion exitosa'));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar'));
    }
    echo $respuesta;
}

if($post['action'] == 'dproyecto'){
    $sentencia = sprintf("SELECT * FROM proyectos WHERE idproyectos = '%s'", $post['idproyecto']);
    $rs = mysqli_query($mysqli, $sentencia);
    if(mysqli_num_rows($rs) > 0){
        while($row = mysqli_fetch_array($rs)){
            $datos = array(
                'nombre' => $row['nombre'],
                'descripcion' => $row['descripcion']
            );
        }
        $respuesta = json_encode(array('estado' => true, 'data' => $datos));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No hay proyecto'));
    }
    echo $respuesta;
}
if($post['action'] == 'eproyecto'){
    $sentencia = sprintf("DELETE FROM proyectos WHERE idproyectos = '%s'", $post['idproyecto']);
    $rs = mysqli_query($mysqli, $sentencia);
    if($rs){
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Eliminacion exitosa'));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al eliminar'));
    }
    echo $respuesta;
}

if($post['action'] == 'etarea'){
    $sentencia = sprintf("DELETE FROM tareas WHERE idtareas = '%s'", $post['idtarea']);
    $rs = mysqli_query($mysqli, $sentencia);
    if($rs){
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Eliminacion exitosa'));
    }else{
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al eliminar'));
    }
    echo $respuesta;
}


?>