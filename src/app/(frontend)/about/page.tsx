import { unstable_noStore as noStore } from 'next/cache';
import Image from "next/image";
import { getInstructors, getFacility, getClubInfo } from "@/lib/payload-data";
import { PageTransition, FadeIn } from "@/components/animations";
import { RichText } from "@/components/RichText";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Grid,
  Avatar,
  Stack,
  Link as MuiLink,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import ImageIcon from '@mui/icons-material/Image';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function AboutPage() {
  noStore(); // Opt out of static generation for fresh data
  const instructors = await getInstructors();
  const facility = await getFacility();
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
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <FadeIn>
          <Typography variant="h1" sx={{ mb: 6, color: '#30364F', fontWeight: 700 }}>
            Om Farsund Grappling
          </Typography>
        </FadeIn>
      
        {/* Club Story */}
        <Box component="section" sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ mb: 3, color: '#30364F', fontWeight: 600 }}>
            Vår Historie
          </Typography>
          <Card sx={{ 
            bgcolor: '#E1D9BC',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 4,
            },
          }}>
            <CardContent sx={{ p: 4 }}>
              {clubInfo?.story ? (
                <Box sx={{ color: '#30364F' }}>
                  <RichText content={clubInfo.story} />
                </Box>
              ) : (
                <Typography sx={{ color: '#4a5268' }}>
                  Club story not available. Please add content to the data file.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      
        {/* Instructors */}
        <Box component="section" sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ mb: 3, color: '#30364F', fontWeight: 600 }}>
            Våre Instruktører
          </Typography>
          <Stack spacing={4}>
            {instructors.map((instructor) => (
              <Card key={instructor._id} sx={{ 
                overflow: 'visible', 
                bgcolor: '#E1D9BC',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}>
                <Grid container>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                      sx={{
                        height: { xs: 256, md: '100%' },
                        minHeight: 256,
                        position: 'relative',
                        bgcolor: '#F0F0DB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {instructor.profileImage?.url ? (
                        <Image
                          src={instructor.profileImage.url}
                          alt={instructor.profileImage.alt || instructor.name}
                          fill
                          style={{
                            objectFit: 'cover',
                            filter: 'grayscale(100%)',
                          }}
                        />
                      ) : (
                        <PersonIcon sx={{ fontSize: 64, color: '#4a5268' }} />
                      )}
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: '#30364F' }}>
                        {instructor.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ mb: 3, fontWeight: 500, color: '#4a5268' }}
                      >
                        {instructor.title} • {instructor.beltLevel}
                      </Typography>
                      <Box sx={{ color: '#30364F', mb: 2 }}>
                        <RichText content={instructor.bio} />
                      </Box>
                      {(instructor.email || instructor.phone) && (
                        <Box
                          sx={{
                            mt: 3,
                            pt: 3,
                            borderTop: 1,
                            borderColor: 'rgba(48, 54, 79, 0.2)',
                          }}
                        >
                          {instructor.email && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <EmailIcon sx={{ fontSize: 20, color: '#4a5268' }} />
                              <MuiLink
                                href={`mailto:${instructor.email}`}
                                sx={{ color: '#30364F', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                              >
                                <Typography variant="body2">{instructor.email}</Typography>
                              </MuiLink>
                            </Box>
                          )}
                          {instructor.phone && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <PhoneIcon sx={{ fontSize: 20, color: '#4a5268' }} />
                              <MuiLink
                                href={`tel:${instructor.phone}`}
                                sx={{ color: '#30364F', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                              >
                                <Typography variant="body2">{instructor.phone}</Typography>
                              </MuiLink>
                            </Box>
                          )}
                        </Box>
                      )}
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Stack>
        </Box>
      
        {/* Facilities */}
        <Box component="section" sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ mb: 3, color: '#30364F', fontWeight: 600 }}>
            {facility?.title || 'Våre Fasiliteter'}
          </Typography>
          <Card sx={{ 
            bgcolor: '#E1D9BC',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 4,
            },
          }}>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={4}>
                {/* Left side - Training area info and image */}
                <Grid size={{ xs: 12, lg: 6 }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#30364F' }}>
                    {facility?.trainingArea?.title || ''}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 4,
                      display: 'flex',
                      alignItems: 'center',
                      color: '#4a5268',
                    }}
                  >
                    {facility?.trainingArea?.subtitle || 'Dette er vårt område'}
                  </Typography>
                  <Box
                    sx={{
                      position: 'relative',
                      height: 400,
                      borderRadius: 2,
                      overflow: 'hidden',
                      bgcolor: '#F0F0DB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {facility?.trainingArea?.image?.url ? (
                      <Image
                        src={facility.trainingArea.image.url}
                        alt={facility.trainingArea.image.alt || 'Training area'}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <Box
                        sx={{
                          textAlign: 'center',
                          color: '#4a5268',
                        }}
                      >
                        <ImageIcon sx={{ fontSize: 48, mb: 1 }} />
                        <Typography variant="body2">
                          Treningsområde bilde kommer snart
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Grid>
                
                {/* Right side - Opportunities */}
                <Grid size={{ xs: 12, lg: 6 }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#30364F' }}>
                    {facility?.opportunities?.title || 'Muligheter'}
                  </Typography>
                  {facility?.opportunities?.description ? (
                    <Box sx={{ color: '#30364F' }}>
                      <RichText content={facility.opportunities.description} />
                    </Box>
                  ) : (
                    <>
                      <Typography sx={{ mb: 3, color: '#30364F' }}>
                        Det å ha et BJJ-område inne i et styrketreningsstudio gir deg unike muligheter.
                      </Typography>
                      <Typography sx={{ mb: 3, color: '#30364F' }}>
                        Du kan kombinere kampsporttrening med styrketrening i samme økt, noe som gir deg en komplett treningsopplevelse.
                      </Typography>
                      <Typography sx={{ color: '#30364F' }}>
                        Etter en intens BJJ-økt kan du fokusere på styrke og kondisjon, eller omvendt - starte med styrketrening før du går over til teknikk og sparring.
                      </Typography>
                    </>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      
        {/* Location */}
        <Box component="section">
          <Typography variant="h4" sx={{ mb: 3, color: '#30364F', fontWeight: 600 }}>
            {clubInfo?.location?.title || 'Beliggenhet'}
          </Typography>
          <Card sx={{ 
            bgcolor: '#E1D9BC',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            overflow: 'hidden',
            '&:hover': {
              boxShadow: 4,
            },
          }}>
            <Box
              sx={{
                height: 384,
                width: '100%',
                '& iframe': {
                  border: 0,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                },
              }}
            >
              <iframe
                src={clubInfo?.location?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2126.0447605433777!2d6.662111315906984!3d58.09529538122932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463a1c3789a47b93%3A0xd2030cbcc7839aba!2sOreveien%2017%2C%204560%20Vanse%2C%20Norway!5e0!3m2!1sen!2sus!4v1626244892015!5m2!1sen!2sus"}
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                title="Farsund Grappling Location"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#30364F' }}>
                {clubInfo?.location?.findUsTitle || 'Finn Oss'}
              </Typography>
              <Typography sx={{ mb: 3, color: '#30364F' }}>
                {clubInfo?.location?.description || 'Vi holder til i Vanse. Her finner du oss:'}
              </Typography>
              <Box component="address" sx={{ fontStyle: 'normal' }}>
                <Typography sx={{ mb: 2, color: '#30364F' }}>{clubInfo?.title || 'Farsund Grappling'}</Typography>
                {clubInfo?.contactInfo?.address && (
                  <MuiLink
                    href={clubInfo?.location?.directionsUrl || "https://www.google.com/maps/search/?api=1&query=Oreveien+17+4560+Vanse+Norge"}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#30364F',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                      display: 'block',
                      mb: 2,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {clubInfo.contactInfo.address}
                  </MuiLink>
                )}
                {clubInfo?.contactInfo?.email && (
                  <Typography sx={{ mb: 1, color: '#30364F' }}>
                    E-post:{' '}
                    <MuiLink
                      href={`mailto:${clubInfo.contactInfo.email}`}
                      sx={{
                        color: '#30364F',
                        textDecoration: 'underline',
                        '&:hover': { color: '#4a5268' },
                      }}
                    >
                      {clubInfo.contactInfo.email}
                    </MuiLink>
                  </Typography>
                )}
                {clubInfo?.contactInfo?.phone && (
                  <Typography sx={{ color: '#30364F' }}>Telefon: {clubInfo.contactInfo.phone}</Typography>
                )}
              </Box>
              
              <Box sx={{ mt: 4 }}>
                <MuiLink
                  href={clubInfo?.location?.directionsUrl || "https://www.google.com/maps/search/?api=1&query=Oreveien+17+4560+Vanse+Norge"}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: '#30364F',
                    textDecoration: 'none',
                    '&:hover': { color: '#4a5268', textDecoration: 'underline' },
                  }}
                >
                  {clubInfo?.location?.directionsText || 'Få veibeskrivelser i Google Maps'}
                </MuiLink>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
      </Box>
    </PageTransition>
  );
}
