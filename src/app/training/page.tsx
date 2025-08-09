import { getTrainingPrograms } from "@/lib/sanity.queries";
import { PageTransition, FadeIn, ScrollReveal } from "@/components/animations";
import { RichText } from "@/components/RichText";

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

// Function to build schedule from Sanity data
function buildScheduleFromPrograms(programs: any[]): { schedule: WeeklySchedule, classTypes: Record<string, ClassInfo> } {
  const schedule: WeeklySchedule = {};
  const classTypes: Record<string, ClassInfo> = {};
  const colors = ['bg-blue-700', 'bg-green-700', 'bg-purple-700', 'bg-red-700', 'bg-indigo-700'];
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
      <div className="container mx-auto px-4 py-12">
        <FadeIn>
          <h1 className="text-4xl font-bold mb-8 text-white">Treningskalender</h1>
        </FadeIn>
      
      {/* Class type legend */}
      <ScrollReveal>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Klassetyper</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(classTypes).map(([key, { name, color }]) => (
              <div key={key} className="flex items-center">
                <span className={`inline-block w-4 h-4 mr-2 ${color} rounded-sm`}></span>
                <span className="text-white">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
      
      {/* Calendar grid */}
      <ScrollReveal>
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 bg-gray-100">
            {/* Empty corner */}
            <div className="p-3 border-b border-r border-gray-200 font-medium text-center text-gray-900">
              Tid
            </div>
            
            {/* Day headers */}
            {days.map((day, index) => (
              <div 
                key={day}
                className={`p-3 border-b border-r border-gray-200 font-medium text-center text-gray-900 ${
                  index === days.length - 1 || index === days.length - 2 ? 'bg-gray-200' : ''
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Time slots and classes */}
          {timeSlots.map((timeSlot) => (
            <div key={timeSlot} className="grid grid-cols-8">
              {/* Time label */}
              <div className="p-3 border-b border-r border-gray-200 bg-gray-50 text-sm font-medium flex items-center justify-center text-gray-900">
                {timeSlot}
              </div>
              
              {/* Schedule cells */}
              {days.map((day) => {
                const classType = weeklySchedule[day]?.[timeSlot] as ClassType | undefined;
                
                return (
                  <div 
                    key={`${day}-${timeSlot}`}
                    className={`p-3 border-b border-r border-gray-200 text-center h-20 ${
                      (day === 'Lørdag' || day === 'Søndag') ? 'bg-gray-50' : ''
                    }`}
                  >
                    {classType && classTypes[classType] && (
                      <div className={`h-full ${classTypes[classType].color} text-white rounded-md p-2 flex items-center justify-center shadow-sm`}>
                        <span className="text-sm font-medium">
                          {classTypes[classType].name}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      </ScrollReveal>
      
      {/* Class descriptions */}
      <ScrollReveal>
        <div className="mt-12 grid gap-6">
          {programs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600">Ingen treningsprogrammer tilgjengelig for øyeblikket.</p>
            </div>
          ) : (
            programs.map((program) => (
              <div key={program._id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{program.name}</h3>
                <div className="text-gray-800 mb-3">
                  <RichText content={program.description} />
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {program.schedule.map((session, index) => (
                    <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">
                      {dayMap[session.day.toLowerCase()] || session.day} {session.startTime}-{session.endTime}
                      {session.instructor && ` (${session.instructor.name})`}
                    </span>
                  ))}
                </div>
                <div className="text-sm mt-3 text-gray-600">
                  <p><strong>Nivå:</strong> {program.level}</p>
                  <p><strong>Aldersgruppe:</strong> {program.ageGroup}</p>
                  {program.price && (
                    <p><strong>Pris:</strong> 
                      {program.price.monthly && ` ${program.price.monthly}kr/måned`}
                      {program.price.dropIn && ` ${program.price.dropIn}kr drop-in`}
                      {program.price.trial && ` ${program.price.trial}kr prøvetime`}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollReveal>
      
      <ScrollReveal>
        <div className="mt-8 bg-gray-100 rounded-lg p-6 border border-gray-300">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Generell informasjon</h3>
        
        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-gray-900">Hva bør du ta med?</h4>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>Komfortable treningsklær (t-skjorte, shorts), eventuelt rashguard og spats</li>
            <li>Vannflaske</li>
            <li>Håndkle</li>
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-2 text-gray-900">Hygiene:</h4>
          <p className="text-gray-800 mb-2">Minner alle om at dette er en nærkontakt sport hvor god hygiene er viktig:</p>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>Generell god hygiene (ta heller en vask for mye)</li>
            <li>Alltid rent treningstøy</li>
            <li>Klipp negler</li>
            <li>Ikke kom på trening om man er syk</li>
            <li>Ikke kom på trening om man har smittsomme sykdommer / utslett / åpne sår etc. er man usikker kan du ta kontakt med trener eller enda bedre, en lege.</li>
            <li>Dusj grundig så fort som mulig etter trening for å unngå infeksjoner og bakterier.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-gray-900">Miljø:</h4>
          <p className="text-gray-800">Dette skal være et trygt miljø, der alle skal behandle hverandre med respekt og skal ta hensyn til hverandres sikkerhet. Dette området vil vi ha høyt fokus på fremover.</p>
        </div>
      </div>
      </ScrollReveal>
    </div>
    </PageTransition>
  );
}
