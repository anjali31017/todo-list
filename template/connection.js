

$(document).ready(function() {
    $("#task-form").submit(function(event) {
      event.preventDefault();
  
      var title = $("#title").val();
  
      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8000/task-create/",
        data: JSON.stringify({ title: title }),
        contentType: "application/json",
        success: function(response) {
          if (response.status == 201) {
            $("#msg").html("Task added successfully!");
            $("#msg").delay(5000).fadeOut(1000);
            $("#title").val("");
          } else {
            $("#msg").html("Error: " + response.message);
            $("#msg").delay(5000).fadeOut(1000);
          }
        },
        error: function(xhr, status, error) {
          $("#msg").html("Error: " + error);
          $("#msg").delay(5000).fadeOut(1000);
        }
      });
    });

    
    var settings = {
        "url": "http://127.0.0.1:8000/task-list/",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
    
        "statusCode": {
            500: function (response) {
              $("#msg").html("Error occured");
              $("#msg").delay(5000).fadeOut(1000);
            },
          },
      };
      
      $.ajax(settings).done(function (response) {
            if (response.status == 200) {
                var tasks = response.tasks;
                $.each(tasks, function(index, task) {
                    $("#task-list").append("<li>" + task.title + "</li>");
                });
            }
      });
    






    // function listTask(){

    //     var tablebody = $('#table-body tr');
    //     tablebody.empty();
          
    //     var form = new FormData();
    //     form.append("self_id", id);
    //     form.append("get_id", get_id);
    //     form.append("category", category);
    //     let token = localStorage.getItem("token");
    //     let tkn = JSON.parse(token);
    //     let access_token;
    //     if (tkn != null) {
    //         access_token = tkn.access;
    //     }


          
            // var settings = {
            //   "url": "http://127.0.0.1:8000/api/get-records/",
            //   "method": "POST",
            //   "timeout": 0,
            //   "headers": {
            //     "Authorization": `Bearer ${access_token}`,
            //   },
            //   "processData": false,
            //   "mimeType": "multipart/form-data",
            //   "contentType": false,
            //   "data": form,
            //   "statusCode": {
            //     404: function (response) {
            //       alert("Invalid details");
            //     },
            //     400: function (response) {
            //       alert("Request Failed");
            //     },
            //     401: function (response) {
            //       localStorage.removeItem("token");
            //       localStorage.removeItem("userData");
            //       window.location.href = "patient-login.html";
            //     },
            //   },
            // };
            // $.ajax(settings).done(function (response) {
          
            //   var json_data = jQuery.parseJSON(response);
            //   var data = ''
            //   var i = 0;
          
            //   $.each(json_data, function (key, value) {
          
            //     date_time = value.updated_at
            //     var split_date_time = date_time.split("T");
            //     var time = split_date_time[1].split(".");
          
            //     i += 1;
            //     data += '<tr>';
            //     data += '<td>' + i + '</td>'
          
            //     var dt = value.data_type;
            //     var d = "";
            //     $.each(dt.split(","), function (key, value) {
            //       d += value + "<br>";
            //     });
          
            //     data += '<td>' + d + '</td>'
            //     data += '<td> <a value="' + value.uploaded_by.category + '" href="" class="get-profile" id="' + value.uploaded_by.id + '">' + value.uploaded_by.first_name + ' ' + value.uploaded_by.last_name + '<a></td>'
            //     data += '<td> <a value="' + value.uploaded_to.category + '" href="" class="get-profile" id="' + value.uploaded_to.id + '">' + value.uploaded_to.first_name + ' ' + value.uploaded_to.last_name + '<a></td>'
            //     data += '<td> <a class="uploaded_to" href="http://127.0.0.1:5500' + value.uploaded_file + '" target="_blank" >View Here...<a></td>'
            //     if (value.description == null) {
            //       value.description = "-";
            //     }
          
            //     data += '<td>' + value.description + '</td>'
            //     data += '<td>' + split_date_time[0] + "  " + time[0] + '</td>'
            //     data += '<td style="text-align:center"><button id="edit-report" value="' + value.data_id + '" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenterEdit">EDIT</button></td>'
            //     data += '<td style="text-align:center"><button id="delete-report" value="' + value.data_id + '" type="button" class="btn btn-danger btn-sm"">DELETE</button></td>'
          
            //   });
            //   $('#table-body').append(data);
          
            // });
          
    

  });