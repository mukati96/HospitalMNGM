
export class AuthRoutes {
  static readonly EMPTY = '';
  static readonly LOGIN = 'login';
  static readonly FORGOT_PASSWORD = 'forgot-password';
  static readonly RESET_PASSWORD = 'reset-password/:token/:uid'
  static readonly RESET = 'confirm-password';
}

export class LayoutRoutes {
  static readonly EMPTY = '';
  static readonly DASHBOARD = '';
  static readonly VIEW_WITH_ID = ':id';
  static readonly UPDATE_WITH_ID = 'update/:id';
  static readonly ADD = 'add';
  static readonly PATIENTS = 'patients';
  static readonly HOSPITALS = 'hospitals';
  static readonly PROVIDERS = 'providers';
  static readonly TREATMENT = 'treatment';
  static readonly CHRONIC_DISEAS = 'chronic-deseas';
  static readonly CALL = 'call';
  static readonly PROFILE = 'profile';
  static readonly OUTREACH = 'outreach';
}

export class FULL_ROUTES {
  // Auth Routes
  static readonly LOGIN = `/${AuthRoutes.LOGIN}`;
  static readonly FORGOT_PASSWORD = `/${AuthRoutes.FORGOT_PASSWORD}`;
  static readonly RESET_PASSWORD = `/${AuthRoutes.RESET_PASSWORD}`;
  static readonly RESET = `/${AuthRoutes.RESET}`;

  // Layout Routes
  static readonly DASHBOARD = `/${LayoutRoutes.DASHBOARD}`;

  // Patients
  static readonly PATIENTS = `/${LayoutRoutes.PATIENTS}`;
  static readonly ADD_PATIENTS = `/${LayoutRoutes.PATIENTS}/${LayoutRoutes.ADD}`;
  static readonly UPDATE_PATIENTS = `/${LayoutRoutes.PATIENTS}/update`;
  static readonly INITIATE_CALL = `/${LayoutRoutes.CALL}`;
  static readonly OUTREACH = `/${LayoutRoutes.PATIENTS}/${LayoutRoutes.OUTREACH}`;
  static readonly ADD_OUTREACH = `/${LayoutRoutes.PATIENTS}/${LayoutRoutes.OUTREACH}/${LayoutRoutes.ADD}`;

  // Hospitals
  static readonly HOSPITALS = `/${LayoutRoutes.HOSPITALS}`;
  static readonly ADD_HOSPITALS = `/${LayoutRoutes.HOSPITALS}/${LayoutRoutes.ADD}`;
  static readonly UPDATE_HOSPITALS = `/${LayoutRoutes.HOSPITALS}/update`;

  // Providers
  static readonly PROVIDERS = `/${LayoutRoutes.PROVIDERS}`;
  static readonly ADD_PROVIDERS = `/${LayoutRoutes.PROVIDERS}/${LayoutRoutes.ADD}`;
  static readonly UPDATE_PROVIDERS = `/${LayoutRoutes.PROVIDERS}/update`;

  // Treatment
  static readonly TREATMENT = `/${LayoutRoutes.TREATMENT}`;

  // Chronic Diseas
  static readonly CHRONIC_DISEAS = `/${LayoutRoutes.CHRONIC_DISEAS}`;
  static readonly ADD_CHRONIC_DISEAS = `/${LayoutRoutes.CHRONIC_DISEAS}/${LayoutRoutes.ADD}`;
  static readonly UPDATE_CHRONIC_DISEAS = `/${LayoutRoutes.CHRONIC_DISEAS}/update`;

  // Profile
  static readonly PROFILE = `/${LayoutRoutes.PROFILE}`;
}
