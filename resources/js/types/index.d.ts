import { LucideIcon } from 'lucide-react';
import { ChangeEvent } from 'react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: UserForm;
    admin: AdminForm;
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
    admins: AdminForm[];
    residents: ResidentForm[];
    roles: Role[];
    guard: 'admin' | 'user' | null;
    documents: DocumentForm[];
    notifications: NotificationItem[];
    docprocessing: DocumentProcessingForm[];
    puroks: Purok[];
    status: Status[];
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface NotificationItem {
    notification_id: number;
    notification: string;
    updated_at: string;
    status_name: string;
    additional_message: string;
}
export interface UserForm {
    user_id: number;
    username: string;
    user_email: string;
    user_phonenum: string;
    user_photopath: string;
    resident_firstname: string;
    resident_middlename: string;
    resident_lastname: string;
    resident_suffix: string | null;
    resident_birthdate: string;
    resident_gender: string;
    resident_precinct: string;
    resident_householdnum: string;
    resident_purok: string;
}

export interface Role {
    role_id: number;
    role_name: string;
}

export interface Purok {
    address_id: number;
    purok: string;
}

export interface Status {
    status_id: number;
    status_name: string;
}

export interface DocumentForm {
    document_id: number;
    status_id: number | null;
    document_name: string;
    description: string;
    price: string;
    document_photopath: File | null;
}

export interface DocumentReqForm {
    user_id: number;
    document_id: number;
    document_name: string;
    requested_purpose: string;
    attachment_path: File | null;
}
export interface DashboardColumn {
    id: number;
    metric: string;
    count: number;
    last_updated: string;
    change: string;
}
export interface DocumentProcessingForm {
    requested_document_id: number;
    onprocess_id: number;
    user_id: number;
    admin_id: number;
    status_id: number;
    document_id: number;
    amount: number;
    additional_message: string;
    notification: string;
    officer_firstname: string;
    officer_lastname: string;
    resident_firstname: string;
    resident_lastname: string;
    requested_purpose: string;
    document_name: string;
    status_name: string;
    attachment_path: File | null;
    created_at: Date;
    updated_at: Date;
}

export interface AdminForm {
    admin_id: number;
    admin_status: number;
    admin_username: string;
    admin_email: string;
    admin_photopath: File | null;
    admin_roleid: number | null;
    admin_phonenum: string;
    admin_role: string;
    officer_firstname: string;
    officer_middlename: string;
    officer_lastname: string;
    officer_suffix: string | null;
    officer_birthdate: string;
    officer_precinct: string;
    officer_householdnum: string;
    officer_position: string;
    officer_gender: string;
    officer_purok: string;
    officer_purokid: number | null;
}

export interface ResidentForm {
    resident_id: number;
    resident_firstname: string;
    resident_middlename: string;
    resident_lastname: string;
    resident_suffix: string | null;
    resident_birthdate: string;
    resident_gender: string;
    resident_precinct: string;
    resident_householdnum: string;
    resident_status: string;
    resident_purok: string;
    resident_statusid: number | null;
    resident_purokid: number | null;
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

export interface InviteForm {
    email: string;
    role_id: number | null;
}

// Base interface for common properties
interface BaseFormField {
    id?: string;
    label?: string;
    tabIndex?: number;
    required?: boolean;
    autoFocus?: boolean;
    disabled?: boolean;
    maxLength?: number;
    pattern?: string;
    errorMessage?: string;
    additionalProps?: Record<string, any>;
}

// Specific interfaces for each field type
interface TextField extends BaseFormField {
    type: 'text' | 'email' | 'password' | 'number';
    placeholder?: string;
    value?: string | number | null;
    autoComplete?: string;
    autofocus?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface TextareaField extends BaseFormField {
    type: 'textarea';
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

interface FileField extends BaseFormField {
    type: 'file';
    accept?: string;
    value?: File | null;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface SelectField extends BaseFormField {
    type: 'select';
    placeholder?: string;
    value?: number | null;
    selectItems?: { value: number; label: string; disabled?: boolean }[];
    disabled?: boolean;
    onChange?: (value: number) => void;
}

interface DateField extends BaseFormField {
    type: 'date';
    placeholder?: string;
    formatDate?: string;
    value?: string | Date | null;
    onChange?: (date: Date | null) => void;
}

// Discriminated union
export type CustomFormField = TextField | TextareaField | FileField | SelectField | DateField;
