import { getClubInfo } from "@/lib/payload-data";
import { PageTransition, FadeIn, ScrollReveal } from "@/components/animations";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default async function BecomeMemberPage() {
  const clubInfo = await getClubInfo();
  return (
    <PageTransition>
      <Box
        sx={{
          bgcolor: 'rgba(240, 240, 219, 0.5)',
          backdropFilter: 'blur(8px)',
          minHeight: '100vh',
          py: 4,
        }}
      >
      <Container maxWidth="md" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center' }}>
          <FadeIn>
            <Typography variant="h1" sx={{ mb: 6, color: '#30364F', fontWeight: 700 }}>
              Medlemskaps-informasjon
            </Typography>
          </FadeIn>
        
          {/* Registration */}
          <ScrollReveal>
            <Card sx={{ 
              mb: 6, 
              boxShadow: 3, 
              bgcolor: '#E1D9BC',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}>
              <CardContent sx={{ p: 6 }}>
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: '#30364F' }}>
                  Medlemsregistrering
                </Typography>
              
                <Typography variant="h6" sx={{ mb: 6, lineHeight: 1.7, color: '#30364F' }}>
                  Medlemsregistrering og betalinger for {clubInfo?.title || 'Farsund Grappling'} håndteres gjennom Løft Gym.
                  Klikk på knappen nedenfor for å bli omdirigert til deres registreringsside for å fullføre
                  din medlemsregistrering.
                </Typography>
                
                <Button
                  component="a"
                  href="https://loftgym.ibooking.no/?page=signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    py: 2, 
                    px: 4, 
                    fontSize: '1.1rem',
                    bgcolor: '#30364F',
                    color: '#F0F0DB',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#4a5268',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(48, 54, 79, 0.4)',
                    },
                  }}
                >
                  Registrer deg hos Løft Gym
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <Card sx={{ 
              bgcolor: '#F0F0DB',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#30364F' }}>
                  Spørsmål om medlemskap?
                </Typography>
                <Typography variant="body1" sx={{ color: '#30364F' }}>
                  Hvis du har spørsmål om våre medlemsalternativer eller trenger hjelp,
                  ikke nøl med å kontakte oss gjennom våre sosiale medier-kanaler eller
                  snakk med en instruktør i løpet av timen.
                </Typography>
              </CardContent>
            </Card>
          </ScrollReveal>
        </Box>
      </Container>
      </Box>
    </PageTransition>
  );
}
