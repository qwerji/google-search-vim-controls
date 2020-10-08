var preferences = {
    // NOTE(BTS): keep this in sync with script
    resultId: "gsvcfocused",
    resultsSelector: "#rso > [class=\"g\"]",
    linkSelector: "a",
    resultHighlightCss: "background: #E3FBE3;\nborder-radius: 8px;"
};
var defaultPreferences = JSON.parse(JSON.stringify(preferences));

var inputElts = document.querySelectorAll(".option");
for (var i = 0; i < inputElts.length; i++) {
    inputElts[i].addEventListener('change', function(event) {
        preferences[event.target.id] = event.target.value;
        savePreferences();
    });
}

recallPreferences();
function recallPreferences(cb) {
    // get user preferences
    chrome.storage.sync.get(['gsvc-prefs'], function(result) {
        if (result) {
            preferences = result['gsvc-prefs'];
            updateInputs();
        }
        updateInputs();
    });
}

function savePreferences() {
    chrome.storage.sync.set({'gsvc-prefs': preferences}, function() {
        // TODO(BTS): inform user
        console.log('saved');
    });
}

function updateInputs() {
    for (var i = 0; i < inputElts.length; i++) {
        inputElts[i].value = preferences[inputElts[i].id];
    }
}

document.querySelector("#revert").addEventListener('click', function() {
    console.log(preferences)
    console.log(defaultPreferences)
    preferences = defaultPreferences;
    defaultPreferences = JSON.parse(JSON.stringify(preferences));
    savePreferences();
    updateInputs();
});
