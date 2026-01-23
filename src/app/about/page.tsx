import Image from "next/image";
import { getInstructors, getFacility, getClubInfo } from "@/lib/data";
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

export default function AboutPage() {
  const instructors = getInstructors();
  const facility = getFacility();
  const clubInfo = getClubInfo();
  return (
    <PageTransition> 
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <FadeIn>
          <Typography variant="h1" sx={{ mb: 6, color: 'text.primary', fontWeight: 700 }}>
            Om Farsund Grappling
          </Typography>
        </FadeIn>
      
        {/* Club Story */}
        <Box component="section" sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ mb: 3, color: 'text.primary', fontWeight: 600 }}>
            Vår Historie
          </Typography>
          <Card>
            <CardContent sx={{ p: 4 }}>
              {clubInfo?.story ? (
                <Box sx={{ color: 'text.primary' }}>
                  <RichText content={clubInfo.story} />
                </Box>
              ) : (
                <Typography color="text.secondary">
                  Club story not available. Please add content to the data file.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      
        {/* Instructors */}
        <Box component="section" sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ mb: 3, color: 'text.primary', fontWeight: 600 }}>
            Våre Instruktører
          </Typography>
          <Stack spacing={4}>
            {instructors.map((instructor) => (
              <Card key={instructor._id} sx={{ overflow: 'visible' }}>
                <Grid container>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        height: { xs: 256, md: '100%' },
                        minHeight: 256,
                        position: 'relative',
                        bgcolor: 'grey.200',
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
                        <PersonIcon sx={{ fontSize: 64, color: 'grey.500' }} />
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
                        {instructor.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        sx={{ mb: 3, fontWeight: 500 }}
                      >
                        {instructor.title} • {instructor.beltLevel}
                      </Typography>
                      <Box sx={{ color: 'text.primary', mb: 2 }}>
                        <RichText content={instructor.bio} />
                      </Box>
                      {(instructor.email || instructor.phone) && (
                        <Box
                          sx={{
                            mt: 3,
                            pt: 3,
                            borderTop: 1,
                            borderColor: 'divider',
                          }}
                        >
                          {instructor.email && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                              <EmailIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                              <MuiLink
                                href={`mailto:${instructor.email}`}
                                sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                              >
                                <Typography variant="body2">{instructor.email}</Typography>
                              </MuiLink>
                            </Box>
                          )}
                          {instructor.phone && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <PhoneIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                              <MuiLink
                                href={`tel:${instructor.phone}`}
                                sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
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
          <Typography variant="h4" sx={{ mb: 3, color: 'text.primary', fontWeight: 600 }}>
            {facility?.title || 'Våre Fasiliteter'}
          </Typography>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={4}>
                {/* Left side - Training area info and image */}
                <Grid item xs={12} lg={6}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                    {facility?.trainingArea?.title || ''}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 4,
                      display: 'flex',
                      alignItems: 'center',
                      color: 'text.secondary',
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
                      bgcolor: 'grey.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {facility?.trainingArea?.image ? (
                      <Image
                        src={urlFor(facility.trainingArea.image.asset).url()}
                        alt={facility.trainingArea.image.alt}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <Box
                        sx={{
                          textAlign: 'center',
                          color: 'grey.500',
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
                <Grid item xs={12} lg={6}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                    {facility?.opportunities?.title || 'Muligheter'}
                  </Typography>
                  {facility?.opportunities?.description ? (
                    <Box sx={{ color: 'text.primary' }}>
                      <RichText content={facility.opportunities.description} />
                    </Box>
                  ) : (
                    <>
                      <Typography sx={{ mb: 3 }}>
                        Det å ha et BJJ-område inne i et styrketreningsstudio gir deg unike muligheter.
                      </Typography>
                      <Typography sx={{ mb: 3 }}>
                        Du kan kombinere kampsporttrening med styrketrening i samme økt, noe som gir deg en komplett treningsopplevelse.
                      </Typography>
                      <Typography>
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
          <Typography variant="h4" sx={{ mb: 3, color: 'grey.300', fontWeight: 600 }}>
            {clubInfo?.location?.title || 'Beliggenhet'}
          </Typography>
          <Card>
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
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                {clubInfo?.location?.findUsTitle || 'Finn Oss'}
              </Typography>
              <Typography sx={{ mb: 3 }}>
                {clubInfo?.location?.description || 'Vi holder til i Vanse. Her finner du oss:'}
              </Typography>
              <Box component="address" sx={{ fontStyle: 'normal' }}>
                <Typography sx={{ mb: 2 }}>{clubInfo?.title || 'Farsund Grappling'}</Typography>
                {clubInfo?.contactInfo?.address && (
                  <MuiLink
                    href={clubInfo?.location?.directionsUrl || "https://www.google.com/maps/search/?api=1&query=Oreveien+17+4560+Vanse+Norge"}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'primary.main',
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
                  <Typography sx={{ mb: 1 }}>
                    E-post:{' '}
                    <MuiLink
                      href={`mailto:${clubInfo.contactInfo.email}`}
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'underline',
                        '&:hover': { color: 'primary.dark' },
                      }}
                    >
                      {clubInfo.contactInfo.email}
                    </MuiLink>
                  </Typography>
                )}
                {clubInfo?.contactInfo?.phone && (
                  <Typography>Telefon: {clubInfo.contactInfo.phone}</Typography>
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
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.dark', textDecoration: 'underline' },
                  }}
                >
                  {clubInfo?.location?.directionsText || 'Få veibeskrivelser i Google Maps'}
                </MuiLink>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </PageTransition>
  );
}
