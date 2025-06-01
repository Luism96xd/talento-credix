
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import CompanySelector from '@/components/CompanySelector';
import CandidateCard from '@/components/CandidateCard';
import { Progress } from '@/components/ui/progress';
import { useSavedSearchParams } from '@/hooks/useSavedSearchParams';
import { Loader } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface Candidate {
  id: number;
  name: string;
  title: string;
  link: string;
  connections: number;
  description: string;
  education: string;
  experience: string;
  search_id: string;
  image: string;
  score: number;
  technical_score: number;
  strengths: string;
  opportunities: string;
  leadership: string;
  soft_skills: string;
}

// Mock data for the candidate results
const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 1,
    name: 'Dr. Evelyn Reed',
    title: 'Lead Data Scientist | AI & ML Specialist',
    link: 'https://linkedin.com/in/evelynreed',
    connections: 500,
    description: 'Accomplished Lead Data Scientist with 10+ years of experience in leveraging AI and Machine Learning to solve complex business problems. Proven ability to lead teams and deliver impactful data-driven solutions in the tech and finance sectors.',
    education: 'PhD in Computer Science (AI Specialization) - MIT; M.Sc. Statistics - Stanford University',
    experience: 'Lead Data Scientist - FinTech Solutions (4 years); Senior ML Engineer - Innovatech (3 years); Data Scientist - DataCorp (3 years)',
    search_id: 'search_xyz_123',
    image: "https://thispersondoesnotexist.com",
    score: 75,
    technical_score: 60,
    strengths: "Fortalezas",
    opportunities: "Oportunidades",
    leadership: "Leadership",
    soft_skills: "Soft Skills"
  },
  {
    id: 2,
    name: 'Marcus Chen',
    title: 'Senior Software Engineer - Backend Systems',
    link: 'https://linkedin.com/in/marcuschen',
    connections: 450,
    description: 'Versatile Senior Software Engineer with 8 years of experience in designing, developing, and deploying scalable backend systems. Expertise in microservices architecture, cloud platforms (AWS, Azure), and various programming languages (Java, Python, Go).',
    education: 'B.Sc. Software Engineering - University of California, Berkeley',
    experience: 'Senior Backend Engineer - CloudNet (Current, 5 years); Software Engineer - AlphaSoft (3 years)',
    search_id: 'search_xyz_123',
    image: "https://picsum.photos/id/1/200/300",
    score: 75,
    technical_score: 90,
    strengths: "Fortalezas",
    opportunities: "Oportunidades",
    leadership: "Leadership",
    soft_skills: "Soft Skills"
  },
  {
    id: 3,
    name: 'Aisha Khan',
    title: 'Product Manager - SaaS & Enterprise Solutions',
    link: 'https://linkedin.com/in/aishakhanpm',
    connections: 500,
    description: 'Dynamic Product Manager with a strong track record of launching successful SaaS products and driving growth in enterprise markets. Passionate about user-centric design and agile methodologies. 7 years in product leadership.',
    education: 'MBA - Harvard Business School; B.A. Economics - Yale University',
    experience: 'Senior Product Manager - EnterpriseFlow (3 years); Product Manager - SaaSGen (4 years)',
    search_id: 'search_abc_456',
    image: "https://picsum.photos/id/1/200/300",
    score: 75,
    technical_score: 70,
    strengths: "Fortalezas",
    opportunities: "Oportunidades",
    leadership: "Leadership",
    soft_skills: "Soft Skills"
  },
  {
    id: 4,
    name: 'David Miller',
    title: 'Cybersecurity Analyst | Threat Intelligence',
    link: 'https://linkedin.com/in/davidmillercyber',
    connections: 320,
    description: 'Dedicated Cybersecurity Analyst specializing in threat intelligence, incident response, and vulnerability management. Certified CISSP and CISM with 6 years of experience protecting critical infrastructure and sensitive data.',
    education: 'M.Sc. Cybersecurity - Carnegie Mellon University; B.Sc. Information Technology - Purdue University',
    experience: 'Cybersecurity Analyst - SecureNet (Current, 4 years); IT Security Specialist - GlobalBank (2 years)',
    search_id: 'search_xyz_123',
    image: "https://picsum.photos/id/1/200/300",
    score: 75,
    technical_score: 50,
    strengths: "Fortalezas",
    opportunities: "Oportunidades",
    leadership: "Leadership",
    soft_skills: "Soft Skills"
  },
  {
    id: 5,
    name: 'Sophie Dubois',
    title: 'UX Design Lead | Mobile & Web Applications',
    link: 'https://linkedin.com/in/sophieduboisux',
    connections: 500,
    description: 'Creative and strategic UX Design Lead with 9 years of experience crafting intuitive and engaging user experiences for mobile and web platforms. Proficient in user research, wireframing, prototyping, and usability testing.',
    education: 'M.A. Human-Computer Interaction - University of Washington; B.F.A. Graphic Design - RISD',
    experience: 'UX Design Lead - AppMakers (5 years); Senior UX Designer - WebCrafters (4 years)',
    search_id: 'search_abc_456',
    image: "https://picsum.photos/id/1/200/300",
    score: 75,
    technical_score: 60,
    strengths: "Fortalezas",
    opportunities: "Oportunidades",
    leadership: "Leadership",
    soft_skills: "Soft Skills"
  }
];

const Index = () => {
  const [keywords, setKeywords] = useState("");
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchProgress, setSearchProgress] = useState(0);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [jobDescriptionFile, setJobDescriptionFile] = useState('');
  const [jobRequisitionFile, setJobRequisitionFile] = useState('');
  const [referenceCompanies, setReferenceCompanies] = useState(false);
  const [competenceCompanies, setCompetenceCompanies] = useState(false);
  const [sheetUrl, setSheetUrl] = useState("")
  const {
    searchParams,
    updateParams,
    isSearching,
    startSearch
  } = useSavedSearchParams();

  const handleSearch = async (position: string, location: string) => {
    if (!position || !location) {
      toast({
        title: "Error",
        description: `El puesto de trabajo y la ubicación son campos obligatorios.`,
        variant: "destructive"
      });
      return
    }

    updateParams('position', position);
    updateParams('location', location);

    setShowLoadingScreen(true);
    setSearchInitiated(false); // Reset search initiated state
    setCandidates([]); // Clear previous candidates

    const progressInterval = setInterval(() => {
      setSearchProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 300);


    let searchRecordId = null; // To store the ID of the saved search

    try {
      // 1. Save search to database
      const { data: searchData, error: searchError } = await supabase
        .from('searches')
        .insert([{
          job_title: position,
          location: location,
          keywords: keywords,
          reference: referenceCompanies,
          competence: competenceCompanies,
          company_id: selectedCompany?.id || null,
          job_description: jobDescriptionFile || null,
          job_requisition: jobRequisitionFile || null,
        }])
        .select('id') // Only select the ID, as that's what we need
        .single();

      if (searchError) {
        console.error('Error saving search to Supabase:', searchError);
        throw searchError;
      }

      if (!searchData || !searchData.id) {
        console.error('Search data or ID is missing after insert.');
        throw new Error("Failed to retrieve search ID after saving.");
      }

      searchRecordId = searchData.id;
      console.log('Search saved with ID:', searchRecordId);

      // 2. Prepare and send webhook payload
      const webhookPayload = {
        job_title: position,
        location: location,
        company_id: selectedCompany?.id,
        search_id: searchRecordId,
        keywords: keywords,
        job_description_url: jobDescriptionFile, // Name was swapped in original code, ensure this is correct
        job_requisition_url: jobRequisitionFile, // Name was swapped in original code, ensure this is correct
        referenceCompanies: referenceCompanies,
        competenceCompanies: competenceCompanies, // Assuming this is the correct variable name
        // candidate_experience: searchParams.candidateProfile.experience,
        // candidate_skills: searchParams.candidateProfile.skills,
        // candidate_education: searchParams.candidateProfile.education,
        // culture_values: searchParams.cultureFit.values,
        // culture_work_style: searchParams.cultureFit.workStyle,
        // culture_team_fit: searchParams.cultureFit.teamFit,
        // notes: searchParams.notes
      };

      console.log('Sending webhook request with payload:', webhookPayload);
      const webhookUrl = 'https://mayoreo.app.n8n.cloud/webhook/2cd021aa-7f0d-4800-a4b1-d88fe3a2cc3c'

      let webhookResponseData;

      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookPayload)
        });

        if (!response.ok) {
          // Non-2xx responses
          const errorBody = await response.text(); // Or response.json() if the error is JSON
          console.error(`Webhook request failed with status ${response.status}:`, errorBody);
          throw new Error(`Webhook request failed with status ${response.status}. ${errorBody}`);
        }

        webhookResponseData = await response.json();
        console.log('Webhook response:', webhookResponseData);

        // 3. Update search record with webhook response
        const { error: updateError } = await supabase
          .from('searches')
          .update({ webhook_response: webhookResponseData })
          .eq('id', searchRecordId);

        if (updateError) {
          console.error('Error updating search with webhook response:', updateError);
        }

      } catch (webhookError) {
        console.error('Webhook request or processing failed:', webhookError);
      }

      if (webhookResponseData && webhookResponseData['sheet_url'] !== "") {
        console.log('Webhook successful, fetching candidates for search ID:', searchRecordId);
        try {
          setSheetUrl(webhookResponseData['sheet_url']);
          const { data: candidatesData, error: candidatesError } = await supabase
            .from('candidates')
            .select('id, name, title, link, description, connections, education, experience, image, search_id, score, technical_score, strengths, opportunities, leadership, soft_skills')
            .eq('search_id', searchRecordId); // IMPORTANT FIX: Filter by search_id

          if (candidatesError) {
            console.error('Error fetching candidates from Supabase:', candidatesError);
            throw candidatesError;
          }
          setSearchProgress(100)
          console.log('Candidates fetched:', candidatesData);
          setCandidates(candidatesData || []);
        } catch (error) {
          console.error('Error in candidate fetching process:', error);
          // setCandidates([]); // Already cleared at the beginning
        }
      } else {
        console.log('Webhook was not successful or response missing, skipping candidate fetch.');
        // If webhook failed catastrophically (webhookError caught), a toast was already shown.
        setCandidates([]); // Ensure candidates are empty if not fetched
      }

    } catch (error) {
      console.error('Overall search process error:', error);
      setCandidates([]);
    } finally {
      setShowLoadingScreen(false);
      setSearchInitiated(true); // Set to true so UI can update (e.g., show "No results" or the results)
    }
  };


  const handleReferenceCompaniesChange = (checked: boolean) => {
    setReferenceCompanies(checked);
    console.log('Reference companies:', checked);
  };

  const handleCompetenceChange = (checked: boolean) => {
    setCompetenceCompanies(checked);
    console.log('Analyze competence:', checked);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-slate-100 min-h-screen">
      <div className="min-h-screen flex flex-col">
        <header className="py-6 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Buscador de talento automatizado Mayoreo</h1>
            <p className="text-gray-600 mb-6">Search for candidates that match your specific requirements</p>

            <SearchBar
              onSearch={handleSearch}
              placeholderPosition="Gerente de control"
              placeholderLocation="Valencia, Venezuela"
            />

            <CompanySelector
              keywords={keywords}
              onChangeKeywords={setKeywords}
              selectedCompany={selectedCompany}
              onCompanySelect={setSelectedCompany}
              referenceCompaniesChecked={referenceCompanies}
              onReferenceCompaniesChange={handleReferenceCompaniesChange}
              competenceChecked={competenceCompanies}
              onCompetenceChange={handleCompetenceChange}
              jobDescriptionFileUrl={jobDescriptionFile}
              jobRequisitionFileUrl={jobRequisitionFile}
              searchInitiated={searchInitiated}
              onJobDescriptionUpload={(fileUrl, fileName) => setJobDescriptionFile(fileUrl)}
              onRequisitionFileUpload={(fileUrl, fileName) => setJobRequisitionFile(fileUrl)}
            />
          </div>
        </header>

        <main className="flex-1 px-4 md:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            {showLoadingScreen && (
              <div className="mt-12 text-center animate-fade-in">
                <div className="mb-4 flex justify-center">
                  <Loader className="h-12 w-12 text-linkedin animate-spin" />
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">Searching for the best matches...</h3>
                <p className="text-gray-500 mb-6">We're analyzing profiles based on your search criteria</p>

                <div className="max-w-md mx-auto">
                  <Progress value={searchProgress} className="h-2" />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>Analyzing profiles</span>
                    <span>{Math.round(searchProgress)}%</span>
                  </div>
                </div>
              </div>
            )}

            {searchInitiated && !showLoadingScreen && (
              <div className="mt-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Search Results</h2>
                  <p className="text-gray-600">Found <span className="font-medium">{candidates.length}</span> matching candidates</p>
                </div>

                {sheetUrl && <div className='space-y-4 mt-2 flex flex-row gap-4'>
                  <p>Puedes ver los resultados completos en el siguiente enlace:</p>
                  <Link to={sheetUrl}
                    target="_blank"
                    className='text-center text-linkedin bg-linkedin hover:bg-linkedin/90 text-white py-2 px-6 rounded-xl transition-all duration-200 md:flex items-center justify-center0'>
                    Ver hoja de cálculo
                  </Link>
                </div>}

                <div className="space-y-4">
                  {candidates.map((candidate) => (
                    <CandidateCard key={candidate.id} {...candidate} />
                  ))}
                </div>
              </div>
            )}

            {!searchInitiated && !showLoadingScreen && (
              <div className="mt-16 text-center">
                <p className="text-gray-600">Enter your search criteria above and select a company to start finding candidates</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;