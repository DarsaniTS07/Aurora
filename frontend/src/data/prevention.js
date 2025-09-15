// prevention.js
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import PeopleIcon from "@mui/icons-material/People";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

const preventionData = [
  {
    id: 1,
    title: "Install a Water Filter",
    description:
      "Consider installing a whole-house water filtration system to remove impurities from your tap water.",
    iconColor: "primary",
  },
  {
    id: 2,
    title: "Report Contamination",
    description:
      "If you suspect water contamination, report it to your local water authority immediately.",
    iconColor: "secondary",
  },
  {
    id: 3,
    title: "Educate Your Community",
    description:
      "Share water safety and conservation tips with your friends and family to foster awareness.",
    iconColor: "success",
  },
  {
    id: 4,
    title: "Participate in Cleanups",
    description:
      "Join local initiatives to clean up rivers, lakes, and other water bodies in your area.",
    iconColor: "error",
  },
];

export default preventionData;
