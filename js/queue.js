$(function() {
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    
    function getCard(name) {
        var order = $("#queue_container").children().length + 1;
        var time = formatAMPM(new Date());
        return "<div class='queue_item card'><p class='queue_order'>" + order + "</p><h1 class='queue_name'>" + name + "</h1><small class='queue_extra'>Queued at " + time + "</small><div class='controls_wrap'><button class='edit'><i class='fas fa-pencil-alt'></i></button><button class='move_up'><i class='fas fa-angle-up'></i></button><button class='move_down'><i class='fas fa-angle-down'></i></button><button class='remove'><i class='fas fa-times-circle'></i></button></div>"
    }
    
    function updateOrder() {
        $(".queue_item").each(function(i) {
            $(this).children(".queue_order").text(i+1);
        });
    }
    
    $("#add").click(function() {
        $("#queue_container").append(getCard("Test"));
    })
    
    $("#queue_container").on("click", ".remove", function() {
        $(this).parents(".queue_item").remove();
        updateOrder();
    })
})