import CustomDialog from './CustomDialog';

interface CustomDialogProps {
    trigger: React.ReactNode;
}

export default function TermsCondition({ trigger }: CustomDialogProps) {

    return (

        <CustomDialog trigger={trigger} title='Terms & Conditions and Privacy Policy' children={
            <>
                <h2 className="text-s3 font-semibold pb-3">Terms & Conditions</h2>
                <article className="text-sm leading-relaxed text-gray-500 text-justify flex flex-col gap-y-4">
                    <div>
                        These Terms & Conditions govern your use of the Barangay Document Request System. By accessing or using the system, you agree to comply with these Terms.
                    </div>

                    <div>
                        <p className='font-semibold'>1. Acceptance of Terms</p>
                        <p>By using the Barangay Document Request System, you agree to abide by these Terms and any applicable rules, guidelines, or policies. If you do not agree, please refrain from using the system.</p>
                    </div>

                    <div>
                        <p className='font-semibold'>2. User Obligations</p>
                        You agree to:
                        <div className='pl-4'>
                            <p>2.1 Provide accurate and complete information during registration and document request processes.</p>
                            <p>2.2 Keep your login credentials and reference number confidential.</p>
                            <p>2.3 Notify Barangay Balagunan immediately if you suspect unauthorized access to your account.</p>
                        </div>
                    </div>

                    <div>
                        <p className='font-semibold'>3. Probihited Use</p>
                        You agree not to:
                        <div className='pl-4'>
                            You may not:
                            <p>3.1 Submit false or misleading information.</p>
                            <p>3.2 Use the system for fraudulent or illegal activities.</p>
                            <p>3.3 Attempt to access or tamper with the system’s infrastructure or security mechanisms.</p>
                        </div>
                    </div>

                    <div>
                        <p className='font-semibold'>4. Suspension and Termination</p>
                        <p>Barangay Balagunan reserves the right to suspend or terminate your access to the system if you violate these Terms, including submitting false information or engaging in unauthorized access. This aligns with the Data Privacy Act of 2012 (Republic Act No. 10173) to ensure compliance and protect user data.</p>
                    </div>

                    <div>
                        <p className='font-semibold'>5. Limitation of Liability</p>
                        <p>The Barangay Document Request System is provided "as is" without warranties. Barangay Balagunan is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the system, as governed by the Civil Code of the Philippines (Republic Act No. 386).</p>
                    </div>

                    <div>
                        <p className='font-semibold'>6. Data Privacy and Security</p>
                        <p>We prioritize the privacy and security of your personal information. Barangay Balagunan ensures your data is protected from unauthorized access or misuse, in compliance with the Data Privacy Act of 2012 (Republic Act No. 10173). Please refer to our Privacy Policy for more details.</p>
                    </div>

                    <div>
                        <p className='font-semibold'>7. Third-Party Links</p>
                        <p>The system may contain links to third-party websites or services. Barangay Balagunan is not responsible for the content or practices of these third parties. We recommend reviewing their terms and privacy policies before using their services.</p>
                    </div>

                    <div>
                        <p className='font-semibold'>8. Governing Law</p>
                        <p>These Terms are governed by the laws of the Philippines. Any disputes arising from these Terms shall be resolved in accordance with Philippine law.</p>
                    </div>
                    <br />
                </article>


                <h2 className="text-s3 font-semibold pb-3">Privacy Policy</h2>
                <article className="text-sm leading-relaxed text-gray-500 text-justify flex flex-col gap-y-3">
                    <div>
                        Barangay Balagunan is committed in protecting and respecting your privacy. This Privacy Policy outlines how we collect, use, store, and safeguard your personal data when you use the Barangay Document Request System.
                    </div>

                    <div>
                        <p className='font-semibold'>1. Information We Collect</p>
                        We collect the following personal information to provide our services:
                        <div className='text-justify pl-4'>
                            <p>1.1 Identification Information: Name, address, reference number.</p>
                            <p>1.2 Contact Information: Email address, phone number.</p>
                            <p>1.3 Other Information: Any data necessary for processing your document request</p>
                        </div>
                    </div>

                    <div>
                        <p className='font-semibold'>2. Use of Personal Data</p>
                        Your personal information is used for:
                        <div className='pl-4'>
                            <p>2.1 Processing and verifying your document requests and communicating with you about their status, in compliance with the Data Privacy Act of 2012 (Republic Act No. 10173).</p>
                            <p>2.2 Providing customer support and resolving issues related to the system.</p>
                            <p>2.3 Fulfilling legal and regulatory obligations.</p>
                        </div>
                        Barangay Balagunan ensures your data is processed fairly, lawfully, and only for legitimate purposes.
                    </div>

                    <div>
                        <p className='font-semibold'>3. Data Sharing</p>
                        We do not share your personal data with third parties unless:
                        <div className='pl-4'>
                            <p>3.1 You have provided explicit consent.</p>
                            <p>3.2 It is required by law or government authorities.</p>
                            <p>3.3 It is necessary to protect the rights, property, or safety of Barangay Balagunan and its users.</p>
                        </div>
                        Any sharing of data adheres strictly to the Data Privacy Act of 2012 (Republic Act No. 10173), ensuring your privacy is maintained.
                    </div>
                    <div>
                        <p className='font-semibold'>4. Data Security</p>
                        <p>We implement robust technical and organizational measures to protect your personal data from unauthorized access, loss, or misuse. Our systems are designed to safeguard your information effectively, while risks may arise in some instances, we are committed to continuously enhancing our security to keep your data safe.</p>
                    </div>

                    <div>
                        <p className='font-semibold'>5. Your Rights</p>
                        You have the right to:
                        <div className='pl-4'>
                            <p>5.1 Access, correct, or update your personal data.</p>
                            <p>5.2 Request the deletion of your data, subject to legal or regulatory requirements.</p>
                            <p>5.3 Object to or restrict the processing of your data under certain circumstances.</p>
                        </div>
                        To exercise these rights, please submit a request to the Barangay Balagunan Office. These rights are upheld under the Data Privacy Act of 2012 (Republic Act No. 10173).
                    </div>

                    <div>
                        <p className='font-semibold'>6. Data Retention</p>
                        <p>We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy and comply with legal obligations, as mandated by the Data Privacy Act of 2012 (Republic Act No. 10173).</p>
                    </div>

                    <div>
                        <p className='font-semibold'>7. Changes to This Privacy Policy</p>
                        <p>We may update this Privacy Policy periodically. Any changes will be communicated through the system or via email. Your continued use of the system after updates signifies your acceptance of the revised policy.</p>
                    </div>

                    <p>If you have any questions or concerns, please feel free to reach out Barangay Balagunan Office.</p>

                </article>

            </>
        } width='w-3xl' contentClassName='mt-9' subTitleClassName='mb-5 text-center font-semibold text-s3 text-lg' />

    );
}