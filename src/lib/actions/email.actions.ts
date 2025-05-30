// first create email template: EmailTemplates and api folder in app

export async function sendResetPasswordEmail(
    email: string,
    firstName: string,
    resetUrl: string,
  ) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/send-reset-password-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstName, resetUrl }),
      },
    );
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.error || "Failed to send reset password email");
    }
  
    return data;
  }