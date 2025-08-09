import { 
  trainingPrograms, 
  classTypes, 
  days, 
  timeSlots, 
  weeklySchedule,
  ClassType,
} from "@/data/training";
import { PageTransition, FadeIn, ScrollReveal } from "@/components/animations";

export default function TrainingPage() {
  
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
                    {classType && (
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
          {trainingPrograms.map((program) => (
          <div key={program.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{program.title}</h3>
            <p className="text-gray-800 mb-3">{program.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {program.schedule.map((time, index) => (
                <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">
                  {time}
                </span>
              ))}
            </div>
            <p className="text-sm mt-3 text-gray-600">
              <strong>Anbefalt for:</strong> {program.recommended}
            </p>
          </div>
        ))}
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
