import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Grid,
  Alert,
  IconButton,
  CircularProgress,
  Stack,
  Divider,
  Container
} from "@mui/material";
import {
  Shield as ShieldIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  Science as ScienceIcon,
  WaterDrop as WaterDropIcon
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2E7D32 30%, #00695C 90%)',
  border: 0,
  borderRadius: 12,
  boxShadow: '0 3px 5px 2px rgba(46, 125, 50, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    background: 'linear-gradient(45deg, #1B5E20 30%, #004D40 90%)',
    transform: 'scale(1.02)',
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    maxWidth: 800,
    width: '100%',
    margin: 16,
  },
}));

const RiskCard = styled(Card)(({ theme, risk }) => {
  const getRiskColors = (risk) => {
    if (risk === "High Risk") return { bg: '#ffebee', border: '#f44336', text: '#c62828' };
    if (risk === "Moderate Risk") return { bg: '#fff3e0', border: '#ff9800', text: '#ef6c00' };
    return { bg: '#e8f5e8', border: '#4caf50', text: '#2e7d32' };
  };
  
  const colors = getRiskColors(risk);
  
  return {
    backgroundColor: colors.bg,
    border: `2px solid ${colors.border}`,
    '& .MuiTypography-root': {
      color: colors.text,
    },
  };
});

const ConfidenceCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
  border: '1px solid #e0e0e0',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
  },
}));

const DiseaseScreen = ({ ph, tds, turbidity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const fetchPrediction = async () => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const mockResult = {
        predicted_risk: getRiskLevel(ph, tds, turbidity),
        advice: generateAdvice(ph, tds, turbidity),
        confidence_scores: {
          bacterial_contamination: Math.min(0.95, turbidity * 0.3 + (tds > 500 ? 0.4 : 0.1)),
          chemical_pollutants: Math.min(0.9, Math.abs(ph - 7) * 0.2 + tds / 1000),
          heavy_metals: Math.min(0.85, tds > 300 ? tds / 1000 : 0.1),
          parasites: Math.min(0.8, turbidity * 0.25),
          viral_contamination: Math.min(0.75, turbidity * 0.2 + (ph < 6.5 || ph > 8.5 ? 0.3 : 0.1))
        },
        input: { pH: ph, tds, turbidity },
        recommendations: generateRecommendations(ph, tds, turbidity)
      };
      setResult(mockResult);
      setLoading(false);
    }, 2500);
  };

  const getRiskLevel = (ph, tds, turbidity) => {
    let riskScore = 0;

    if (ph < 6.5 || ph > 8.5) riskScore += 2;
    if (tds > 500) riskScore += 3;
    else if (tds > 300) riskScore += 1;
    if (turbidity > 5) riskScore += 3;
    else if (turbidity > 1) riskScore += 1;

    if (riskScore >= 5) return "High Risk";
    if (riskScore >= 2) return "Moderate Risk";
    return "Low Risk";
  };

  const generateAdvice = (ph, tds, turbidity) => {
    const issues = [];
    if (ph < 6.5) issues.push("acidic pH levels");
    if (ph > 8.5) issues.push("alkaline pH levels");
    if (tds > 500) issues.push("high dissolved solids");
    if (turbidity > 5) issues.push("high turbidity");

    if (issues.length === 0) {
      return "Water quality parameters are within safe ranges. Continue regular monitoring and maintain proper storage practices.";
    }

    return `Water shows ${issues.join(", ")}. Recommend immediate filtration and treatment before consumption. Consider professional water testing for comprehensive analysis.`;
  };

  const generateRecommendations = (ph, tds, turbidity) => {
    const recommendations = [];
    if (ph < 6.5 || ph > 8.5) {
      recommendations.push({
        type: "pH Treatment",
        action: "Use pH adjustment filters or neutralizing agents",
        priority: "High"
      });
    }

    if (tds > 300) {
      recommendations.push({
        type: "TDS Reduction",
        action: "Install RO filtration system",
        priority: tds > 500 ? "Critical" : "Medium"
      });
    }

    if (turbidity > 1) {
      recommendations.push({
        type: "Turbidity Treatment",
        action: "Use sediment filtration and coagulation",
        priority: turbidity > 5 ? "Critical" : "Medium"
      });
    }

    recommendations.push({
      type: "Disinfection",
      action: "UV sterilization or boiling",
      priority: "Standard"
    });

    return recommendations;
  };

  const handleOpen = () => {
    setIsOpen(true);
    fetchPrediction();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "Critical": return "error";
      case "High": return "warning";
      case "Medium": return "info";
      default: return "primary";
    }
  };

  const getProgressColor = (value) => {
    if (value > 0.7) return "error";
    if (value > 0.4) return "warning";
    return "success";
  };

  return (
    <>
      {/* Trigger Button */}
      <GradientButton
        onClick={handleOpen}
        startIcon={<ShieldIcon />}
        size="large"
      >
        Health Risk Analysis
      </GradientButton>

      {/* Modal Dialog */}
      <StyledDialog
        open={isOpen}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c8 100%)',
                }}
              >
                <ShieldIcon sx={{ color: '#2e7d32', fontSize: 32 }} />
              </Box>
              <Box>
                <Typography variant="h5" component="h2" fontWeight="bold" color="primary">
                  Water Health Analysis
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Advanced disease risk assessment
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleClose} size="large">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Container maxWidth={false} disableGutters>
            {/* Loading State */}
            {loading && (
              <Box display="flex" flexDirection="column" alignItems="center" py={8}>
                <Box position="relative" mb={4}>
                  <CircularProgress size={80} thickness={4} sx={{ color: '#2e7d32' }} />
                </Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  Analyzing Health Risks
                </Typography>
                <Typography variant="body1" color="text.secondary" textAlign="center" mb={3}>
                  Processing water quality parameters...
                </Typography>
                <Box width="100%" maxWidth={300}>
                  <LinearProgress
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #2e7d32 0%, #00695c 100%)',
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              </Box>
            )}

            {/* Results */}
            {!loading && result && (
              <Stack spacing={4}>
                {/* Risk Level Alert */}
                <RiskCard risk={result.predicted_risk}>
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="between" mb={2}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <ScienceIcon sx={{ fontSize: 28 }} />
                        <Typography variant="h6" fontWeight="bold">
                          Risk Assessment
                        </Typography>
                      </Box>
                      <TrendingUpIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography variant="h4" fontWeight="bold" textAlign="center">
                      {result.predicted_risk}
                    </Typography>
                  </CardContent>
                </RiskCard>

                {/* Advisory */}
                <Alert 
                  severity="warning" 
                  icon={<WarningIcon fontSize="large" />}
                  sx={{ 
                    '& .MuiAlert-message': { 
                      display: 'flex', 
                      flexDirection: 'column',
                      gap: 1 
                    },
                    py: 2
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Health Advisory
                  </Typography>
                  <Typography variant="body1">
                    {result.advice}
                  </Typography>
                </Alert>

                {/* Confidence Scores */}
                <Box>
                  <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <Box
                      sx={{
                        width: 4,
                        height: 24,
                        background: 'linear-gradient(180deg, #2e7d32 0%, #00695c 100%)',
                        borderRadius: 2,
                      }}
                    />
                    <Typography variant="h6" fontWeight="bold">
                      Risk Confidence Analysis
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    {Object.entries(result.confidence_scores).map(([key, value]) => (
                      <Grid item xs={12} key={key}>
                        <ConfidenceCard>
                          <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                              <Typography variant="subtitle1" fontWeight="medium" sx={{ textTransform: 'capitalize' }}>
                                {key.replace(/_/g, " ")}
                              </Typography>
                              <Typography variant="h6" fontWeight="bold">
                                {(value * 100).toFixed(1)}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={value * 100}
                              color={getProgressColor(value)}
                              sx={{
                                height: 12,
                                borderRadius: 6,
                                backgroundColor: '#e0e0e0',
                                '& .MuiLinearProgress-bar': {
                                  borderRadius: 6,
                                },
                              }}
                            />
                          </CardContent>
                        </ConfidenceCard>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Recommendations */}
                <Box>
                  <Box display="flex" alignItems="center" gap={2} mb={3}>
                    <Box
                      sx={{
                        width: 4,
                        height: 24,
                        background: 'linear-gradient(180deg, #1976d2 0%, #0288d1 100%)',
                        borderRadius: 2,
                      }}
                    />
                    <Typography variant="h6" fontWeight="bold">
                      Treatment Recommendations
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    {result.recommendations.map((rec, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Card sx={{ height: '100%' }}>
                          <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {rec.type}
                              </Typography>
                              <Chip
                                label={rec.priority}
                                color={getPriorityColor(rec.priority)}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {rec.action}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Input Parameters */}
                <Card sx={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)' }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Analyzed Parameters
                    </Typography>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                      {[
                        { label: "pH Level", value: result.input.pH, unit: "", optimal: "6.5-8.5", icon: <ScienceIcon /> },
                        { label: "TDS", value: result.input.tds, unit: " ppm", optimal: "<500", icon: <WaterDropIcon /> },
                        { label: "Turbidity", value: result.input.turbidity, unit: " NTU", optimal: "<5", icon: <WaterDropIcon /> }
                      ].map((param, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                          <Card sx={{ textAlign: 'center', bgcolor: 'white' }}>
                            <CardContent>
                              <Box display="flex" justifyContent="center" mb={1}>
                                {param.icon}
                              </Box>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                {param.label}
                              </Typography>
                              <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
                                {param.value}{param.unit}
                              </Typography>
                              <Divider sx={{ my: 1 }} />
                              <Typography variant="caption" color="text.secondary">
                                Optimal: {param.optimal}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Stack>
            )}
          </Container>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} variant="outlined" size="large">
            Close
          </Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default DiseaseScreen;