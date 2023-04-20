
document.getElementById('generate').onclick = async () => {
    const input = document.getElementById('input').value;
    const abbrev = await generate(input);
    document.getElementById('output').value = abbrev;
}

document.getElementById('copy').onclick = async () => {
    navigator.clipboard.writeText(document.getElementById('output').value);
}

async function getInput() {
    return new Promise((res) => {
        let input = '';
        process.stdin.on('data', (data) => {
            input += data;
        });
        process.stdin.on('end', () => {
            res(input);
        });
    });
}

function words(txt) {
    return [...new Set(txt.match(/[A-zÀ-ú0-9\-]+/g))];
}

function isAbbrev(word) {
    return word.split('')
               .filter(l => l.match(/[A-Z]/g))
               .length > 2;
}

function abbrevs(words) {
    return words.filter((w) => w.length > 1)
                .filter(word => isAbbrev(word) && word.length <= 7)
}

function toFormattedList(abbrevs) {
    let result = ``;
    for (word of abbrevs.sort()) {
        result += word + `\n`;
    }
    return result;
}

function generate(input) {
    return Promise.resolve(input)
        .then(words)
        .then(abbrevs)
        .then(toFormattedList);
}

// main();
