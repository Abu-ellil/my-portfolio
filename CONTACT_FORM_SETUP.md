# 📧 Contact Form Setup Guide

Your contact form is now ready to send real emails! Follow these steps to complete the setup.

## 🚀 Option 1: EmailJS Setup (Recommended)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. **Copy the Service ID** (you'll need this)

### Step 3: Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Message from {{from_name}}

Hello {{to_name}},

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

4. **Copy the Template ID** (you'll need this)

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key**
3. **Copy the Public Key** (you'll need this)

### Step 5: Configure Environment Variables
1. Create a `.env` file in your project root:

```bash
# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

2. Replace the placeholder values with your actual EmailJS credentials
3. **Important**: Add `.env` to your `.gitignore` file to keep credentials secure

### Step 6: Test Your Form
1. Run your development server: `npm start`
2. Fill out the contact form
3. Check your email for the message
4. Check browser console for any errors

---

## 🌐 Option 2: Netlify Forms (If deploying on Netlify)

If you're deploying on Netlify, you can use Netlify Forms instead:

### Step 1: Update Contact Form
Add `netlify` and `data-netlify="true"` attributes to your form:

```jsx
<form onSubmit={handleSubmit} className="glass p-8 rounded-xl" netlify data-netlify="true" name="contact">
```

### Step 2: Add Hidden Input
Add this hidden input inside your form:

```jsx
<input type="hidden" name="form-name" value="contact" />
```

### Step 3: Update handleSubmit Function
Replace the EmailJS code with:

```jsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const formData = new FormData(e.target as HTMLFormElement);
    
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString(),
    });

    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });
  } catch (error) {
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus('idle'), 5000);
  }
};
```

---

## 📱 Option 3: Formspree (Alternative)

1. Go to [Formspree.io](https://formspree.io/)
2. Sign up and create a new form
3. Get your form endpoint
4. Update the form action:

```jsx
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

---

## 🔧 Troubleshooting

### Common Issues:

1. **"EmailJS configuration is missing"**
   - Check your `.env` file exists
   - Verify environment variable names start with `REACT_APP_`
   - Restart your development server after adding `.env`

2. **"Failed to send email"**
   - Verify your EmailJS service is active
   - Check your email template variables match
   - Ensure your public key is correct

3. **Form submits but no email received**
   - Check your spam folder
   - Verify the email template is published
   - Test with a different email address

### Testing Tips:
- Use browser developer tools to check console errors
- Test with different email addresses
- Verify your EmailJS dashboard shows successful sends

---

## 🎉 You're All Set!

Once configured, your contact form will:
- ✅ Send emails directly to your inbox
- ✅ Show success/error messages to users
- ✅ Reset the form after successful submission
- ✅ Handle loading states with animations
- ✅ Work on both development and production

Your visitors can now reach out to you directly through your portfolio! 🚀
