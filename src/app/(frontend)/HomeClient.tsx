"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn, ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations";
import { RichText } from "@/components/RichText";
import ClientPageWrapper from "@/components/ClientPageWrapper";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { NewsArticle, Homepage } from "@/lib/payload-data";

interface HomeClientProps {
  newsArticles: NewsArticle[];
  homepage: Homepage | null;
}

export default function HomeClient({ newsArticles, homepage }: HomeClientProps) {
  return (
    <ClientPageWrapper>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          color: 'white',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
            zIndex: 1,
          }}
        />
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            py: 8,
          }}
        >
          <FadeIn delay={0.2}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
              <Image
                src="/logo.png"
                alt="Farsund Grappling Logo"
                width={300}
                height={300}
                priority
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                mb: 4,
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
              }}
            >
              {homepage?.heroSection?.title || 'Velkommen til Farsund Grappling'}
            </Typography>
          </FadeIn>
          <FadeIn delay={0.6}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                component={Link}
                href="/training"
                variant="contained"
                size="large"
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                }}
              >
                {homepage?.heroSection?.scheduleButtonText || 'Se Timeplanen'}
              </Button>
              <Button
                component={Link}
                href="/become-member"
                variant="outlined"
                size="large"
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.1rem',
                  borderColor: 'white',
                  color: 'white',
                  backdropFilter: 'blur(8px)',
                  '&:hover': {
                    backgroundColor: 'white',
                    borderColor: 'white',
                    color: 'text.primary',
                  },
                }}
              >
                {homepage?.heroSection?.memberButtonText || 'Bli Medlem'}
              </Button>
            </Stack>
          </FadeIn>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Box sx={{ py: 8, px: 2, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <ScrollReveal>
            <Typography
              variant="h2"
              align="center"
              sx={{ mb: 8, fontWeight: 700, color: 'text.primary' }}
            >
              {homepage?.whyTrainWithUs?.title || 'Hvorfor Trene Med Oss?'}
            </Typography>
          </ScrollReveal>
          
          <StaggerContainer>
            <Grid container spacing={4}>
              {homepage?.whyTrainWithUs?.features ? (
                homepage.whyTrainWithUs.features.map((feature: any, index: any) => (
                  <Grid size={{ xs: 12, md: 4 }} key={index}>
                    <StaggerItem>
                      <Card
                        sx={{
                          height: '100%',
                          bgcolor: 'grey.100',
                        }}
                      >
                        <CardContent sx={{ p: 4 }}>
                          <Typography
                            variant="h1"
                            sx={{ fontSize: '3rem', mb: 2, color: 'primary.main' }}
                          >
                            {feature.icon}
                          </Typography>
                          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {feature.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  </Grid>
                ))
              ) : (
                // Fallback content
                <>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <StaggerItem>
                      <Card sx={{ height: '100%', bgcolor: 'grey.100' }}>
                        <CardContent sx={{ p: 4 }}>
                          <Typography
                            variant="h1"
                            sx={{ fontSize: '3rem', mb: 2, color: 'primary.main' }}
                          >
                            🥋
                          </Typography>
                          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                            Erfaren Instruktør
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            Lær fra en erfaren instruktør, som vil veilede deg gjennom teknikker og konsepter.
                          </Typography>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  </Grid>
                  
                  <Grid size={{ xs: 12, md: 4 }}>
                    <StaggerItem>
                      <Card sx={{ height: '100%', bgcolor: 'grey.100' }}>
                        <CardContent sx={{ p: 4 }}>
                          <Typography
                            variant="h1"
                            sx={{ fontSize: '3rem', mb: 2, color: 'primary.main' }}
                          >
                            👨‍👩‍👧‍👦
                          </Typography>
                          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                            Støttende Fellesskap
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            Bli med i et vennlig og inkluderende miljø hvor alle hjelper hverandre med å bli bedre.
                          </Typography>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  </Grid>
                  
                  <Grid size={{ xs: 12, md: 4 }}>
                    <StaggerItem>
                      <Card sx={{ height: '100%', bgcolor: 'grey.100' }}>
                        <CardContent sx={{ p: 4 }}>
                          <Typography
                            variant="h1"
                            sx={{ fontSize: '3rem', mb: 2, color: 'primary.main' }}
                          >
                            🏆
                          </Typography>
                          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                            Alle Ferdighetsnivåer
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            Uansett om du er helt nybegynner eller en erfaren utøver, har vi klasser for deg.
                          </Typography>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  </Grid>
                </>
              )}
            </Grid>
          </StaggerContainer>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Box
        sx={{
          py: 8,
          px: 2,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backdropFilter: 'blur(4px)',
          }}
        />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <ScrollReveal>
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 4, color: 'text.primary' }}>
              {homepage?.whatIsGrappling?.title || '🤼‍♂️ Hva er Grappling?'}
            </Typography>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Box sx={{ mb: 4 }}>
              {homepage?.whatIsGrappling?.content ? (
                <Box sx={{ fontSize: '1.25rem', color: 'text.primary' }}>
                  <RichText content={homepage.whatIsGrappling.content} />
                </Box>
              ) : (
                <>
                  <Typography variant="h6" sx={{ mb: 4, lineHeight: 1.8, color: 'text.primary' }}>
                    Grappling er en fellesnevner for kampsporter som er grepsbaserte (BJJ / judo / bryting / submission wrestling), i motsetning til de som benytter slag og spark. I stedet brukes teknikker som kast, posisjonering og bakkekontroll – med mål om å avslutte kampen ved hjelp av leddlåser eller kvelinger.
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 4, lineHeight: 1.8, color: 'text.primary' }}>
                    Disse avslutningene kalles submissions, fordi motstanderen må gi seg (&quot;tappe ut&quot;) for å unngå skade når teknikken utføres korrekt. (obs: man skader ikke hverandre på trening med vilje)          
                  </Typography>
                </>
              )}
            </Box>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <Button
              component={Link}
              href="/become-member"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                py: 2,
                px: 4,
                fontSize: '1.1rem',
              }}
            >
              {homepage?.whatIsGrappling?.ctaButtonText || 'Start i Dag'}
            </Button>
          </ScrollReveal>
        </Container>
      </Box>
      
      {/* Latest News Preview Section */}
      <Box sx={{ py: 8, px: 2, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <ScrollReveal>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 6,
              }}
            >
              <Typography variant="h2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {homepage?.newsSection?.title || 'Siste Nytt'}
              </Typography>
              <Button
                component={Link}
                href="/news"
                endIcon={<ChevronRightIcon />}
                sx={{ fontWeight: 500 }}
              >
                {homepage?.newsSection?.viewAllText || 'Se Alle'}
              </Button>
            </Box>
          </ScrollReveal>
          
          <StaggerContainer>
            <Grid container spacing={4}>
              {newsArticles.slice(0, 3).map((article) => (
                <Grid size={{ xs: 12, md: 4 }} key={article._id}>
                  <StaggerItem>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          bgcolor: 'grey.200',
                          height: 192,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography color="text.secondary">
                          Nyhetsbilde plassholder
                        </Typography>
                      </Box>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mb: 1, display: 'block' }}
                        >
                          {new Date(article.publishedAt).toLocaleDateString('no-NO')}
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                          {article.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                          {article.summary}
                        </Typography>
                        <Button
                          component={Link}
                          href="/news"
                          endIcon={<ArrowForwardIcon />}
                          sx={{ fontWeight: 500 }}
                        >
                          {homepage?.newsSection?.readMoreText || 'Les Mer'}
                        </Button>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                </Grid>
              ))}
            </Grid>
          </StaggerContainer>
        </Container>
      </Box>
    </ClientPageWrapper>
  );
}
