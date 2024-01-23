function removeTimestamps(obj) {
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
}

function removeTimestampsAndPatientID(obj) {
    delete obj.patientId;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
}

module.exports = { removeTimestamps, removeTimestampsAndPatientID };
