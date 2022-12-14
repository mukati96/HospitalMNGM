export class URLS {
  // Authentication
  static readonly LOGIN = `authentication/login/`;
  static readonly RESETPASSWORD = `authentication/password-reset-complete/`;
  static readonly VERIFY_RESET_PASSWORD_TOKEN = `authentication/confirm-password`;
  static readonly FORGOTPASSWORD = `authentication/request-reset-email/`;

  // Hospital
  static readonly ADDHOSPITAL = `hospital/`;
  static readonly GETHOSPITALLIST = `hospital/`;
  static readonly GETHOSPITALDETAIL = `hospital/detail/`;
  static readonly UPDATEHOSPITALDETAIL = `hospital/detail/`;
  static readonly DELETEHOSPITAL = `hospital/detail/`;
  static readonly SEARCHOSPITAL = `hospital/`;

  static readonly ADDBRANCH = `hospital/branch/`;
  static readonly GETBRANCHDETAILS = `hospital/branch/detail/`;
  static readonly EDITBRANCHDETAILS = `hospital/branch/detail/`;
  static readonly GETCHRONICALDISEASE = `hospital/get/default/chronic-diseases/`;
  static readonly SORTCHRONICALDISEASE = `hospital/get/default/chronic-diseases/`;
  static readonly SEARCHCHRONICALDISEASE = `hospital/get/default/chronic-diseases/`;

  static readonly ADDPROVIDER = `account/manager/provider/`;
  static readonly GETPROVIDERDETAILS = `account/manager/provider/`;
  static readonly EDITPROVIDERDETAILS = `account/manager/provider/`;

  static readonly ADDADMIN = `account/manager/practice/admin/create/`;
  static readonly GETADMINDETAILS = `account/manager/practice/admin/retrive/`;
  static readonly EDITADMINDETAILS = `account/manager/practice/admin/retrive/`;

  static readonly ADDCAREMANEGER = `account/manager/caremanager/`;
  static readonly GETCAREMANEGERDETAILS = `account/manager/caremanager/retrive/`;
  static readonly EDITCAREMANEGERDETAILS = `account/manager/caremanager/retrive/`;

  static readonly GETBRANCHLIST = `hospital/branch/location/`;
  static readonly GETUSERLIST = `hospital/user/`;
  static readonly NPI_ID = 'search/';
  static readonly HOSPITAL_SEARCH = 'hospital-search/';
  static readonly PROVIDER_SEARCH_HIPPA = 'provider-search/';
  static readonly TAXONOMY_SEARCH_HIPPA = 'hospital/taxonomy/get/';

  // Dashboard
  static readonly GETHOSPITALDATALIST = `hospital/get/hospital/data/list/`;
  static readonly GETCOUNTDETAIL = `account/manager/count/providers/caremanager/patient/`;
  static readonly GETLINECHARTDETAIL = `hospital/statics/`;
  static readonly GETCAREMANAGERTASKlIST = `account/manager/caremanager/task/list/`;

  // Care Manager

  // DashBoard
  static readonly GETPATIENTTASK = `patient/care_manager/overview/patient-task/`;
  static readonly GETPATIENTSTATS = `patient/show/patient/stats/`;
  static readonly GETCAREMANAGERSTATS = `patient/get/caremanager/calllog/patient/count/`;


  // Patient
  static readonly ADDPATIENT = 'patient/create/patient-detail-caremanager/';
  static GET_PATIENT_DETAIL_BY_ID(id: any) {
    return `patient/get/patient-detail-caremanager/${id}/`;
  }
  static UPDATE_PATIENT_DETAIL_BY_ID(id: any) {
    return `patient/update/patient-detail-caremanager/${id}/`;
  }
  // static readonly ADDPATIENT = `patient/create/patient-for-caremanager/`;
  static readonly UPDATEPATIENTDETAIL = `patient/create/patient-for-caremanager/`;
  static readonly PATIENT = `patient/patient-contact-details/`;
  static readonly PATIENT_DETAIL = `account/manager/caremanager/patient/`;
  static readonly PATIENT_LIST = 'account/manager/patientlist-for-caremanager/';
  static readonly GETPATIENTCOMMUNICATION = `patient/communication/create/`;
  static readonly PATEINT_DETAIL_BY_ID =
    'patient/create/patient-for-caremanager/';
  // static readonly GETPATIENTLIST = `patient/create/patient-for-caremanager/`;
  static readonly GETPATIENTKEYSTATS = `patient/patient/key/stats/`;
  static readonly GETPATIENTTOTALTIME = `patient/patient/treatment/communication/`;
  static readonly GETPATIENTSUMMARY = `patient/patient_summary/`;
  static readonly PATIENTPROGRAM = `patient/program/information/`;
  static readonly GETPATIENTPROGRAM = `patient/program/information/`;
  static readonly GETPATIENTMONTHLYSUMMARY = `patient/monthly-care-report/`;
  static readonly ADDMEDICATION = `hospital/medication/create/`;
  static readonly GETMEDICATION = `hospital/medication/`;
  static readonly UPDATEMEDICATION = `hospital/medication/update/`;
  static readonly ADDMEDICATIONNOTES = `patient/medication-notes/`;
  static readonly GETMEDICATIONNOTES = `patient/medication-notes/`;
  static readonly GETPATIENTPROGRAMTYPE = `patient/program/information/type/`;
  static readonly PATIENT_GOAL = 'patient/goal/';
  static GOAL_DETAIL(patientId: any, goalId: any) {
    return `patient/get/patient/goal/${patientId}/${goalId}`;
  }
  static readonly INTERVENTION_CREATE = 'patient/intervention/create/';
  static GET_INTERVENTION(id: string) {
    return `patient/intervention/details/${id}/`;
  }
  static SELF_MANAGEMENT_LIST(id: any) {
    return `patient/get/patient/task/${id}`;
  }
  static readonly PATIENTASSESSMENT = `assessment/question/category/`;
  static readonly PATIENTASSESSMENTQUESTION = `assessment/get/question/`;
  static readonly STARTASSESSMENT = `assessment/assessment/`;
  static readonly GETPATIENTTASKlIST = `patient/get/patient/task/`;
  static readonly ADDPATIENTTASKS = `patient/task/`;
  static readonly GETPATIENTGOAL = `patient/get/patient/goal/`;
  static readonly UPDATEPATIENTPROGRAM = `patient/program/information/`;
  static readonly SORTINGPATIENT = `account/manager/patientlist-for-caremanager/`;
  static readonly   SENDMAILPATIENT = `patient/send/patient/summary/mail/`;
  //Chronic Diseas for patient
  static readonly GETCHRONICDISEASE = `hospital/patient/chrnonic-disease/`;
  static readonly GETCHRONICDISEASELIST = `hospital/patient/chrnonic-disease/list/`;
  static readonly ASSIGNCHRONICDISEASE = `hospital/patient/chrnonic-disease/assign/`;
  static readonly ADDCHRONICALCONIDITION = `hospital/get/default/chronic-diseases/`;
  static readonly DELETECHRONICDISEASE = `hospital/chronic-disease/update/`;
  static readonly UPDATECHRONICDISEASE = `hospital/chronic-disease/update/`;
  static readonly EDITCHRONICDIEASELIST = `hospital/patient/chrnonic-disease/`;
  static readonly ADDCHRONICDISEASELIST = `hospital/patient/chrnonic-disease/`
  static readonly SUBMITASSESSMENT = `assessment/patient/quetion/answer/`;
  static readonly UPDATEASSESSMENT = `assessment/update/answer/`;
  static readonly GETASSESSMENTDETAILS = `assessment/get/`;
  static readonly GETASSESSMENTLIST = `assessment/assessment/`;
  static readonly AGAINASSESSMENTDETAILS = `assessment/get/`;

  // Annual Wellness Visit
  static readonly GETAWV = `patient/annual-wellness-visit/`;
  static readonly ADDAWV = `patient/annual-wellness-visit/`;
  static readonly UPDATEAWV = `patient/annual-wellness-visit/put/`;
  static readonly GETSCREENING = `patient/get/screening/name/`;


  // Call
  static readonly CALL_START = 'patient/call-log/start/'; // POST
  static readonly CALL_END = 'patient/call-log/end/'; //PUT
  static readonly CALL_LOG = 'patient/call-log/'; // GET with id

  // Provider
  static readonly PROVIDER_SEARCH = 'account/manager/caremanager/provider/';
  static readonly ASSIGN_PROVIDER = 'patient/patient_provider/'; // POST

  // provider
  static readonly ADDCAREPROVIDER = `account/manager/caremanager/provider/`;
  static readonly UPDATECAREPROVIDER = `account/manager/caremanager/provider/detail/`;
  static readonly GETCAREPROVIDER = `account/manager/caremanager/provider/detail/`;
  static readonly CAREPROVIDER_LIST = 'account/manager/caremanager/provider/';
  static readonly ADDMULTIPLEPATIENT =
    'account/manager/caremanager/patient/povider/mapping/multiple-Patient/';
  static readonly GETPATIENTLISTFORCAREMANAGER =
    'account/manager/patientlist-for-caremanager/?unassigned-providers=true/';
  static readonly GETPROVIDERKEYSTATS = 'patient/providers-stats-list/';
  static readonly SORTPROVIDER = `account/manager/caremanager/provider/`;

  // Health trackers
  static readonly BLOOD_GLUCOSE = 'patient/blood_glucose/';
  static readonly BLOOD_PRESSURE = 'patient/blood_pressure/';
  static readonly CHOLESTROL = 'patient/cholesterol/';
  static readonly BMI = 'patient/bmi/';
  static readonly HBA1C = 'patient/hba1c/';
  static readonly PULSE_OX = 'patient/pulse_ox/';
  static readonly CALL_NOTES = 'patient/notes/';

  // Call Logs
  static readonly TOTAL_CALL_LOGS = 'patient/get/patient/calllog/';
  static readonly VITAL_CALL_LOGS = 'patient/vital-call-log/create/';
  static readonly UPDATE_VITAL_CALL_LOGS = 'patient/vital-call-log/update/';
  static readonly MEDICATION_CALL_LOGS = 'patient/medication-call-log/create/';
  static readonly UPDATE_MEDICATION_CALL_LOGS = 'patient/medication-call-log/update/';
  static readonly assessment_call_log = 'patient/assessment-call-log/create/';
  static readonly update_assessment_call_log = 'patient/assessment-call-log/update/';
  static readonly annual_wellness_visit_call_log =
    'patient/annual-wellness-visit-call-log/create/';
    static readonly update_annual_wellness_visit_call_log =
    'patient/annual-wellness-visit-call-log/update/';
  static readonly self_management_plan_call_log =
    'patient/self-management-plan-call-log/create/';
    static readonly update_self_management_plan_call_log =
    'patient/self-management-plan-call-log/update/';

  // Patient Outreach
  static readonly ADDOUTREACH = 'patient/get/patient/outreach/deatils/';
  static readonly GETOUTREACH = 'patient/create/patient/outreach/';
  static readonly UPDATEOUTREACH = 'patient/get/patient/outreach/deatils/';
  static readonly GETVITALS = 'patient/vitals-details/';
  static readonly GETCALLLOGS = 'patient/call-log/';
  static readonly SORTOUTREACH = 'patient/create/patient/outreach/';
}
