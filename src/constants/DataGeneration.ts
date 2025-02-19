import { pdfUrls } from './pdfUrls';

export interface ReportEntry {
  key: React.Key;
  doctorName: string;
  report: string;
  reportType: string;
  startPage: number;
  endPage: number;
  pages: number;
  confidenceScore: number | 'N/A';
  actionForUser: string;
  summary: string;
  attchment?: string | null;
  driveLink: string; // New property for Google Drive link
}

export interface MainEntry {
  key: React.Key;
  srNo: number;
  documentName: string;
  status: string;
  dueDate: string;
  actualCompletion: string | 'N/A';
  managerReview: boolean;
  pages: number;
  data: ReportEntry[];
  attchment?: string | null;
  driveLink: string; // New property for Google Drive link
}

// Predefined array of 15 ReportEntry objects
const manualReportEntries: ReportEntry[] = [
  {
    key: 1,
    doctorName: 'Jerry Floro',
    report: 'EKG',
    reportType: 'Diagnostic Reports',
    startPage: 1587,
    endPage: 1587,
    pages: 1,
    confidenceScore: 90,
    actionForUser: 'Perform final review',
    summary: ' Output shows : Normal sinus rhythm, Normal tracing.',
    attchment: null,
    driveLink: pdfUrls[0].fileUrl,
  },
  {
    key: 2,
    doctorName: 'Mark Buchfuhrer',
    report: 'Sleep Study',
    reportType: 'Diagnostic Reports',
    startPage: 1640,
    endPage: 1645,
    pages: 5,
    confidenceScore: 90,
    actionForUser: 'Need confirmation',
    summary: `
    1) This patient should avoid sedatives. 
    
    2) Weight loss is recommended in this patient to help treat the sleep apnea problem. 
    
    3) This patient should sleep with Nasal CPAP at 20 cm H2O pressure with a medium Respironics full face mask. 
    
    4) Further investigation and treatment of this patient’s non-apnea related nocturnal hypoxemia problem is suggested if clinically warranted. 
    
    Conclusions: 
    
    1) The AHI (Apnea and Hypopnea index) before treatment was instituted with Nasal CPAP was 117 events per hour. This represents a very severe level of obstructive sleep apnea. 
    
    2) Oxygen desaturation below 90% occurred for 122 minutes before CPAP was added. The lowest oxygen saturation noted was below 50%. At optimal levels of CPAP, the lowest oxygen saturation was 77%. 
    
    3) This patient’s sleep apnea problem and snoring were resolved by nasal CPAP at a level of 20 cm H₂O pressure. 
    
    4) There was no clinically significant problem with periodic leg movements during the sleep study.
        `,
    attchment: null,
    driveLink: pdfUrls[1].fileUrl,
  },
  {
    key: 3,
    doctorName: 'SAEED YADEGAR',
    report: 'Chest X-ray',
    reportType: 'Diagnostic Reports',
    startPage: 1650,
    endPage: 1650,
    pages: 1,
    confidenceScore: 90,
    actionForUser: 'Need confirmation',
    summary:
      'Findings: Frontal and lateral views of the chest reveal the lung fields to be clear and there are no pleural effusions. There is no cardiomegaly and pulmonary vasculature appears normal. CONCLUSION:  Negative frontal and lateral views of the chest. ',
    attchment: null,
    driveLink: pdfUrls[2].fileUrl,
  },
  {
    key: 4,
    doctorName: 'Randall Harada',
    report: '2-D Echocardiogram',
    reportType: 'Diagnostic Reports',
    startPage: 155,
    endPage: 155,
    pages: 1,
    confidenceScore: 90,
    actionForUser: 'Need confirmation',
    summary: `
    Finding: Technically difficult obtaining true views due to obesity & poor acoustical windows. 
    2D / M-Mode / Doppler analysis: 
    1. Right ventricular chamber size is at upper limits of normal. 
    2. Normal left ventricular chamber size.
   3. Mild hypokinesis of the mid-to-distal septal wall, anterior septum with possible basal inferior wall. 
   4. Left ventricular ejection fraction estimated to be 45-50%. 
   5. Left ventricular hypertrophy. 
   6. No evidence of pericardial effusion to the extent visualized.
   7. Left atrial enlargement.
   8. All other cardiac chamber sizes are within normal limits.
   9. Thickened aortic valve with normal trileaflets separation to the extent visualized. 
  10. Thickened mitral valve leaflets with adequate opening. 
  11. Mild mitral annulus calcification. :
  12. Normal pulmonic and tricuspid valve structure,
  13. Aortic root dilatation. 
        14, A color flow and spectral Doppler study was performed and revealed
         a, Trace-to-mild tricuspid regurgitation with RV systolic pressure of 26mmHg (obtained by RVIT view). 
         b. Trace mitral regurgitation, 
         c. The peak E velocity is 0.78m/s; 
         d. Thepeak A wave is 0.53m/s; 
    MV deceleration time is 232msec; 
    100bpm; which are consistent with normal left ventricular diastolic function.
      `,
    attchment: null,
    driveLink: pdfUrls[3].fileUrl,
  },
  {
    key: 5,
    doctorName: 'Jhemon Lee',
    report: 'MRI',
    reportType: 'Diagnostic Reports',
    startPage: 1061,
    endPage: 1061,
    pages: 1,
    confidenceScore: 90,
    actionForUser: 'Need confirmation',
    summary: `
    Findings: There is moderate asymmetric subcutaneous soft tissue edema throughout the visualized right calf. There is no evidence of underlying fracture, dislocation, focal bony edema or erosion of the underlying bilateral tibiae and fibulae. 
    There is soft tissue edema of the inferior fibers of the medial head of the gastrocnemius muscle as well as of the inferior fibers of the left soleus muscle (with a tiny 8 mm focus of fluid signal within this). The Achilles tendons appear intact bilaterally.
    No focal masses identified. 
    IMPRESSION: DIFFUSE ASYMMETRIC SUBCUTANEOUS SOFT TISSUE EDEMA THROUGHOUT THE RIGHT CALF CORRESPONDING TO THE CLINICAL HISTORY OF CELLULITIS. NO EVIDENCE OF UNDERLYING FRACTURE, DISLOCATION OR OSTEOMYELITIS.
    INCREASED T2-WEIGHTED SIGNAL IN THE FIBERS OF THE INFERIOR ASPECT OF THE MEDIAL HEAD OF THE RIGHT GASTROCNEMIUS MUSCLE AND IN THE INFERIOR FIBERS OF THE LEFT SOLEUS MUSCLE, MOST LIKELY REPRESENTING MUSCLE STRAIN, LESS LIKELY PARTIAL TEARING OR MYOSITIS.`,
    attchment: null,
    driveLink: pdfUrls[4].fileUrl,
  },
  {
    key: 6,
    doctorName: 'Ankit Patel',
    report: 'Ultrasound',
    reportType: 'Diagnostic Reports',
    startPage: 1062,
    endPage: 1062,
    pages: 1,
    confidenceScore: 90,
    actionForUser: 'Need confirmation',
    summary: ` 
    Findings: There is good visualization of the deep venous system with no intraluminal filling defects identified. Normal venous compressibility is seen and there is flow augmentation. Color flow Doppler imaging is unremarkable.
    Impression: NORMAL STUDY. 
    NO EVIDENCE OF DEEP VENOUS THROMBOSIS `,
    attchment: null,
    driveLink: pdfUrls[5].fileUrl,
  },
  {
    key: 7,
    doctorName: 'Daniel Kharrazi',
    report: 'Operative report',
    reportType: 'Operative report',
    startPage: 345,
    endPage: 348,
    pages: 3,
    confidenceScore: 90,
    actionForUser: 'Need confirmation',
    summary:
      'Preoperative Diagnoses:  Right knee patella alta, chondromalacia patellofemoral joint (patella/trochlea), chondral injury patella grade III/IV, medial/retinacular, capsular tear (partial), laxity of the medial patellofemoral ligament with patellofemoral maltracking and lateral patellofemoral decentralization.  Postoperative Diagnoses:  Right knee patella alta, chondromalacia patellofemoral joint (patella/trochlea), chondral injury patella grade III/IV, medial/retinacular, capsular tear (partial), laxity of medial patellofemoral ligament with patellofemoral maltracking and lateral patellofemoral decentralization, free edge posterior horn medial meniscus tear.  Procedure Performed:  Right knee diagnostic operative arthroscopy with chondroplasty, capsular and retinacular repair (medial), debridement of grade III/IV patellofemoral osteoarthritis/chondromalacia. ',
    attchment: null,
    driveLink: pdfUrls[6].fileUrl,
  },
  {
    key: 8,
    doctorName: 'Sanatkumar Patel',
    report: 'Office Visit',
    reportType: 'Medical Reports',
    startPage: 1598,
    endPage: 1598,
    pages: 1,
    confidenceScore: 90,
    actionForUser: 'Need confirmation',
    summary: `
    The document is a progress note from an office visit for a 45-year-old patient named X. The visit was for a blood pressure check, and the patient reported no problems with medication, chest pain, or shortness of breath. 
    The patient was found to be in good general health with vital signs within normal range. The assessment was that the patient's hypertension was under good control. The plan included continuing medication, following a low-fat, low-cholesterol diet, and scheduling a follow-up. 
    The note was signed by Dr. Ernesto Cortez, D.O. `,
    attchment: null,
    driveLink: pdfUrls[7].fileUrl,
  },
  {
    key: 9,
    doctorName: 'Jeffery Hirsch',
    report: 'Medical Legal Report',
    reportType: 'Medical Records',
    startPage: 114,
    endPage: 153,
    pages: 40,
    confidenceScore: 90,
    actionForUser: 'Need confirmation',
    summary: `Job Description: 
The job description for Mr. X outlines his extensive career as a deputy for the County of Los Angeles Sheriffs Department since 1988. He has worked in various assignments, including custody, patrol, and training, and has been promoted to sergeant in 2016. 
Throughout his career, he has been involved in numerous physical altercations, arrests, and pursuits. Mr. McCabe has a history of hypertension, diabetes, elevated cholesterol, and obstructive sleep apnea, which he attributes to irregular work hours and lifestyle habits. 
Despite musculoskeletal pain, he remains committed to regular physical exercise, with walking being his maximum aerobic activity. 
History of Injury Summary: 
Mr. X has a history of hypertension dating back to the late 1990s, with fluctuating blood pressure readings over the years. In 2016, he was diagnosed with diabetes and elevated cholesterol, which he attributes to irregular work hours and eating habits. He also has obstructive sleep apnea and has been using CPAP for over ten years. Despite musculoskeletal pain and orthopedic injuries, he acknowledges that they do not prevent him from exercising, with walking being his maximum aerobic activity. He denies experiencing significant symptoms such as shortness of breath, chest pain, palpitations, dizziness, or syncope during physical activity.`,
    attchment: null,
    driveLink: pdfUrls[8].fileUrl,
  },

  {
    key: 10,
    doctorName: 'Zizhuang Li',
    report: 'Panel Qualified Medical Evaluation ',
    reportType: 'Medical Records',
    startPage: 288,
    endPage: 320,
    pages: 33,
    confidenceScore: 90,
    actionForUser: 'Need confirmation',
    summary: `HISTORY OF INJURY AND PRESENTING CONDITION: On December 6, 2018, while on patrol, Mr. McCabe felt a pull over his right leg. He did not notice any problems at the time and kept doing his job. Next day he found right leg swelling. , He reported it and he went to his own physician for check. He was sent to hospital right away and stayed in hospital with diagnosis of cellulitis. He stayed in hospital for 10 day and was treated with antibiotics. During hospitalization, he had a consultation by cardiologist because cellulitis and A- fibrillation on December 11,2018 with diagnoses of  

1) Atrial fibrillation reasonably rate controlled given his fever and ongoing cellulitis.  

2) Cellulitis.  

3) Right leg swelling, possible deep venous thrombosis.  

4) Hypertension.  

5) Diabetes.  

6) Hyperlipidemia.  

7) History of noncompliance.  

He was released from hospital with a PICC line for another 10 days antibiotic at home. His cellulitis got better but still there was an ulcer left over his right leg. Then he followed his own physician and got a dressing change by himself at home, He still keeps following up with his own physician. Last visit was 2 months ago. He stayed at home about one month since hospital admission and went back to work in full duty in February 2019. He has been treated by his own physician and paid by his own insurance. Then he filed a claim for work related late and never being evaluated by occupational medical clinic. He still feels pain 1-2/10, walking is fine but with stiffness. 
PAST MEDICAL HISTORY: HTN 12 years, DM 8 years controlled with insulin since 7 month ago 

 

DIAGNOSTIC IMPRESSION: . 1):Diahetes mellitus type.2 with diahetic.dyslipidemia.. 0 oe ee ae ed 2) Hypertension. 3) Ulcer of leg, resolved. 4) Obesity 

 

Causation: Mr. McCabe first started feeling full sensation over his right leg without specific reason or injury events in December 2918. He did not notice any problems at the time and kept doing his job. He went to his own physician and he was sent to the hospital right away, possibly indicating that he had already developed an infection, as infections do not usually developed so fast. His left leg infection could be caused by multiple sources. It most likely came for his uncontrolled diabetes. From his medical record, his blood glucose had never been controlled well since 2011. On 12/30/2011, his blood glucose reached 320 mg, and Alc was 12, and should have been below 100 mg and 6.5 mg, respectively. On June 23,2017, Mr. McCabe was diagnosed as non-compliant. Before he reported his infection on October 19, 2018, his Alc was 12.3 and his blood glucose was 309 mg on November 2, 2018. All of that data indicated that his diabetes was controlled very poorly. Ae know diabetes can affect every part of the body, including the skin. Such problems are sometimes the first sign that a person has diabetes. Some of these problems are skin conditions anyone can have, but people with diabetes get more easily. These include bacterial infections, fungal infections, which Mr. McCabe had in 2017. Combining all those factors with no apparent work related injury events, I believe, Mr. McCabe’s cellulitis followed by skin ulceration is not industrial. `,
    attchment: null,
    driveLink: pdfUrls[9].fileUrl,
  },
  {
    key: 11,
    doctorName: 'Zizhuang Li',
    report: 'Video Conference Disposition',
    reportType: 'Non-Medical Records',
    startPage: 255,
    endPage: 287,
    pages: 33,
    confidenceScore: 90,
    actionForUser: 'Need confirmation',
    summary: `Summary of page 9 -  

Dr. Li’s medical license was suspended because he prescribed a dosage that was too high at a pain medication clinic. His license was also revoked in multiple states, but in California, he was placed on probation for three years. He is currently off probation in California and there are no new issues, just the problems based on his Mississippi medical license. 

Summary of page 12 -  

Dr. Li did not write down the exact times he met with the applicant in his chart, but he kept track of the time using his watch. He did not personally provide the summaries of the medical records in his report, but had assistants make the summaries. He reviewed the actual medical records that were provided to him. `,
    attchment: null,
    driveLink: pdfUrls[10].fileUrl,
  },
];

export function generateData() {
  const dataSource: MainEntry[] = [];

  // Fixed list of document names (remain constant)
  const documentNames = [
    'Patient_1_Medico_Legal_Input',
    'Patient_2_Medico_Legal_Input',
    'Patient_3_Medico_Legal_Input',
    'Patient_4_Medico_Legal_Input',
    'Patient_5_Medico_Legal_Input',
  ];

  // Fixed statuses and page counts
  const fixedStatuses = [
    'Complete',
    'Complete',
    'Complete',
    'Complete',
    'Work in Progress',
  ];

  const fixedPageCounts = [1697, 2254, 1870, 1726, 2150];

  documentNames.forEach((documentName, i) => {
    const status = fixedStatuses[i];
    const totalPages = fixedPageCounts[i];
    const dueDate = generateDueDate();

    const entry: MainEntry = {
      key: i + 1,
      srNo: i + 1,
      documentName: documentName,
      status: status,
      dueDate: dueDate,
      actualCompletion:
        status === 'Complete' ? generateActualCompletion(dueDate) : 'N/A',
      managerReview: status === 'Complete',
      pages: totalPages,
      data: manualReportEntries, // Use the predefined 15 entries
      attchment: null,
      driveLink: documentDriveLinks[i], // Add driveLink here
    };

    dataSource.push(entry);
  });

  return dataSource;
}
const documentDriveLinks = [
  pdfUrls[0].fileUrl,
  pdfUrls[1].fileUrl,
  pdfUrls[2].fileUrl,
  pdfUrls[3].fileUrl,
  pdfUrls[4].fileUrl,
  pdfUrls[5].fileUrl,
  pdfUrls[6].fileUrl,
  pdfUrls[7].fileUrl,
  pdfUrls[8].fileUrl,
  pdfUrls[9].fileUrl,
  pdfUrls[10].fileUrl,
];

// Supporting functions (unchanged)
function generateDueDate() {
  const startDate = new Date(2024, 0, 1); // January 1, 2024
  const endDate = new Date(2024, 11, 31); // December 31, 2024
  const randomDate = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );

  return randomDate.toISOString().split('T')[0]; // Return YYYY-MM-DD format
}

function generateActualCompletion(dueDate: string) {
  const due = new Date(dueDate);
  due.setDate(due.getDate() - 2); // Set completion date to 2 days before the due date

  return due.toISOString().split('T')[0]; // Return YYYY-MM-DD format
}
