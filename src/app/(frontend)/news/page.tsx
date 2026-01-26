import { getNewsArticles } from "@/lib/payload-data";
import { PageTransition, FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { RichText } from "@/components/RichText";
import Image from "next/image";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export default async function NewsPage() {
  const articles = await getNewsArticles();

  return (
    <PageTransition>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <FadeIn>
          <Typography variant="h1" sx={{ mb: 6, color: 'text.primary', fontWeight: 700 }}>
            Nyheter
          </Typography>
        </FadeIn>
      
        <StaggerContainer>
          <Stack spacing={6}>
            {articles.length === 0 ? (
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="text.secondary">
                    Ingen nyheter tilgjengelig for øyeblikket.
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              articles.map((article) => (
                <StaggerItem key={article._id}>
                  <Card component="article" sx={{ boxShadow: 3 }}>
                    {article.featuredImage?.url && (
                      <CardMedia
                        component="div"
                        sx={{ position: 'relative', height: 256 }}
                      >
                        <Image
                          src={article.featuredImage.url}
                          alt={article.featuredImage.alt || article.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </CardMedia>
                    )}
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                        {article.title}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ mb: 3 }}
                      >
                        <Chip
                          label={new Date(article.publishedAt).toLocaleDateString('no-NO', { 
                            day: '2-digit', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                          size="small"
                          variant="outlined"
                        />
                        {article.author && (
                          <Chip
                            icon={<PersonIcon />}
                            label={`av ${article.author.name}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Stack>
                      
                      <Typography variant="body1" sx={{ mb: 3 }} color="text.secondary">
                        {article.summary}
                      </Typography>
                      <Box sx={{ color: 'text.primary' }}>
                        <RichText content={article.content} />
                      </Box>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))
            )}
          </Stack>
        </StaggerContainer>
      </Container>
    </PageTransition>
  );
}
