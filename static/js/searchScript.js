$("#updateSearch").on("click", () => {
    var filters = gatherFilters();
    $.ajax({
        url: "/api/filter",
        method: "POST",
        data: filters,
        success: (response) => {
            console.log(response);
        }
    });
});

$("#loadMore").on("click", () => {
    var filters = gatherFilters();
    filters.lastPropertyId = $($($(".card-block.px-2").last()).children()[2]).attr("href").split("/")[3];
    $.ajax({
        url: "/api/filter/later",
        method: "POST",
        data: filters,
        success: (response) => {
            console.log(response);
        }
    });
});

function gatherFilters(){
    var filters = {};

    // get the search filters
    if($("#type").val() !== "*")
        filters.type = $("#type").val();
    if($("#location").val() !== "*")
        filters.location = $("#location").val();

    filters.price = $("#priceRange").val();
    filters.beds = $("#minimumBeds").val();
    filters.rooms = $("#minimumRoom").val();

    return filters;
}