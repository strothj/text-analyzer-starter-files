function parseSentences(text) {
    var s = text.split(/\s*[\.!?]+\s*/).filter(Boolean);
    for (var i in s) {
        s[i] = s[i].toLowerCase();
    }
    return s;
}

function parseWords(text) {
    var s = text.split(/[()",]*[\s]+[()",]*/).filter(Boolean);
    return s;
}

function analyzeText() {
    var result = {
        wordCount: 0,
        letterCount: 0,
        sentCount: 0
    };
    var wordTracker = {};

    var sentences = parseSentences($(".js-text").val());
    for (var j in sentences) {
        var s = sentences[j];
        result.sentCount++;

        var words = parseWords(s);
        for (var k in words) {
            var w = words[k];
            if (!wordTracker[w]) wordTracker[w] = true;
            result.letterCount += w.length;
            result.wordCount++;
        }
    }
    result.avgWordLength = result.letterCount / result.wordCount;
    result.uniqueWords = Object.keys(wordTracker).length;
    result.avgSentenceLen = result.wordCount / result.sentCount;

    return result;
}

function presentFindings(stats) {
    $(".js-report").removeClass("hidden");
    $(".js-report-word-count").text(stats.wordCount);
    $(".js-report-unique-word-count").text(stats.uniqueWords);
    $(".js-report-average-word-length").text(stats.avgWordLength.toFixed(2) + " characters");
    $(".js-report-average-sentence-length").text(stats.avgSentenceLen.toFixed(2) + " words");
}

function handleSubmit() {
    $(".js-form").submit(function (event) {
        event.preventDefault();

        var stats = analyzeText();
        presentFindings(stats);
    });
}

$(function () {
    handleSubmit();
});

function testParseSentences() {
    var text = "That was a memorable day to me, for it made great changes in me? But it is the same with any life. Imagine one selected day struck out of it, and think how different its course would have been. Pause you who read this, and think for a moment of the long chain of iron or gold, of thorns or flowers, that would never have bound you, but for the formation of the first link on one memorable day!";
    var expected = [
        "that was a memorable day to me, for it made great changes in me",
        "but it is the same with any life",
        "imagine one selected day struck out of it, and think how different its course would have been",
        "pause you who read this, and think for a moment of the long chain of iron or gold, of thorns or flowers, that would never have bound you, but for the formation of the first link on one memorable day"
    ]
    var actual = parseSentences(text);
    if (!actual || expected.length !== actual.length) {
        console.log("parseSentences:", "expected:", expected, "actual:", actual);
        return;
    }
    for (var i = 0; i < expected.length; i++) {
        if (expected[i] !== actual[i]) {
            console.log("parseSentences:", "line:", i, "expected:", expected[i], "actual:", actual[i]);
            return;
        }
    }
}

function testParseWords() {
    var text = "that was a (memorable day to) me, for \"it's made great changes\" in me ";
    var expected = ["that", "was", "a", "memorable", "day", "to", "me", "for", "it's", "made", "great", "changes", "in", "me"];
    var actual = parseWords(text);
    if (!actual || expected.length !== actual.length) {
        console.log("parseWords:", "expected:", expected, "actual:", actual);
        return;
    }
    for (var i = 0; i < expected.length; i++) {
        if (expected[i] !== actual[i]) {
            console.log("parseWords:", "word:", i, "expected:", expected[i], "actual:", actual[i]);
            return;
        }
    }
}

function runTests() {
    testParseSentences();
    testParseWords();
}

runTests();