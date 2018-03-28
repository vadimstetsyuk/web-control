$('.tabs').tabs();
drawCircle();

$(`#auto-mode`).click((e) => {
    drawMap();
});

function drawCircle() {
    var $circle = $('#circle'),
        $handler = $('#handler'),
        $p = $('#test'),
        handlerW2 = $handler.width() / 2,
        rad = $circle.width() / 2,
        offs = $circle.offset(),
        elPos = { x: offs.left, y: offs.top },
        mHold = 0,
        PI2 = Math.PI / 180;
    $handler.mousedown(function () { mHold = 1; });
    $(document).mousemove(function (e) {
        if (mHold) {
            var mPos = { x: e.pageX - elPos.x, y: e.pageY - elPos.y },
                atan = Math.atan2(mPos.x - rad, mPos.y - rad),
                deg = -atan / PI2 + 180,
                perc = (deg * 100 / 360) | 0,
                X = Math.round(rad * Math.sin(deg * PI2)),
                Y = Math.round(rad * -Math.cos(deg * PI2));
            $handler.css({ left: X + rad - handlerW2, top: Y + rad - handlerW2, transform: 'rotate(' + deg + 'deg)' });

            // --------------------- That's it.
            $circle.css({ borderColor: "hsl(200,70%," + (perc * 70 / 100 + 30) + "%)" });
            // $p.html(perc).css({ color: "hsl(200,70%," + (perc * 70 / 100 + 30) + "%)" });
            $p.text(deg | 0);

        }
    }).mouseup(function () { mHold = 0; });
}

function drawMap() {
    let content = ``;
    for (let i = 0; i < 120; i++) {
        let row = `<div class="data-row">`;

        for (let j = 0; j < 200; j++) {
            row += `<div class="data-column" row-id="${i + 1}"></div>`;
        }

        row += `</div>`;

        content += row;
    }

    $(`.map`).html(content);
}