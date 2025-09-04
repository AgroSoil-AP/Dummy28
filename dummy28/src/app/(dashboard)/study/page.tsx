"use client";

import { Button, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';

//icons
import RocketOutlined from '@ant-design/icons/RocketOutlined';
import Dashboard from '@ant-design/icons/DashboardOutlined';
import Study from '@ant-design/icons/BookOutlined';
//import { RasterMap } from 'components/RasterMap';
import RasterMap from 'components/RasterMap';
import BarWeatherComponent from 'components/weather/BarWeatherComponent';
import PieWeatherComponent from 'components/weather/PieWeatherComponent';
import LineGroundComponent from 'components/weather/LineGroundComponent';

const icons = { RocketOutlined, Dashboard, Study };


export default function FloorStudies() {

  const [showMenu, setShowMenu] = useState(false);

  const togglemenu = () => setShowMenu((prev) => !prev);

    //Estados
      const [weatherData, setWeatherData] = useState<any>();
      const [soilData, setSoilData] = useState<any>();
      const [Interpretations, setInterpretations] = useState<any>();

      const isMobile = useMediaQuery('(max-width:600px)');

   return (
    <Box sx={{ flexGrow: 1, p: 2 }}>

      <Button variant="contained" onClick={togglemenu} sx={{mb:2}}>
        {showMenu ? 'X' : 'Mostrar Menú'}
      </Button>
      
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
        {showMenu && !isMobile && (
          <Grid size={6}>
            <Box sx={{ bgcolor: 'primary.main',
              color: 'primary.contrastText',
              p: 2,
              textAlign: 'center', }}>
              menu informativo
              <Grid size={12}>

                <Box sx={{ bgcolor: 'white',
                  color: 'primary.contrastText',
                  p: 2,
                  textAlign: 'center',}}>
                    Graficos
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ height: 500, width: '100%', marginTop: 2, marginBottom: 2 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                          Temperatura
                        </Typography>
                        <BarWeatherComponent
                          setWeatherData={setWeatherData}
                          weatherData={weatherData}
                        />
                      </Box>

                      <Box sx={{ height: 500, width: '100%', marginTop: 2, marginBottom: 2   }}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                          Humedad
                        </Typography>
                        <PieWeatherComponent setWeatherData={setWeatherData} weatherData={weatherData} />
                      </Box>

                      <Box sx={{ height: 500, width: '100%', marginTop: 2, marginBottom: 2  }}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                          Perfil del suelo
                        </Typography>
                        <LineGroundComponent setSoilData={setSoilData} />
                      </Box>
                    </Box>
                </Box>

                <Box sx={{ bgcolor: 'secondary.main',
                  color: 'white',
                  p: 2,
                  textAlign: 'center',}}>
                    Datos
                </Box>

              </Grid>
            </Box>
          </Grid>          
        )}
        
        {!isMobile && (
        <Grid size={showMenu ? 6 : 12}>
          <Box sx={{ bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
              p: 2,
              textAlign: 'center',}}>
                 Mapa
                 <RasterMap />
            </Box>
        </Grid>
        )}

        {/* Mobile view */}
        {showMenu && isMobile && (
          <Grid size={12}>
            <Box sx={{ bgcolor: 'primary.main',
              color: 'primary.contrastText',
              p: 2,
              textAlign: 'center', }}>
              Menu informativo
              <Grid size={12}>

                <Box sx={{ bgcolor: 'white',
                  color: 'primary.contrastText',
                  p: 2,
                  textAlign: 'center',}}>
                    Graficos
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ height: 500, width: '100%', marginTop: 2, marginBottom: 2 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                          Temperatura
                        </Typography>
                        <BarWeatherComponent
                          setWeatherData={setWeatherData}
                          weatherData={weatherData}
                        />
                      </Box>

                      <Box sx={{ height: 500, width: '100%', marginTop: 2, marginBottom: 2   }}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                          Humedad
                        </Typography>
                        <PieWeatherComponent setWeatherData={setWeatherData} weatherData={weatherData} />
                      </Box>

                      <Box sx={{ height: 500, width: '100%', marginTop: 2, marginBottom: 2  }}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                          Perfil del suelo
                        </Typography>
                        <LineGroundComponent setSoilData={setSoilData} />
                      </Box>
                    </Box>
                </Box>

                <Box sx={{ bgcolor: 'secondary.main',
                  color: 'white',
                  p: 2,
                  textAlign: 'center',}}>
                    Datos
                </Box>

              </Grid>
            </Box>
          </Grid>          
        )}

        {isMobile && (
        <Grid size={12}>
          <Box sx={{ bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
              p: 2,
              textAlign: 'center',}}>
                 Mapa
                 <RasterMap />
            </Box>
        </Grid>
        )}

      </Grid>
    </Box>
  );
}
