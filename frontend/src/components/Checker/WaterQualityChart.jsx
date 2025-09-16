import React from "react";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  LinearProgress, 
  Grid, 
  Paper,
  useTheme,
  alpha
} from "@mui/material";
import { CheckCircle, AlertTriangle, XCircle, Shield, Droplets, Activity } from "lucide-react";

const WaterQualityChart = ({ waterQuality, advice }) => {
  const theme = useTheme();
  
  const getQualityStyles = () => {
    switch (waterQuality) {
      case "Good":
        return {
          primaryColor: theme.palette.success.main,
          lightColor: alpha(theme.palette.success.main, 0.1),
          icon: <Shield size={32} color={theme.palette.success.main} />,
          chipColor: "success"
        };
      case "Fair":
        return {
          primaryColor: theme.palette.warning.main,
          lightColor: alpha(theme.palette.warning.main, 0.1),
          icon: <AlertTriangle size={32} color={theme.palette.warning.main} />,
          chipColor: "warning"
        };
      default:
        return {
          primaryColor: theme.palette.error.main,
          lightColor: alpha(theme.palette.error.main, 0.1),
          icon: <XCircle size={32} color={theme.palette.error.main} />,
          chipColor: "error"
        };
    }
  };

  const styles = getQualityStyles();

  // Count positive vs negative findings
  const positiveCount = advice.filter(tip => tip.includes("✅")).length;
  const totalCount = advice.length;
  const qualityPercentage = totalCount > 0 ? (positiveCount / totalCount * 100) : 0;

  const getAdviceIcon = (tip) => {
    if (tip.includes("✅")) return <CheckCircle size={20} color={theme.palette.success.main} />;
    if (tip.includes("⚠️")) return <AlertTriangle size={20} color={theme.palette.warning.main} />;
    if (tip.includes("🔍")) return <Activity size={20} color={theme.palette.info.main} />;
    if (tip.includes("💧")) return <Droplets size={20} color={theme.palette.primary.main} />;
    return <AlertTriangle size={20} color={theme.palette.error.main} />;
  };

  const getAdviceStyles = (tip) => {
    if (tip.includes("✅")) {
      return {
        bgcolor: alpha(theme.palette.success.main, 0.1),
        borderColor: theme.palette.success.main,
        color: theme.palette.success.dark
      };
    }
    if (tip.includes("⚠️")) {
      return {
        bgcolor: alpha(theme.palette.warning.main, 0.1),
        borderColor: theme.palette.warning.main,
        color: theme.palette.warning.dark
      };
    }
    if (tip.includes("🔍")) {
      return {
        bgcolor: alpha(theme.palette.info.main, 0.1),
        borderColor: theme.palette.info.main,
        color: theme.palette.info.dark
      };
    }
    if (tip.includes("💧")) {
      return {
        bgcolor: alpha(theme.palette.primary.main, 0.1),
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.dark
      };
    }
    return {
      bgcolor: alpha(theme.palette.error.main, 0.1),
      borderColor: theme.palette.error.main,
      color: theme.palette.error.dark
    };
  };

  return (
    <Card 
      sx={{ 
        mt: 3, 
        p: 3,
        background: `linear-gradient(135deg, ${styles.lightColor} 0%, ${alpha(styles.primaryColor, 0.05)} 100%)`,
        border: `2px solid ${alpha(styles.primaryColor, 0.3)}`,
        boxShadow: 3,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -64,
          right: -64,
          width: 128,
          height: 128,
          borderRadius: '50%',
          background: alpha(theme.palette.common.white, 0.2),
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 48,
          left: -48,
          width: 96,
          height: 96,
          borderRadius: '50%',
          background: alpha(theme.palette.common.white, 0.1),
          zIndex: 0
        }}
      />

      {/* Header Section */}
      <Box sx={{ position: 'relative', zIndex: 1, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Paper 
              elevation={2}
              sx={{ 
                p: 2, 
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.common.white, 0.8)
              }}
            >
              {styles.icon}
            </Paper>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
                Water Quality Assessment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comprehensive parameter analysis
              </Typography>
            </Box>
          </Box>

          {/* Status Badge */}
          <Chip
            label={waterQuality}
            color={styles.chipColor}
            size="large"
            sx={{ 
              fontSize: '1.1rem',
              fontWeight: 'bold',
              px: 2,
              py: 1,
              height: 'auto'
            }}
          />
        </Box>

        {/* Quality Score Visualization */}
        <Paper 
          elevation={1}
          sx={{ 
            p: 3, 
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.common.white, 0.6),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.common.white, 0.4)}`
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'semibold', color: 'text.primary' }}>
              Overall Quality Score
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold', 
                color: styles.primaryColor 
              }}
            >
              {qualityPercentage.toFixed(0)}%
            </Typography>
          </Box>
          
          <LinearProgress
            variant="determinate"
            value={qualityPercentage}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: alpha(theme.palette.grey[300], 0.3),
              '& .MuiLinearProgress-bar': {
                borderRadius: 6,
                background: qualityPercentage >= 75 
                  ? `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`
                  : qualityPercentage >= 50 
                  ? `linear-gradient(90deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`
                  : `linear-gradient(90deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`
              }
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption" color="text.secondary">Critical</Typography>
            <Typography variant="caption" color="text.secondary">Fair</Typography>
            <Typography variant="caption" color="text.secondary">Excellent</Typography>
          </Box>
        </Paper>
      </Box>

      {/* Advice Section */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 3, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            color: 'text.primary'
          }}
        >
          <Box 
            sx={{ 
              width: 4, 
              height: 24, 
              backgroundColor: styles.primaryColor, 
              borderRadius: 1 
            }} 
          />
          Parameter Analysis Results
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {advice.map((tip, index) => {
            const adviceStyle = getAdviceStyles(tip);
            const cleanTip = tip.replace(/[✅⚠️🔍💧🌡️]/g, "").trim();
            
            return (
              <Paper
                key={index}
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: `2px solid ${adviceStyle.borderColor}`,
                  backgroundColor: adviceStyle.bgcolor,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'scale(1.02)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ mt: 0.5, flexShrink: 0 }}>
                    {getAdviceIcon(tip)}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 'medium', 
                        lineHeight: 1.6, 
                        color: adviceStyle.color 
                      }}
                    >
                      {cleanTip}
                    </Typography>
                    
                    {/* Parameter-specific indicators */}
                    {tip.includes("pH") && (
                      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            backgroundColor: theme.palette.info.main, 
                            borderRadius: '50%' 
                          }} 
                        />
                        <Typography variant="caption" color="text.secondary">
                          pH Level Analysis
                        </Typography>
                      </Box>
                    )}
                    {tip.includes("TDS") && (
                      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            backgroundColor: theme.palette.primary.main, 
                            borderRadius: '50%' 
                          }} 
                        />
                        <Typography variant="caption" color="text.secondary">
                          Dissolved Solids Check
                        </Typography>
                      </Box>
                    )}
                    {tip.includes("turbidity") && (
                      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            backgroundColor: theme.palette.secondary.main, 
                            borderRadius: '50%' 
                          }} 
                        />
                        <Typography variant="caption" color="text.secondary">
                          Clarity Assessment
                        </Typography>
                      </Box>
                    )}
                    {tip.includes("temperature") && (
                      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            backgroundColor: theme.palette.warning.main, 
                            borderRadius: '50%' 
                          }} 
                        />
                        <Typography variant="caption" color="text.secondary">
                          Temperature Check
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Paper>
            );
          })}
        </Box>

        {/* Summary Statistics */}
        <Paper 
          elevation={1}
          sx={{ 
            mt: 4, 
            p: 3, 
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.common.white, 0.6),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.common.white, 0.4)}`
          }}
        >
          <Grid container spacing={3} sx={{ textAlign: 'center' }}>
            <Grid item xs={4}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.success.main, mb: 1 }}>
                {positiveCount}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Optimal
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.warning.main, mb: 1 }}>
                {totalCount - positiveCount}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Needs Attention
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 1 }}>
                {totalCount}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total Checked
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Card>
  );
};

export default WaterQualityChart;