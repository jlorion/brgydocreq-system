import React from 'react'; 

type TermsModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
    if (!isOpen) return null;

    return (

        <div
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center inset-0 bg-black/80"
            aria-hidden={!isOpen}
        >
            {/* Body */}
            <div className="relative w-full max-w-xl p-2 bg-white rounded-lg shadow dark:bg-gray-700">

                {/* Title */}
                <div className="flex flex-col text-center sm:text-left justify-between p-4 space-y-1.5 border-b border-gray-200 dark:border-gray-600 bg-opacity-50">
                    <h2 className="text-s3 text-2xl font-semibold">
                        Terms & Conditions
                    </h2>
                    <p id="radix-:rf:" className="text-sm text-gray-500 dark:text-gray-400"> {/* Reduced from text-muted-foreground */}
                        Barangay Document Request - Barangay Balagunan
                    </p>
                </div>

                {/* Text */}
                <div className="p-4 space-y-4">
                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 text-justify"> {/* Reduced from text-justify */}
                        By registering with the Barangay Document Request System, you agree to provide accurate information for document requests and communication. Use of the system requires adherence to its guidelines, with violations leading to possible suspension or termination of access.
                        <br />

                        <br />
                        Your personal data will be collected, stored, and used for system operations, including processing requests and communication, in compliance with the Data Privacy Act of 2012 (Republic Act No. 10173). Barangay Balagunan ensures your data is protected from unauthorized access or misuse.
                        <br />

                        <br />
                        We will not share your information with third parties without your consent, except as required by law. You may request access, correction, or deletion of your data per Republic Act No. 10173.
                        <br />

                        <br />
                        Barangay Balagunan may update these terms, with notice provided via email or the system. Continued use signifies acceptance of these terms and updates.
                        <br />

                        <br />
                        By using the system, you agree to follow its rules and policies.
                        <br />
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center p-4 border-t border-gray-200 dark:border-gray-600">
                    <button
                        type="button"
                        className="px-5 py-2.5 ml-3 text-sm font-medium text-s3 bg-white border border-gray-200 rounded-lg hover:bg-s3 hover:text-white transition-colors duration-300"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}