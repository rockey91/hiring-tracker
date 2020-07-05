$(function(){

  var data = [
    {
      "requestId": 1,
      "projectName": "Proj-1",
      "projectManager": "Man-1",

    },
    {
      "requestId": 2,
      "projectName": "Proj-1",
      "projectManager": "Man-1",

    },
    {
      "requestId": 3,
      "projectName": "Proj-1",
      "projectManager": "Man-1",

    }
  ];

  function hideAll() {
    $(".module").hide();
  }

  function showLogin() {
    hideAll();
    $(".login-module").show();
  }

  function showTable() {
    hideAll();
    $(".table-module").show();

    var $tbody = $(".table-module tbody");

    for(let i = 0; i < data.length; i++) {
      var rowData = data[i];

      var $tr = $(`
        <tr>
          <td>${ rowData["requestId"] }</td>
          <td id="${ rowData["requestId"] }" class="edit-action"> <i class="fa fa-bars" aria-hidden="true"></i> </td>
        </tr>
        `);
      $tr.find('td.edit-action').click(editDetails);

      $tbody.append($tr);

    }
    // Write your code to load data to the table.

  }

  function showForm() {

  }

  function showDetails() {
    $(".details-module").show();
  }

  function loginSubmit(e){
    // var username = $("#username").val();
    console.log("Login Submitted.");
    sessionStorage.setItem("isLoggedIn", "true");
    // if(username == "admin-man") {
    //   //isManager - admin-man
    // }
    //isHR - admin-hr

    showTable();
  }

  function editDetails(e){
    var $td = $(e.target);
    var reqId = $td.attr("id");
    console.log("request id: " +  reqId);

    var reqObj = data.filter(o => o.requestId == reqId);
    console.log({ details: reqObj });

    var $tr = $td.closest('tr');

    var $newTr = $(`<tr>
      <td colspan="2"></td>
    </tr>`).insertAfter($tr);

    showDetails();
    var $detMod = $('div.details-module');
    $newTr.find('td').append( $detMod );


    // Add a new row (details module) below the selected row in the table.

  }

  function isLoggedIn() {
    return sessionStorage.getItem("isLoggedIn") == "true";
  }

  if ( isLoggedIn() ) {
    showTable();
  } else {
    showLogin();
  }

  $("button[name=login-button]").click(loginSubmit);

  $('button#new-req').click(showForm);

});
