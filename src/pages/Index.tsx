
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
  const [progressMessage, setProgressMessage] = useState("");

  const [sheetUrl, setSheetUrl] = useState("")
  
  const {
    searchParams,
    updateParams,
    isSearching,
    startSearch
  } = useSavedSearchParams();

  const handleSearch = async (position: string, location: string) => {
    // Validaciones iniciales (sin cambios)
    if (!position || !location) {
      toast({
        title: "Error",
        description: `El puesto de trabajo y la ubicación son campos obligatorios.`,
        variant: "destructive"
      });
      return;
    }
  
    if (!(/(venezuela|costa rica|colombia)/i.test(location.toLowerCase().replace(/,/g, '')))) {
      toast({
        title: "Error",
        description: `Incluya el país además de la ciudad`,
        variant: "destructive"
      });
      return;
    }
  
    // Actualizar parámetros y resetear estado
    updateParams('position', position);
    updateParams('location', location);
    setShowLoadingScreen(true);
    setSearchInitiated(false);
    setCandidates([]);
    setSearchProgress(0);
  
    // Estados para controlar el flujo
    let progressInterval: NodeJS.Timeout;
    let pollTimeout: NodeJS.Timeout;
    let searchId: string | null = null;
  
    try {
      // 1. Configurar barra de progreso
      progressInterval = setInterval(() => {
        setSearchProgress(prev => Math.min(prev + Math.random() * 15, 95)); // Limitar a 95%
      }, 300);
  
      // 2. Guardar búsqueda en Supabase
      setProgressMessage("Preparando búsqueda...");
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
        .select('id')
        .single();
  
      if (searchError) throw searchError;
      if (!searchData?.id) throw new Error("Búsqueda no creada");
      searchId = searchData.id;

      console.log('Search saved with ID:', searchId);

      // 3. Llamar al webhook
            const webhookPayload = {
        job_title: position,
        location: location,
        company_id: selectedCompany?.id,
        search_id: searchId,
        keywords: keywords,
        job_description_url: jobDescriptionFile, // Name was swapped in original code, ensure this is correct
        job_requisition_url: jobRequisitionFile, // Name was swapped in original code, ensure this is correct
        referenceCompanies: referenceCompanies,
        competenceCompanies: competenceCompanies, // Assuming this is the correct variable name
      };  
      setProgressMessage("Buscando candidatos...");
      const webhookUrl = "https://n8n.mayoreo.biz/webhook/2cd021aa-7f0d-4800-a4b1-d88fe3a2cc3c";
  
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookPayload)
      });
  
      if (!response.ok) throw new Error(`Error en webhook: ${response.status}`);
      const webhookResponseData = await response.json();
  
      // 4. Procesar respuesta del webhook
      if (webhookResponseData?.sheet_url) {
        setSheetUrl(webhookResponseData.sheet_url);
  
        // Actualizar estado en base de datos
        await supabase
          .from('searches')
          .update({ webhook_response: webhookResponseData })
          .eq('id', searchId);
  
        // 5. Espera de 3 minutos con mensaje
        setProgressMessage("Comparando candidatos con la cultura...");
        await new Promise(resolve => setTimeout(resolve, 200000)); // 3 minutos
  
        // 6. Polling para obtener candidatos
        setProgressMessage("Finalizando análisis...");
        const fetchCandidates = async (): Promise<any[]> => {
          const { data, error } = await supabase
            .from('candidates')
            .select('*')
            .eq('search_id', searchId);
  
          if (error) throw error;
          return data || [];
        };
  
        // Intentar obtener candidatos hasta 5 veces con espera exponencial
        let candidates: any[] = [];
        for (let attempt = 0; attempt < 5; attempt++) {
          candidates = await fetchCandidates();
          if (candidates.length > 0) break;
          await new Promise(resolve => setTimeout(resolve, 30000 * (attempt + 1))); // Espera creciente
        }
  
        setCandidates(candidates);
      } else {
        throw new Error("URL de hoja no recibida");
      }
    } catch (error) {
      console.error("Error en búsqueda:", error);
      toast({
        title: "Error",
        description: "Ocurrió un problema durante la búsqueda",
        variant: "destructive"
      });
    } finally {
      // 7. Finalización
      clearInterval(progressInterval);
      clearTimeout(pollTimeout);
      setSearchProgress(100);
      setTimeout(() => {
        setShowLoadingScreen(false);
        setSearchInitiated(true);
      }, 500);
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Buscador automatizado de talento Mayoreo</h1>
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
                    <span>{progressMessage}</span>
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

                {sheetUrl && 
                <div className='space-y-2 my-4 flex flex-row gap-4 items-center justify-between'>
                  <span>Puedes ver los resultados completos en el siguiente enlace:</span>
                  <Link to={sheetUrl}
                    target="_blank"
                    className='text-center text-linkedin bg-linkedin hover:bg-linkedin/90 text-white py-2 px-6 rounded-xl transition-all duration-200 md:flex items-center justify-center'>
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