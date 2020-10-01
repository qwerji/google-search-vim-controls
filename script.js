// -- Google Search Vim Controls --
// Cycles through each result link using j and k like vim 

(function() {

    var focusedSelector = "gsvcfocused";

    // insert custom style tag
    var style = document.createElement("style");
    style.textContent = "#" + focusedSelector + " { background: #E3FBE3; border-radius: 8px; }";
    document.head.appendChild(style);

    // Get all the search results - only doing the regular text links
    var results = document.querySelectorAll("#rso > [class=\"g\"]");

    // Starting at -1 so that on load the initial focus will work
    var linkIndex = -1;

    function keydown(e) {
        if (results.length < 1) return;

        // remove styling for all results
        for (var i = 0; i < results.length; i++) {
            results[i].id = "";
        }

        var focusedElt = document.activeElement;
        if (focusedElt && focusedElt.nodeName.toLowerCase() === "input") return;

        var curLinkIndex = linkIndex;
        // Cycle focus through each link
        switch (e.key)
        {
            case "j":
            {
                linkIndex++;
            } break;
            case "k":
            {
                linkIndex--;
            } break;
            default: break;
        }
        
        // Only focus if the linkIndex has changed
        if (linkIndex !== curLinkIndex) {
            if (linkIndex < 0) {
                linkIndex = results.length - 1;
            } else if(linkIndex > results.length - 1) {
                linkIndex = 0;
            }
            // focus the link, apply selector to result element
            var link = results[linkIndex].querySelector("a");
            if (link) {
                link.focus();
            }
            results[linkIndex].id = focusedSelector;
        }
    }

    document.addEventListener("keydown", keydown);
})();

