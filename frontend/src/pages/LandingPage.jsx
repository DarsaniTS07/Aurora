import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Paper,
  Chip,
  useTheme,
  alpha,
  Fade,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { features } from "../data/features";

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: "90vh",
  display: "flex",
  alignItems: "center",
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
    theme.palette.background.default,
    1
  )} 100%)`,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "200%",
    height: "200%",
    top: "-50%",
    left: "-50%",
    zIndex: 0,
    background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 60%)`,
    transform: "rotate(30deg)",
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.3s ease",
  background: theme.palette.background.paper,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  borderRadius: "16px",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: `0 16px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${
    theme.palette.secondary.main || alpha(theme.palette.primary.main, 0.7)
  } 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block",
}));

const ProcessConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${
        theme.palette.secondary.main || alpha(theme.palette.primary.main, 0.7)
      } 100%)`,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${
        theme.palette.secondary.main || alpha(theme.palette.primary.main, 0.7)
      } 100%)`,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400],
    borderRadius: 1,
  },
}));

const ProcessStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[400],
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${
      theme.palette.secondary.main || alpha(theme.palette.primary.main, 0.7)
    } 100%)`,
    boxShadow: `0 4px 10px 0 ${alpha(theme.palette.primary.main, 0.3)}`,
  }),
  ...(ownerState.completed && {
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${
      theme.palette.secondary.main || alpha(theme.palette.primary.main, 0.7)
    } 100%)`,
  }),
}));

function ProcessStepIcon(props) {
  const { active, completed, className, icon } = props;

  return (
    <ProcessStepIconRoot ownerState={{ active, completed }} className={className}>
      {completed ? (
        <i className="fas fa-check" style={{ fontSize: 20 }} />
      ) : (
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{icon}</Typography>
      )}
    </ProcessStepIconRoot>
  );
}

// Process steps data
const processSteps = [
  {
    label: 'Input Data',
    description: 'Use location-based detection or manual entry to provide water quality data',
  },
  {
    label: 'Analysis & Prediction',
    description: 'Our AI algorithms analyze the data and predict potential issues',
  },
  {
    label: 'Take Action',
    description: 'Get recommendations, share with community, and implement solutions',
  },
];

export default function LandingPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Chip
              label="Next Generation Water Monitoring"
              color="primary"
              sx={{
                mb: 3,
                px: 2,
                py: 1,
                fontWeight: "bold",
                fontSize: "0.9rem",
                backdropFilter: "blur(10px)",
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              }}
            />
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Revolutionize Water{" "}
              <GradientText variant="h2" component="span">
                Quality Management
              </GradientText>
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                mb: 4,
                maxWidth: 700,
                mx: "auto",
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.25rem" },
              }}
            >
              AI-powered platform for comprehensive water quality monitoring, analysis, 
              and prediction to ensure safe water for communities worldwide.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                mt: 4,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/signup"
                sx={{
                  px: 5,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: "12px",
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                component={Link}
                to="/demo"
                sx={{
                  px: 5,
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: "12px",
                }}
              >
                Live Demo
              </Button>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      {/* Process Flow Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
            }}
          >
            How It <GradientText>Works</GradientText>
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              mb: 6,
              maxWidth: 700,
              mx: "auto",
              color: "text.secondary",
            }}
          >
            Our streamlined process makes water quality management simple and effective
          </Typography>
        </Box>

        <Box sx={{ width: '100%', mb: 10 }}>
          <Stepper alternativeLabel activeStep={0} connector={<ProcessConnector />}>
            {processSteps.map((step, index) => (
              <Step key={step.index}>
                <StepLabel StepIconComponent={ProcessStepIcon}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {step.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {step.description}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

      </Container>

      {/* Features Section */}
      <Box sx={{ py: 10, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Powerful <GradientText>Features</GradientText>
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                mb: 6,
                maxWidth: 700,
                mx: "auto",
                color: "text.secondary",
              }}
            >
              Our platform combines cutting-edge technology with user-friendly design 
              to deliver comprehensive water quality solutions.
            </Typography>
          </Box>

<Grid container spacing={4}>
  {features.map((feature, index) => {
    const IconComponent = feature.icon;
    return (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Fade in timeout={1000} style={{ transitionDelay: `${index * 100}ms` }}>
          <div>
            <FeatureCard>
              <CardContent
                sx={{
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    mb: 3,
                    width: 60,
                    height: 60,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                  }}
                >
                  <IconComponent fontSize="large" color="primary" />
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", flexGrow: 1 }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </FeatureCard>
          </div>
        </Fade>
      </Grid>
    );
  })}
</Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Box
          sx={{
            textAlign: "center",
            p: 6,
            borderRadius: "20px",
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
              theme.palette.primary.main,
              0.1
            )} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Ready to <GradientText>Transform</GradientText> Water Management?
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, maxWidth: 600, mx: "auto", color: "text.secondary" }}
          >
            Join communities worldwide in ensuring water safety with our innovative platform
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/signup"
            sx={{
              px: 6,
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: "12px",
            }}
          >
            Get Started Today
          </Button>
        </Box>
      </Container>
    </Box>
  );
}