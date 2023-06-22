<?php
    require_once "databases.php";
    error_log("listprod.php :: initialized");

    $query_1 = "SELECT * FROM products";
    $result_1 = $conn -> query($query_1);
    $total_rows = $result_1 -> num_rows;
    // echo "Total rows: $total_rows<br>";


    $query = "SELECT * FROM products ";
    // echo ("{$_POST['search']['value']}<br>");

    if (isset($_POST["search"]["value"]) && ($_POST["search"]["value"] != "")){
        // echo "Hello World<br>";
        $query .= "WHERE name LIKE '%{$_POST["search"]["value"]}%' ";
        $query .= "OR description LIKE '%{$_POST["search"]["value"]}%' ";
        $query .= "OR details LIKE '%{$_POST["search"]["value"]}%' ";
    }
    
    // print_r("{$_POST['order'][0]}<br>");
    // $length = count($_POST['order']);
    // echo("{$length} <br>");
    // echo("{$_POST['order'][0]['column']}<br>");
    // echo("{$_POST['order'][0]['dir']}<br>");

    if (isset($_POST["order"])){
        
        // echo("Hello World<br>");
        // echo("{$_POST['order']}<br>");
        $column_id = $_POST['order'][0]['column'] + 1;

        $query .= 'ORDER BY ' . $column_id. ' '. $_POST['order'][0]['dir']. ' ';
    }else{
        $query .= "ORDER BY id ASC";
    }
    // echo ("$query<br>");
    $result = $conn -> query($query);
    $data = array();
    $filtered_rows = $result -> num_rows;
    // echo "Num Rows: $filtered_rows";

    while($row = $result -> fetch_assoc()){
        $image = '';
        if ($row["image"] != '') {
            $image = '<img src="../../images/upload/'. $row["image"] . '" class="img-thumbnail"
            width="50" height="50" />';

            error_log($row['image']. " <br>");
        }

        $navigation_link = "../admin/admin-prod-detail.html?id=" . $row["id"];
        $sub_array = array();
        $sub_array[] = $row["id"];
        $sub_array[] = $row["name"];
        $sub_array[] = $row["description"];
        $sub_array[] = $row["details"];
        $sub_array[] = $row["price"];
        $sub_array[] = "<a href = {$navigation_link}> View Detail </a>";
        $data[] = $sub_array;
    }

    // echo ($data);
    $response = array(
        // "draw"              => intval($_POST["draw"]),
        "draw"              => intval($_POST["draw"]),
        "recordsTotal"      => $total_rows,
        "recordsFiltered"   => $filtered_rows,
        "data"              => $data,
    );
    echo json_encode($response);

?>