window.addEventListener("load", () => {
    window.toast = function(message, background = "bg-info"){
        let exist = document.querySelectorAll(".toast-message");
        exist.forEach(x => {
            x.animated && this.clearTimeout(x.animated);
            x.style.transition = "0.35s";
            x.style.opacity = "0";
            setTimeout(() => {
                x.remove();
            }, 350);
        });

        let $elem = document.createElement("div");
        $elem.classList.add("toast-message", background);
        $elem.innerText = message;
        $elem.style.opacity = 0;
        $elem.style.marginBottom = "0";
        $elem.style.transform = "translate(-50%) scale(0.8)";
        $elem.style.transition = "0.5s";
        document.body.append($elem);
        
        $elem.animated = setTimeout(() => {
            $elem.style.opacity = 1;
            $elem.style.marginBottom = "20px";
            $elem.style.transform = "translate(-50%) scale(1)";

            $elem.animated = setTimeout(() => {
                $elem.style.transition = "0.35s"

                $elem.animated = setTimeout(() => {
                    $elem.style.opacity = 0;
                    $elem.style.marginBottom = "0px";
                    $elem.style.transform = "translate(-50%) scale(0.8)";

                    $elem.animated = setTimeout(() => {
                        // $elem.remove();
                    }, 350);
                }, 2000);
            }, 500);
        });
    }
});