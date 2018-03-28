$(function() {
    
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCGeh7eVEMy-zFw8Gv4-j-_axG-4NHK8Kg",
        authDomain: "beam-laser-cutter-queue.firebaseapp.com",
        databaseURL: "https://beam-laser-cutter-queue.firebaseio.com",
        projectId: "beam-laser-cutter-queue",
        storageBucket: "beam-laser-cutter-queue.appspot.com",
        messagingSenderId: "41243919532"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    
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
    
    function getQueueLength() {
        return $("#queue_container").children().length;
    }
    
    function getCard(name) {
        var order = getQueueLength() + 1;
        var time = formatAMPM(new Date());
        return "<div class='queue_item card'><p class='queue_order'>" + order + "</p><h1 class='queue_name'>" + name + "</h1><small class='queue_extra'>Queued at " + time + "</small><div class='controls_wrap'><button class='edit'><i class='fas fa-pencil-alt'></i></button><button class='move_up'><i class='fas fa-angle-up'></i></button><button class='move_down'><i class='fas fa-angle-down'></i></button><button class='remove'><i class='fas fa-times-circle'></i></button></div>"
    }
    
    function updateOrder() {
        $(".queue_item").each(function(i) {
            $(this).children(".queue_order").text(i+1);
        });
    }
    
    var updateIndex = 0;
    
    function updateName() {
        $("#rename_dialog").show();
        $("#rename_input").focus();
        $("#rename_confirm").click(function() {
            if( $("#rename_input").val().length > 0 ) {
                $(".queue_item:nth-child(" + updateIndex + ")").children("h1").text($("#rename_input").val());
            }
            $(".dialog_input").val("");
            $("#rename_dialog").hide();
        })
    }
    
    function getLaserStatus() {
        var status = new Array();
        var laserLeft = $(".laser_card:nth-child(3)").attr("data-status");
        var laserRight = $(".laser_card:nth-child(2)").attr("data-status");
        status.push(laserLeft);
        status.push(laserRight);
        return status;
    }
    
    $("#add").click(function() {
        $("#add_dialog").show();
        $("#name_input").focus();
    })
    
    $("#add_confirm").click(function() {
        if( $("#name_input").val().length > 0 ) {
            $("#queue_container").append(getCard($("#name_input").val()));
            $(".dialog_input").val("");
            $("#add_dialog").hide();
        }
    })
    
    var targetLaser = 0;
    var laserStatus = "";
    
    $(".set_status").click(function() {
        targetLaser = $(this).parents(".laser_card").index()+1;
        $("#status_dialog").show();
    })
    
    $(".status_button").click(function() {
        $(".status_button").removeClass("active");
        $(this).addClass("active");
        laserStatus = $(this).attr("data-val");
    })

    $("#status_confirm").click(function() {
        $(".laser_card:nth-child(" + targetLaser + ")").attr("class", "laser_card card " + laserStatus);
        $(".laser_card:nth-child(" + targetLaser + ")").attr("data-status", laserStatus);
        $(".dialog").hide();
    })
    
    $(".close").click(function() {
        $(".dialog_input").val("")
        $(".dialog").hide();
    })
    
    $("#queue_container").on("click", ".edit", function() {
        updateIndex = $(this).parents(".queue_item").index()+1;
        updateName();
    })
    
    $("#queue_container").on("click", ".remove", function() {
        $(this).parents(".queue_item").remove();
        updateOrder();
    })
    
    $("#queue_container").on("click", ".move_up", function() {
        var numberInQueue = getQueueLength();
        var currentIndex = $(this).parents(".queue_item").index();
        var targetIndex = currentIndex-1;
        if(currentIndex != 0) {
            
        }
        updateName();
    })
    
    $("#advance").click(function() {
        var status = getLaserStatus();
        if( $("#queue_container").children().length > 0 ) {
            var nextUser = $(".queue_item:nth-child(1)").children(".queue_name").text().toUpperCase();
            if( status[0] == "available" ) {
                $(".laser_card:nth-child(3)").attr("class", "laser_card card inuse");
                $(".laser_card:nth-child(3)").attr("data-status", "inuse");
                $(".laser_card:nth-child(3)").children(".inuse_label").empty();
                $(".laser_card:nth-child(3)").children(".inuse_label").append( "<span><i class='fas fa-clock'></i></span> " + nextUser);
                $(".queue_item:nth-child(1)").remove()
                updateOrder()
            } else if( status[1] == "available" ) {
                $(".laser_card:nth-child(2)").attr("class", "laser_card card inuse");
                $(".laser_card:nth-child(2)").attr("data-status", "inuse");
                $(".laser_card:nth-child(2)").children(".inuse_label").empty();
                $(".laser_card:nth-child(2)").children(".inuse_label").append( "<span><i class='fas fa-clock'></i></span> " + nextUser);
                $(".queue_item:nth-child(1)").remove()
                updateOrder()
            } else if( status[0] != "available" && status[1] != "available" ) {
                $("#bubble #message").text("No laser available");
                $("#bubble").clearQueue().fadeIn(100).delay(3000).fadeOut(1000);
            }
        } else {
            //alert("Queue is empty!")
            $("#bubble #message").text("Queue is empty");
            $("#bubble").clearQueue().fadeIn(100).delay(3000).fadeOut(1000);
        }
    })
    
})