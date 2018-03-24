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
    
    function updateName(index) {
        var child = index + 1;
        $("#rename_dialog").show();
        $("#rename_confirm").click(function() {
            if( $("#rename_input").val().length > 0 ) {
                $(".queue_item:nth-child(" + child + ")").children("h1").text($("#rename_input").val());
            }
            $(".dialog_input").val("");
            $("#rename_dialog").hide();
        })
    }
    
    $("#add").click(function() {
        $("#add_dialog").show();
    })
    
    $("#add_confirm").click(function() {
        if( $("#name_input").val().length > 0 ) {
            $("#queue_container").append(getCard($("#name_input").val()));
            $(".dialog_input").val("");
            $("#add_dialog").hide();
        }
    })

    $(".close").click(function() {
        $(".dialog_input").val("")
        $(".dialog").hide();
    })
    
    $("#queue_container").on("click", ".edit", function() {
        var targetIndex = $(this).parents(".queue_item").index();
        updateName( targetIndex );
    })
    
    $("#queue_container").on("click", ".remove", function() {
        $(this).parents(".queue_item").remove();
        updateOrder();
    })
})