import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import InputError from './InputError';
import CustomSelect from './CustomSelect';
import { DatePicker } from '../ui/date-picker';
import { Input } from '../ui/input';
import TextLink from './CustomTextLink';
import { attachments } from '@/data/FormFields';

interface CustomFormField {
    id?: string;
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    tabIndex?: number;
    autoComplete?: string;
    onChange: (value: string) => void;
    errorMessage?: string;
    autofocus?: boolean;
    options?: { label: string; value: string }[];
    additionalProps?: Record<string, any>;
    selectItems?: { value: string; label: string }[];
    disabled?: boolean;
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
                        disabled={field.disabled}
                        onChange={(e) => field.onChange(e.target.value)}
                        {...field.additionalProps}
                    />
                );
            case 'date':
                return (
                    <DatePicker
                        id={field.id}
                        tabIndex={field.tabIndex}
                        {...field.additionalProps}
                    />
                );
            case 'select':
                return (
                    <CustomSelect
                        placeholder={field.placeholder}
                        items={field.selectItems || []}
                        {...field.additionalProps}
                    />
                );
            case 'link':
                return (
                    <TextLink className='text-sm'>
                        {field.value}
                    </TextLink >
                );

            default:
                return (
                    <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={field.value}
                        autoFocus={field.autofocus}
                        disabled={field.disabled}
                        autoComplete={field.autoComplete}
                        tabIndex={field.tabIndex}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={`
                            disabled:text-black disabled:border-shamrock-green`}
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
export type { CustomFormField };