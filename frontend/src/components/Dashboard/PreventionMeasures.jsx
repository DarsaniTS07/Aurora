// PreventionMeasures.jsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import preventionData from "../../data/prevention";

const PreventionMeasures = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // true if mobile

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Prevention Measures
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // column on mobile, row on desktop
        //   flexWrap: "wrap",
          gap: 3,
        }}
      >
        {preventionData.map((item) => (
          <Card
            key={item.id}
            sx={{
              flex: { xs: "1 1 100%", md: "1 1 45%" }, // full width on mobile, half width on desktop
              minWidth: { xs: "100%", md: "300px" },
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              boxShadow: 3,
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mt: 1 }}>
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, mb: 2 }}
              >
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PreventionMeasures;
