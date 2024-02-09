export function adjustEncounterResponse(response) {
    const date = new Date(response.date);
    const formattedDate = date.toISOString().split("T")[0];

    const adjustedResponse = {
        date: formattedDate,
        class: response.class,
        status: response.status,
        doctorId: response.doctor.id,
        locationId: response.location.id,
        reasonForVisit: response.reasonForVisit,
        chiefComplaint: response.chiefComplaint,
        notes: response.notes,
    };

    return adjustedResponse;
}
