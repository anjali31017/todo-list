

$(document).ready(function () {
    $("#task-form").submit(function (event) {
        event.preventDefault();

        var title = $("#title").val();

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8000/task-create/",
            data: JSON.stringify({ title: title }),
            contentType: "application/json",
            success: function (response) {
                if (response.status == 201) {
                    $("#msg").html("Task added successfully!");
                    $("#msg").delay(5000).fadeOut(1000);
                    $("#title").val("");
                    updateTaskTable();
                } else {
                    $("#msg").html("Error: " + response.message);
                    $("#msg").delay(5000).fadeOut(1000);
                }
            },
            error: function (xhr, status, error) {
                $("#msg").html("Error: " + error);
                $("#msg").delay(5000).fadeOut(1000);
            }
            
        });
        // updateTaskTable();

    });

    
    function updateTaskTable() {
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
            $("#task-table tbody").empty();
            var tasks = response.task;
            if (tasks.length === 0) {
                $("#task-table tbody").append("<tr><td>No Tasks!</td></tr>");
            }
            else {
                for (let i = 0; i < tasks.length; i++) {
                    let task = tasks[i];
                    $("#task-table tbody").append("<tr><td>" + task.title + "</td></tr>");
                }
            }
        }
    });
    }
    updateTaskTable();
});