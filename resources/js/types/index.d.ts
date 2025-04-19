import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
    admin: Admin;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    auth: Auth;
    admins: AdminFetch[];
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    user_id: string;
    username: string;
    user_email: string;
    user_photopath?: string;
    user_firstname: string;
    [key: string]: unknown; // This allows for additional properties...
}
export interface Admin {
    admin_id: string;
    admin_username: string;
    admin_email: string;
    admin_photopath?: string;
    admin_role: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Role {
    role_id: number;
    role_name: string;
}

export interface RoleItems {
    roles: Role[];
    [key: string]: unknown; // This allows for additional properties...
}

export interface AdminFetch {
    admin_id: number;
    admin_username: string;
    admin_email: string;
    admin_photopath: string;
    admin_role: string;
    officer_firstname: string;
    officer_middlename: string;
    officer_lastname: string;
    officer_suffix: string;
    officer_birthdate: string;
    officer_precinct: string;
    officer_householdnum: string;
    officer_position: string;
    officer_gender: string;
    officer_purok: string;
}

export interface Resident {
    id: number;
    precinctId: string;
    houseHoldNum: string;
    residentName: string;
    residentGender: string;
    residentBirthday: string;
    address: string;
    residentStatus: 'active' | 'inactive';
}

export interface AdminRegisterForm {
    officer_firstname: string;
    officer_middlename: string;
    officer_lastname: string;
    officer_suffix: string;
    officer_birthdate: Date | null;
    officer_householdnum: string;
    admin_email: string;
    admin_phonenum: string;
    admin_username: string;
    admin_role: string;
    admin_password: string;
    admin_password_confirmation: string;
    [key: string]: any;
}

export interface ResidentVerificationForm {
    resident_firstname: string;
    resident_middlename: string;
    resident_lastname: string;
    resident_suffix: string;
    resident_birthdate: string;
    resident_householdnum: string;
    resident_birthdate: Date | null;
    email: string;
    phone_number: string;
}

export interface CustomFormField {
    id?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string | Date | null;
    tabIndex?: number;
    autoComplete?: string;
    name?: string;
    onChange?: (value: string | Date | null) => void;
    errorMessage?: string;
    autofocus?: boolean;
    options?: { label: string; value: string }[];
    additionalProps?: Record<string, any>;
    selectItems?: { value: string; label: string }[];
    disabled?: boolean;
}

export interface InviteForm {
    email: string;
    role: string;
}
