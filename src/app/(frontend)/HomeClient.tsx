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

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_HEIGHT = 64;

const COLORS = {
  dark: '#30364F',
  darkHover: '#4a5268',
  cream: '#F0F0DB',
  beige: '#E1D9BC',
  muted: '#4a5268',
  sectionBg: 'rgba(240, 240, 219, 0.75)',
  sectionBgAlt: 'rgba(240, 240, 219, 0.88)',
} as const;

const DEFAULT_FEATURES = [
  { icon: '🥋', title: 'Erfaren Instruktør', description: 'Lær fra en erfaren instruktør som veileder deg gjennom teknikker og konsepter.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Støttende Fellesskap', description: 'Bli med i et vennlig og inkluderende miljø hvor alle hjelper hverandre med å bli bedre.' },
  { icon: '🏆', title: 'Alle Ferdighetsnivåer', description: 'Uansett om du er helt nybegynner eller en erfaren utøver, har vi klasser for deg.' },
];

const DEFAULT_GRAPPLING_TEXT = [
  'Grappling er en fellesnevner for kampsporter som er grepsbaserte (BJJ / judo / bryting / submission wrestling), i motsetning til de som benytter slag og spark. I stedet brukes teknikker som kast, posisjonering og bakkekontroll – med mål om å avslutte kampen ved hjelp av leddlåser eller kvelinger.',
  'Disse avslutningene kalles submissions, fordi motstanderen må gi seg ("tappe ut") for å unngå skade når teknikken utføres korrekt. (obs: man skader ikke hverandre på trening med vilje)',
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroSection({ homepage }: { homepage: Homepage | null }) {
  return (
    <Box
      sx={{
        position: 'relative',
        color: COLORS.cream,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: `-${NAV_HEIGHT}px`,
        pt: `${NAV_HEIGHT}px`,
      }}
    >
      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(48,54,79,0.55) 0%, rgba(48,54,79,0.15) 60%, transparent 100%)',
          zIndex: 1,
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center', py: 6 }}>
        <FadeIn delay={0.15}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
            <Image
              src="/logo.svg"
              alt="Farsund Grappling Logo"
              width={320}
              height={320}
              priority
              style={{ objectFit: 'contain', maxWidth: '80vw', height: 'auto' }}
            />
          </Box>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Typography
            variant="h1"
            sx={{
              mb: 4,
              fontWeight: 700,
              fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
              lineHeight: 1.15,
            }}
          >
            {homepage?.heroSection?.title || 'Velkommen til Farsund Grappling'}
          </Typography>
        </FadeIn>

        <FadeIn delay={0.5}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              component={Link}
              href="/training"
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1rem',
                bgcolor: COLORS.dark,
                color: COLORS.cream,
                '&:hover': {
                  bgcolor: COLORS.darkHover,
                  boxShadow: '0 8px 24px rgba(48, 54, 79, 0.4)',
                },
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
                py: 1.5,
                px: 4,
                fontSize: '1rem',
                borderColor: COLORS.cream,
                color: COLORS.cream,
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  backgroundColor: COLORS.cream,
                  borderColor: COLORS.cream,
                  color: COLORS.dark,
                },
              }}
            >
              {homepage?.heroSection?.memberButtonText || 'Bli Medlem'}
            </Button>
          </Stack>
        </FadeIn>
      </Container>
    </Box>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <Card sx={{ height: '100%', bgcolor: COLORS.beige }}>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography sx={{ fontSize: '2.5rem', mb: 1.5 }}>{icon}</Typography>
        <Typography variant="h5" sx={{ mb: 1.5, fontWeight: 600, color: COLORS.dark }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: COLORS.muted }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

function FeaturesSection({ homepage }: { homepage: Homepage | null }) {
  const features = homepage?.whyTrainWithUs?.features ?? DEFAULT_FEATURES;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: 2, bgcolor: COLORS.sectionBg }}>
      <Container maxWidth="lg">
        <ScrollReveal>
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: { xs: 5, md: 7 }, fontWeight: 700, color: COLORS.dark }}
          >
            {homepage?.whyTrainWithUs?.title || 'Hvorfor Trene Med Oss?'}
          </Typography>
        </ScrollReveal>

        <StaggerContainer>
          <Grid container spacing={3}>
            {features.map((feature: { icon: string; title: string; description: string }, i: number) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <StaggerItem>
                  <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
                </StaggerItem>
              </Grid>
            ))}
          </Grid>
        </StaggerContainer>
      </Container>
    </Box>
  );
}

function GrapplingSection({ homepage }: { homepage: Homepage | null }) {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: 2, bgcolor: COLORS.sectionBgAlt }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <ScrollReveal>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 4, color: COLORS.dark }}>
            {homepage?.whatIsGrappling?.title || 'Hva er Grappling?'}
          </Typography>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Box sx={{ mb: 5 }}>
            {homepage?.whatIsGrappling?.content ? (
              <Box sx={{ fontSize: '1.15rem', color: COLORS.dark, lineHeight: 1.8 }}>
                <RichText content={homepage.whatIsGrappling.content} />
              </Box>
            ) : (
              DEFAULT_GRAPPLING_TEXT.map((text, i) => (
                <Typography key={i} variant="body1" sx={{ mb: 3, lineHeight: 1.8, color: COLORS.dark, fontSize: '1.1rem' }}>
                  {text}
                </Typography>
              ))
            )}
          </Box>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <Button
            component={Link}
            href="/become-member"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1rem',
              bgcolor: COLORS.dark,
              color: COLORS.cream,
              '&:hover': {
                bgcolor: COLORS.darkHover,
                boxShadow: '0 8px 24px rgba(48, 54, 79, 0.4)',
              },
            }}
          >
            {homepage?.whatIsGrappling?.ctaButtonText || 'Start i Dag'}
          </Button>
        </ScrollReveal>
      </Container>
    </Box>
  );
}

function NewsCard({ article, readMoreText }: { article: NewsArticle; readMoreText: string }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: COLORS.beige }}>
      {article.featuredImage?.url ? (
        <Box sx={{ height: 200, position: 'relative', overflow: 'hidden' }}>
          <Image
            src={article.featuredImage.url}
            alt={article.featuredImage.alt || article.title}
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            height: 200,
            bgcolor: COLORS.cream,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: COLORS.muted }}>
            📰
          </Typography>
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="caption" sx={{ mb: 1, color: COLORS.muted }}>
          {new Date(article.publishedAt).toLocaleDateString('no-NO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Typography>
        <Typography variant="h5" sx={{ mb: 1.5, fontWeight: 600, color: COLORS.dark }}>
          {article.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, color: COLORS.muted, flexGrow: 1 }}>
          {article.summary}
        </Typography>
        <Button
          component={Link}
          href="/news"
          endIcon={<ArrowForwardIcon />}
          sx={{ alignSelf: 'flex-start', fontWeight: 500, color: COLORS.dark, px: 0 }}
        >
          {readMoreText}
        </Button>
      </CardContent>
    </Card>
  );
}

function NewsSection({ newsArticles, homepage }: { newsArticles: NewsArticle[]; homepage: Homepage | null }) {
  if (newsArticles.length === 0) return null;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: 2, bgcolor: COLORS.sectionBg }}>
      <Container maxWidth="lg">
        <ScrollReveal>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
            <Typography variant="h2" sx={{ fontWeight: 700, color: COLORS.dark }}>
              {homepage?.newsSection?.title || 'Siste Nytt'}
            </Typography>
            <Button
              component={Link}
              href="/news"
              endIcon={<ChevronRightIcon />}
              sx={{ fontWeight: 500, color: COLORS.dark, display: { xs: 'none', sm: 'flex' } }}
            >
              {homepage?.newsSection?.viewAllText || 'Se Alle'}
            </Button>
          </Box>
        </ScrollReveal>

        <StaggerContainer>
          <Grid container spacing={3}>
            {newsArticles.slice(0, 3).map((article) => (
              <Grid size={{ xs: 12, md: 4 }} key={article._id}>
                <StaggerItem>
                  <NewsCard
                    article={article}
                    readMoreText={homepage?.newsSection?.readMoreText || 'Les Mer'}
                  />
                </StaggerItem>
              </Grid>
            ))}
          </Grid>
        </StaggerContainer>

        {/* Mobile "See all" link */}
        <Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'center', mt: 4 }}>
          <Button
            component={Link}
            href="/news"
            endIcon={<ChevronRightIcon />}
            sx={{ fontWeight: 500, color: COLORS.dark }}
          >
            {homepage?.newsSection?.viewAllText || 'Se Alle'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
// ─── Main Export ────────────────────────────────────────────────────────────

interface HomeClientProps {
  newsArticles: NewsArticle[];
  homepage: Homepage | null;
}

export default function HomeClient({ newsArticles, homepage }: HomeClientProps) {
  return (
    <ClientPageWrapper>
      <HeroSection homepage={homepage} />
      <FeaturesSection homepage={homepage} />
      <GrapplingSection homepage={homepage} />
      <NewsSection newsArticles={newsArticles} homepage={homepage} />
    </ClientPageWrapper>
  );
}
