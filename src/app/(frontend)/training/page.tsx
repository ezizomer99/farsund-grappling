import { getTrainingPrograms, getTrainingPage } from "@/lib/payload-data";
import { PageTransition, FadeIn, ScrollReveal } from "@/components/animations";
import { RichText } from "@/components/RichText";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// ─── Constants ────────────────────────────────────────────────────────────────

const DAYS = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'] as const;

const COLORS = {
  dark: '#30364F',
  cream: '#F0F0DB',
  beige: '#E1D9BC',
  muted: '#4a5268',
  sectionBg: 'rgba(240, 240, 219, 0.6)',
  border: 'rgba(48, 54, 79, 0.15)',
} as const;

const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Nybegynner',
  intermediate: 'Middels',
  advanced: 'Avansert',
  all: 'Alle nivåer',
};

const AGE_LABELS: Record<string, string> = {
  kids: 'Barn',
  teens: 'Ungdom',
  adults: 'Voksne',
  all: 'Alle aldre',
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface ClassInfo {
  name: string;
}

interface WeeklySchedule {
  [day: string]: { [timeSlot: string]: string };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildSchedule(programs: any[]) {
  const schedule: WeeklySchedule = {};
  const classTypes: Record<string, ClassInfo> = {};
  const timeSlotsSet = new Set<string>();

  DAYS.forEach((day) => { schedule[day] = {}; });

  programs.forEach((program) => {
    const key = program._id;
    if (!classTypes[key]) {
      classTypes[key] = { name: program.name };
    }

    program.schedule?.forEach((session: any) => {
      const slot = `${session.startTime} - ${session.endTime}`;
      timeSlotsSet.add(slot);
      if (schedule[session.day]) {
        schedule[session.day][slot] = key;
      }
    });
  });

  const timeSlots = Array.from(timeSlotsSet).sort((a, b) =>
    a.split(' - ')[0].localeCompare(b.split(' - ')[0])
  );

  return { schedule, classTypes, timeSlots };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScheduleGrid({
  schedule,
  classTypes,
  timeSlots,
}: {
  schedule: WeeklySchedule;
  classTypes: Record<string, ClassInfo>;
  timeSlots: string[];
}) {
  if (timeSlots.length === 0) {
    return (
      <Card sx={{ bgcolor: COLORS.beige }}>
        <CardContent sx={{ textAlign: 'center', py: 5 }}>
          <Typography sx={{ color: COLORS.muted }}>
            Ingen treningsøkter er lagt inn i kalenderen ennå.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ bgcolor: COLORS.beige, overflow: 'hidden' }}>
      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ minWidth: 760 }}>
          {/* Header */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '100px repeat(7, 1fr)',
              bgcolor: COLORS.dark,
            }}
          >
            <HeaderCell>Tid</HeaderCell>
            {DAYS.map((day, i) => (
              <HeaderCell key={day} isWeekend={i >= 5}>{day}</HeaderCell>
            ))}
          </Box>

          {/* Rows */}
          {timeSlots.map((slot) => (
            <Box
              key={slot}
              sx={{
                display: 'grid',
                gridTemplateColumns: '100px repeat(7, 1fr)',
                '&:not(:last-child)': { borderBottom: `1px solid ${COLORS.border}` },
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: COLORS.cream,
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: COLORS.dark,
                  borderRight: `1px solid ${COLORS.border}`,
                }}
              >
                {slot}
              </Box>
              {DAYS.map((day, dayIdx) => {
                const classKey = schedule[day]?.[slot];
                return (
                  <Box
                    key={`${day}-${slot}`}
                    sx={{
                      p: 1,
                      height: 72,
                      bgcolor: dayIdx >= 5 ? COLORS.cream : 'transparent',
                      borderRight: dayIdx < 6 ? `1px solid ${COLORS.border}` : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {classKey && classTypes[classKey] && (
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 1,
                          bgcolor: COLORS.dark,
                          color: COLORS.cream,
                          px: 0.5,
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.78rem', textAlign: 'center' }}>
                          {classTypes[classKey].name}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  );
}

function HeaderCell({ children, isWeekend = false }: { children: React.ReactNode; isWeekend?: boolean }) {
  return (
    <Box
      sx={{
        p: 1.5,
        fontWeight: 600,
        textAlign: 'center',
        color: COLORS.cream,
        fontSize: '0.85rem',
        bgcolor: isWeekend ? 'rgba(0,0,0,0.15)' : 'transparent',
        borderRight: `1px solid rgba(240, 240, 219, 0.15)`,
      }}
    >
      {children}
    </Box>
  );
}

function ProgramCard({ program }: { program: any }) {
  return (
    <Card sx={{ bgcolor: COLORS.beige }}>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: COLORS.dark }}>
          {program.name}
        </Typography>

        <Box sx={{ mb: 3, color: COLORS.muted }}>
          <RichText content={program.description} />
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2.5 }}>
          {program.schedule.map((session: any, i: number) => (
            <Chip
              key={i}
              label={`${session.day} ${session.startTime}–${session.endTime}${session.instructor ? ` · ${session.instructor.name}` : ''}`}
              size="small"
              variant="outlined"
              sx={{ borderColor: COLORS.dark, color: COLORS.dark, fontSize: '0.8rem' }}
            />
          ))}
        </Stack>

        <Stack direction="row" spacing={3}>
          <Typography variant="body2" sx={{ color: COLORS.muted }}>
            <strong>Nivå:</strong> {LEVEL_LABELS[program.level] || program.level}
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.muted }}>
            <strong>Alder:</strong> {AGE_LABELS[program.ageGroup] || program.ageGroup}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

function InfoListSection({ title, intro, items }: { title: string; intro?: string; items: { item: string }[] }) {
  if (!items || items.length === 0) return null;
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600, color: COLORS.dark }}>
        {title}
      </Typography>
      {intro && (
        <Typography variant="body1" sx={{ mb: 1, color: COLORS.dark }}>{intro}</Typography>
      )}
      <List disablePadding>
        {items.map((item, i) => (
          <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 18, color: COLORS.dark }} />
            </ListItemIcon>
            <ListItemText primary={item.item} primaryTypographyProps={{ variant: 'body2', color: COLORS.dark }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function GeneralInfoCard({ generalInfo }: { generalInfo: any }) {
  return (
    <Card sx={{ bgcolor: COLORS.cream }}>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: COLORS.dark }}>
          {generalInfo?.sectionTitle || 'Generell informasjon'}
        </Typography>

        {generalInfo?.whatToBring && (
          <InfoListSection title={generalInfo.whatToBring.title} items={generalInfo.whatToBring.items} />
        )}

        {generalInfo?.hygiene && (
          <InfoListSection
            title={generalInfo.hygiene.title}
            intro={generalInfo.hygiene.intro}
            items={generalInfo.hygiene.items}
          />
        )}

        {generalInfo?.environment?.content && (
          <Box>
            <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600, color: COLORS.dark }}>
              {generalInfo.environment.title}
            </Typography>
            <Typography variant="body1" sx={{ color: COLORS.dark, lineHeight: 1.7 }}>
              {generalInfo.environment.content}
            </Typography>
          </Box>
        )}

        {/* Fallback when no CMS data */}
        {!generalInfo && (
          <>
            <InfoListSection
              title="Hva bør du ta med?"
              items={[
                { item: 'Komfortable treningsklær (t-skjorte, shorts), eventuelt rashguard og spats' },
                { item: 'Vannflaske' },
                { item: 'Håndkle' },
              ]}
            />
            <InfoListSection
              title="Hygiene"
              intro="Minner alle om at dette er en nærkontakt sport hvor god hygiene er viktig:"
              items={[
                { item: 'Generell god hygiene (ta heller en vask for mye)' },
                { item: 'Alltid rent treningstøy' },
                { item: 'Klipp negler' },
                { item: 'Ikke kom på trening om man er syk' },
                { item: 'Ikke kom på trening om man har smittsomme sykdommer / utslett / åpne sår etc.' },
                { item: 'Dusj grundig så fort som mulig etter trening for å unngå infeksjoner og bakterier.' },
              ]}
            />
            <Box>
              <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600, color: COLORS.dark }}>
                Miljø
              </Typography>
              <Typography variant="body1" sx={{ color: COLORS.dark, lineHeight: 1.7 }}>
                Dette skal være et trygt miljø, der alle skal behandle hverandre med respekt og ta hensyn til hverandres sikkerhet. Dette området vil vi ha høyt fokus på fremover.
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function TrainingPage() {
  const trainingPageData = await getTrainingPage();
  const programs = trainingPageData?.trainingPrograms?.length
    ? trainingPageData.trainingPrograms
    : await getTrainingPrograms();
  const { schedule, classTypes, timeSlots } = buildSchedule(programs);
  const pageTitle = trainingPageData?.title || 'Treningskalender';
  const generalInfo = trainingPageData?.generalInfo;

  return (
    <PageTransition>
      <Box sx={{ bgcolor: COLORS.sectionBg, backdropFilter: 'blur(8px)', minHeight: '100vh', py: 2 }}>
        <Container maxWidth="xl" sx={{ pt: 2, pb: 8 }}>
          {/* Page Title */}
          <FadeIn>
            <Typography variant="h1" sx={{ mb: 5, color: COLORS.dark, fontWeight: 700 }}>
              {pageTitle}
            </Typography>
          </FadeIn>

          {/* Class Legend */}
          {Object.keys(classTypes).length > 0 && (
            <ScrollReveal>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 2, color: COLORS.dark, fontWeight: 600 }}>
                  Klassetyper
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {Object.entries(classTypes).map(([key, { name }]) => (
                    <Chip
                      key={key}
                      label={name}
                      sx={{ fontWeight: 500, bgcolor: COLORS.dark, color: COLORS.cream }}
                    />
                  ))}
                </Stack>
              </Box>
            </ScrollReveal>
          )}

          {/* Schedule Grid */}
          <ScrollReveal>
            <ScheduleGrid schedule={schedule} classTypes={classTypes} timeSlots={timeSlots} />
          </ScrollReveal>

          {/* Program Details */}
          {programs.length > 0 && (
            <ScrollReveal>
              <Stack spacing={3} sx={{ mt: 6 }}>
                {programs.map((program: any) => (
                  <ProgramCard key={program._id} program={program} />
                ))}
              </Stack>
            </ScrollReveal>
          )}

          {programs.length === 0 && (
            <ScrollReveal>
              <Card sx={{ bgcolor: COLORS.beige, mt: 6 }}>
                <CardContent sx={{ textAlign: 'center', py: 5 }}>
                  <Typography sx={{ color: COLORS.muted }}>
                    Ingen treningsprogrammer tilgjengelig for øyeblikket.
                  </Typography>
                </CardContent>
              </Card>
            </ScrollReveal>
          )}

          {/* General Info */}
          <ScrollReveal>
            <Box sx={{ mt: 6 }}>
              <GeneralInfoCard generalInfo={generalInfo} />
            </Box>
          </ScrollReveal>
        </Container>
      </Box>
    </PageTransition>
  );
}
