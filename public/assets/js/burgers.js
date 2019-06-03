// attach our handlers after the DOM is fully loaded
$(function() {

    // eat a burger
    $(".eatburger").on("click", function(event) {
        event.preventDefault();

        var id = $(this).data("id");
        var newDevouredState = {
            devoured: 1
        };

        // send the PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(
            function() {
                console.log("changed devoured to", newDevouredState);
                // reload the page to get the updated list
                location.reload();
            }
        );
    });

    // trash a burger
    $(".removeburger").on("click", function(event) {
        event.preventDefault();

        var id = $(this).data("id");

        // send the DELETE request
        $.ajax({
            type: "DELETE",
            url: "/api/burgers/" + id
        }).then(location.reload());
    });

    // add a burger
    $(".create-form").on("submit", function(event) {
        // make sure to preventDefault on a submit event
        event.preventDefault();

        var newBurger = {
            burger_name: $("#newburger").val().trim(),
            devoured: 0
        };

        // send the POST request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("created new burger");
                // reload the page to get the updated list
                location.reload();
            }
        );
    });

});