import { ROLES } from '../shared/interfaces/roles.interface';
import { SidebarInterface } from '../shared/interfaces/sidebar.interface';

export const SIDEBAR_ACCESS_PANEL: ROLES = {
  SUPERADMIN: getAccessConfig(
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true
  ),
  PRACTICEADMIN: getAccessConfig(
    false,
    true,
    true,
    true,
    true,
    true,
    false,
    false
  ),
  CAREMANAGER: getAccessConfig(
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    false
  ),
  PROVIDER: getAccessConfig(
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false
  ),
  PATIENT: getAccessConfig(
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ),
};

export function getAccessConfig(
  hospital: boolean,
  provider: boolean,
  patient: boolean,
  departments: boolean,
  treatments: boolean,
  assesments: boolean,
  healthTracker: boolean,
  chronicDiseas: boolean
): SidebarInterface {
  return {
    HOSPITAL_MANAGEMENT: hospital,
    PROVIDER_MANAGEMENT: provider,
    PATIENT_MANAGEMENT: patient,
    DEPARTMENTS: departments,
    TREATMENTS: treatments,
    ASSESMENTS: assesments,
    HEALTH_TRACKER: healthTracker,
    CHRONIC_DISEAS: chronicDiseas,
  };
}
