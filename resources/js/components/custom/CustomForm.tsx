/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker } from '../ui/date-picker';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import InputError from './InputError';
interface CustomFormField {
    id?: string;
    label: string;
    type: string;
    placeholder?: string;
    value: string;
    tabIndex?: number;
    autoComplete?: string;
    onChange: (value: string) => void;
    errorMessage?: string;
    autofocus?: boolean;
    options?: { label: string; value: string }[];
    additionalProps?: Record<string, any>;
}

interface CustomFormProps {
    fields: CustomFormField[];
    title?: string;
    className?: string;
}

const CustomForm = ({ fields, className, title }: CustomFormProps) => {
    const renderField = (field: CustomFormField) => {
        switch (field.type) {
            case 'textarea':
                return (
                    <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        value={field.value}
                        tabIndex={field.tabIndex}
                        onChange={(e) => field.onChange(e.target.value)}
                        {...field.additionalProps}
                    />
                );
            case 'date':
                return <DatePicker id={field.id} tabIndex={field.tabIndex} {...field.additionalProps} />;
            case 'select':
                return (
                    <Select {...field}>
                        <SelectTrigger id={field.id} className="w-[180px]">
                            <SelectValue placeholder={field.placeholder || 'Select an option'} />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options?.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            default:
                return (
                    <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        autoFocus={field.autofocus}
                        autoComplete={field.autoComplete}
                        tabIndex={field.tabIndex}
                        onChange={(e) => field.onChange(e.target.value)}
                        {...field.additionalProps}
                    />
                );
        }
    };

    return (
        <form className="flex flex-col" action="">
            <h1 className="pb-1">{title}</h1>
            <div className={className}>
                {fields.map((field, index) => (
                    <div key={index} className="pb-2">
                        <Label htmlFor={field.id} className="text-xs">
                            {field.label}
                        </Label>
                        {renderField(field)}
                        <InputError message={undefined} />
                    </div>
                ))}
            </div>
        </form>
    );
};

export default CustomForm;
