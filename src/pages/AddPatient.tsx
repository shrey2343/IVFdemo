import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Heart, 
  TestTube,
  Image as ImageIcon,
  ClipboardList,
  Table2,
  Save,
  Printer
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
const emptyEmbryoDetailRow = () => ({
  tubeNo: '',
  sampleId: '',
  noOfCells: '',
  gradeOfCells: '',
  comments: '',
  typeOfCells: ''
})

const initialEmbryoDetailRows = () =>
  Array.from({ length: 15 }, emptyEmbryoDetailRow)

const AddPatient = () => {
  const { user, canAddPatient, useCycle } = useAuth()
  const { showSuccess, showError } = useToast()
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState({
    // Patient Details
    patientName: '',
    dob: '',
    age: '',
    ethnicity: '',
    partnerName: '',
    partnerDob: '',
    partnerAge: '',
    email: '',
    contactNo: '',
    height: '',
    weight: '',
    bloodType: '',
    address: '',
    
    // Wetlab Sample Details
    patientId: '',
    referringDoctor: '',
    witness: '',
    reportDate: '',
    lotNumber: '',
    testedBy: '',
    notes: '',
    
    // Wetlab Biopsy Information
    biopsyMethod: '',
    biopsyDay: '',
    embryoGrade: '',
    morphologyAssessment: '',
    handlingInstructions: '',
    
    // Referring Clinician
    clinicianName: '',
    embryologistName: '',
    hospitalClinicName: '',
    emailId: '',
    contactNo1: '',
    emailIdContactPerson: '',
    contactNo2: '',
    
    // Sample Details
    sampleCollectionDate: '',
    sampleCollectionTime: '',
    edtaBlood: false,
    couple: false,
    affectedIndividual: false,
    embryos: false,
    noOfEmbryos: '',
    dayOfBiopsy: '',
    donorYes: false,
    donorNo: false,
    donorEgg: false,
    donorSperm: false,
    ageOfDonor: '',
    spentCultureMedium: '',
    rebiopsyYes: false,
    rebiopsyNo: false,
    previousPatientId: '',
    
    // Cycle History (matches NCGM requisition PDF layout)
    hyperstimulationYes: false,
    hyperstimulationNo: false,
    fertilisationIVF: false,
    fertilisationICSI: false,
    eggRetrievalDd: '',
    eggRetrievalMm: '',
    eggRetrievalYyyy: '',
    noOfEmbryosRetrieved: '',
    noOfBiopsiedEmbryos: '',
    embryoTransferDd: '',
    embryoTransferMm: '',
    embryoTransferYyyy: '',
    embryoTransferTime: '',

    // Test Requested (NCGM form)
    testPgtA: false,
    testNiPgt: false,
    testPgtSr: false,
    testPgtM: false,
    testPrePgtWorkup: false,
    pgtMGene: '',
    pgtMVariant: '',
    prePgtMLabId: '',
    karyotypeCoupleYes: false,
    karyotypeCoupleNo: false,
    indicationRecurrentPregnancyLoss: false,
    indicationAdvancedMaternalAge: false,
    indicationIvfFailure: false,
    indicationPrimaryInfertility: false,
    indicationBoh: false,
    indicationOthers: false,
    indicationOthersText: '',
    mosaicReportYes: false,
    mosaicReportNoDesignate: false,
    mosaicReportDoNot: false,

    // Consent Form
    consentPatientName: '',
    consentAge: '',
    consentWifeDaughter: '',
    consentAddress: '',
    consentDate1: '',
    consentPlace1: '',
    consentCompanionName: '',
    consentCompanionAddress: '',
    consentRelationship: '',
    consentDate2: '',
    consentPlace2: '',
    consentDoctorName: '',
    consentDoctorRegistration: '',
    consentClinicName: '',
    consentClinicAddress: '',
    consentClinicRegistration: '',

    embryoDetailRows: initialEmbryoDetailRows()
  })

  const isWetLab = user?.role === 'wetlab'
  const entityName = isWetLab ? 'Sample' : 'Patient'

  const sections = [
    { id: 0, title: `${entityName} Details` },
    { id: 1, title: 'Referring Clinician' },
    { id: 2, title: 'Sample Details',  },
    { id: 3, title: 'Cycle History'},
    { id: 4, title: 'Test Requested' },
    { id: 5, title: 'Embryo Details' }
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateCompletePDF = () => {
    // Generate comprehensive HTML for PDF with all sections
    const pdfHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Patient Form - ${formData.patientName || 'New Patient'}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
            font-size: 12px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #ec4899;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #ec4899;
            margin: 0;
            font-size: 24px;
          }
          .section {
            margin: 30px 0;
            page-break-inside: avoid;
          }
          .section-title {
            background: #ec4899;
            color: white;
            padding: 10px 15px;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
          }
          .field-group {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 10px;
          }
          .field {
            padding: 8px;
            border-bottom: 1px solid #e5e7eb;
          }
          .field-label {
            font-weight: 600;
            color: #6b7280;
            font-size: 11px;
            margin-bottom: 3px;
          }
          .field-value {
            color: #111827;
            font-size: 12px;
          }
          .checkbox-group {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            margin: 10px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
          }
          table th, table td {
            border: 1px solid #9333ea;
            padding: 8px;
            text-align: left;
            font-size: 11px;
          }
          table th {
            background: #ede9fe;
            font-weight: 600;
          }
          .consent-section {
            border: 2px solid #666;
            padding: 20px;
            margin: 20px 0;
            page-break-inside: avoid;
          }
          .consent-title {
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 10px;
          }
          .consent-subtitle {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-bottom: 20px;
          }
          .consent-text {
            line-height: 1.6;
            margin: 10px 0;
          }
          .signature-line {
            border-bottom: 1px solid #666;
            display: inline-block;
            min-width: 200px;
            margin: 0 5px;
          }
          @media print {
            body { margin: 0; }
            .section { page-break-inside: avoid; }
          }
        </style>
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </head>
      <body>
        <div class="header">
          <h1>IVF 360 Platform</h1>
          <h2>Patient Information Form</h2>
          <p>Generated on: ${new Date().toLocaleString()}</p>
        </div>

        <!-- Patient Details -->
        <div class="section">
          <div class="section-title">Patient Details</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Patient Name</div>
              <div class="field-value">${formData.patientName || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Date of Birth</div>
              <div class="field-value">${formData.dob || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Age</div>
              <div class="field-value">${formData.age || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Ethnicity</div>
              <div class="field-value">${formData.ethnicity || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Partner Name</div>
              <div class="field-value">${formData.partnerName || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Partner DOB</div>
              <div class="field-value">${formData.partnerDob || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Partner Age</div>
              <div class="field-value">${formData.partnerAge || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">${formData.email || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Contact No</div>
              <div class="field-value">${formData.contactNo || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Height</div>
              <div class="field-value">${formData.height || 'N/A'} cm</div>
            </div>
            <div class="field">
              <div class="field-label">Weight</div>
              <div class="field-value">${formData.weight || 'N/A'} kg</div>
            </div>
            <div class="field">
              <div class="field-label">Blood Type</div>
              <div class="field-value">${formData.bloodType || 'N/A'}</div>
            </div>
          </div>
          <div class="field">
            <div class="field-label">Address</div>
            <div class="field-value">${formData.address || 'N/A'}</div>
          </div>
        </div>

        <!-- Referring Clinician -->
        <div class="section">
          <div class="section-title">Referring Clinician</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Clinician Name</div>
              <div class="field-value">${formData.clinicianName || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Embryologist Name</div>
              <div class="field-value">${formData.embryologistName || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Hospital/Clinic Name</div>
              <div class="field-value">${formData.hospitalClinicName || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Email ID</div>
              <div class="field-value">${formData.emailId || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Contact No 1</div>
              <div class="field-value">${formData.contactNo1 || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Contact Person Email</div>
              <div class="field-value">${formData.emailIdContactPerson || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Contact No 2</div>
              <div class="field-value">${formData.contactNo2 || 'N/A'}</div>
            </div>
          </div>
        </div>

        <!-- Sample Details -->
        <div class="section">
          <div class="section-title">Sample Details</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Sample Collection Date</div>
              <div class="field-value">${formData.sampleCollectionDate || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Sample Collection Time</div>
              <div class="field-value">${formData.sampleCollectionTime || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">No. of Embryos</div>
              <div class="field-value">${formData.noOfEmbryos || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Day of Biopsy</div>
              <div class="field-value">${formData.dayOfBiopsy || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Age of Donor</div>
              <div class="field-value">${formData.ageOfDonor || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Spent Culture Medium</div>
              <div class="field-value">${formData.spentCultureMedium || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Previous Patient ID</div>
              <div class="field-value">${formData.previousPatientId || 'N/A'}</div>
            </div>
          </div>
          <div class="field">
            <div class="field-label">Sample Types</div>
            <div class="checkbox-group">
              ${formData.edtaBlood ? '<span>✓ EDTA Blood</span>' : ''}
              ${formData.couple ? '<span>✓ Couple</span>' : ''}
              ${formData.affectedIndividual ? '<span>✓ Affected Individual</span>' : ''}
              ${formData.embryos ? '<span>✓ Embryos</span>' : ''}
            </div>
          </div>
          <div class="field">
            <div class="field-label">Donor</div>
            <div class="checkbox-group">
              ${formData.donorYes ? '<span>✓ Yes</span>' : ''}
              ${formData.donorNo ? '<span>✓ No</span>' : ''}
              ${formData.donorEgg ? '<span>✓ Donor Egg</span>' : ''}
              ${formData.donorSperm ? '<span>✓ Donor Sperm</span>' : ''}
            </div>
          </div>
          <div class="field">
            <div class="field-label">Rebiopsy</div>
            <div class="checkbox-group">
              ${formData.rebiopsyYes ? '<span>✓ Yes</span>' : ''}
              ${formData.rebiopsyNo ? '<span>✓ No</span>' : ''}
            </div>
          </div>
        </div>

        <!-- Cycle History -->
        <div class="section">
          <div class="section-title">Cycle History</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Hyperstimulation</div>
              <div class="field-value">${formData.hyperstimulationYes ? 'Yes' : formData.hyperstimulationNo ? 'No' : 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Fertilisation Method</div>
              <div class="field-value">${formData.fertilisationIVF ? 'IVF' : formData.fertilisationICSI ? 'ICSI' : 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Date of Egg Retrieval</div>
              <div class="field-value">${formData.eggRetrievalDd || 'DD'}/${formData.eggRetrievalMm || 'MM'}/${formData.eggRetrievalYyyy || 'YYYY'}</div>
            </div>
            <div class="field">
              <div class="field-label">No. of Embryos Retrieved</div>
              <div class="field-value">${formData.noOfEmbryosRetrieved || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">No. of Biopsied Embryos</div>
              <div class="field-value">${formData.noOfBiopsiedEmbryos || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Date/Time for Embryo Transfer</div>
              <div class="field-value">${formData.embryoTransferDd || 'DD'}/${formData.embryoTransferMm || 'MM'}/${formData.embryoTransferYyyy || 'YYYY'} ${formData.embryoTransferTime || ''}</div>
            </div>
          </div>
        </div>

        <!-- Test Requested -->
        <div class="section">
          <div class="section-title">Test Requested</div>
          <div class="checkbox-group">
            ${formData.testPgtA ? '<span>✓ PGT-A</span>' : ''}
            ${formData.testNiPgt ? '<span>✓ niPGT</span>' : ''}
            ${formData.testPgtSr ? '<span>✓ PGT-SR</span>' : ''}
            ${formData.testPgtM ? '<span>✓ PGT-M</span>' : ''}
            ${formData.testPrePgtWorkup ? '<span>✓ Pre-PGT Work up</span>' : ''}
          </div>
          ${formData.testPgtM ? `
            <div class="field">
              <div class="field-label">PGT-M Details</div>
              <div class="field-value">Gene: ${formData.pgtMGene || 'N/A'}, Variant: ${formData.pgtMVariant || 'N/A'}, Lab ID: ${formData.prePgtMLabId || 'N/A'}</div>
            </div>
          ` : ''}
          <div class="field">
            <div class="field-label">Karyotype Done for Couple</div>
            <div class="field-value">${formData.karyotypeCoupleYes ? 'Yes' : formData.karyotypeCoupleNo ? 'No' : 'N/A'}</div>
          </div>
          <div class="field">
            <div class="field-label">Indication for Test</div>
            <div class="checkbox-group">
              ${formData.indicationRecurrentPregnancyLoss ? '<span>✓ Recurrent Pregnancy loss</span>' : ''}
              ${formData.indicationAdvancedMaternalAge ? '<span>✓ Advanced maternal age</span>' : ''}
              ${formData.indicationIvfFailure ? '<span>✓ IVF Failure</span>' : ''}
              ${formData.indicationPrimaryInfertility ? '<span>✓ Primary Infertility</span>' : ''}
              ${formData.indicationBoh ? '<span>✓ BOH</span>' : ''}
              ${formData.indicationOthers ? `<span>✓ Others: ${formData.indicationOthersText || ''}</span>` : ''}
            </div>
          </div>
          <div class="field">
            <div class="field-label">Reporting of Mosaics</div>
            <div class="field-value">
              ${formData.mosaicReportYes ? 'Yes - indicate embryo mosaicism on PGT-A report' : ''}
              ${formData.mosaicReportNoDesignate ? 'No - designate mosaic embryos as aneuploid' : ''}
              ${formData.mosaicReportDoNot ? 'Do not report mosaicism' : ''}
            </div>
          </div>
        </div>

        <!-- Consent Form -->
        <div class="consent-section">
          <div class="consent-title">FORM OF CONSENT</div>
          <div class="consent-subtitle">(For Non-invasive / invasive techniques)</div>
          
          <div class="consent-text">
            I, <span class="signature-line">${formData.consentPatientName || ''}</span> age <span class="signature-line">${formData.consentAge || ''}</span> yrs, wife/daughter of
            <span class="signature-line">${formData.consentWifeDaughter || ''}</span> residing at (address) <span class="signature-line">${formData.consentAddress || ''}</span>
            hereby state that I have been explained fully the probable side effects and after-eects of the prenatal diagnostic procedures. 
            I wish to undergo the pre-natal diagnostic procedures in my interest, to find out the possibility and abnormality 
            (i.e. deformity/deformity/disorder) in the child, I am carrying.
          </div>
          
          <div class="consent-text">
            I undertake not to terminate the pregnancy if the pre-natal procedure/technique/test conducted 
            show the absence of disease/deformity/disorder.
          </div>
          
          <div class="consent-text">
            I understand that the sex of the fetus will not be disclosed to me.
          </div>
          
          <div class="consent-text">
            I understand that breach of this undertaking will make me liable to penalty as prescribed in 
            the Prenatal Diagnostic Technique (Regulation and Prevention of Misuse) Act, 1994 (57 of 1994).
          </div>
          
          <div style="margin-top: 30px;">
            <div style="display: flex; justify-content: space-between;">
              <div>Date: <span class="signature-line">${formData.consentDate1 || ''}</span></div>
              <div>Signature of Patient</div>
            </div>
            <div style="margin-top: 10px;">Place: <span class="signature-line">${formData.consentPlace1 || ''}</span></div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #666;">
            <div class="consent-text">
              I have explained the contents of the above consent form to the patient and/or her companion
              (Name <span class="signature-line">${formData.consentCompanionName || ''}</span> 
              Address <span class="signature-line">${formData.consentCompanionAddress || ''}</span>
              <span class="signature-line">${formData.consentRelationship || ''}</span> Relationship) 
              in a language she/they understand.
            </div>
            
            <div style="margin-top: 30px;">
              <div style="display: flex; justify-content: space-between;">
                <div>Date: <span class="signature-line">${formData.consentDate2 || ''}</span></div>
                <div>Signature of Patient</div>
              </div>
              <div style="margin-top: 10px;">Place: <span class="signature-line">${formData.consentPlace2 || ''}</span></div>
            </div>
          </div>
          
          <div style="margin-top: 30px; text-align: right;">
            <div style="margin-bottom: 10px;">Name, Signature & Registration No.</div>
            <div>of Gynaecologist/Medical Geneticist / Radiologist/</div>
            <div>Pediatrician / Director of the Clinic / Center / Laboratory</div>
            <div style="margin-top: 15px;">
              <div><span class="signature-line">${formData.consentDoctorName || ''}</span></div>
              <div><span class="signature-line">${formData.consentDoctorRegistration || ''}</span></div>
            </div>
          </div>
          
          <div style="margin-top: 30px; text-align: right;">
            <div>Name, Address& Registration No.</div>
            <div>of Genetic Clinic / Institute [Seal]</div>
            <div style="margin-top: 15px;">
              <div><span class="signature-line">${formData.consentClinicName || ''}</span></div>
              <div><span class="signature-line">${formData.consentClinicAddress || ''}</span></div>
              <div><span class="signature-line">${formData.consentClinicRegistration || ''}</span></div>
            </div>
          </div>
        </div>

        <!-- Embryo Details -->
        <div class="section">
          <div class="section-title">Embryo Details / Spent Culture Medium</div>
          <table>
            <thead>
              <tr>
                <th>Tube No</th>
                <th>Sample ID</th>
                <th>No. of Cell(s)</th>
                <th>Grade of Cells</th>
                <th>Comments</th>
                <th>Type of Cells</th>
              </tr>
            </thead>
            <tbody>
              ${formData.embryoDetailRows.map((row: any) => `
                <tr>
                  <td>${row.tubeNo || ''}</td>
                  <td>${row.sampleId || ''}</td>
                  <td>${row.noOfCells || ''}</td>
                  <td>${row.gradeOfCells || ''}</td>
                  <td>${row.comments || ''}</td>
                  <td>${row.typeOfCells || ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div style="margin-top: 50px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 11px;">
          <p>This document was generated by IVF 360 Platform</p>
          <p>Saved by: ${user?.name || 'Unknown'} on ${new Date().toLocaleString()}</p>
        </div>
      </body>
      </html>
    `
    
    // Open print dialog for PDF download
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(pdfHTML)
      printWindow.document.close()
    } else {
      showError('Failed to Generate PDF', 'Please allow popups to download PDF.')
    }
  }

  const handleSubmit = () => {
    if (!canAddPatient()) {
      showError(
        `Cannot Add ${entityName}`,
        'Your plan has expired or you have no cycles remaining. Please upgrade your plan to continue.'
      )
      return
    }
    
    // Use a cycle for this patient
    const cycleUsed = useCycle()
    if (!cycleUsed) {
      showError(
        `Failed to Add ${entityName}`,
        'Unable to use cycle. Please check your plan status.'
      )
      return
    }
    
    // Generate comprehensive PDF with all form data
    generateCompletePDF()
    
    console.log(`${entityName} data:`, formData)
    showSuccess(
      `${entityName} Added Successfully!`,
      `${entityName} information has been saved and PDF will be downloaded.`
    )
    
    // Reset form
    setFormData({
      patientName: '',
      dob: '',
      age: '',
      ethnicity: '',
      partnerName: '',
      partnerDob: '',
      partnerAge: '',
      email: '',
      contactNo: '',
      height: '',
      weight: '',
      bloodType: '',
      address: '',
      patientId: '',
      referringDoctor: '',
      witness: '',
      reportDate: '',
      lotNumber: '',
      testedBy: '',
      notes: '',
      biopsyMethod: '',
      biopsyDay: '',
      embryoGrade: '',
      morphologyAssessment: '',
      handlingInstructions: '',
      clinicianName: '',
      embryologistName: '',
      hospitalClinicName: '',
      emailId: '',
      contactNo1: '',
      emailIdContactPerson: '',
      contactNo2: '',
      sampleCollectionDate: '',
      sampleCollectionTime: '',
      edtaBlood: false,
      couple: false,
      affectedIndividual: false,
      embryos: false,
      noOfEmbryos: '',
      dayOfBiopsy: '',
      donorYes: false,
      donorNo: false,
      donorEgg: false,
      donorSperm: false,
      ageOfDonor: '',
      spentCultureMedium: '',
      rebiopsyYes: false,
      rebiopsyNo: false,
      previousPatientId: '',
      hyperstimulationYes: false,
      hyperstimulationNo: false,
      fertilisationIVF: false,
      fertilisationICSI: false,
      eggRetrievalDd: '',
      eggRetrievalMm: '',
      eggRetrievalYyyy: '',
      noOfEmbryosRetrieved: '',
      noOfBiopsiedEmbryos: '',
      embryoTransferDd: '',
      embryoTransferMm: '',
      embryoTransferYyyy: '',
      embryoTransferTime: '',
      testPgtA: false,
      testNiPgt: false,
      testPgtSr: false,
      testPgtM: false,
      testPrePgtWorkup: false,
      pgtMGene: '',
      pgtMVariant: '',
      prePgtMLabId: '',
      karyotypeCoupleYes: false,
      karyotypeCoupleNo: false,
      indicationRecurrentPregnancyLoss: false,
      indicationAdvancedMaternalAge: false,
      indicationIvfFailure: false,
      indicationPrimaryInfertility: false,
      indicationBoh: false,
      indicationOthers: false,
      indicationOthersText: '',
      mosaicReportYes: false,
      mosaicReportNoDesignate: false,
      mosaicReportDoNot: false,
      consentPatientName: '',
      consentAge: '',
      consentWifeDaughter: '',
      consentAddress: '',
      consentDate1: '',
      consentPlace1: '',
      consentCompanionName: '',
      consentCompanionAddress: '',
      consentRelationship: '',
      consentDate2: '',
      consentPlace2: '',
      consentDoctorName: '',
      consentDoctorRegistration: '',
      consentClinicName: '',
      consentClinicAddress: '',
      consentClinicRegistration: '',
      embryoDetailRows: initialEmbryoDetailRows()
    })
    setCurrentSection(0)
  }

  const handleSaveAndPrint = () => {
    // First save data to localStorage
    const dataToSave = {
      ...formData,
      savedAt: new Date().toISOString(),
      savedBy: user?.name || 'Unknown'
    }
    
    localStorage.setItem('patientFormData', JSON.stringify(dataToSave))
    
    // Generate HTML content for PDF
    const printHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Patient Form - ${formData.patientName || 'New Patient'}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #ec4899;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #ec4899;
            margin: 0;
          }
          .section {
            margin: 30px 0;
            page-break-inside: avoid;
          }
          .section-title {
            background: #ec4899;
            color: white;
            padding: 10px 15px;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
          }
          .field-group {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 10px;
          }
          .field {
            padding: 10px;
            border-bottom: 1px solid #e5e7eb;
          }
          .field-label {
            font-weight: 600;
            color: #6b7280;
            font-size: 12px;
            margin-bottom: 5px;
          }
          .field-value {
            color: #111827;
            font-size: 14px;
          }
          .checkbox-group {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
          }
          @media print {
            body { margin: 0; }
            .section { page-break-inside: avoid; }
          }
        </style>
        <script>
          window.onload = function() {
            // Automatically trigger print dialog which allows "Save as PDF"
            window.print();
          }
        </script>
      </head>
      <body>
        <div class="header">
          <h1>IVF 360 Platform</h1>
          <h2>Patient Information Form</h2>
          <p>Generated on: ${new Date().toLocaleString()}</p>
        </div>

        <!-- Patient Details -->
        <div class="section">
          <div class="section-title">Patient Details</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Patient Name</div>
              <div class="field-value">${formData.patientName || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Date of Birth</div>
              <div class="field-value">${formData.dob || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Age</div>
              <div class="field-value">${formData.age || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Ethnicity</div>
              <div class="field-value">${formData.ethnicity || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Partner Name</div>
              <div class="field-value">${formData.partnerName || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Partner DOB</div>
              <div class="field-value">${formData.partnerDob || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">${formData.email || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Contact No</div>
              <div class="field-value">${formData.contactNo || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Height</div>
              <div class="field-value">${formData.height || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Weight</div>
              <div class="field-value">${formData.weight || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Blood Type</div>
              <div class="field-value">${formData.bloodType || 'N/A'}</div>
            </div>
          </div>
          <div class="field">
            <div class="field-label">Address</div>
            <div class="field-value">${formData.address || 'N/A'}</div>
          </div>
        </div>

        <!-- Referring Clinician -->
        <div class="section">
          <div class="section-title">Referring Clinician</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Clinician Name</div>
              <div class="field-value">${formData.clinicianName || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Embryologist Name</div>
              <div class="field-value">${formData.embryologistName || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Hospital/Clinic Name</div>
              <div class="field-value">${formData.hospitalClinicName || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Email ID</div>
              <div class="field-value">${formData.emailId || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Contact No 1</div>
              <div class="field-value">${formData.contactNo1 || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Contact No 2</div>
              <div class="field-value">${formData.contactNo2 || 'N/A'}</div>
            </div>
          </div>
        </div>

        <!-- Sample Details -->
        <div class="section">
          <div class="section-title">Sample Details</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Sample Collection Date</div>
              <div class="field-value">${formData.sampleCollectionDate || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Sample Collection Time</div>
              <div class="field-value">${formData.sampleCollectionTime || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">No. of Embryos</div>
              <div class="field-value">${formData.noOfEmbryos || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Day of Biopsy</div>
              <div class="field-value">${formData.dayOfBiopsy || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Age of Donor</div>
              <div class="field-value">${formData.ageOfDonor || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Previous Patient ID</div>
              <div class="field-value">${formData.previousPatientId || 'N/A'}</div>
            </div>
          </div>
          <div class="field">
            <div class="field-label">Sample Types</div>
            <div class="checkbox-group">
              ${formData.edtaBlood ? '<span>✓ EDTA Blood</span>' : ''}
              ${formData.couple ? '<span>✓ Couple</span>' : ''}
              ${formData.affectedIndividual ? '<span>✓ Affected Individual</span>' : ''}
              ${formData.embryos ? '<span>✓ Embryos</span>' : ''}
            </div>
          </div>
        </div>

        <!-- Cycle History -->
        <div class="section">
          <div class="section-title">Cycle History</div>
          <div class="field-group">
            <div class="field">
              <div class="field-label">Hyperstimulation</div>
              <div class="field-value">${formData.hyperstimulationYes ? 'Yes' : formData.hyperstimulationNo ? 'No' : 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Fertilisation Method</div>
              <div class="field-value">${formData.fertilisationIVF ? 'IVF' : formData.fertilisationICSI ? 'ICSI' : 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Date of Egg Retrieval</div>
              <div class="field-value">${formData.eggRetrievalDd || 'DD'}/${formData.eggRetrievalMm || 'MM'}/${formData.eggRetrievalYyyy || 'YYYY'}</div>
            </div>
            <div class="field">
              <div class="field-label">No. of Embryos Retrieved</div>
              <div class="field-value">${formData.noOfEmbryosRetrieved || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">No. of Biopsied Embryos</div>
              <div class="field-value">${formData.noOfBiopsiedEmbryos || 'N/A'}</div>
            </div>
            <div class="field">
              <div class="field-label">Date/Time for Embryo Transfer</div>
              <div class="field-value">${formData.embryoTransferDd || 'DD'}/${formData.embryoTransferMm || 'MM'}/${formData.embryoTransferYyyy || 'YYYY'}</div>
            </div>
          </div>
        </div>

        <div style="margin-top: 50px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
          <p>This document was generated by IVF 360 Platform</p>
          <p>Saved by: ${user?.name || 'Unknown'} on ${new Date().toLocaleString()}</p>
        </div>
      </body>
      </html>
    `
    
    // Create a blob and download as PDF
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(printHTML)
      printWindow.document.close()
      
      // Show success message
      showSuccess('Data Saved Successfully!', 'Print dialog will open. Select "Save as PDF" to download.')
    } else {
      showError('Failed to Open Print Dialog', 'Please allow popups to download PDF.')
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Section navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 lg:gap-4">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => canAddPatient() && setCurrentSection(section.id)}
              whileHover={canAddPatient() ? { scale: 1.02 } : {}}
              whileTap={canAddPatient() ? { scale: 0.98 } : {}}
              disabled={!canAddPatient()}
              className={`flex items-center py-2 px-3 lg:px-4 rounded-lg font-medium text-xs lg:text-sm transition-all duration-200 ${
                !canAddPatient()
                  ? 'text-gray-400 cursor-not-allowed'
                  : currentSection === section.id
                    ? section.id === 2 // Tests section
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-2 border-pink-400 shadow-lg'
                      : 'bg-pink-100 text-pink-700 border-2 border-pink-300'
                    : section.id === 2 // Tests section when not active
                      ? 'text-pink-600 hover:text-pink-700 hover:bg-pink-50 border border-pink-200'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              
              <span className="hidden sm:inline">{section.title}</span>
              <span className="sm:hidden">{section.title.split(' ')[0]}</span>
            </motion.button>
          ))}
        </div>
      </div>
      {/* Form Content */}
      <div className={`${!canAddPatient() ? 'opacity-50 pointer-events-none' : ''}`}>
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            {/* Personal Details Section */}
            {currentSection === 0 && (
              <PersonalDetailsSection 
                formData={formData} 
                onChange={handleInputChange} 
              />
            )}

            {/* Referring Clinician Section */}
            {currentSection === 1 && (
              <ComorbiditiesSection 
                formData={formData} 
                onChange={handleInputChange} 
              />
            )}

            {/* Sample Details Section */}
            {currentSection === 2 && (
              <TestsSection 
                formData={formData} 
                onChange={handleInputChange} 
              />
            )}

            {/* Cycle History Section */}
            {currentSection === 3 && (
              <CycleHistorySection 
                formData={formData} 
                onChange={handleInputChange} 
              />
            )}

            {currentSection === 4 && (
              <TestRequestedSection
                formData={formData}
                onChange={handleInputChange}
              />
            )}

            {currentSection === 5 && (
              <EmbryoDetailsSection formData={formData} onChange={handleInputChange} />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                className="px-6 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex items-center space-x-3">
                {/* Show Save and Print button only in Cycle History section */}
                {currentSection === 3 && (
                  <button
                    onClick={handleSaveAndPrint}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-md"
                  >
                   
                    <span>Save & Print</span>
                  </button>
                )}
                
                {currentSection < sections.length - 1 ? (
                  <button
                    onClick={() => setCurrentSection(currentSection + 1)}
                    className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <motion.button
                    onClick={handleSubmit}
                    disabled={!canAddPatient()}
                    whileHover={canAddPatient() ? { scale: 1.02 } : {}}
                    whileTap={canAddPatient() ? { scale: 0.98 } : {}}
                    className={`flex items-center px-6 py-2 rounded-lg transition-colors ${
                      canAddPatient()
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {canAddPatient() ? 'Save Patient' : 'Plan Required'}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
      </div>
    </div>
  )
}

// Personal Details Section Component
const PersonalDetailsSection = ({ formData, onChange }: any) => {
  // Same form for both doctor and wetlab users now
  return (
    <div>
      <div className="flex items-center mb-6">
       
        <h2 className="text-2xl font-bold text-gray-900">Patient Details</h2>
      </div>
      
      <div className="space-y-6">
        {/* Patient Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Name *
          </label>
          <input
            type="text"
            value={formData.patientName}
            onChange={(e) => onChange('patientName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Enter patient full name"
          />
        </div>

        {/* DOB, Age, Ethnicity Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              DOB *
            </label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => onChange('dob', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => onChange('age', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Age"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ethnicity
            </label>
            <input
              type="text"
              value={formData.ethnicity}
              onChange={(e) => onChange('ethnicity', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter ethnicity"
            />
          </div>
        </div>

        {/* Partner's Name, DOB, Age Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Partner's Name
            </label>
            <input
              type="text"
              value={formData.partnerName}
              onChange={(e) => onChange('partnerName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter partner's name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Partner's DOB
            </label>
            <input
              type="date"
              value={formData.partnerDob}
              onChange={(e) => onChange('partnerDob', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Partner's Age
            </label>
            <input
              type="number"
              value={formData.partnerAge}
              onChange={(e) => onChange('partnerAge', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Age"
            />
          </div>
        </div>

        {/* Email and Contact Number Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail ID
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact No. *
            </label>
            <input
              type="tel"
              value={formData.contactNo}
              onChange={(e) => onChange('contactNo', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter contact number"
            />
          </div>
        </div>

        {/* Height, Weight, Blood Type Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => onChange('height', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Height in cm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => onChange('weight', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Weight in kg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blood Type
            </label>
            <select
              value={formData.bloodType}
              onChange={(e) => onChange('bloodType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Select blood type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => onChange('address', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Enter full address"
          />
        </div>
      </div>
    </div>
  )
}

// Referring Clinician Section Component
const ComorbiditiesSection = ({ formData, onChange }: any) => {
  return (
    <div>
      <div className="flex items-center mb-6">
       
        <h2 className="text-2xl font-bold text-gray-900">Referring Clinician</h2>
        <span className="text-sm text-gray-500 ml-2">(In BLOCK letters)</span>
      </div>
      
      <div className="space-y-6">
        {/* Clinician Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Clinician Name *
          </label>
          <input
            type="text"
            value={formData.clinicianName}
            onChange={(e) => onChange('clinicianName', e.target.value.toUpperCase())}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 uppercase"
            placeholder="ENTER CLINICIAN NAME IN BLOCK LETTERS"
          />
        </div>

        {/* Embryologist Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Embryologist Name
          </label>
          <input
            type="text"
            value={formData.embryologistName}
            onChange={(e) => onChange('embryologistName', e.target.value.toUpperCase())}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 uppercase"
            placeholder="ENTER EMBRYOLOGIST NAME IN BLOCK LETTERS"
          />
        </div>

        {/* Hospital/Clinic Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hospital/Clinic Name *
          </label>
          <input
            type="text"
            value={formData.hospitalClinicName}
            onChange={(e) => onChange('hospitalClinicName', e.target.value.toUpperCase())}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 uppercase"
            placeholder="ENTER HOSPITAL/CLINIC NAME IN BLOCK LETTERS"
          />
        </div>

        {/* Email ID and Contact No. Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail ID *
            </label>
            <input
              type="email"
              value={formData.emailId}
              onChange={(e) => onChange('emailId', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact No. *
            </label>
            <input
              type="tel"
              value={formData.contactNo1}
              onChange={(e) => onChange('contactNo1', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter contact number"
            />
          </div>
        </div>

        {/* Email ID and Contact No. Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail ID Of Contact Person *
            </label>
            <input
              type="email"
              value={formData.emailIdContactPerson}
              onChange={(e) => onChange('emailIdContactPerson', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter contact person email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact No.
            </label>
            <input
              type="tel"
              value={formData.contactNo2}
              onChange={(e) => onChange('contactNo2', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter additional contact number"
            />
          </div>
        </div>

        {/* Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <span className="font-medium">*Note:</span> Report will be sent to both Emails
          </p>
        </div>
      </div>
    </div>
  )
}
// Sample Details Section Component
const TestsSection = ({ formData, onChange }: any) => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <TestTube className="h-6 w-6 text-pink-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Sample Details</h2>
      </div>
      
      <div className="space-y-8">
        {/* Sample Details Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">SAMPLE DETAILS</h3>
          
          <div className="space-y-6">
            {/* Sample Collection Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sample Collection Date
                </label>
                <input
                  type="date"
                  value={formData.sampleCollectionDate}
                  onChange={(e) => onChange('sampleCollectionDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sample Collection Time
                </label>
                <input
                  type="time"
                  value={formData.sampleCollectionTime}
                  onChange={(e) => onChange('sampleCollectionTime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
              </div>
            </div>

            {/* Sample Type Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.edtaBlood}
                  onChange={(e) => onChange('edtaBlood', e.target.checked)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">EDTA Blood (For Pre-PGT-M work up; 4ml)</span>
              </label>
              
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.couple}
                  onChange={(e) => onChange('couple', e.target.checked)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Couple</span>
              </label>
              
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.affectedIndividual}
                  onChange={(e) => onChange('affectedIndividual', e.target.checked)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Affected Individual</span>
              </label>
            </div>

            {/* Embryos Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={formData.embryos}
                  onChange={(e) => onChange('embryos', e.target.checked)}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Embryos</span>
              </label>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  No of embryos
                </label>
                <input
                  type="number"
                  value={formData.noOfEmbryos}
                  onChange={(e) => onChange('noOfEmbryos', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Day of biopsy
                </label>
                <input
                  type="text"
                  value={formData.dayOfBiopsy}
                  onChange={(e) => onChange('dayOfBiopsy', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter day"
                />
              </div>
            </div>

            {/* Donor Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <span className="text-sm font-medium text-gray-700">Donor:</span>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="donor"
                    checked={formData.donorYes}
                    onChange={(e) => {
                      onChange('donorYes', e.target.checked)
                      if (e.target.checked) onChange('donorNo', false)
                    }}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="donor"
                    checked={formData.donorNo}
                    onChange={(e) => {
                      onChange('donorNo', e.target.checked)
                      if (e.target.checked) onChange('donorYes', false)
                    }}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>

              {formData.donorYes && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.donorEgg}
                      onChange={(e) => onChange('donorEgg', e.target.checked)}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Donor Egg</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.donorSperm}
                      onChange={(e) => onChange('donorSperm', e.target.checked)}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Donor Sperm</span>
                  </label>
                </div>
              )}
            </div>

            {/* Age of Donor and Spent Culture Medium */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age of the Donor
                </label>
                <input
                  type="number"
                  value={formData.ageOfDonor}
                  onChange={(e) => onChange('ageOfDonor', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter age"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spent Culture Medium
                </label>
                <input
                  type="text"
                  value={formData.spentCultureMedium}
                  onChange={(e) => onChange('spentCultureMedium', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter medium details"
                />
              </div>
            </div>

            {/* Rebiopsy Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                <span className="text-sm font-medium text-gray-700">Rebiopsy:</span>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="rebiopsy"
                    checked={formData.rebiopsyYes}
                    onChange={(e) => {
                      onChange('rebiopsyYes', e.target.checked)
                      if (e.target.checked) onChange('rebiopsyNo', false)
                    }}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="rebiopsy"
                    checked={formData.rebiopsyNo}
                    onChange={(e) => {
                      onChange('rebiopsyNo', e.target.checked)
                      if (e.target.checked) onChange('rebiopsyYes', false)
                    }}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>

              {formData.rebiopsyYes && (
                <div className="ml-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    If yes, please provide previous ID of the patient
                  </label>
                  <input
                    type="text"
                    value={formData.previousPatientId}
                    onChange={(e) => onChange('previousPatientId', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Enter previous patient ID"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const slashDateInputClass =
  'w-14 sm:w-16 text-center px-2 py-2 border-0 border-b-2 border-gray-400 bg-transparent text-gray-900 focus:border-pink-500 focus:ring-0 focus:outline-none'

// Cycle History tab: PDF-style CYCLE HISTORY fields
const CycleHistorySection = ({ formData, onChange }: any) => {
  const digitsOnly = (v: string, maxLen: number) => v.replace(/\D/g, '').slice(0, maxLen)

  return (
    <div>
      <div className="flex items-center mb-6">
        <ImageIcon className="h-6 w-6 text-pink-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">Cycle History</h2>
      </div>

      <div>
        <div className="relative rounded-xl border-2 border-gray-300 bg-white px-4 py-8 sm:px-8">
          <h3 className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-base font-semibold tracking-wide text-gray-900">
            CYCLE HISTORY
          </h3>

          <div className="space-y-8 pt-2">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-sm font-medium text-gray-800">Hyperstimulation:</span>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hyperstimulationYes}
                    onChange={(e) => {
                      onChange('hyperstimulationYes', e.target.checked)
                      if (e.target.checked) onChange('hyperstimulationNo', false)
                    }}
                    className="h-4 w-4 rounded border-gray-400 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-800">Yes</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.hyperstimulationNo}
                    onChange={(e) => {
                      onChange('hyperstimulationNo', e.target.checked)
                      if (e.target.checked) onChange('hyperstimulationYes', false)
                    }}
                    className="h-4 w-4 rounded border-gray-400 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-800">No</span>
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-sm font-medium text-gray-800">Fertilisation method:</span>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.fertilisationIVF}
                    onChange={(e) => {
                      onChange('fertilisationIVF', e.target.checked)
                      if (e.target.checked) onChange('fertilisationICSI', false)
                    }}
                    className="h-4 w-4 rounded border-gray-400 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-800">IVF</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.fertilisationICSI}
                    onChange={(e) => {
                      onChange('fertilisationICSI', e.target.checked)
                      if (e.target.checked) onChange('fertilisationIVF', false)
                    }}
                    className="h-4 w-4 rounded border-gray-400 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-800">ICSI</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <p className="mb-2 text-sm font-medium text-gray-800">Date of egg retrieval:</p>
                <div className="flex flex-wrap items-end gap-1 sm:gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="DD"
                    value={formData.eggRetrievalDd}
                    onChange={(e) => onChange('eggRetrievalDd', digitsOnly(e.target.value, 2))}
                    className={slashDateInputClass}
                    aria-label="Egg retrieval day"
                  />
                  <span className="pb-2 text-gray-600">/</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM"
                    value={formData.eggRetrievalMm}
                    onChange={(e) => onChange('eggRetrievalMm', digitsOnly(e.target.value, 2))}
                    className={slashDateInputClass}
                    aria-label="Egg retrieval month"
                  />
                  <span className="pb-2 text-gray-600">/</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="YYYY"
                    value={formData.eggRetrievalYyyy}
                    onChange={(e) => onChange('eggRetrievalYyyy', digitsOnly(e.target.value, 4))}
                    className={`${slashDateInputClass} w-20 sm:w-24`}
                    aria-label="Egg retrieval year"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-800">
                  No. of embryos retrieved:
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formData.noOfEmbryosRetrieved}
                  onChange={(e) => onChange('noOfEmbryosRetrieved', digitsOnly(e.target.value, 4))}
                  className="w-full max-w-xs border-0 border-b-2 border-gray-400 bg-transparent px-1 py-2 text-gray-900 focus:border-pink-500 focus:outline-none"
                  placeholder=""
                />
              </div>
            </div>

            <div className="max-w-md">
              <label className="mb-2 block text-sm font-medium text-gray-800">
                No. of biopsied embryos:
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={formData.noOfBiopsiedEmbryos}
                onChange={(e) => onChange('noOfBiopsiedEmbryos', digitsOnly(e.target.value, 4))}
                className="w-full border-0 border-b-2 border-gray-400 bg-transparent px-1 py-2 text-gray-900 focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-800">
                <span className="text-pink-600">*</span>Date/Time planned for embryo transfer:
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
                <div className="flex flex-wrap items-end gap-1 sm:gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="DD"
                    value={formData.embryoTransferDd}
                    onChange={(e) => onChange('embryoTransferDd', digitsOnly(e.target.value, 2))}
                    className={slashDateInputClass}
                    aria-label="Embryo transfer day"
                  />
                  <span className="pb-2 text-gray-600">/</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM"
                    value={formData.embryoTransferMm}
                    onChange={(e) => onChange('embryoTransferMm', digitsOnly(e.target.value, 2))}
                    className={slashDateInputClass}
                    aria-label="Embryo transfer month"
                  />
                  <span className="pb-2 text-gray-600">/</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="YYYY"
                    value={formData.embryoTransferYyyy}
                    onChange={(e) => onChange('embryoTransferYyyy', digitsOnly(e.target.value, 4))}
                    className={`${slashDateInputClass} w-20 sm:w-24`}
                    aria-label="Embryo transfer year"
                  />
                </div>
                <div className="flex items-center gap-2 sm:ml-2">
                  <label className="text-sm text-gray-600">Time</label>
                  <input
                    type="time"
                    value={formData.embryoTransferTime}
                    onChange={(e) => onChange('embryoTransferTime', e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-pink-500 focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const testReqUnderline =
  'min-w-[6rem] flex-1 border-0 border-b border-violet-400 bg-transparent px-1 py-0.5 text-sm text-gray-900 focus:border-violet-700 focus:outline-none'

const TestRequestedSection = ({ formData, onChange }: any) => {
  const setMosaic = (field: 'mosaicReportYes' | 'mosaicReportNoDesignate' | 'mosaicReportDoNot', checked: boolean) => {
    if (!checked) {
      onChange(field, false)
      return
    }
    onChange('mosaicReportYes', field === 'mosaicReportYes')
    onChange('mosaicReportNoDesignate', field === 'mosaicReportNoDesignate')
    onChange('mosaicReportDoNot', field === 'mosaicReportDoNot')
  }

  return (
    <div>
      <div className="mb-6 flex items-center">
        <ClipboardList className="mr-3 h-6 w-6 text-violet-800" />
        <h2 className="text-2xl font-bold text-gray-900">Test Requested</h2>
      </div>

      <div className="relative rounded-xl border-2 border-violet-800 bg-white px-4 py-10 sm:px-8">
        <h3 className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-center text-base font-bold tracking-wide text-violet-900">
          TEST REQUESTED
        </h3>

        <div className="space-y-5 pt-2 text-sm text-gray-900">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={formData.testPgtA}
              onChange={(e) => onChange('testPgtA', e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
            />
            <span>
              Preimplantation genetic testing for aneuploidies (PGT-A)
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={formData.testNiPgt}
              onChange={(e) => onChange('testNiPgt', e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
            />
            <span>
              Non-invasive preimplantation genetic testing for aneuploidies (niPGT)
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={formData.testPgtSr}
              onChange={(e) => onChange('testPgtSr', e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
            />
            <span>
              Preimplantation genetic testing for structural rearrangements (PGT-SR){' '}
              <span className="text-gray-700">(attach parental karyotype report)</span>
            </span>
          </label>

          <div className="space-y-2">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={formData.testPgtM}
                onChange={(e) => onChange('testPgtM', e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
              />
              <div className="min-w-0 flex-1 space-y-2">
                <span>
                  Preimplantation genetic testing for monogenic disorders (PGT-M)
                  <span className="text-pink-600">*</span>
                </span>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2 pl-0 sm:pl-1">
                  <span className="text-gray-800">(Requested for Gene</span>
                  <input
                    type="text"
                    value={formData.pgtMGene}
                    onChange={(e) => onChange('pgtMGene', e.target.value)}
                    className={testReqUnderline}
                    aria-label="PGT-M gene"
                  />
                  <span className="text-gray-800">Variant</span>
                  <input
                    type="text"
                    value={formData.pgtMVariant}
                    onChange={(e) => onChange('pgtMVariant', e.target.value)}
                    className={testReqUnderline}
                    aria-label="PGT-M variant"
                  />
                  <span className="text-gray-800">)</span>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2">
                  <span className="text-gray-800">
                    (<span className="text-pink-600">*</span> Please mention Pre-PGT-M Lab ID
                  </span>
                  <input
                    type="text"
                    value={formData.prePgtMLabId}
                    onChange={(e) => onChange('prePgtMLabId', e.target.value)}
                    className={`${testReqUnderline} min-w-[8rem]`}
                    aria-label="Pre-PGT-M Lab ID"
                  />
                  <span className="text-gray-800">)</span>
                </div>
              </div>
            </label>
          </div>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={formData.testPrePgtWorkup}
              onChange={(e) => onChange('testPrePgtWorkup', e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
            />
            <span>
              <span className="font-medium">Pre-PGT Work up</span>{' '}
              <span className="text-gray-700">
                (Mandatory to do before PGT-M, Sample type- 4ml EDTA blood) Attach relevant genetic reports/ Hb
                electrophoresis report.
              </span>
            </span>
          </label>
        </div>

        <div className="mt-10 space-y-8 border-t border-violet-200 pt-8">
          <div>
            <h4 className="mb-3 text-sm font-bold text-violet-900">In case of PGT-A/niPGT:</h4>
            <p className="mb-3 text-sm text-gray-900">Is Karyotype done for the couple-</p>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.karyotypeCoupleYes}
                  onChange={(e) => {
                    onChange('karyotypeCoupleYes', e.target.checked)
                    if (e.target.checked) onChange('karyotypeCoupleNo', false)
                  }}
                  className="h-4 w-4 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
                />
                <span className="text-sm text-gray-900">
                  Yes <span className="text-gray-700">(If yes, kindly provide the reports)</span>
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.karyotypeCoupleNo}
                  onChange={(e) => {
                    onChange('karyotypeCoupleNo', e.target.checked)
                    if (e.target.checked) onChange('karyotypeCoupleYes', false)
                  }}
                  className="h-4 w-4 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
                />
                <span className="text-sm text-gray-900">No</span>
              </label>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-bold text-violet-900">In case of PGT-SR:</h4>
            <p className="text-sm leading-relaxed text-gray-900">
              Kindly provide parental karyotype reports prior to testing.
            </p>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-bold text-violet-900">In case of PGT-M:</h4>
            <p className="text-sm leading-relaxed text-gray-900">
              Kindly contact NCGM and discuss with the Clinical Geneticist/ Genetic Counsellors regarding the utility of
              PGT-M for the suspected condition/ reported genetic variant/s.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-violet-200 pt-8">
          <h4 className="mb-4 text-sm font-bold text-gray-900">Indication for the test</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {[
              { key: 'indicationRecurrentPregnancyLoss', label: 'Recurrent Pregnancy loss' },
              { key: 'indicationAdvancedMaternalAge', label: 'Advanced maternal age' },
              { key: 'indicationIvfFailure', label: 'IVF Failure' },
              { key: 'indicationPrimaryInfertility', label: 'Primary Infertility' },
              { key: 'indicationBoh', label: 'BOH' }
            ].map(({ key, label }) => (
              <label key={key} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData[key]}
                  onChange={(e) => onChange(key, e.target.checked)}
                  className="h-4 w-4 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
                />
                <span className="text-sm text-gray-900">{label}</span>
              </label>
            ))}
            <div className="flex min-w-[12rem] flex-1 flex-wrap items-center gap-2">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.indicationOthers}
                  onChange={(e) => onChange('indicationOthers', e.target.checked)}
                  className="h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
                />
                <span className="text-sm text-gray-900">Others</span>
              </label>
              <input
                type="text"
                value={formData.indicationOthersText}
                onChange={(e) => onChange('indicationOthersText', e.target.value)}
                className="min-w-[10rem] flex-1 border-0 border-b border-gray-500 bg-transparent px-1 py-0.5 text-sm focus:border-violet-700 focus:outline-none"
                placeholder=""
                aria-label="Other indication details"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-violet-200 pt-8">
          <h4 className="mb-3 text-sm font-bold text-gray-900">Reporting of Mosaics</h4>
          <p className="mb-5 text-sm leading-relaxed text-gray-900">
            NGS-based PGT-A is able to detect embryo mosaicism. NCGM reports an embryo as &quot;Low mosaic&quot; or
            &quot;High mosaic&quot;. We recommend that all patients with mosaic embryos seek genetic counseling prior to
            considering transfer. Please indicate your preference regarding the reporting of mosaic embryos:
          </p>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={formData.mosaicReportYes}
                onChange={(e) => setMosaic('mosaicReportYes', e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
              />
              <span className="text-sm text-gray-900">Yes - indicate embryo mosaicism on PGT-A report</span>
            </label>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={formData.mosaicReportNoDesignate}
                onChange={(e) => setMosaic('mosaicReportNoDesignate', e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
              />
              <span className="text-sm text-gray-900">No - designate mosaic embryos as aneuploid</span>
            </label>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={formData.mosaicReportDoNot}
                onChange={(e) => setMosaic('mosaicReportDoNot', e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-gray-500 text-violet-800 focus:ring-violet-600"
              />
              <span className="text-sm text-gray-900">Do not report mosaicism</span>
            </label>
          </div>
        </div>
      </div>

      {/* Consent Form Section */}
      <div className="mt-8 relative rounded-xl border-2 border-gray-400 bg-white px-4 py-10 sm:px-8">
        <h3 className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-center text-base font-bold tracking-wide text-gray-900">
          FORM OF CONSENT
        </h3>
        <p className="text-center text-sm text-gray-700 mb-8">(For Non-invasive / invasive techniques)</p>

        <div className="space-y-6 text-sm text-gray-900 leading-relaxed">
          {/* First Paragraph with inline inputs */}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2">
            <span>I,</span>
            <input
              type="text"
              value={formData.consentPatientName}
              onChange={(e) => onChange('consentPatientName', e.target.value)}
              className="min-w-[15rem] flex-1 border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 focus:border-gray-700 focus:outline-none"
              placeholder=""
            />
            <span>age</span>
            <input
              type="text"
              value={formData.consentAge}
              onChange={(e) => onChange('consentAge', e.target.value)}
              className="w-16 border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 text-center focus:border-gray-700 focus:outline-none"
              placeholder=""
            />
            <span>yrs, wife/daughter of</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2">
            <input
              type="text"
              value={formData.consentWifeDaughter}
              onChange={(e) => onChange('consentWifeDaughter', e.target.value)}
              className="min-w-[20rem] flex-1 border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 focus:border-gray-700 focus:outline-none"
              placeholder=""
            />
            <span>residing at (address)</span>
            <input
              type="text"
              value={formData.consentAddress}
              onChange={(e) => onChange('consentAddress', e.target.value)}
              className="min-w-[20rem] flex-1 border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 focus:border-gray-700 focus:outline-none"
              placeholder=""
            />
          </div>

          <p>
            hereby state that I have been explained fully the probable side effects and after-eects of the prenatal diagnostic procedures. I wish to undergo the pre-natal diagnostic procedures in my interest, to find out the possibility and abnormality (i.e. deformity/deformity/disorder) in the child, I am carrying.
          </p>

          <p>
            I undertake not to terminate the pregnancy if the pre-natal procedure/technique/test conducted show the absence of disease/deformity/disorder.
          </p>

          <p>
            I understand that the sex of the fetus will not be disclosed to me.
          </p>

          <p>
            I understand that breach of this undertaking will make me liable to penalty as prescribed in the Prenatal Diagnostic Technique (Regulation and Prevention of Misuse) Act, 1994 (57 of 1994).
          </p>

          {/* Date and Place - First Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="flex items-baseline gap-2">
              <span>Date :</span>
              <input
                type="date"
                value={formData.consentDate1}
                onChange={(e) => onChange('consentDate1', e.target.value)}
                className="flex-1 border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 focus:border-gray-700 focus:outline-none"
              />
            </div>
            <div className="text-right">
              <span className="text-gray-700">Signature of Patient</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span>Pl ace :</span>
            <input
              type="text"
              value={formData.consentPlace1}
              onChange={(e) => onChange('consentPlace1', e.target.value)}
              className="flex-1 max-w-md border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 focus:border-gray-700 focus:outline-none"
            />
          </div>

          {/* Companion Section */}
          <div className="mt-10 pt-6 border-t border-gray-300">
            <p className="mb-4">
              I have explained the contents of the above consent form to the patient and/or her companion
            </p>

            <div className="space-y-4">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2">
                <span>(Name</span>
                <input
                  type="text"
                  value={formData.consentCompanionName}
                  onChange={(e) => onChange('consentCompanionName', e.target.value)}
                  className="min-w-[15rem] flex-1 border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 focus:border-gray-700 focus:outline-none"
                />
                <span>Address</span>
                <input
                  type="text"
                  value={formData.consentCompanionAddress}
                  onChange={(e) => onChange('consentCompanionAddress', e.target.value)}
                  className="min-w-[20rem] flex-1 border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 focus:border-gray-700 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2">
                <input
                  type="text"
                  value={formData.consentRelationship}
                  onChange={(e) => onChange('consentRelationship', e.target.value)}
                  className="min-w-[10rem] flex-1 border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 focus:border-gray-700 focus:outline-none"
                  placeholder=""
                />
                <span>Relationship</span>
                <input
                  type="text"
                  className="min-w-[15rem] flex-1 border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 focus:border-gray-700 focus:outline-none"
                  placeholder=""
                />
                <span>) in a language she/they understand.</span>
              </div>
            </div>

            {/* Date and Place - Second Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-baseline gap-2">
                <span>Date :</span>
                <input
                  type="date"
                  value={formData.consentDate2}
                  onChange={(e) => onChange('consentDate2', e.target.value)}
                  className="flex-1 border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 focus:border-gray-700 focus:outline-none"
                />
              </div>
              <div className="text-right">
                <span className="text-gray-700">Signature of Patient</span>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span>Pl ace :</span>
              <input
                type="text"
                value={formData.consentPlace2}
                onChange={(e) => onChange('consentPlace2', e.target.value)}
                className="flex-1 max-w-md border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 focus:border-gray-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Doctor/Clinic Information */}
          <div className="mt-10 pt-6 border-t border-gray-300 space-y-6">
            <div className="text-right space-y-2">
              <p className="text-sm text-gray-700">Name, Signature & Registration No.</p>
              <p className="text-sm text-gray-700">of Gynaecologist/Medical Geneticist / Radiologist/</p>
              <p className="text-sm text-gray-700">Pediatrician / Director of the Clinic / Center / Laboratory</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <input
                  type="text"
                  value={formData.consentDoctorName}
                  onChange={(e) => onChange('consentDoctorName', e.target.value)}
                  className="flex-1 border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 focus:border-gray-700 focus:outline-none"
                  placeholder="Doctor Name"
                />
              </div>

              <div className="flex items-baseline gap-2">
                <input
                  type="text"
                  value={formData.consentDoctorRegistration}
                  onChange={(e) => onChange('consentDoctorRegistration', e.target.value)}
                  className="flex-1 border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 focus:border-gray-700 focus:outline-none"
                  placeholder="Registration No."
                />
              </div>
            </div>

            <div className="text-right space-y-2 mt-8">
              <p className="text-sm text-gray-700">Name, Address& Registration No.</p>
              <p className="text-sm text-gray-700">of Genetic Clinic / Institute [Seal]</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <input
                  type="text"
                  value={formData.consentClinicName}
                  onChange={(e) => onChange('consentClinicName', e.target.value)}
                  className="flex-1 border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 focus:border-gray-700 focus:outline-none"
                  placeholder="Clinic/Institute Name"
                />
              </div>

              <div className="flex items-baseline gap-2">
                <input
                  type="text"
                  value={formData.consentClinicAddress}
                  onChange={(e) => onChange('consentClinicAddress', e.target.value)}
                  className="flex-1 border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 focus:border-gray-700 focus:outline-none"
                  placeholder="Address"
                />
              </div>

              <div className="flex items-baseline gap-2">
                <input
                  type="text"
                  value={formData.consentClinicRegistration}
                  onChange={(e) => onChange('consentClinicRegistration', e.target.value)}
                  className="flex-1 border-0 border-b border-gray-400 bg-transparent px-1 py-0.5 focus:border-gray-700 focus:outline-none"
                  placeholder="Registration No."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const embryoDetailCellInput =
  'w-full min-h-[2.5rem] border-0 bg-transparent px-2 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-violet-50/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-400'

const EmbryoDetailsSection = ({ formData, onChange }: any) => {
  const rows = formData.embryoDetailRows as Array<{
    tubeNo: string
    sampleId: string
    noOfCells: string
    gradeOfCells: string
    comments: string
    typeOfCells: string
  }>

  const updateRow = (index: number, field: string, value: string) => {
    const next = rows.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    onChange('embryoDetailRows', next)
  }

  return (
    <div>
      <h2 className="mb-6 text-lg font-bold text-violet-900 sm:text-xl">
        Embryo Details / Spent Culture Medium:
      </h2>

      <div className="overflow-x-auto rounded-lg border-2 border-violet-800">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-violet-100">
              <th className="border border-violet-800 px-2 py-3 font-semibold text-violet-950">Tube No</th>
              <th className="border border-violet-800 px-2 py-3 font-semibold text-violet-950">Sample ID</th>
              <th className="border border-violet-800 px-2 py-3 font-semibold text-violet-950">No. of Cell(s)</th>
              <th className="border border-violet-800 px-2 py-3 font-semibold text-violet-950">Grade of Cells</th>
              <th className="border border-violet-800 px-2 py-3 font-semibold text-violet-950">Comments</th>
              <th className="border border-violet-800 px-2 py-3 font-semibold text-violet-950">Type of Cells</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="bg-white">
                <td className="border border-violet-800 p-0 align-top">
                  <input
                    type="text"
                    value={row.tubeNo}
                    onChange={(e) => updateRow(index, 'tubeNo', e.target.value)}
                    className={embryoDetailCellInput}
                    aria-label={`Row ${index + 1} Tube No`}
                  />
                </td>
                <td className="border border-violet-800 p-0 align-top">
                  <input
                    type="text"
                    value={row.sampleId}
                    onChange={(e) => updateRow(index, 'sampleId', e.target.value)}
                    className={embryoDetailCellInput}
                    aria-label={`Row ${index + 1} Sample ID`}
                  />
                </td>
                <td className="border border-violet-800 p-0 align-top">
                  <input
                    type="text"
                    value={row.noOfCells}
                    onChange={(e) => updateRow(index, 'noOfCells', e.target.value)}
                    className={embryoDetailCellInput}
                    aria-label={`Row ${index + 1} No. of Cells`}
                  />
                </td>
                <td className="border border-violet-800 p-0 align-top">
                  <input
                    type="text"
                    value={row.gradeOfCells}
                    onChange={(e) => updateRow(index, 'gradeOfCells', e.target.value)}
                    className={embryoDetailCellInput}
                    aria-label={`Row ${index + 1} Grade of Cells`}
                  />
                </td>
                <td className="border border-violet-800 p-0 align-top">
                  <input
                    type="text"
                    value={row.comments}
                    onChange={(e) => updateRow(index, 'comments', e.target.value)}
                    className={embryoDetailCellInput}
                    aria-label={`Row ${index + 1} Comments`}
                  />
                </td>
                <td className="border border-violet-800 p-0 align-top">
                  <input
                    type="text"
                    value={row.typeOfCells}
                    onChange={(e) => updateRow(index, 'typeOfCells', e.target.value)}
                    className={embryoDetailCellInput}
                    aria-label={`Row ${index + 1} Type of Cells`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AddPatient