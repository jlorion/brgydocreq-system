<!DOCTYPE html>
<html lang="en">

<head>
    <title>Admin Registration Invitation</title>
</head>

<body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #333;">

    <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #237D31; margin: 0;">Barangay Balagunan</h2>
        <p style="color: #666; font-size: 14px;">Document Requesting System</p>
    </div>

    <div style="padding: 20px; border: 1px solid #ddd; border-radius: 5px;">

        <p>
            You have been invited to register and join the
            <strong>Barangay Balagunan Document Requesting System</strong> as a <strong>{{ $role }}</strong>.
        </p>

        <p>
            As a <strong>{{ $role }}</strong>. you'll help manage barangay records, process resident requests, and contribute to more efficient and responsive public service.
        </p>

        <p>Click the button below to complete your registration:</p>

        <div style="margin: 25px 0; text-align: center;">
            <a href="{{ $registrationLink }}"
                style="background-color: #237D31; color: white; padding: 10px 20px; text-decoration: none; 
                      border-radius: 4px; font-weight: bold; display: inline-block;">
                Register Now
            </a>
        </div>

        <p>
            <strong>Note:</strong> This invitation is valid for 24 hours. Please complete your registration within that period.
        </p>

        <p>If you have any questions or need further assistance, feel free to visit the Barangay Office during official business hours or contact us via email at
            <a href="mailto:balagunan@gmail.com">balagunan@gmail.com</a>.
        </p>


        <div style="margin-top: 60px;">
            <p>Kind regards,</p>
            <strong>Barangay Balagunan</strong>
        </div>
    </div>

    <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; {{ date('Y') }} Barangay Balagunan. All rights reserved.</p>
    </div>
</body>

</html>