<!DOCTYPE html>
<html lang="en">

<head>
	<title>Resident Verification Reference</title>
</head>

<body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #333; background-color: #f9f9f9;">
	<div style="text-align: center; margin-bottom: 20px;">
		<h2 style="color: #237D31; margin: 0;">Barangay Balagunan</h2>
		<p style="color: #666; font-size: 14px;">Document Requesting System</p>
	</div>

	<div style="padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #ffffff;">

		<p>Dear Resident,</p>

		<p>Thank you for initiating the process to verify your residency within Barangay Balagunan. To proceed with account registration in our Document Requesting System, you have been issued a one-time reference number</p>

		<p><strong>Reference Number:</strong>
			<strong style="font-size: 1.1em;">{{ $refNumber }}</strong>
		</p>

		<p>Note: Please keep this number secure, as it will be required to validate your identity as a legitimate resident during the registration process.</p>

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