import { getClubInfo } from "@/lib/data";
import { Box, Container, Grid, Typography, Link as MuiLink, Divider } from '@mui/material';
import Link from 'next/link';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  const clubInfo = getClubInfo();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        color: 'white',
        py: 6,
        px: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
              {clubInfo?.title || 'Farsund Grappling'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', lineHeight: 1.7 }}>
              {clubInfo?.mission || 'En dedikert kampsportklubb i Farsund som tilbyr grappling og Brazilian Jiu-Jitsu for alle nivåer.'}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
              Kontakt
            </Typography>
            <Box component="address" sx={{ fontStyle: 'normal', color: 'white' }}>
              {clubInfo?.contactInfo?.address && (
                <MuiLink
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clubInfo.contactInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    mb: 2,
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    '&:hover': {
                      color: 'primary.light',
                    },
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: 20, mt: 0.3 }} />
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {clubInfo.contactInfo.address}
                  </Typography>
                </MuiLink>
              )}
              {clubInfo?.contactInfo?.email && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ fontSize: 20 }} />
                  <Typography variant="body2">
                    E-post:{' '}
                    <MuiLink
                      href={`mailto:${clubInfo.contactInfo.email}`}
                      sx={{
                        color: 'white',
                        textDecoration: 'underline',
                        transition: 'color 0.3s',
                        '&:hover': {
                          color: 'primary.light',
                        },
                      }}
                    >
                      {clubInfo.contactInfo.email}
                    </MuiLink>
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
              Sosialt
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', mb: 2 }}>
              Følg oss på sosiale medier og bli en del av fellesskapet.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {clubInfo?.contactInfo?.socialMedia?.instagram && (
                <MuiLink
                  href={clubInfo.contactInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    '&:hover': {
                      color: 'primary.light',
                    },
                  }}
                >
                  <InstagramIcon />
                  <Typography variant="body2">@farsundgrappling</Typography>
                </MuiLink>
              )}
              {clubInfo?.contactInfo?.socialMedia?.facebook && (
                <MuiLink
                  href={clubInfo.contactInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    '&:hover': {
                      color: 'primary.light',
                    },
                  }}
                >
                  <FacebookIcon />
                  <Typography variant="body2">Farsund Grappling - Facebook Gruppe</Typography>
                </MuiLink>
              )}
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            &copy; {new Date().getFullYear()} Farsund Grappling. Alle rettigheter reservert.
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 1 }}>
            Nettside utviklet av{' '}
            <MuiLink
              href="https://omerdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'primary.light',
                textDecoration: 'underline',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              OmerDigital
            </MuiLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
