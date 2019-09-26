//side button bottom right
$(document).ready(function() {
    $('.fixed-action-btn').floatingActionButton();
});

//modal init

$(document).ready(function() {
    $('.modal').modal();
});



// screen_count
$('#approve').click(function(e) {
    e.preventDefault();
    let screen_count = $('#screen_count').val();
    console.log("TCL: screen_count", screen_count)
    if (screen_count > 0) {
        let container = $('.container');
        for (let index = 0; index < screen_count; index++) {
            iframeContainerRender(index + 1)
                .appendTo(container)
        }
    }
});

//set url
// $('.iframe_container_div').click(function(e) {
//     // e.preventDefault();
//     console.log('test: ', $(this).attr('id'))
//         //modal2
// });

// $('iframe').on('load', function() {
//     $(this).contents().find("body").on('click', function(event) { console.log('test'); });
// });

function iframeRender(url) {
    let iframe = $('<iframe>', {
        src: null,
        id: id,
        frameborder: 1
    });
    return iframe;
}

function iframeContainerRender(id) {
    return $('<div>', {
        id: id,
        class: 'iframe_container_div modal-trigger',
        href: "#modal2"
    }).click(function(e) {
        e.preventDefault();
        console.log('id: ', $(this).attr('id'))
            //modal2
    });
}