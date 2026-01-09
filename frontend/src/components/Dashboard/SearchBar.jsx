import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { FaMapMarkerAlt, FaLocationArrow } from "react-icons/fa";

const filter = createFilterOptions();

export default function SearchBar({ isDark, toggleTheme }) {
  const [value, setValue] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // You can reverse geocode these coordinates to get address
        // For now, we'll just show coordinates
        setValue({ title: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` });
        setIsLocating(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location. Please try again.');
        setIsLocating(false);
      }
    );
  };

  return (
    <Box
      sx={{
        mt: { xs: 2, sm: 1, md: 1 }, // Push below header for all screens
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: { xs: '100%', sm: '620px', md: '700px', lg: '900px' },
        mx: 'auto',
        px: { xs: 1, sm: 2, md: 0 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          bgcolor: isDark ? 'background.paper' : 'background.default',
          borderRadius: 3,
          boxShadow: isDark ? 3 : 1,
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          minHeight: { xs: 48, sm: 56, md: 64 },
        }}
      >
        <Autocomplete
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                title: `Add "${params.inputValue}"`,
              });
            }
            return filtered;
          }}
          id="location-search"
          options={locations}
          getOptionLabel={(option) => {
            if (typeof option === 'string') return option;
            if (option.inputValue) return option.inputValue;
            return option.title;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={(props, option) => (
            <li {...props}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FaMapMarkerAlt size={14} color={isDark ? '#90caf9' : '#1976d2'} />
                {option.title}
              </Box>
            </li>
          )}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              border: 'none',
              borderRadius: 0,
              '& fieldset': { border: 'none' },
              '&:hover fieldset': { border: 'none' },
              '&.Mui-focused fieldset': { border: 'none' },
            },
            '& .MuiInputBase-root': {
              paddingRight: 0,
              fontSize: { xs: '14px', sm: '16px', md: '18px' },
              minHeight: { xs: 48, sm: 56, md: 64 },
            },
          }}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search for a location..."
              variant="outlined"
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: { xs: '14px', sm: '16px', md: '18px' },
                  padding: { xs: '12px 16px', sm: '14px 20px', md: '18px 24px' },
                },
                '& .MuiInputLabel-root': { display: 'none' },
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <FaMapMarkerAlt
                      size={18}
                      color={isDark ? '#90caf9' : '#666'}
                      style={{ marginLeft: '4px' }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {params.InputProps.endAdornment}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* Location Enable Button */}
        <Box
          sx={{
            borderLeft: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            minWidth: { xs: '44px', sm: '48px', md: '56px' },
            width: { xs: '44px', sm: '48px', md: '56px' },
          }}
        >
          <IconButton
            onClick={getCurrentLocation}
            disabled={isLocating}
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: 0,
              color: isDark ? '#90caf9' : '#1976d2',
              transition: 'all 0.3s ease',
              minWidth: 0,
              '&:hover': {
                bgcolor: isDark ? 'rgba(144, 202, 249, 0.1)' : 'rgba(25, 118, 210, 0.1)',
                transform: 'scale(1.05)',
              },
              '&:disabled': {
                opacity: 0.6,
                transform: 'none',
              },
            }}
            aria-label="Get current location"
          >
            <FaLocationArrow size={20} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

const locations = [
  { title: 'Arunachal Pradesh' },
  { title: 'Assam' },
  { title: 'Manipur' },
  { title: 'Meghalaya' },
  { title: 'Mizoram' },
  { title: 'Nagaland' },
  { title: 'Tripura' },
];