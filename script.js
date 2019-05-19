// -- Google Search Vim Controls --
// Cycles through each result link using j and k like vim 

(function() {
    // Get all the search results links
    var results = document.querySelectorAll(".r > a:first-child");

    // Starting at -1 so that on load the initial focus will work
    var linkIndex = -1;

    var keyDown = function(e) {
        if(results.length < 1) return;

        var focusedElt = document.activeElement;
        if(focusedElt && focusedElt.nodeName.toLowerCase() == "input") return;

        var curLinkIndex = linkIndex;
        // Cycle focus through each link
        switch(e.key)
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
        if(linkIndex != curLinkIndex) {
            if(linkIndex < 0) {
                linkIndex = results.length - 1;
            } else if(linkIndex > results.length - 1) {
                linkIndex = 0;
            }
            results[linkIndex].focus();
        }
    };
    document.addEventListener("keydown", keyDown);
    
    // Focus the first link
    keyDown({ key: "j" });
})();

