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
      <Container maxWidth="md" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center' }}>
          <FadeIn>
            <Typography variant="h1" sx={{ mb: 6, color: 'text.primary', fontWeight: 700 }}>
              Medlemskaps-informasjon
            </Typography>
          </FadeIn>
        
          {/* Registration */}
          <ScrollReveal>
            <Card sx={{ mb: 6, boxShadow: 3 }}>
              <CardContent sx={{ p: 6 }}>
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: 'text.primary' }}>
                  Medlemsregistrering
                </Typography>
              
                <Typography variant="h6" sx={{ mb: 6, lineHeight: 1.7 }}>
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
                  sx={{ py: 2, px: 4, fontSize: '1.1rem' }}
                >
                  Registrer deg hos Løft Gym
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <Card sx={{ bgcolor: 'grey.50' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                  Spørsmål om medlemskap?
                </Typography>
                <Typography variant="body1">
                  Hvis du har spørsmål om våre medlemsalternativer eller trenger hjelp,
                  ikke nøl med å kontakte oss gjennom våre sosiale medier-kanaler eller
                  snakk med en instruktør i løpet av timen.
                </Typography>
              </CardContent>
            </Card>
          </ScrollReveal>
        </Box>
      </Container>
    </PageTransition>
  );
}
