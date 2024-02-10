export function adjustExaminationResponse(response) {
    const date = new Date(response.date);
    const formattedDate = date.toISOString().split("T")[0];

    const adjustedResponse = {
        date: formattedDate,
        locationId: response.location.id,
        subjective: response.subjective,
        objective: response.objective,
        assessment: response.assessment,
        plan: response.plan,
        diagnosis: response.diagnosis,
        notes: response.notes,
    };

    return adjustedResponse;
}
