import {
  Calendar,
  Video,
  CreditCard,
  User,
  FileText,
  ShieldCheck,
} from "lucide-react";

// JSON data for features
export const features = [
  {
    icon: <User className="h-6 w-6 text-[#6ba49f]" />,
    title: "Create Your Profile",
    description:
      "Sign up and complete your profile to get personalized healthcare recommendations and services.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-[#6ba49f]" />,
    title: "Book Appointments",
    description:
      "Browse doctor profiles, check availability, and book appointments that fit your schedule.",
  },
  {
    icon: <Video className="h-6 w-6 text-[#6ba49f]" />,
    title: "Video Consultation",
    description:
      "Connect with doctors through secure, high-quality video consultations from the comfort of your home.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-[#6ba49f]" />,
    title: "Consultation Credits",
    description:
      "Purchase credit packages that fit your healthcare needs with our simple subscription model.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-[#6ba49f]" />,
    title: "Verified Doctors",
    description:
      "All healthcare providers are carefully vetted and verified to ensure quality care.",
  },
  {
    icon: <FileText className="h-6 w-6 text-[#6ba49f]" />,
    title: "Medical Documentation",
    description:
      "Access and manage your appointment history, doctor's notes, and medical recommendations.",
  },
];

// JSON data for testimonials
// export const testimonials = [
//   {
//     initials: "SP",
//     name: "Sarah P.",
//     role: "Patient",
//     quote:
//       "The video consultation feature saved me so much time. I was able to get medical advice without taking time off work or traveling to a clinic.",
//   },
//   {
//     initials: "DR",
//     name: "Dr. Robert M.",
//     role: "Cardiologist",
//     quote:
//       "This platform has revolutionized my practice. I can now reach more patients and provide timely care without the constraints of a physical office.",
//   },
//   {
//     initials: "JT",
//     name: "James T.",
//     role: "Patient",
//     quote:
//       "The credit system is so convenient. I purchased a package for my family, and we've been able to consult with specialists whenever needed.",
//   },
// ];

// JSON data for credit system benefits
export const creditBenefits = [
  "1 Credit = 1 Consultation",
  "One premium credit unlocks one full online consultation ",
  "Credits never expire — use them whenever you need",

  "Save time, travel, and waiting — healthcare now fits your lifestyle",
  "Transparent & value-driven pricing — zero hidden costs",
];

export const testimonials = [
  {
    name: "Ruchi Yadav",
    role: "Real Review",
    rating: 5,
    quote:
      "Doctor Desk is a lifesaver. I was able to consult a specialist within minutes. Highly professional and convenient!",
  },
  {
    name: "Amit Sharma",
    role: "Real Review",
    rating: 5,
    quote:
      "The easiest way to get a medical consultation. The interface is clean and the doctors are very knowledgeable.",
  },
  {
    name: "Neha Verma",
    role: "Real Review",
    rating: 5,
    quote:
      "I was skeptical about online consultation, but Doctor Desk changed my mind. Excellent service and support.",
  },
  {
    name: "Rahul Jain",
    role: "Real Review",
    rating: 5,
    quote:
      "Connecting with top doctors in India has never been this simple. Highly recommended for everyone!",
  },
  {
    name: "Pooja Singh",
    role: "Real Review",
    rating: 5,
    quote:
      "Very convenient and affordable. The doctor explained everything so well. Felt very comfortable throughout.",
  },
  {
    name: "Karan Malhotra",
    role: "Real Review",
    rating: 5,
    quote:
      "No more waiting in long queues. Doctor Desk is exactly what I needed for my family's healthcare needs.",
  },
];
