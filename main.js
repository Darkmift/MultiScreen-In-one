var target_id;
var lsh = new LSH();
const stored_data = lsh.get("stored_data")
  ? lsh.get("stored_data")
  : lsh.set("stored_data", {});

//side button bottom right
$(document).ready(function() {
  $(".fixed-action-btn").floatingActionButton();
  //modal init
  $(".modal").modal({
    dismissible: false,
    complete: function() {
      $("input").each(function(index, element) {
        $(element).val("");
      });
    }
  });

  for (const key in stored_data) {
    if (stored_data.hasOwnProperty(key)) {
      const url = stored_data[key];
      let container = $(".container");
      let frameDiv = iframeContainerRender(
        Object.keys(stored_data).indexOf(key)
      );
      let iframe = iframeRender(url);

      iframe.appendTo(frameDiv);
      frameDiv.appendTo(container);
    }
  }
});

$(".cancel").click(function(e) {
  $("input").each(function(index, element) {
    $(element).val("");
  });
});

$("#approve").click(function(e) {
  e.preventDefault();
  let screen_count = $("#screen_count").val();
  console.log("TCL: screen_count", screen_count);
  if (screen_count > 0) {
    let container = $(".container");
    for (let index = 0; index < screen_count; index++) {
      iframeContainerRender(Object.keys(stored_data).length + 1).appendTo(
        container
      );
    }
  }
});

$("#add_one").click(function(e) {
  let container = $(".container");
  console.log("TCL: container", container);
  iframeContainerRender(Object.keys(stored_data).length + 1).appendTo(
    container
  );
});

$("#remove_all").click(function(e) {
  $(".container").empty();
  lsh.set("stored_data", {});
});

$("#approve_url").click(function(e) {
  e.preventDefault();
  let url = $("#set_url").val();
  $(`#${target_id}`)
    .find("iframe")
    .remove();
  $(`#${target_id}`).append(iframeRender(url));
  if (stored_data.hasOwnProperty(target_id)) {
    stored_data[target_id] = url;
  } else {
    stored_data_length = Object.keys(stored_data).length;
    stored_data[stored_data_length + 1] = url;
  }

  save(stored_data);
  target_id = null;
  $("#set_url").val("");
});

$("#delFrame").click(function(e) {
  e.preventDefault();
  let id = $(this).attr("data-target");
  $(`#${id}`).remove();
  if (stored_data.hasOwnProperty(id)) {
    delete stored_data[id];
    save(stored_data);
  }
});

function iframeRender(url) {
  let iframe = $("<iframe>", {
    src: url,
    frameborder: 1
  });
  return iframe;
}

function buttonRender(iconElement, buttonElement) {
  return $(buttonElement).append($(iconElement));
}

function frameButtonsRender(id) {
  let btn_container = $("<div>", {
    class: "btn_container"
  });

  let resize = buttonRender(
    $("<i>", {
      text: "switch_camera",
      class: "material-icons"
    }),
    $("<button>", {
      class: "btn waves-effect waves-light iframe_btn modal-trigger",
      href: "#modal3"
    })
  );

  resize.click(function(e) {
    let url = $(`#${id}`)
      .find("iframe")
      .attr("src");
    $(".currentFrame").attr("src", url);
  });

  let change_url = buttonRender(
    $("<i>", {
      text: "create",
      class: "material-icons"
    }),
    $("<button>", {
      class: "btn waves-effect waves-light iframe_btn modal-trigger",
      href: "#modal2",
      parent_id: id
    })
  );

  change_url.click(function(e) {
    e.preventDefault();
    target_id = $(this).attr("parent_id");
  });

  resize.appendTo(btn_container);
  change_url.appendTo(btn_container);
  return btn_container;
}

function iframeContainerRender(id) {
  let del_btn = buttonRender(
    $("<i>", {
      text: "delete",
      class: "material-icons"
    }),
    $("<button>", {
      class:
        "btn waves-effect waves-light red iframe_btn delete_iframe modal-trigger",
      href: "#modal4"
    })
  );

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

function save(stored_data) {
  lsh.set("stored_data", stored_data);
}
