export function adjustResponse(patient) {
    const birthDate = new Date(patient.birthDate);
    const formattedBirthDate = birthDate.toISOString().split("T")[0];

    const adjustedResponse = {
        patientInfo: {
            firstName: patient.firstName,
            middleName: patient.middleName,
            lastName: patient.lastName,
            birthDate: formattedBirthDate,
            gender: patient.gender,
            maritalStatus: patient.maritalStatus,
            bloodType: patient.bloodType,
            referrerName: patient.referrerName,
            notes: patient.notes,
        },
        addressInfo: patient.patient_address
            ? {
                  address: patient.patient_address.address,
                  address2: patient.patient_address.address2,
                  city: patient.patient_address.city,
                  province: patient.patient_address.province,
                  zipCode: patient.patient_address.zipCode,
              }
            : {},
        contactInfo: patient.patient_contact_info
            ? {
                  homePhone: patient.patient_contact_info.homePhone,
                  workPhone: patient.patient_contact_info.workPhone,
                  mobilePhonePrimary:
                      patient.patient_contact_info.mobilePhonePrimary,
                  mobilePhoneSecondary:
                      patient.patient_contact_info.mobilePhoneSecondary,
                  emailAddress: patient.patient_contact_info.emailAddress,
              }
            : {},
        emergencyContactInfo: patient.patient_emergency_contact
            ? {
                  firstName: patient.patient_emergency_contact.firstName,
                  lastName: patient.patient_emergency_contact.lastName,
                  homePhone: patient.patient_emergency_contact.homePhone,
                  mobilePrimary:
                      patient.patient_emergency_contact.mobilePrimary,
                  relationship: patient.patient_emergency_contact.relationship,
              }
            : {},
    };

    return adjustedResponse;
}
