//side button bottom right
$(document).ready(function() {
    $('.fixed-action-btn').floatingActionButton();
});

var target_id;
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

$('#approve_url').click(function(e) {
    e.preventDefault();
    let url = $('#set_url').val();
    console.log("TCL: url", url);
    $(`#${target_id}`).find('iframe').remove();
    $(`#${target_id}`).append(iframeRender(url))
    target_id = null;
});

function iframeRender(url) {
    let iframe = $('<iframe>', {
        src: url,
        frameborder: 1
    });
    return iframe;
}

function iframeContainerRender(id) {

    let i_resize = $('<i>', {
        text: 'switch_camera',
        class: 'material-icons'
    });
    let i_url = $('<i>', {
        text: 'create',
        class: 'material-icons'
    });

    let resize = $('<button>', {
        class: 'btn waves-effect waves-light iframe_btn modal-trigger',
        href: "#modal3"
    }).append(i_resize);
    resize.click(function(e) {
        // e.preventDefault();
        let url = $(`#${id}`).find('iframe').attr('src');
        $('.currentFrame').attr('src',url);
        // $('#currentFrame').append(iframeRender(url));
    });

    let change_url = $('<button>', {
        class: 'btn waves-effect waves-light iframe_btn modal-trigger',
        href: "#modal2"
    }).click(function(e) {
        e.preventDefault();
        target_id = $(this).attr('id');
    });

    change_url.append(i_url);

    let btn_container = $('<div>', {
        class: 'btn_container'
    });

    let div = $('<div>', {
        id: id,
        class: 'iframe_container_div modal-trigger col-s12',
        href: "#modal2"
    })



    resize.appendTo(btn_container);
    change_url.appendTo(btn_container);
    btn_container.appendTo(div)

    div.click(function(e) {
        e.preventDefault();
        target_id = $(this).attr('id');
    });

    return div;
}