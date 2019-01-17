$(".delete").on("click", (event) => {
    var id = event.target.id.split("-")[1];
    var answer = confirm(`Are you sure you want to delete ${id}?`);
    
    if(answer)
        $.ajax({
            url: "/admin/property/delete",
            method: "POST",
            data: {
                id: id
            },
            success: (response) => {
                if(response.id){
                    $(event.target).parent().parent().hide();
                    alert(`Element id=${id} deleted`);
                } else {
                    alert("Cannot delete the selected item.");
                }
            },
            error: (err) => {
                alert("Cannot delete");
            }
        })
});

$(".delete-user").on("click", (event) => {
    var id = event.target.id.split("-")[1];
    var answer = confirm(`Are you sure you want to delete ${id} user? All their records will be deleted as well`);

    if(answer){
        $.ajax({
            url: "/admin/users/delete",
            method: "POST",
            data: {
                id: id
            },
            success: (response) => {
                console.log(response);
                if(response.id){
                    $(event.target).parent().parent().hide();
                } else if(response.error) {
                    alert("An error occured");
                }
            },
            error: (err) => {
                alert("Cannot delete");
            }
        })
    }
});

$(".update-btn").on("click", (event) => {
    var inputField = $($(event.target).parent()).siblings()[0];
    var name = $(inputField).attr("name");
    var value = $(inputField).val();
    var id = $("#id").val();
    var obj = {};
    obj[name] = value;

    $.ajax({
        url: "/admin/property/update",
        method: "POST",
        data: {
            id: id,
            query: obj
        },
        success: (response) => {
            alert(response);
        },
        error: (error) => {
            alert(error);
        }
    })
});

$(".update-btn-user").on("click", (event) => {
    var inputField = $($(event.target).parent()).siblings()[0];
    var name = $(inputField).attr("name");
    var value = $(inputField).val();
    var id = $("#id").val();
    var obj = {};
    obj[name] = value;

    $.ajax({
        url: "/admin/users/update",
        method: "POST",
        data: {
            id: id,
            query: obj
        },
        success: (response) => {
            if(response == 1)
                alert("Updated");
        },
        error: (error) => {
            alert(error);
        }
    })
});

$(".delete-info").on("click", (event) => {
    var id = event.target.id.split("-")[1];
    var answer = confirm(`Are you sure you want to delete ${id}?`);

    if(answer){
        $.ajax({
            url: "/admin/info/delete",
            method: "POST",
            data: {
                id: id
            },
            success: (response) => {
                console.log(response);
                if(response.error) {
                    alert("An error occured");
                } else {
                    $(event.target).parent().parent().hide();
                } 
            },
            error: (err) => {
                alert("Cannot delete");
            }
        })
    }
});

$(".update-btn-info").on("click", (event) => {
    var inputField = $($(event.target).parent()).siblings()[0];
    var name = $(inputField).attr("name");
    var value = $(inputField).val();
    var id = $("#id").val();
    var obj = {};
    obj[name] = value;

    $.ajax({
        url: "/admin/info/update",
        method: "POST",
        data: {
            id: id,
            query: obj
        },
        success: (response) => {
            if(response.error)
                alert("error occured");
            else 
                alert("Updated");
        },
        error: (error) => {
            alert(error);
        }
    })
});