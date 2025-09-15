import React, { useRef, useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, useTheme, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import awarenessVideos from "../../data/awareness";

const Awareness = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const fullRef = useRef(null);
  const fullItemsRef = useRef([]);

  const openFullscreen = (index) => {
    // reset refs to ensure correct positions are captured on next render
    fullItemsRef.current = [];
    setActiveIndex(index);
    setOpen(true);
  };

  const closeFullscreen = () => setOpen(false);

  const scrollToActive = () => {
    const container = fullRef.current;
    const target = fullItemsRef.current[activeIndex];
    if (container && target) {
      target.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
  };

  useEffect(() => {
    if (open) {
      // Attempt again on activeIndex change
      const id = setTimeout(scrollToActive, 0);
      return () => clearTimeout(id);
    }
  }, [open, activeIndex]);
  return (
    <Box sx={{ width: "100%", px: { xs: 2, sm: 3 }, py: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: "primary.main" }}>
        Awareness Reels
      </Typography>

      <Box
        sx={{
          display: { xs: "block", md: "grid" },
          gridTemplateColumns: { md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
          gap: 2,
          // Mobile: vertical scroll list
          maxHeight: { xs: 'calc(100vh - 160px)', md: 'none' },
          overflowY: { xs: 'auto', md: 'visible' },
          overflowX: 'hidden',
          pb: 1,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {awarenessVideos.map((video, index) => (
          <Card
            key={video.id}
            sx={{
              width: { xs: '100%', md: 260 },
              height: { xs: 420, md: 370 },
              borderRadius: 3,
              overflow: "hidden",
              bgcolor: theme.palette.mode === "dark" ? "background.paper" : "#fff",
              border: "1px solid",
              borderColor: theme.palette.mode === "dark" ? "primary.dark" : "divider",
              mx: { xs: 0, md: 'auto' },
              mb: { xs: 2, md: 0 },
            }}
          >
            <Box onClick={() => openFullscreen(index)} sx={{ cursor: 'pointer', position: "relative", width: "100%", height: { xs: 340, md: 320 }, bgcolor: "black" }}>
              <iframe
                width="100%"
                height="100%"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ pointerEvents: 'none' }}
              />
            </Box>
            <CardContent sx={{ py: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }} noWrap>
                {video.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Fullscreen viewer */}
      <Dialog fullScreen open={open} onClose={closeFullscreen} onEntered={scrollToActive} PaperProps={{ sx: { bgcolor: 'black' } }}>
        <IconButton aria-label="close" onClick={closeFullscreen} sx={{ position: 'fixed', top: 8, right: 8, zIndex: 10, color: 'common.white' }}>
          <CloseIcon />
        </IconButton>
        <Box
          ref={fullRef}
          sx={{
            width: '100%',
            height: '100vh',
            overflowY: 'auto',
            scrollSnapType: 'y mandatory',
          }}
        >
          {awarenessVideos.map((video, i) => (
            <Box
              key={`full-${video.id}`}
              ref={(el) => (fullItemsRef.current[i] = el)}
              sx={{
                height: 'calc(100vh - 16px)',
                scrollSnapAlign: 'start',
                scrollSnapStop: 'always',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                my: 4,
              }}
            >
              <Box sx={{ width: { xs: '100%', sm: 420, md: 480 }, height: '100%', maxHeight: '100vh' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ pointerEvents: 'auto' }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Dialog>
    </Box>
  );
};

export default Awareness;


