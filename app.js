/***********************
 * STORAGE HELPERS
 ***********************/
const STORAGE_KEY = "patients";

function getPatients() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function savePatients(patients) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
}


/***********************
 * SAVE / UPDATE PATIENT
 ***********************/
function savePatient() {
  try {
    const illnesses = [...document.querySelectorAll(".illness:checked")]
      .map(i => i.value);

    const allergies = [...document.querySelectorAll(".allergy:checked")]
      .map(a => a.value);

    const gender = document.querySelector('input[name="gender"]:checked')?.value || "";
    
    const status = document.querySelector('input[name="status"]:checked')?.value || "";


    const patient = {
      patientNo: patientNo.value.trim(),
      visitDate: visitDate.value || "",

      lastName: lastName.value.trim(),
      firstName: firstName.value.trim(),
      middleName: middleName.value.trim(),

      birthday: birthday.value || "",
      age: age.value || "",
      nickname: nickname.value || "",

      gender,
      status,

      address: address.value || "",
      address2: address2.value || "",
      zip: zip.value || "",
      contact: contact.value || "",
      email: email.value || "",
      religion: religion.value || "",


      occupation: occupation.value || "",
      emergencyContact: emergencyContact.value || "",
      emergencyContactNo: emergencyContactNo.value || "",


      previousDentist: previousDentist.value || "",
      lastDentalVisit: lastDentalVisit.value || "",

      physicianName: physicianName.value || "",
      physicianSpecialty: physicianSpecialty.value || "",
      physicianAddress: physicianAddress.value || "",
      physicianOfficeNo: physicianOfficeNo.value || "",

      goodHealth: goodHealthYes.checked,
      underTreatment: underTreatmentYes.checked,
      treatmentCondition: treatmentCondition.value || "",

      seriousIllness: seriousIllnessYes.checked,
      illnessDetails: illnessDetails.value || "",

      hospitalized: hospitalizedYes.checked,
      hospitalDetails: hospitalDetails.value || "",

      takingMedication: takingMedicationYes.checked,
      medicationDetails: medicationDetails.value || "",

      tobaccoUse: tobaccoUseYes.checked,
      drugUse: drugUseYes.checked,

      allergies,
      bleedingTime: bleedingTime.value || "",

      pregnant: pregnantYes.checked,
      nursing: nursingYes.checked,
      birthControl: birthControlYes.checked,

      bloodType: bloodType.value || "",
      bloodPressure: bloodPressure.value || "",

      illnesses,
      otherIllness: otherIllness.value || "",

      signature: getSignature()
    };



    if (!patient.patientNo || !patient.lastName || !patient.firstName) {
      alert("Patient No, First Name, and Last Name are required.");
      return;
    }

    const patients = getPatients();
    const index = patients.findIndex(p => p.patientNo === patient.patientNo);

    if (index >= 0) patients[index] = patient;
    else patients.push(patient);

    savePatients(patients);
    alert("✅ Patient record saved successfully");

  } catch (err) {
    console.error(err);
    alert("❌ Error saving patient. Check console.");
  }
}

/*****************************************************************************************************
                                           LOAD PATIENT (EDIT)
 ****************************************************************************************************/
function loadPatient(patientNoValue) {
  const patient = getPatients().find(p => p.patientNo === patientNoValue);
  if (!patient) return;

  patientNo.value = patient.patientNo;
  visitDate.value = patient.visitDate;

  lastName.value = patient.lastName;
  firstName.value = patient.firstName;
  middleName.value = patient.middleName;

  birthday.value = patient.birthday;
  age.value = patient.age;
  nickname.value = patient.nickname;

  document.querySelectorAll('input[name="gender"]').forEach(r => {
    r.checked = r.value === patient.gender;
  });
  
  document.querySelectorAll('input[name="status"]').forEach(r => {
    r.checked = r.value === patient.status;
  });

  address.value = patient.address;
  address2.value = patient.address2 || "";
  zip.value = patient.zip;
  contact.value = patient.contact;
  email.value = patient.email;
  religion.value = patient.religion;
  
  occupation.value = patient.occupation;
  emergencyContact.value = patient.emergencyContact;
  emergencyContactNo.value = patient.emergencyContactNo;

  previousDentist.value = patient.previousDentist;
  lastDentalVisit.value = patient.lastDentalVisit;

  physicianName.value = patient.physicianName;
  physicianSpecialty.value = patient.physicianSpecialty;
  physicianAddress.value = patient.physicianAddress;
  physicianOfficeNo.value = patient.physicianOfficeNo;

  goodHealthYes.checked = patient.goodHealth;
  goodHealthNo.checked = !patient.goodHealth;

  underTreatmentYes.checked = patient.underTreatment;
  underTreatmentNo.checked = !patient.underTreatment;

  seriousIllnessYes.checked = patient.seriousIllness;
  seriousIllnessNo.checked = !patient.seriousIllness;

  hospitalizedYes.checked = patient.hospitalized;
  hospitalizedNo.checked = !patient.hospitalized;

  takingMedicationYes.checked = patient.takingMedication;
  takingMedicationNo.checked = !patient.takingMedication;

  tobaccoUseYes.checked = patient.tobaccoUse;
  tobaccoUseNo.checked = !patient.tobaccoUse;

  drugUseYes.checked = patient.drugUse;
  drugUseNo.checked = !patient.drugUse;

  pregnantYes.checked = patient.pregnant;
  pregnantNo.checked = !patient.pregnant;

  nursingYes.checked = patient.nursing;
  nursingNo.checked = !patient.nursing;

  birthControlYes.checked = patient.birthControl;
  birthControlNo.checked = !patient.birthControl;

  treatmentCondition.value = patient.treatmentCondition;
  illnessDetails.value = patient.illnessDetails;
  hospitalDetails.value = patient.hospitalDetails;
  medicationDetails.value = patient.medicationDetails;

  document.querySelectorAll(".allergy").forEach(cb => {
    cb.checked = patient.allergies?.includes(cb.value);
  });

  document.querySelectorAll(".illness").forEach(cb => {
    cb.checked = patient.illnesses?.includes(cb.value);
  });

  otherIllness.value = patient.otherIllness || "";

  bleedingTime.value = patient.bleedingTime;
  bloodType.value = patient.bloodType;
  bloodPressure.value = patient.bloodPressure;

  if (patient.signature) loadSignature(patient.signature);
}

/***********************
 * DELETE PATIENT
 ***********************/
function deletePatient(patientNoValue) {
  if (!confirm("Delete this patient record?")) return;
  savePatients(getPatients().filter(p => p.patientNo !== patientNoValue));
  alert("🗑 Patient deleted");
  window.location.href = "index.html";
}

/***********************
 * LIST PATIENTS (INDEX)
 ***********************/
function renderPatientList() {
  const list = document.getElementById("patientList");
  if (!list) return;

  list.innerHTML = "";
  const patients = getPatients();

  if (!patients.length) {
    list.innerHTML = "<li>No patient records found</li>";
    return;
  }

  patients.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${p.patientNo}</strong> – ${p.lastName}, ${p.firstName}
      <button onclick="openPatient('${p.patientNo}')">Open</button>
      <button onclick="deletePatient('${p.patientNo}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

function openPatient(patientNo) {
  localStorage.setItem("activePatient", patientNo);
  window.location.href = "patient-form.html";
}

/***********************
 * AUTO LOAD ACTIVE PATIENT
 ***********************/
document.addEventListener("DOMContentLoaded", () => {
  const active = localStorage.getItem("activePatient");
  if (active) loadPatient(active);
});


/***********************
 * Odontograph
 ***********************/
function saveFormDraft() {
  const formData = new FormData(document.querySelector("form"));
  const data = {};
  formData.forEach((value, key) => data[key] = value);
  localStorage.setItem("patientFormDraft", JSON.stringify(data));
}

function loadFormDraft() {
  const draft = JSON.parse(localStorage.getItem("patientFormDraft"));
  if (!draft) return;

  Object.keys(draft).forEach(key => {
    const field = document.querySelector(`[name="${key}"]`);
    if (field) field.value = draft[key];
  });
}