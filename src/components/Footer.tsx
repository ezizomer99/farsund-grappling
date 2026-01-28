import { getClubInfo } from "@/lib/payload-data";
import { Box, Container, Typography, Link as MuiLink, Divider, Grid } from '@mui/material';
import Image from 'next/image';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';

export default async function Footer() {
  const clubInfo = await getClubInfo();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#30364F',
        backdropFilter: 'blur(8px)',
        color: '#F0F0DB',
        py: 6,
        px: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 0.5, display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/logo.svg"
                alt="Farsund Grappling"
                width={450}
                height={150}
                style={{ objectFit: 'contain' }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: '#F0F0DB', lineHeight: 1.7, textAlign: 'center' }}>
              {clubInfo?.mission || 'Plassholder'}
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#F0F0DB' }}>
              Kontakt
            </Typography>
            <Box component="address" sx={{ fontStyle: 'normal', color: '#F0F0DB' }}>
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
                    color: '#F0F0DB',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    '&:hover': {
                      color: '#E1D9BC',
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
                        color: '#F0F0DB',
                        textDecoration: 'underline',
                        transition: 'color 0.3s',
                        '&:hover': {
                          color: '#E1D9BC',
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
          
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#F0F0DB' }}>
              Sosialt
            </Typography>
            <Typography variant="body2" sx={{ color: '#F0F0DB', mb: 2 }}>
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
                    color: '#F0F0DB',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    '&:hover': {
                      color: '#E1D9BC',
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
                    color: '#F0F0DB',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                    '&:hover': {
                      color: '#E1D9BC',
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
        
        <Divider sx={{ my: 4, borderColor: 'rgba(240, 240, 219, 0.2)' }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(240, 240, 219, 0.7)' }}>
            &copy; {new Date().getFullYear()} Farsund Grappling. Alle rettigheter reservert.
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(240, 240, 219, 0.7)', mt: 1 }}>
            Nettside utviklet av{' '}
            <MuiLink
              href="https://omerdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#E1D9BC',
                textDecoration: 'underline',
                '&:hover': {
                  color: '#F0F0DB',
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
