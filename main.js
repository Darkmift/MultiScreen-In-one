var target_id;
//side button bottom right
$(document).ready(function() {
  $(".fixed-action-btn").floatingActionButton();
  //modal init
  $(".modal").modal();
});

$("#approve").click(function(e) {
  e.preventDefault();
  let screen_count = $("#screen_count").val();
  console.log("TCL: screen_count", screen_count);
  if (screen_count > 0) {
    let container = $(".container");
    for (let index = 0; index < screen_count; index++) {
      iframeContainerRender($(".iframe_container_div").length + 1).appendTo(
        container
      );
    }
  }
});

$("#add_one").click(function(e) {
  let container = $(".container");
  console.log("TCL: container", container);
  iframeContainerRender($(".iframe_container_div").length + 1).appendTo(
    container
  );
});

$("#remove_all").click(function(e) {
  $(".container").empty();
});

$("#approve_url").click(function(e) {
  e.preventDefault();
  let url = $("#set_url").val();
  console.log("TCL: url", url);
  $(`#${target_id}`)
    .find("iframe")
    .remove();
  $(`#${target_id}`).append(iframeRender(url));
  target_id = null;
  $("#set_url").val("");
});

$("#delFrame").click(function(e) {
  e.preventDefault();
  let id = $(this).attr("data-target");
  $(`#${id}`).remove();
});

function iframeRender(url) {
  let iframe = $("<iframe>", {
    src: url,
    frameborder: 1
  });
  return iframe;
}

function frameButtonsRender(id) {
  let btn_container = $("<div>", {
    class: "btn_container"
  });

  let i_resize = $("<i>", {
    text: "switch_camera",
    class: "material-icons"
  });

  let i_url = $("<i>", {
    text: "create",
    class: "material-icons"
  });

  let resize = $("<button>", {
    class: "btn waves-effect waves-light iframe_btn modal-trigger",
    href: "#modal3"
  }).append(i_resize);

  resize.click(function(e) {
    // e.preventDefault();
    let url = $(`#${id}`)
      .find("iframe")
      .attr("src");
    $(".currentFrame").attr("src", url);
    // $('#currentFrame').append(iframeRender(url));
  });

  let change_url = $("<button>", {
    class: "btn waves-effect waves-light iframe_btn modal-trigger",
    href: "#modal2"
  }).click(function(e) {
    e.preventDefault();
    target_id = $(this).attr("id");
  });

  change_url.append(i_url);

  resize.appendTo(btn_container);
  change_url.appendTo(btn_container);
  return btn_container;
}

function iframeContainerRender(id) {
  let i_delete = $("<i>", {
    text: "delete",
    class: "material-icons"
  });

  let del_btn = $("<button>", {
    class:
      "btn waves-effect waves-light red iframe_btn delete_iframe modal-trigger",
    href: "#modal4"
  }).append(i_delete);

  del_btn.click(function(e) {
    e.preventDefault();
    $("#delFrame").attr("data-target", id);
  });

  let div = $("<div>", {
    id: id,
    class: "iframe_container_div modal-trigger col-s12",
    href: "#modal2"
  });

  del_btn.appendTo(div);
  frameButtonsRender(id).appendTo(div);

  div.click(function(e) {
    e.preventDefault();
    target_id = $(this).attr("id");
  });

  return div;
}
