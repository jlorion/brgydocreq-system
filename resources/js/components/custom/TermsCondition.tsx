import CustomDialog from './CustomDialog';

interface CustomDialogProps {
    trigger: React.ReactNode;
}

export default function TermsCondition({ trigger }: CustomDialogProps) {

    return (
        
        <CustomDialog trigger={trigger} subtitle='Terms & Conditions and Privacy Policy' title='Barangay Balagunan, Santo Tomas, Davao del Norte' children={
                <>
            <h2 className="text-s3 font-semibold pb-3">Terms & Conditions</h2>
            <article className="text-sm leading-relaxed text-gray-500 text-justify">
            {/* {ang content naa sa ubos} */}
            </article>


            <h2 className="text-s3 font-semibold pb-3">Privacy Policy</h2>
            <article className="text-sm leading-relaxed text-gray-500 text-justify">
            {/* {ang content naa sa ubos } */}

            </article>
           
            </>
        } width='w-2xl' contentClassName='mt-9' subTitleClassName='mb-5 text-center font-semibold text-s3 text-lg' />

    );

    
}


// Terms & Conditions


// These Terms & Conditions govern your use of the Barangay Document Request System. By accessing or using the system, you agree to comply with these Terms.  

//  1. Acceptance of Terms
// By using the Barangay Document Request System, you agree to abide by these Terms and any applicable rules, guidelines, or policies. If you do not agree, please refrain from using the system.  

//  2. User Obligations
// You agree to:  
// - Provide accurate and complete information during registration and document request processes.  
// - Keep your login credentials and reference number confidential.  
// - Notify Barangay Balagunan immediately if you suspect unauthorized access to your account.  

//  3. Prohibited Use
// You may not:  
// - Submit false or misleading information.  
// - Use the system for fraudulent or illegal activities.  
// - Attempt to access or tamper with the system’s infrastructure or security mechanisms.  
// Such actions violate the Cybercrime Prevention Act of 2012 (Republic Act No. 10175), and offenders may face legal consequences.  

//  4. Suspension and Termination
// Barangay Balagunan reserves the right to suspend or terminate your access to the system if you violate these Terms, including submitting false information or engaging in unauthorized access. This aligns with the Data Privacy Act of 2012 (Republic Act No. 10173) to ensure compliance and protect user data.  

//  5. Limitation of Liability
// The Barangay Document Request System is provided "as is" without warranties. Barangay Balagunan is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the system, as governed by the Civil Code of the Philippines (Republic Act No. 386).  

//  6. Data Privacy and Security
// We prioritize the privacy and security of your personal information. Barangay Balagunan ensures your data is protected from unauthorized access or misuse, in compliance with the Data Privacy Act of 2012 (Republic Act No. 10173). Please refer to our Privacy Policy for more details.  

//  7. Governing Law
// These Terms are governed by the laws of the Republic of the Philippines. Any disputes will be resolved in the appropriate courts of Davao del Norte, in accordance with the Civil Code of the Philippines (Republic Act No. 386).  

//  8. Amendments to Terms
// Barangay Balagunan may modify these Terms at any time. Updates will be communicated through the system or via email. Your continued use of the system after changes indicates acceptance of the revised Terms.  



// Privacy Policy

// Barangay Balagunan is committed in protecting and respecting your privacy. This Privacy Policy outlines how we collect, use, store, and safeguard your personal data when you use the Barangay Document Request System.

//  1. Information We Collect
// We collect the following personal information to provide our services:  
// - Identification Information: Name, address, reference number.  
// - Contact Information: Email address, phone number.  
// - Other Information: Any data necessary for processing your document request.  

//  2. Use of Personal Data
// Your personal information is used for:  
// - Processing and verifying your document requests and communicating with you about their status, in compliance with the Data Privacy Act of 2012 (Republic Act No. 10173).  
// - Providing customer support and resolving issues related to the system.  
// - Fulfilling legal and regulatory obligations.  
// Barangay Balagunan ensures your data is processed fairly, lawfully, and only for legitimate purposes.  

//  3. Data Sharing
// We do not share your personal data with third parties unless:  
// - You have provided explicit consent.  
// - It is required by law or government authorities.  
// - It is necessary to protect the rights, property, or safety of Barangay Balagunan and its users.  
// Any sharing of data adheres strictly to the Data Privacy Act of 2012 (Republic Act No. 10173), ensuring your privacy is maintained.  

//  4. Data Security
// We implement robust technical and organizational measures to protect your personal data from unauthorized access, loss, or misuse. Our systems are designed to safeguard your information effectively, while risks may arise in some instances, we are committed to continuously enhancing our security to keep your data safe.

// 5. Your Rights
// You have the right to:  
// - Access, correct, or update your personal data.  
// - Request the deletion of your data, subject to legal or regulatory requirements.  
// - Object to or restrict the processing of your data under certain circumstances.  
// To exercise these rights, please submit a request to the Barangay Balagunan Office. These rights are upheld under the Data Privacy Act of 2012 (Republic Act No. 10173).  

//  6. Data Retention
// We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy and comply with legal obligations, as mandated by the Data Privacy Act of 2012 (Republic Act No. 10173).  

//  7. Changes to This Privacy Policy
// We may update this Privacy Policy periodically. Any changes will be communicated through the system or via email. Your continued use of the system after updates signifies your acceptance of the revised policy.  
 

// If you have any questions or concerns, please feel free to reach out Barangay Balagunan Office.