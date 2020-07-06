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

  var selReqObj;

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
          <td id="${ rowData["requestId"] }">
            <i class="fa fa-bars edit-action" aria-hidden="true"></i>
            <i class="fa fa-times close-action" aria-hidden="true"></i>
          </td>
        </tr>
        `);

      $tr.find('td i.edit-action').click(editDetails);
      $tr.find('td i.close-action').hide();

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
    var username = $("#username").val();
    console.log("Login Submitted.");
    sessionStorage.setItem("isLoggedIn", "true");

    if(username == "admin-man") {
      sessionStorage.setItem("isManager", "true");
    } else if(username == "admin-hr") {
      sessionStorage.setItem("isHr", "true");
    }

    showTable();
  }

  function isLoggedIn() {
    return sessionStorage.getItem("isLoggedIn") == "true";
  }

  function isManager() {
    return sessionStorage.getItem("isManager") == "true";
  }

  function isHr() {
    return sessionStorage.getItem("isHr") == "true";
  }

  if ( isLoggedIn() ) {
    showTable();
  } else {
    showLogin();
  }

  function handleIcons($td) {
    var $table = $td.closest('table')
    $table.find('i.edit-action').show();
    $table.find('i.close-action').hide();

    $td.find('i.close-action').show();
    $td.find('i.edit-action').hide();
  }

  function editDetails(e){
    var $td = $(e.target).closest('td');
    var reqId = $td.attr("id");

    handleIcons($td);

    console.log("request id: " +  reqId);

    selReqObj = data.find(o => o.requestId == reqId);

    console.log({ details: selReqObj });

    var $tr = $td.closest('tr');

    var $newTr = $(`<tr>
      <td colspan="2"></td>
    </tr>`).insertAfter($tr);

    showDetails();
    var $detMod = $('div.details-module');
    $newTr.find('td').append( $detMod );

    $('label.requestId').text(selReqObj.requestId);

  }

  $("button[name=login-button]").click(loginSubmit);

  $('button#new-req').click(showForm);

});
