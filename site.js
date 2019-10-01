function show_project(button_id){
    console.log($("#"+button_id).text());
    document.title = $("#"+button_id).text();
    $("#about").hide();
    $("#project-view").show();
    $("#project-view").attr("src", $("#"+button_id).attr("href"));
}

function to_about(){
    document.title = "Моя страничка";
    $("#about").show();
    $("#project-view").hide();   
}