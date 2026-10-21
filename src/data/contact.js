export const contactDetails = {
  email: 'amanyadav121214@gmail.com',
  phone: '+91 96536 89030',
  location: 'Mumbai, Maharashtra, India',
  whatsappUrl: `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent('Hi Aman, I saw your portfolio...')}`,
  linkedinUrl: 'https://www.linkedin.com/in/TODO-replace-with-your-linkedin/',
};

export const socials = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/Aman9653', handle: 'github.com/Aman9653' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/aamanyadav',
    handle: 'linkedin.com/in/aamanyadav',
  },
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${contactDetails.email}`,
    handle: contactDetails.email,
  },
];
export const contactSocials = socials;

export const contact = {
  eyebrow: 'Contact',
  title: "Let's Work Together",
  subtitle:
    "Have a project in mind, a role to fill, or just want to say hello? Send a message and I'll get back to you within a day.",
  channels: [
    {
      id: 'email',
      label: 'Email',
      value: contactDetails.email,
      href: `mailto:${contactDetails.email}`,
      icon: 'mail',
    },
    {
      id: 'phone',
      label: 'Phone',
      value: contactDetails.phone,
      href: `tel:${contactDetails.phone.replace(/[^\d+]/g, '')}`,
      icon: 'phone',
    },
    { id: 'location', label: 'Location', value: contactDetails.location, href: null, icon: 'pin' },
    { id: 'availability', label: 'Availability', value: 'Open to new projects', href: null, icon: 'check' },
  ],
  subjects: ['Freelance project', 'Full-time role', 'Collaboration', 'Something else'],
};
