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
  ListItemText,
} from '@mui/material';

// Helper types for calendar display
type ClassType = string;

interface ClassInfo {
  name: string;
  color: string;
}

interface WeeklySchedule {
  [day: string]: {
    [timeSlot: string]: ClassType;
  };
}

// Static data for calendar structure
const days = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];

// Function to build schedule from Payload data
function buildScheduleFromPrograms(programs: any[]): { schedule: WeeklySchedule, classTypes: Record<string, ClassInfo>, timeSlots: string[] } {
  const schedule: WeeklySchedule = {};
  const classTypes: Record<string, ClassInfo> = {};
  const timeSlotsSet = new Set<string>();
  const colors = ['primary', 'success', 'secondary', 'error', 'info'];
  let colorIndex = 0;

  // Initialize empty schedule
  days.forEach(day => {
    schedule[day] = {};
  });

  programs.forEach(program => {
    // Create class type entry using the program id as key
    const classKey = program._id;
    if (!classTypes[classKey]) {
      classTypes[classKey] = {
        name: program.name,
        color: colors[colorIndex % colors.length]
      };
      colorIndex++;
    }

    // Add program schedule to calendar
    if (program.schedule && Array.isArray(program.schedule)) {
      program.schedule.forEach((session: any) => {
        // Day is already in Norwegian from Payload
        const dayName = session.day;
        const timeSlot = `${session.startTime} - ${session.endTime}`;
        
        // Collect all unique time slots
        timeSlotsSet.add(timeSlot);
        
        if (schedule[dayName]) {
          schedule[dayName][timeSlot] = classKey;
        }
      });
    }
  });

  // Sort time slots chronologically
  const timeSlots = Array.from(timeSlotsSet).sort((a, b) => {
    const timeA = a.split(' - ')[0];
    const timeB = b.split(' - ')[0];
    return timeA.localeCompare(timeB);
  });

  return { schedule, classTypes, timeSlots };
}

// Norwegian translations for level and age group
const levelTranslations: { [key: string]: string } = {
  'beginner': 'Nybegynner',
  'intermediate': 'Middels',
  'advanced': 'Avansert',
  'all': 'Alle nivåer',
};

const ageGroupTranslations: { [key: string]: string } = {
  'kids': 'Barn',
  'teens': 'Ungdom',
  'adults': 'Voksne',
  'all': 'Alle aldre',
};

export default async function TrainingPage() {
  const trainingPageData = await getTrainingPage();
  // If trainingPageData has specific programs, use those; otherwise get all active programs
  const programs = trainingPageData?.trainingPrograms?.length 
    ? trainingPageData.trainingPrograms 
    : await getTrainingPrograms();
  const { schedule: weeklySchedule, classTypes, timeSlots } = buildScheduleFromPrograms(programs);
  
  // Use data from CMS or fallback to defaults
  const pageTitle = trainingPageData?.title || "Treningskalender";
  const generalInfo = trainingPageData?.generalInfo;
  
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
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <FadeIn>
          <Typography variant="h1" sx={{ mb: 6, color: '#30364F', fontWeight: 700 }}>
            {pageTitle}
          </Typography>
        </FadeIn>
      
        {/* Class type legend */}
        <ScrollReveal>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ mb: 3, color: '#30364F', fontWeight: 600 }}>
              Klassetyper
            </Typography>
            {Object.keys(classTypes).length === 0 ? (
              <Typography sx={{ color: '#4a5268' }}>
                Ingen klassetyper lagt til ennå.
              </Typography>
            ) : (
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                {Object.entries(classTypes).map(([key, { name, color }]) => (
                  <Chip
                    key={key}
                    label={name}
                    sx={{ 
                      fontWeight: 500,
                      bgcolor: '#30364F',
                      color: '#F0F0DB',
                    }}
                  />
                ))}
              </Stack>
            )}
          </Box>
        </ScrollReveal>
      
        {/* Calendar grid */}
        {timeSlots.length > 0 ? (
        <ScrollReveal>
          <Box
            sx={{
              bgcolor: '#E1D9BC',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            <Box sx={{ overflowX: 'auto' }}>
              <Box sx={{ minWidth: 800 }}>
                {/* Header Row */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(8, 1fr)',
                    bgcolor: '#30364F',
                  }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      borderBottom: 1,
                      borderRight: 1,
                      borderColor: 'rgba(240, 240, 219, 0.3)',
                      fontWeight: 600,
                      textAlign: 'center',
                      color: '#F0F0DB',
                    }}
                  >
                    Tid
                  </Box>
                  {days.map((day, index) => (
                    <Box
                      key={day}
                      sx={{
                        p: 1.5,
                        borderBottom: 1,
                        borderRight: 1,
                        borderColor: 'rgba(240, 240, 219, 0.3)',
                        fontWeight: 600,
                        textAlign: 'center',
                        color: '#F0F0DB',
                        bgcolor: index >= 5 ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                      }}
                    >
                      {day}
                    </Box>
                  ))}
                </Box>
                
                {/* Time slots and classes */}
                {timeSlots.map((timeSlot) => (
                  <Box
                    key={timeSlot}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(8, 1fr)',
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        borderBottom: 1,
                        borderRight: 1,
                        borderColor: 'rgba(48, 54, 79, 0.2)',
                        bgcolor: '#F0F0DB',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#30364F',
                      }}
                    >
                      {timeSlot}
                    </Box>
                    
                    {days.map((day, dayIndex) => {
                      const classType = weeklySchedule[day]?.[timeSlot] as ClassType | undefined;
                      
                      return (
                        <Box
                          key={`${day}-${timeSlot}`}
                          sx={{
                            p: 1.5,
                            borderBottom: 1,
                            borderRight: 1,
                            borderColor: 'rgba(48, 54, 79, 0.2)',
                            textAlign: 'center',
                            height: 80,
                            bgcolor: dayIndex >= 5 ? '#F0F0DB' : 'transparent',
                          }}
                        >
                          {classType && classTypes[classType] && (
                            <Box
                              sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 1,
                                px: 1,
                                bgcolor: '#30364F',
                                color: '#F0F0DB',
                                boxShadow: 1,
                              }}
                            >
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {classTypes[classType].name}
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
          </Box>
        </ScrollReveal>
        ) : (
          <ScrollReveal>
            <Box
              sx={{
                bgcolor: '#E1D9BC',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
              }}
            >
              <Typography sx={{ color: '#4a5268' }}>
                Ingen treningsøkter er lagt inn i kalenderen ennå.
              </Typography>
            </Box>
          </ScrollReveal>
        )}
      
        {/* Class descriptions */}
        <ScrollReveal>
          <Stack spacing={3} sx={{ mt: 8 }}>
            {programs.length === 0 ? (
              <Card sx={{ bgcolor: '#E1D9BC' }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography sx={{ color: '#4a5268' }}>
                    Ingen treningsprogrammer tilgjengelig for øyeblikket.
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              programs.map((program) => (
                <Card key={program._id} sx={{ 
                  bgcolor: '#E1D9BC',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#30364F' }}>
                      {program.name}
                    </Typography>
                    <Box sx={{ mb: 3, color: '#4a5268' }}>
                      <RichText content={program.description} />
                    </Box>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
                      {program.schedule.map((session: any, index: number) => (
                        <Chip
                          key={index}
                          label={`${session.day} ${session.startTime}-${session.endTime}${session.instructor ? ` (${session.instructor.name})` : ''}`}
                          size="small"
                          variant="outlined"
                          sx={{ borderColor: '#30364F', color: '#30364F' }}
                        />
                      ))}
                    </Stack>
                    <Box sx={{ color: '#4a5268', fontSize: '0.875rem' }}>
                      <Typography variant="body2">
                        <strong>Nivå:</strong> {levelTranslations[program.level] || program.level}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Aldersgruppe:</strong> {ageGroupTranslations[program.ageGroup] || program.ageGroup}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </Stack>
        </ScrollReveal>
      
        <ScrollReveal>
          <Card sx={{ 
            mt: 6, 
            bgcolor: '#F0F0DB',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 4,
            },
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#30364F' }}>
                {generalInfo?.sectionTitle || 'Generell informasjon'}
              </Typography>
              
              {/* What to Bring Section */}
              {generalInfo?.whatToBring && generalInfo.whatToBring.items.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#30364F' }}>
                    {generalInfo.whatToBring.title}
                  </Typography>
                  <List>
                    {generalInfo.whatToBring.items.map((item, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemText primary={item.item} sx={{ color: '#30364F' }} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {/* Hygiene Section */}
              {generalInfo?.hygiene && generalInfo.hygiene.items.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#30364F' }}>
                    {generalInfo.hygiene.title}
                  </Typography>
                  {generalInfo.hygiene.intro && (
                    <Typography sx={{ mb: 2, color: '#30364F' }}>
                      {generalInfo.hygiene.intro}
                    </Typography>
                  )}
                  <List>
                    {generalInfo.hygiene.items.map((item, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemText primary={item.item} sx={{ color: '#30364F' }} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {/* Environment Section */}
              {generalInfo?.environment && generalInfo.environment.content && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#30364F' }}>
                    {generalInfo.environment.title}
                  </Typography>
                  <Typography sx={{ color: '#30364F' }}>
                    {generalInfo.environment.content}
                  </Typography>
                </Box>
              )}

              {/* Fallback if no CMS data */}
              {!generalInfo && (
                <>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#30364F' }}>
                      Hva bør du ta med?
                    </Typography>
                    <List>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Komfortable treningsklær (t-skjorte, shorts), eventuelt rashguard og spats" sx={{ color: '#30364F' }} />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Vannflaske" sx={{ color: '#30364F' }} />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Håndkle" sx={{ color: '#30364F' }} />
                      </ListItem>
                    </List>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#30364F' }}>
                      Hygiene:
                    </Typography>
                    <Typography sx={{ mb: 2, color: '#30364F' }}>
                      Minner alle om at dette er en nærkontakt sport hvor god hygiene er viktig:
                    </Typography>
                    <List>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Generell god hygiene (ta heller en vask for mye)" sx={{ color: '#30364F' }} />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Alltid rent treningstøy" sx={{ color: '#30364F' }} />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Klipp negler" sx={{ color: '#30364F' }} />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Ikke kom på trening om man er syk" sx={{ color: '#30364F' }} />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Ikke kom på trening om man har smittsomme sykdommer / utslett / åpne sår etc. er man usikker kan du ta kontakt med trener eller enda bedre, en lege." sx={{ color: '#30364F' }} />
                      </ListItem>
                      <ListItem sx={{ py: 0.5 }}>
                        <ListItemText primary="Dusj grundig så fort som mulig etter trening for å unngå infeksjoner og bakterier." sx={{ color: '#30364F' }} />
                      </ListItem>
                    </List>
                  </Box>

                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#30364F' }}>
                      Miljø:
                    </Typography>
                    <Typography sx={{ color: '#30364F' }}>
                      Dette skal være et trygt miljø, der alle skal behandle hverandre med respekt og skal ta hensyn til hverandres sikkerhet. Dette området vil vi ha høyt fokus på fremover.
                    </Typography>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </ScrollReveal>
      </Container>
      </Box>
    </PageTransition>
  );
}
