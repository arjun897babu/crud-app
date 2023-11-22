
// $("#add_user").submit(function(event){
 

//     alert('Data added')

// }) 

$('#update_user').submit(function(event){
  event.preventDefault();
  var unindexed_array = $(this).serializeArray();
  var data = {}
  $.map(unindexed_array,function(n,i){
    data[n['name']] = n['value']
  })
  console.log(data);

  var request = {
    'url':`http://localhost:3001/api/users/${data.id}`,
    'method' : 'PUT',
    'data':data,
  }
  $.ajax(request).done(function(response){
    // alert('Data updated successfully');
    window.location.href = '/'; 
  })
})


if(window.location.pathname==('/')){
  $ondelete = $('.table tbody td a.delete');
  $ondelete.click(function(){
    var id = $(this).attr('data-id')

    var request = {
      'url':`http://localhost:3001/api/users/${id}`,
      'method' : 'DELETE',
      
    }

    if(confirm('Do you really wan to proceed?')){
      $.ajax(request).done(function(response){
        alert('Data deleted successfully');
        location.reload()
      })
    }

  })
}


$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
}); 