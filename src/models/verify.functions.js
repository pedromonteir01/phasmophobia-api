const sameEvidence = (array) => {
    for (let i = 0; i < array.length; i++) {
        let element = array[i];
        let remainingArray = array.slice(0, i).concat(array.slice(i + 1));
        if (remainingArray.includes(element)) {
            return true;
        }
    }
    return false;
}

module.exports = { sameEvidence };