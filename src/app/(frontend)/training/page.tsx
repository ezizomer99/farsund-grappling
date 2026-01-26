import { getTrainingPrograms } from "@/lib/payload-data";
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
const timeSlots = [
  '10:00 - 11:30',
  '12:00 - 13:30', 
  '18:00 - 20:00',
  '19:00 - 20:30',
];

// Map Norwegian day names to English for consistency
const dayMap: { [key: string]: string } = {
  'monday': 'Mandag',
  'tuesday': 'Tirsdag', 
  'wednesday': 'Onsdag',
  'thursday': 'Torsdag',
  'friday': 'Fredag',
  'saturday': 'Lørdag',
  'sunday': 'Søndag'
};

// Map class types to MUI color presets
const colorMap: { [key: string]: any } = {
  'bg-blue-700': 'primary',
  'bg-green-700': 'success',
  'bg-purple-700': 'secondary',
  'bg-red-700': 'error',
  'bg-indigo-700': 'info',
};

// Function to build schedule from Sanity data
function buildScheduleFromPrograms(programs: any[]): { schedule: WeeklySchedule, classTypes: Record<string, ClassInfo> } {
  const schedule: WeeklySchedule = {};
  const classTypes: Record<string, ClassInfo> = {};
  const colors = ['primary', 'success', 'secondary', 'error', 'info'];
  let colorIndex = 0;

  // Initialize empty schedule
  days.forEach(day => {
    schedule[day] = {};
  });

  programs.forEach(program => {
    // Create class type entry
    const classKey = program.slug.current;
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
        const dayName = dayMap[session.day.toLowerCase()] || session.day;
        const timeSlot = `${session.startTime} - ${session.endTime}`;
        
        if (schedule[dayName]) {
          schedule[dayName][timeSlot] = classKey;
        }
      });
    }
  });

  return { schedule, classTypes };
}

export default async function TrainingPage() {
  const programs = await getTrainingPrograms();
  const { schedule: weeklySchedule, classTypes } = buildScheduleFromPrograms(programs);
  
  return (
    <PageTransition>
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <FadeIn>
          <Typography variant="h1" sx={{ mb: 6, color: 'text.primary', fontWeight: 700 }}>
            Treningskalender
          </Typography>
        </FadeIn>
      
        {/* Class type legend */}
        <ScrollReveal>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" sx={{ mb: 3, color: 'text.primary', fontWeight: 600 }}>
              Klassetyper
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              {Object.entries(classTypes).map(([key, { name, color }]) => (
                <Chip
                  key={key}
                  label={name}
                  color={color as any}
                  sx={{ fontWeight: 500 }}
                />
              ))}
            </Stack>
          </Box>
        </ScrollReveal>
      
        {/* Calendar grid */}
        <ScrollReveal>
          <Box
            sx={{
              bgcolor: 'background.paper',
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
                    bgcolor: 'grey.100',
                  }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      borderBottom: 1,
                      borderRight: 1,
                      borderColor: 'grey.300',
                      fontWeight: 600,
                      textAlign: 'center',
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
                        borderColor: 'grey.300',
                        fontWeight: 600,
                        textAlign: 'center',
                        bgcolor: index >= 5 ? 'grey.200' : 'transparent',
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
                        borderColor: 'grey.300',
                        bgcolor: 'grey.50',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                            borderColor: 'grey.300',
                            textAlign: 'center',
                            height: 80,
                            bgcolor: dayIndex >= 5 ? 'grey.50' : 'transparent',
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
                                bgcolor: `${classTypes[classType].color}.main`,
                                color: 'white',
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
      
        {/* Class descriptions */}
        <ScrollReveal>
          <Stack spacing={3} sx={{ mt: 8 }}>
            {programs.length === 0 ? (
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="text.secondary">
                    Ingen treningsprogrammer tilgjengelig for øyeblikket.
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              programs.map((program) => (
                <Card key={program._id}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                      {program.name}
                    </Typography>
                    <Box sx={{ mb: 3, color: 'text.secondary' }}>
                      <RichText content={program.description} />
                    </Box>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
                      {program.schedule.map((session: any, index: number) => (
                        <Chip
                          key={index}
                          label={`${dayMap[session.day.toLowerCase()] || session.day} ${session.startTime}-${session.endTime}${session.instructor ? ` (${session.instructor.name})` : ''}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                    <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                      <Typography variant="body2">
                        <strong>Nivå:</strong> {program.level}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Aldersgruppe:</strong> {program.ageGroup}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </Stack>
        </ScrollReveal>
      
        <ScrollReveal>
          <Card sx={{ mt: 6, bgcolor: 'grey.100' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                Generell informasjon
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  Hva bør du ta med?
                </Typography>
                <List>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemText primary="Komfortable treningsklær (t-skjorte, shorts), eventuelt rashguard og spats" />
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemText primary="Vannflaske" />
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemText primary="Håndkle" />
                  </ListItem>
                </List>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  Hygiene:
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  Minner alle om at dette er en nærkontakt sport hvor god hygiene er viktig:
                </Typography>
                <List>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemText primary="Generell god hygiene (ta heller en vask for mye)" />
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemText primary="Alltid rent treningstøy" />
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemText primary="Klipp negler" />
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemText primary="Ikke kom på trening om man er syk" />
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemText primary="Ikke kom på trening om man har smittsomme sykdommer / utslett / åpne sår etc. er man usikker kan du ta kontakt med trener eller enda bedre, en lege." />
                  </ListItem>
                  <ListItem sx={{ py: 0.5 }}>
                    <ListItemText primary="Dusj grundig så fort som mulig etter trening for å unngå infeksjoner og bakterier." />
                  </ListItem>
                </List>
              </Box>

              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  Miljø:
                </Typography>
                <Typography>
                  Dette skal være et trygt miljø, der alle skal behandle hverandre med respekt og skal ta hensyn til hverandres sikkerhet. Dette området vil vi ha høyt fokus på fremover.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </ScrollReveal>
      </Container>
    </PageTransition>
  );
}
