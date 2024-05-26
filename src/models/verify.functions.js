const sameEvidence = (array) => {
    for (let i = 0; i < array.length; i++) {
        let index = array[i];
        let newArray = array.slice(0, i).concat(array.slice(i + 1));
        if (newArray.includes(index)) {
            return true;
        }
    }
    return false;
}

const evidencesExists = (dbArray, array) => {
    const dbNames = dbArray.map(item => item.name);
    for (let i = 0; i < array.length; i++) {
        if (!dbNames.includes(array[i])) {
            return false;
        } else {
            return true;
        }
    }
}

module.exports = { sameEvidence, evidencesExists };