function analyzeText() {
    return {
        wordCount: 33,
        uniqueWords: 12,
        avgWordLength: 33.4,
        avgSentenceLen: 334.3
    }
}

function presentFindings(stats) {
    $(".js-report").removeClass("hidden");
    $(".js-report-word-count").text(stats.wordCount);
    $(".js-report-unique-word-count").text(stats.uniqueWords);
    $(".js-report-average-word-length").text(stats.avgWordLength);
    $(".js-report-average-sentence-length").text(stats.avgSentenceLen);
}

function handleSubmit() {
    $(".js-form").submit(function (event){
        event.preventDefault();

        var stats = analyzeText();
        presentFindings(stats);
    });
}

$(function (){
    handleSubmit();
});