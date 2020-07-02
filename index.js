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

  function editDetails(e){
    var $req = $(e.target);
    var reqId = $req.attr("id");
    console.log("request id: " +  reqId);

    var reqObj = data.filter(o => o.requestId == reqId);
    console.log({ details: reqObj });

    // Add a new row (details module) below the selected row in the table.

  }

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

    for(let i = 0; i < data.length; i++) {
      var rowData = data[i];
      $(".table-module tbody").append(`
        <tr>
          <td>${ rowData["requestId"] }</td>
          <td id="${ rowData["requestId"] }" class="edit-action"> Edit Action </td>
        </tr>
        `);

        $(".edit-action").click(editDetails);
    }
    // Write your code to load data to the table.

  }

  function showForm() {

  }

  function showDetails() {

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

  function isLoggedIn() {
    return sessionStorage.getItem("isLoggedIn") == "true";
  }

  $(".login-form").click(loginSubmit);

  if ( isLoggedIn() ) {
    showTable();
  } else {
    showLogin();
  }

});
