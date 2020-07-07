$(function(){

  var data = [
    {
      "requestId": 1,
      "projectName": "Proj-1",
      "projectManager": "Man-1",
      "poc": "POC-1",

    },
    {
      "requestId": 2,
      "projectName": "Proj-2",
      "projectManager": "Man-2",
      "poc": "POC-2",
    },
    {
      "requestId": 3,
      "projectName": "Proj-3",
      "projectManager": "Man-3",
      "poc": "POC-3",
    }
  ];

  var selReqObj;

  /**
  Closes all the 4 modules in view.
  **/
  function hideAll() {
    $(".module").hide();
  }

  /**
  Displays only the login form while hiding all the other views.
  **/
  function showLogin() {
    hideAll();
    $(".login-module").show();
  }


  function showTable() {
    hideAll();
    $(".table-module").show();

    var $tbody = $(".table-module tbody");

    $tbody.empty();

    for(let i = 0; i < data.length; i++) {
      var rowData = data[i];

      var $tr = $(`
        <tr>
          <td>${ rowData["requestId"] }</td>
          <td>${ rowData["projectManager"] }</td>
          <td>${ rowData["poc"] }</td>
          <td id="${ rowData["requestId"] }">
            <i class="fa fa-bars edit-action" aria-hidden="true"></i>
            <i class="fa fa-times close-action" aria-hidden="true"></i>
          </td>
        </tr>
        `);

      $tr.find('td i.edit-action').click(editDetails);
      $tr.find('td i.close-action').click(closeDetails)
      $tr.find('td i.close-action').hide();

      $tbody.append($tr);

    }

  }

  function showForm(e) {
    hideAll();

    var $form = $(".form-module");
    $form.show();
    if(e) {
      $form.find('label[for="requestId"], label.requestId').hide();
    }
    selReqObj = undefined;
    $('input.managerName').val('');
    $('input.poc').val('');
  }

  function showDetails() {
    $(".details-module").show();
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

  function handleIcons($td) {
    var $table = $td.closest('table')
    $table.find('i.edit-action').show();
    $table.find('i.close-action').hide();

    $td.find('i.close-action').show();
    $td.find('i.edit-action').hide();

    closeDetails();
  }

  function closeDetails(e){
    $('div.details-module.detail-copy').remove();
    $('div.form-module.form-copy').remove();
    if(e) {
      $('table tr td i.close-action').hide();
      $('table tr td i.edit-action').show();
    }
  }

  function setDetailValues(){
    $('label.requestId').text(selReqObj.requestId);
    $('label.managerName').text(selReqObj.projectManager);
    $('label.poc').text(selReqObj.poc);
  }

  function setEditFormValues(){
    $('input.managerName').val(selReqObj.projectManager);
    $('input.poc').val(selReqObj.poc);
  }

  function editDetails(e){
    var $td = $(e.target).closest('td');
    var reqId = $td.attr("id");
    var $tr = $td.closest('tr');

    var $newTr = $(`<tr>
      <td colspan="2"></td>
    </tr>`).insertAfter($tr);

    handleIcons($td);
    selReqObj = data.find(o => o.requestId == reqId);

    // showDetails();
    var $detMod = $('div.details-module').clone();
    $detMod.addClass('detail-copy').show();
    $newTr.find('td').append( $detMod );

    setDetailValues(selReqObj);

    $detMod.find('.req-details-edit').click(function(){
      closeDetails();
      var $formMod = $('div.form-module').clone();
      $formMod.addClass('form-copy').show();
      $formMod.find('label[for="requestId"], label.requestId').show();
      $formMod.find('i.close-form-icon').hide();
      $newTr.find('td').append( $formMod );
      setEditFormValues();
    });

  }

  function reqFormSubmit(e){

  }

  if ( isLoggedIn() ) {
    showTable();
  } else {
    showLogin();
  }

  $("button[name=login-button]").click(loginSubmit);

  $('button#new-req').click(showForm);

  $('.close-form-icon').click(showTable);


  // $('table tr td i.close-action:visible').trigger('click');

});
