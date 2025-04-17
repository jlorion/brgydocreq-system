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
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    username: string;
    firstname: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
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
    [key: string]: any; // Add an index signature to satisfy the constraint
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

export interface CustomFormField {
    id?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string | Date | null;
    tabIndex?: number;
    autoComplete?: string;
    onChange?: (value: string | Date | null) => void;
    errorMessage?: string;
    autofocus?: boolean;
    options?: { label: string; value: string }[];
    additionalProps?: Record<string, any>;
    selectItems?: { value: string; label: string }[];
    disabled?: boolean;
}
