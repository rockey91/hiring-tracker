$(document).ready(function(){

  $("button").click(function(){



    var item1 = $("#field1").val();
    var item2 = "item2value";

    let $table = $("table#dataTable1");
    $table.append(`
      <tr>
        <td>
         ${item1}
        </td>
        <td>
         ${item2}
        </td>
      </tr>
    `);

  });

});
