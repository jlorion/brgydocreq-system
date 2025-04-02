// CustomForm.jsx
import { Input } from '../ui/input'; // Adjust import path as needed
import { Label } from '../ui/label'; // Adjust import path as needed
import { Textarea } from '../ui/textarea'; // Adjust import path as needed

interface CustomFormProps {
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    gender: string;
    birthday: string;
    precinct: string;
    email: string;
    phoneNumber: string;
}
const CustomForm = ({firstName, middleName, lastName, suffix, gender, birthday, precinct, email, phoneNumber}: CustomFormProps) => {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="grid grid-cols-4 gap-x-4">
                <div>
                    <Label>First name</Label>
                    <Input placeholder={firstName} />
                </div>
                <div>
                    <Label>Middle name</Label>
                    <Input placeholder={middleName} />
                </div>
                <div>
                    <Label>Last name</Label>
                    <Input placeholder={lastName} />
                </div>
                <div>
                    <Label>Suffix</Label>
                    <Input placeholder={suffix} />
                </div>
            </div>

            <div className="grid grid-cols-4 gap-x-4">
                <div>
                    <Label>Gender</Label>
                    <Input placeholder={gender} />
                </div>
                <div>
                    <Label>Birthday</Label>
                    <Input placeholder={birthday} />
                </div>
                <div>
                    <Label>Precinct</Label>
                    <Input placeholder={precinct} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4">
                <div className="flex flex-col">
                    <Label className="text-md pt-4 pb-4">Contact Details</Label>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div>
                            <Label>Email</Label>
                            <Input placeholder={email} />
                        </div>
                        <div>
                            <Label>Phone number</Label>
                            <Input placeholder={phoneNumber} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <Label className="text-md pt-4 pb-4">Attachment</Label>
                    <div className="grid grid-cols-1 gap-x-4">
                        <div>
                            <Label>Purok Clearance</Label>
                            <Input type="file" className='hover:cursor-pointer'/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <Label className="text-md pt-4 pb-4">Purpose</Label>
                <Textarea id="textarea" className="h-24" required tabIndex={4} placeholder="Type your message..." />
            </div>
        </div>
    );
};

export default CustomForm;
