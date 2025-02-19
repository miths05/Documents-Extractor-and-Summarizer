interface DataType {
  key: React.Key;
  name: string;
  pages: number;
  startPage: number;
  endPage: number;
  status: string;
  DueDate: string;
  ActualCompletion: string;
  ManagerReview: boolean;
  DoctorName: string;
  Report: string;
  ReportType: string;
}

export const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 300) + 1; // Generates a number between 1 and 300
};
export const getRandomStatus = (): string => {
  const statuses = ["Complete", "Work in progress", "Pending"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};

const getRandomDocumentName = (): string => {
  const documentNames = [
    "Health Assessment",
    "Wellness Report",
    "Medical History",
    "Lab Results",
    "Prescription Record",
    "Treatment Plan",
    "Immunization Records",
    "Surgery Notes",
    "Follow-Up Report",
    "Radiology Report",
  ];
  const randomIndex = Math.floor(Math.random() * documentNames.length);
  return documentNames[randomIndex];
};

const getRandomDoctorName = (): string => {
  const doctorNames = [
    "Dr. Raj",
    "Dr. Ameya",
    "Dr. Ramesh",
    "Dr. Amit",
    "Dr. Hrishikesh",
    "Dr. Poonam",
    "Dr. Arpita",
    "Dr. Modi",
    "Dr. Udhav",
    "Dr. Bose",
  ];
  const randomIndex = Math.floor(Math.random() * doctorNames.length);
  return doctorNames[randomIndex];
};

// Function to generate a random date within a certain range
const getRandomDate = (): Date => {
  const start = new Date();
  const end = new Date(start);
  end.setDate(end.getDate() + 30); // Random date within the next 30 days
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};
export const getStatusStyle = (status: string) => {
  switch (status) {
    case "Complete":
      return { color: "green" };
    case "Work in progress":
      return { color: "orange" };
    case "Pending":
      return { color: "red" };
    default:
      return {};
  }
};

const getRandomReport = (): { report: string; type: string } => {
  const reports = [
    { report: "EKG", type: "Cardiology" },
    { report: "Cholesterol", type: "Blood Test" },
    { report: "X-Ray", type: "Radiology" },
    { report: "MRI", type: "Radiology" },
    { report: "Blood Sugar", type: "Blood Test" },
    { report: "CT Scan", type: "Radiology" },
    { report: "Blood Pressure", type: "Vital Stats" },
    { report: "Vision Test", type: "Optometry" },
    { report: "Urine Analysis", type: "Laboratory" },
    { report: "Allergy Test", type: "Allergy" },
  ];
  const randomIndex = Math.floor(Math.random() * reports.length);
  return reports[randomIndex];
};

// Function to determine the actual completion color
export const getCompletionStyle = (
  dueDate: string,
  actualCompletion: string
) => {
  const due = new Date(dueDate);
  const actual = new Date(actualCompletion);
  const diffDays = (actual.getTime() - due.getTime()) / (1000 * 3600 * 24);

  if (diffDays > 2) {
    return { color: "red" }; // More than 2 days late
  } else if (diffDays > 0) {
    return { color: "orange" }; // Less than or equal to 2 days late
  }
  return {};
};

// Function to create the data source
export const dataSource = Array.from({ length: 50 }).map<DataType>((_, i) => {
  const status = getRandomStatus();
  const dueDate = getRandomDate();
  const randomReport = getRandomReport();

  let actualCompletion: string | null = null;
  let managerReview = false;

  if (status === "Complete") {
    // Generate an actual completion date 2 or 3 days after the due date
    const completionDate = new Date(dueDate);
    const additionalDays = Math.floor(Math.random() * 2) + 2; // 2 or 3 days
    completionDate.setDate(completionDate.getDate() + additionalDays);

    actualCompletion = completionDate.toLocaleDateString();
    managerReview = true; // Should be true for complete status
  }

  return {
    key: i + 1,
    name: getRandomDocumentName(), // Random document name
    pages: getRandomNumber(), // Generate random number of pages
    status: status,
    DueDate: dueDate.toLocaleDateString(), // Format the date as a string
    ActualCompletion: actualCompletion || "", // Will be null if not complete
    ManagerReview: managerReview, // True or false
    startPage: getRandomNumber(),
    endPage: getRandomNumber(),
    DoctorName: getRandomDoctorName(),
    Report: randomReport.report,
    ReportType: randomReport.type,
  };
});
interface FormRules {
  required: boolean;
  message: string;
  pattern?: RegExp;
}
export interface FormField {
  name: string; // The name of the form field
  label: string; // The label for the form field
  rules: any;
  placeholder: string;
  extra: string;
}
interface ExtraMessage {
  doctorName: string;
  report: string;
  reportType: string;
  startPage: string;
  endPage: string;
  pages: string;
  confidenceScore: string;
  actionForUser: string;
  summary: string;
}

const extraMessage: ExtraMessage = {
  doctorName: "",
  report: "",
  reportType: "",
  startPage: "",
  endPage: "",
  pages: "",
  confidenceScore: "This is a % value",
  actionForUser: "",
  summary: "",
};

type ExtraMessageKeys = keyof ExtraMessage;

function getValue(key: ExtraMessageKeys) {
  return extraMessage[key]; // This works as key is now ensured to be from ExtraMessage
}

export const capitalizeFirstLetter = (str: string): string => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const generateFieldList = (list: string[]): FormField[] => {
  return list.map((item) => {
    const rules = {
      required: true,
      message: `Please enter a value for ${item}.`, // Default dynamic message
    };
    const numMessage = "Only numbers are allowed.";
    const charMessage = "No special characters are allowed.";
    let pattern;

    switch (item) {
      case "startPage":
      case "endPage":
      case "confidenceScore":
        pattern = /^\d+$/; // Accepts only numbers
        return {
          name: item,
          label: capitalizeFirstLetter(item.replace(/([A-Z])/g, " $1").trim()),
          placeholder: `Please add ${item}`,
          extra: getValue(item as ExtraMessageKeys), // Use type assertion here
          rules: [
            {
              ...rules,
            },
            {
              pattern,
              message: numMessage, // Custom message for number fields
            },
          ],
        };

      default:
        pattern = /^[a-zA-Z\s.]*$/; // Accepts only letters and spaces
        return {
          name: item,
          label: capitalizeFirstLetter(item.replace(/([A-Z])/g, " $1").trim()),
          placeholder: `Please add ${item}`,
          extra: getValue(item as ExtraMessageKeys), // Use type assertion here
          rules: [
            {
              ...rules,
            },
            {
              pattern,
              message: charMessage, // Custom message for other fields
            },
          ],
        };
    }
  });
};

export const fetchData = async <T>(
  url: string,
  payload?: T
): Promise<T | { error: string }> => {
  try {
    const options: RequestInit = {
      method: payload ? "POST" : "GET", // Use POST if payload is provided, otherwise GET
      headers: {
        "Content-Type": "application/json", // Specify content type
      },
      body: payload ? JSON.stringify(payload) : undefined, // Stringify payload if it exists
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`); // Throw an error if response is not OK
    }

    const data: T = await response.json(); // Parse JSON response
    return data; // Return the data
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "We could'nt fetch the data, please try again later.",
    }; // Return error message if an error occurs
  }
};