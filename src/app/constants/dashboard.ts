export const DASHBOARD_CONFIG = {
    SUPERADMIN: {
        cards: ['Total Enrolled Patients', 'Providers', 'Care managers'],
        diseas: ["Alzheimer's", 'ALS', 'Arthritis', 'Asthma', 'Cancer', 'Obesity', 'Diabetes', 'Cystic Fibrosis', 'Heart Disease', 'Osteoporosis', 'Reflex Sympathetic Dystrophy Syndrome', 'Tobacco Use and Related Conditions'],
    },
    PRACTICEADMIN: {
        cards: [],
        diseas: [],
    },
    CAREMANAGER: {
        cards: ['Tasks', 'New Patients', 'Enrolled', 'Completed 20min'],
        diseas: ['Total Patients', 'Enrolled Patients', 'Completed Patients', 'Inactive Patients', 'Unreachable Patients'],
    },
    PROVIDER: {
        cards: [],
        diseas: [],
    },
    PATIENT: {
        cards: [],
        diseas: [],
    }

}