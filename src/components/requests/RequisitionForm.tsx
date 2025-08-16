import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CascadingSelect } from '@/components/ui/cascading-select';
import { AdminInterface } from '@/components/requests/AdminInterface';
import { useToast } from '@/hooks/use-toast';
import { Settings } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRequisitionData } from '@/hooks/useRequisitionData';

const RequisitionForm = () => {
  const { toast } = useToast();
  const {
    countries,
    companies,
    departments,
    positions,
    positionLevels,
    loading,
    fetchCompaniesByCountry,
    fetchDepartmentsByCompany,
    fetchPositionsByDepartment,
    fetchLevelsByPosition,
    submitRequisition
  } = useRequisitionData();

  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedLevelMin, setSelectedLevelMin] = useState('');
  const [selectedLevelMax, setSelectedLevelMax] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const [formData, setFormData] = useState({
    isConfidential: false,
    // Basic Information
    country: '',
    company: '',
    requestingDepartment: '',
    requestDate: new Date().toISOString().split('T')[0],
    requestedPosition: '',
    workLocation: '',

    // Requisition Details (single selection)
    requisitionType: '' as string,
    contractType: '' as string,
    cargoType: '' as string,
    positionObjective: [] as string[],

    // Impact
    departmentImpact: '',
    companyImpact: '',

    // Position Requirements
    academicLevel: '',
    professionalCareer: '',
    experience: '',

    // Competencies
    keyCompetencies: [] as string[],
    technicalCompetencies: [] as string[],

    // Proyección del Cargo
    expectedResultsFirstSemester: '',
    expectedResultsSecondSemester: '',

    // Additional Information
    additionalInfo: [] as string[],
    drivingLicense: '',
    foreignDocuments: '',
    communicationResource: '',

    // Authorizations
    requestedBy: '',
    requestedByPosition: '',
    requestedByDate: new Date().toISOString().split('T')[0],
    requestedBySignature: '',
    approvedBy: '',
    approvedByPosition: '',
    approvedByDate: new Date().toISOString().split('T')[0],
    approvedBySignature: '',
    hrValidation: ''
  });

  // Handle cascading selects
  useEffect(() => {
    if (selectedCountry) {
      fetchCompaniesByCountry(selectedCountry);
      setSelectedCompany('');
      setSelectedDepartment('');
      setSelectedPosition('');
      setSelectedLevelMin('');
      setSelectedLevelMax('');
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCompany) {
      fetchDepartmentsByCompany(selectedCompany);
      setSelectedDepartment('');
      setSelectedPosition('');
      setSelectedLevelMin('');
      setSelectedLevelMax('');
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (selectedDepartment) {
      fetchPositionsByDepartment(selectedDepartment);
      setSelectedPosition('');
      setSelectedLevelMin('');
      setSelectedLevelMax('');
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedPosition) {
      fetchLevelsByPosition(selectedPosition);
      setSelectedLevel('');
      setSelectedLevelMin('');
      setSelectedLevelMax('');
    }
  }, [selectedPosition]);

  const handleCheckboxChange = (category: string, value: string) => {
    setFormData(prev => {
      const currentValue = prev[category as keyof typeof prev] as string[]
      return {
        ...prev,
        [category]: currentValue.includes(value)
          ? currentValue.filter((item: string) => item !== value)
          : [...currentValue, value]
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalFormData = {
        ...formData,
        country: selectedCountry,
        company: selectedCompany,
        requestingDepartment: selectedDepartment,
        requestedPosition: selectedPosition,
      };

      const payload = {
        form_data: finalFormData,
        status: 'open',
        country_id: selectedCountry || null,
        company_id: selectedCompany || null,
        department_id: selectedDepartment || null,
        position_id: selectedPosition || null,
        work_location: finalFormData.workLocation || null,
        request_date: finalFormData.requestDate || null,
        requisition_type: finalFormData.requisitionType || null,
        contract_type: finalFormData.contractType || null,
        cargo_type: finalFormData.cargoType || null,
        position_level_min_id: selectedLevelMin || null,
        position_level_max_id: selectedLevelMax || null,
        department_impact: finalFormData.departmentImpact || null,
        company_impact: finalFormData.companyImpact || null,
        academic_level: finalFormData.academicLevel || null,
        education: finalFormData.professionalCareer || null,
        experience: finalFormData.experience || null,
        position_objectives: finalFormData.positionObjective?.length ? finalFormData.positionObjective : null,
        expected_results_first_semester: finalFormData.expectedResultsFirstSemester || null,
        expected_results_second_semester: finalFormData.expectedResultsSecondSemester || null,
        manipula_carga: finalFormData.additionalInfo.includes(leftAdditionalCheckboxes[0]),
        requiere_computador: finalFormData.additionalInfo.includes(leftAdditionalCheckboxes[1]),
        requiere_vehiculo: finalFormData.additionalInfo.includes(leftAdditionalCheckboxes[2]),
        driving_license: finalFormData.drivingLicense || null,
        foreign_documents: finalFormData.foreignDocuments || null,
        communication_resource: finalFormData.communicationResource || null,
        requested_by_name: finalFormData.requestedBy || null,
        requested_by_position: finalFormData.requestedByPosition || null,
        requested_by_date: finalFormData.requestedByDate || null,
        approved_by_name: finalFormData.approvedBy || null,
        approved_by_position: finalFormData.approvedByPosition || null,
        approved_by_date: finalFormData.approvedByDate || null,
        key_competencies: finalFormData.keyCompetencies,
        technical_competencies: finalFormData.technicalCompetencies,
        is_confidential: finalFormData.isConfidential,
      };

      await submitRequisition(payload);

      toast({
        title: "Requisición enviada exitosamente",
        description: "El formulario ha sido enviado y guardado en la base de datos.",
      });

      // Reset form
      setFormData({
        isConfidential: false,
        country: '',
        company: '',
        requestingDepartment: '',
        requestDate: new Date().toISOString().split('T')[0],
        requestedPosition: '',
        workLocation: '',
        requisitionType: '',
        contractType: '',
        cargoType: '',
        positionObjective: [],
        departmentImpact: '',
        companyImpact: '',
        academicLevel: '',
        professionalCareer: '',
        experience: '',
        keyCompetencies: [],
        technicalCompetencies: [],
        expectedResultsFirstSemester: '',
        expectedResultsSecondSemester: '',
        additionalInfo: [],
        drivingLicense: '',
        foreignDocuments: '',
        communicationResource: '',
        requestedBy: '',
        requestedByPosition: '',
        requestedByDate: new Date().toISOString().split('T')[0],
        requestedBySignature: '',
        approvedBy: '',
        approvedByPosition: '',
        approvedByDate: new Date().toISOString().split('T')[0],
        approvedBySignature: '',
        hrValidation: ''
      });

      setSelectedCountry('');
      setSelectedCompany('');
      setSelectedDepartment('');
      setSelectedPosition('');
      setSelectedLevelMin('');
      setSelectedLevelMax('');
    } catch (error) {
      toast({
        title: "Error al enviar la requisición",
        description: "Hubo un problema al enviar el formulario. Por favor, inténtelo de nuevo.",
        variant: "destructive",
      });
    }
  };

  // Checkbox options
  const requisitionTypes = [
    "Reposición de puesto ya existente",
    "Nueva posición",
    "Posición temporal"
  ];

  const contractTypes = [
    "Tiempo completo",
    "Medio tiempo",
    "Contrato temporal"
  ];

  const cargoTypes = [
    "Operativo",
    "Coordinación",
    "Jefatura",
    "Gerencia"
  ];

  const positionObjectives = [
    "Maximizar ingresos",
    "Maximizar eficiencia operativa",
    "Garantizar procesos",
    "Garantizar talento"
  ];

  const keyCompetencies = [
    "Planificación y Organización",
    "Impacto e Influencia",
    "Dominio comercial",
    "Orientación al cliente",
    "Innovación",
    "Pensamiento analítico",
    "Desarrollo de Otros",
    "Visión estratégica",
    "Habilidades de Negociación"
  ];

  const technicalCompetencies = [
    "Manejo hojas de cálculo",
    "Power BI",
    "Chat GPT",
    "Herramientas de Programación",
    "Project",
    "Manejo de ERP",
    "Dominio de inglés"
  ];

  // Opciones de la sección 11
  const leftAdditionalCheckboxes = [
    "El cargo manipulará carga (CD)",
    "El cargo requiere asignación de computador o laptop",
    "El cargo requiere poseer vehículo",
  ];

  const drivingLicenseOptions = [
    "Carro",
    "Moto",
    "Vehículo de Carga",
    "Moto o Carro",
    "No",
  ];

  const foreignDocumentOptions = [
    "Pasaporte",
    "Visa",
    "Pasaporte y visa",
  ];

  const communicationResourceOptions = [
    "Línea telefónica corporativa",
    "Teléfono y línea corporativa",
    "Tablet y no requiere",
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Cargando datos...</div>
      </div>
    );
  }

  return (
    <>
      {showAdmin && <AdminInterface onClose={() => setShowAdmin(false)} />}

      <Card className="w-full max-w-6xl mx-auto bg-background border-2 border-foreground rounded-none">
        <CardHeader className="text-center border-b-2 border-foreground">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1"></div>
            <img src='/Logo Mayoreo.png' alt="Infinity Logo" className="h-16 w-auto" />
            <div className="flex-1 flex justify-end">
              <Button
                type="button"
                onClick={() => setShowAdmin(true)}
                variant="outline"
                size="sm"
                className="border-2 border-foreground rounded-none"
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold uppercase tracking-wide">
            FORMATO DE REQUISICIÓN DE PERSONAL
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isConfidential"
                checked={formData.isConfidential}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isConfidential: !!checked }))}
              />
              <Label htmlFor="isConfidential" className="text-sm font-medium">
                Vacante Confidencial  (marcar si la vacante es confidencial)
              </Label>
            </div>

            <Card className="border-2 border-foreground rounded-none">
              <CardHeader className="border-b-2 border-foreground">
                <CardTitle className="text-lg font-bold">1. INFORMACIÓN BÁSICA</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b-2 border-foreground pb-4">
                  <CascadingSelect
                    label="País"
                    placeholder="Seleccionar país"
                    options={countries.map(c => ({ id: c.id, name: c.name }))}
                    value={selectedCountry}
                    onValueChange={setSelectedCountry}
                    required
                  />

                  <CascadingSelect
                    label="Compañía"
                    placeholder="Seleccionar compañía"
                    options={companies.map(c => ({ id: c.id, name: c.name }))}
                    value={selectedCompany}
                    onValueChange={setSelectedCompany}
                    disabled={!selectedCountry}
                    required
                  />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b-2 border-foreground pb-4">
                  <CascadingSelect
                    label="Departamento Solicitante"
                    placeholder="Seleccionar departamento"
                    options={departments.map(d => ({ id: d.id, name: d.name }))}
                    value={selectedDepartment}
                    onValueChange={setSelectedDepartment}
                    disabled={!selectedCompany}
                    required
                  />

                  <div className="space-y-2">
                    <Label htmlFor="requestDate" className="text-sm font-medium">
                      Fecha de Solicitud *
                    </Label>
                    <Input
                      id="requestDate"
                      type="date"
                      value={formData.requestDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, requestDate: e.target.value }))}
                      className="border-2 border-foreground bg-background rounded-none"
                      required
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b-2 border-foreground pb-4">
                  <CascadingSelect
                    label="Posición Solicitada"
                    placeholder="Seleccionar posición"
                    options={positions.map(p => ({ id: p.id, name: p.name }))}
                    value={selectedPosition}
                    onValueChange={setSelectedPosition}
                    disabled={!selectedDepartment}
                    required
                  />

                  <div className="space-y-2">
                    <Label htmlFor="workLocation" className="text-sm font-medium">
                      Ubicación o Zona de Trabajo *
                    </Label>
                    <Input
                      id="workLocation"
                      value={formData.workLocation}
                      onChange={(e) => setFormData(prev => ({ ...prev, workLocation: e.target.value }))}
                      className="border-2 border-foreground bg-background rounded-none"
                      placeholder="Ingrese la ubicación"
                      required
                    />
                  </div>
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Paso (Mínimo) *</Label>
                    <Select
                      value={selectedLevelMin}
                      onValueChange={setSelectedLevelMin}
                      disabled={!selectedPosition}
                    >
                      <SelectTrigger className="border-2 border-foreground bg-background rounded-none">
                        <SelectValue placeholder="Seleccionar nivel mínimo" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-2 border-foreground rounded-none">
                        {positionLevels.map((l) => (
                          <SelectItem key={l.id} value={l.id}>{`${l.step}`}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/*
                <Label htmlFor="possitionLevel" className="text-sm font-medium">
                  Información del Nivel *
                </Label>
                <Input
                  id="possitionLevel"
                  value={positionLevels.find(l => l.id === selectedLevel)?.level || ''}
                  className="border-2 border-foreground bg-background rounded-none"
                  placeholder="Se actualiza automáticamente"
                  disabled
                />*/}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Paso (Máximo) *</Label>
                    <Select
                      value={selectedLevelMax}
                      onValueChange={setSelectedLevelMax}
                      disabled={!selectedPosition}
                    >
                      <SelectTrigger className="border-2 border-foreground bg-background rounded-none">
                        <SelectValue placeholder="Seleccionar nivel máximo" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-2 border-foreground rounded-none">
                        {positionLevels.map((l) => (
                          <SelectItem key={l.id} value={l.id}>{`${l.step}`}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requisition Type and Contract Details */}
            <Card className="border-2 border-foreground rounded-none">
              <CardHeader className="border-b-2 border-foreground">
                <CardTitle className="text-lg font-bold">2. DETALLES DE LA REQUISICIÓN</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tipo de Requisición */}
                  <div className="border border-foreground p-4 rounded-none">
                    <h3 className="font-bold mb-3 text-sm">TIPO DE REQUISICIÓN</h3>
                    <RadioGroup
                      value={formData.requisitionType}
                      onValueChange={(v) => setFormData((prev) => ({ ...prev, requisitionType: v }))}
                      className="space-y-2"
                    >
                      {requisitionTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <RadioGroupItem value={type} id={`req-${type}`} />
                          <Label htmlFor={`req-${type}`} className="text-sm">{type}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Tipo de Contrato */}
                  <div className="border border-foreground p-4 rounded-none">
                    <h3 className="font-bold mb-3 text-sm">TIPO DE CONTRATO</h3>
                    <RadioGroup
                      value={formData.contractType}
                      onValueChange={(v) => setFormData((prev) => ({ ...prev, contractType: v }))}
                      className="space-y-2"
                    >
                      {contractTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <RadioGroupItem value={type} id={`contract-${type}`} />
                          <Label htmlFor={`contract-${type}`} className="text-sm">{type}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Tipo de Cargo */}
                  <div className="border border-foreground p-4 rounded-none">
                    <h3 className="font-bold mb-3 text-sm">TIPO DE CARGO</h3>
                    <RadioGroup
                      value={formData.cargoType}
                      onValueChange={(v) => setFormData((prev) => ({ ...prev, cargoType: v }))}
                      className="space-y-2"
                    >
                      {cargoTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <RadioGroupItem value={type} id={`cargo-${type}`} />
                          <Label htmlFor={`cargo-${type}`} className="text-sm">{type}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Objetivo de la Posición */}
                  <div className="border border-foreground p-4 rounded-none">
                    <h3 className="font-bold mb-3 text-sm">OBJETIVO DE LA POSICIÓN</h3>
                    <div className="space-y-2">
                      {positionObjectives.map(objective => (
                        <div key={objective} className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.positionObjective.includes(objective)}
                            onCheckedChange={() => handleCheckboxChange('positionObjective', objective)}
                            className="border-2 border-foreground rounded-none"
                          />
                          <Label className="text-sm">{objective}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impact Section */}
            <Card className="border-2 border-foreground rounded-none">
              <CardHeader className="border-b-2 border-foreground">
                <CardTitle className="text-lg font-bold">3. IMPACTO GENERADO</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">En el Departamento *</Label>
                    <Textarea
                      value={formData.departmentImpact}
                      onChange={(e) => setFormData(prev => ({ ...prev, departmentImpact: e.target.value }))}
                      className="border-2 border-foreground rounded-none min-h-[120px]"
                      placeholder="Describa el impacto en el departamento"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">En la Compañía *</Label>
                    <Textarea
                      value={formData.companyImpact}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyImpact: e.target.value }))}
                      className="border-2 border-foreground rounded-none min-h-[120px]"
                      placeholder="Describa el impacto en la compañía"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements Section */}
            <Card className="border-2 border-foreground rounded-none">
              <CardHeader className="border-b-2 border-foreground">
                <CardTitle className="text-lg font-bold">4. REQUERIMIENTOS DE LA POSICIÓN</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Nivel Académico *</Label>
                  <Textarea
                    value={formData.academicLevel}
                    onChange={(e) => setFormData(prev => ({ ...prev, academicLevel: e.target.value }))}
                    className="border-2 border-foreground rounded-none"
                    placeholder="Especifique el nivel académico requerido"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Carrera Profesional *</Label>
                  <Textarea
                    value={formData.professionalCareer}
                    onChange={(e) => setFormData(prev => ({ ...prev, professionalCareer: e.target.value }))}
                    className="border-2 border-foreground rounded-none"
                    placeholder="Especifique la carrera profesional requerida"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Experiencia *</Label>
                  <Textarea
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    className="border-2 border-foreground rounded-none"
                    placeholder="Especifique la experiencia requerida"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Competencies Section */}
            <Card className="border-2 border-foreground rounded-none">
              <CardHeader className="border-b-2 border-foreground">
                <CardTitle className="text-lg font-bold">5. COMPETENCIAS</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Competencias Clave */}
                  <div className="border border-foreground p-4 rounded-none">
                    <h3 className="font-bold mb-3 text-sm">COMPETENCIAS CLAVE REQUERIDAS</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {keyCompetencies.map(competency => (
                        <div key={competency} className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.keyCompetencies.includes(competency)}
                            onCheckedChange={() => handleCheckboxChange('keyCompetencies', competency)}
                            className="border-2 border-foreground rounded-none"
                          />
                          <Label className="text-sm">{competency}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Competencias Técnicas */}
                  <div className="border border-foreground p-4 rounded-none">
                    <h3 className="font-bold mb-3 text-sm">COMPETENCIAS TÉCNICAS DESEABLES</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {technicalCompetencies.map(competency => (
                        <div key={competency} className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.technicalCompetencies.includes(competency)}
                            onCheckedChange={() => handleCheckboxChange('technicalCompetencies', competency)}
                            className="border-2 border-foreground rounded-none"
                          />
                          <Label className="text-sm">{competency}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proyección del Cargo */}
            <Card className="border-2 border-foreground rounded-none">
              <CardHeader className="border-b-2 border-foreground">
                <CardTitle className="text-lg font-bold">6. PROYECCIÓN DEL CARGO</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Resultados esperados en el 1er semestre</Label>
                    <Textarea
                      value={formData.expectedResultsFirstSemester}
                      onChange={(e) => setFormData(prev => ({ ...prev, expectedResultsFirstSemester: e.target.value }))}
                      className="border-2 border-foreground rounded-none min-h-[120px]"
                      placeholder="Escriba los resultados esperados"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Resultados esperados en el 2do semestre</Label>
                    <Textarea
                      value={formData.expectedResultsSecondSemester}
                      onChange={(e) => setFormData(prev => ({ ...prev, expectedResultsSecondSemester: e.target.value }))}
                      className="border-2 border-foreground rounded-none min-h-[120px]"
                      placeholder="Escriba los resultados esperados"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información Adicional */}
            <Card className="border-2 border-foreground rounded-none">
              <CardHeader className="border-b-2 border-foreground">
                <CardTitle className="text-lg font-bold">7. INFORMACIÓN ADICIONAL</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Izquierda: Checkbox en dos columnas (etiqueta | check) */}
                  <div className="border-2 border-foreground">
                    <div className="grid grid-cols-[1fr_auto] divide-y-2">
                      {leftAdditionalCheckboxes.map((label) => (
                        <React.Fragment key={label}>
                          <div className="p-3 border-r-2 border-foreground text-sm flex items-center">
                            {label}
                          </div>
                          <div className="p-3 flex items-center justify-center">
                            <Checkbox
                              checked={formData.additionalInfo.includes(label)}
                              onCheckedChange={() => handleCheckboxChange('additionalInfo', label)}
                              className="border-2 border-foreground rounded-none"
                            />
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Derecha: Selects con opciones específicas */}
                  <div className="border-2 border-foreground">
                    <div className="grid grid-cols-[auto_1fr] divide-y-2">
                      {/* Licencia de conducir */}
                      <div className="p-3 border-r-2 border-foreground text-sm flex items-center">
                        El cargo requiere poseer licencia de conducir de:
                      </div>
                      <div className="p-3">
                        <Select
                          value={formData.drivingLicense}
                          onValueChange={(v) => setFormData((prev) => ({ ...prev, drivingLicense: v }))}
                        >
                          <SelectTrigger className="border-2 border-foreground rounded-none bg-background">
                            <SelectValue placeholder="Seleccione" />
                          </SelectTrigger>
                          <SelectContent className="z-50">
                            {drivingLicenseOptions.map((opt) => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Documento de Extranjería */}
                      <div className="p-3 border-r-2 border-foreground text-sm flex items-center">
                        El cargo requiere documento de extranjería:
                      </div>
                      <div className="p-3">
                        <Select
                          value={formData.foreignDocuments}
                          onValueChange={(v) => setFormData((prev) => ({ ...prev, foreignDocuments: v }))}
                        >
                          <SelectTrigger className="border-2 border-foreground rounded-none bg-background">
                            <SelectValue placeholder="Seleccione" />
                          </SelectTrigger>
                          <SelectContent className="z-50">
                            {foreignDocumentOptions.map((opt) => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Recurso de comunicación */}
                      <div className="p-3 border-r-2 border-foreground text-sm flex items-center">
                        El cargo requiere asignación de recurso de comunicación:
                      </div>
                      <div className="p-3">
                        <Select
                          value={formData.communicationResource}
                          onValueChange={(v) => setFormData((prev) => ({ ...prev, communicationResource: v }))}
                        >
                          <SelectTrigger className="border-2 border-foreground rounded-none bg-background">
                            <SelectValue placeholder="Seleccione" />
                          </SelectTrigger>
                          <SelectContent className="z-50">
                            {communicationResourceOptions.map((opt) => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Autorizaciones */}
            <Card className="border-2 border-foreground rounded-none">
              <CardHeader className="border-b-2 border-foreground">
                <CardTitle className="text-lg font-bold">8. AUTORIZACIONES DE LA REQUISICIÓN</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="border-2 border-foreground">
                  <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr] divide-y-2">
                    <div className="contents">
                      <div className="p-3 border-r-2 font-semibold">&nbsp;</div>
                      <div className="p-3 border-r-2 font-semibold">Nombre</div>
                      <div className="p-3 border-r-2 font-semibold">Cargo</div>
                      <div className="p-3 border-r-2 font-semibold">Firma</div>
                      <div className="p-3 font-semibold">Fecha</div>
                    </div>

                    {/* Row: Solicitado por */}
                    <div className="contents">
                      <div className="p-3 border-r-2">Solicitado por</div>
                      <div className="p-3 border-r-2">
                        <Input
                          value={formData.requestedBy}
                          onChange={(e) => setFormData(prev => ({ ...prev, requestedBy: e.target.value }))}
                          className="border-2 border-foreground rounded-none"
                          placeholder="Nombre completo"
                          required
                        />
                      </div>
                      <div className="p-3 border-r-2">
                        <Input
                          value={formData.requestedByPosition}
                          onChange={(e) => setFormData(prev => ({ ...prev, requestedByPosition: e.target.value }))}
                          className="border-2 border-foreground rounded-none"
                          placeholder="Cargo"
                          required
                        />
                      </div>
                      <div className="p-3 border-r-2">
                        <Input
                          value={formData.requestedBySignature}
                          onChange={(e) => setFormData(prev => ({ ...prev, requestedBySignature: e.target.value }))}
                          className="border-2 border-foreground rounded-none"
                          placeholder="Firma"
                        />
                      </div>
                      <div className="p-3">
                        <Input
                          type="date"
                          value={formData.requestedByDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, requestedByDate: e.target.value }))}
                          className="border-2 border-foreground rounded-none"
                        />
                      </div>
                    </div>

                    {/* Row: Aprobado por */}
                    <div className="contents">
                      <div className="p-3 border-r-2">Aprobado por</div>
                      <div className="p-3 border-r-2">
                        <Input
                          value={formData.approvedBy}
                          onChange={(e) => setFormData(prev => ({ ...prev, approvedBy: e.target.value }))}
                          className="border-2 border-foreground rounded-none"
                          placeholder="Nombre completo"
                          required
                        />
                      </div>
                      <div className="p-3 border-r-2">
                        <Input
                          value={formData.approvedByPosition}
                          onChange={(e) => setFormData(prev => ({ ...prev, approvedByPosition: e.target.value }))}
                          className="border-2 border-foreground rounded-none"
                          placeholder="Cargo"
                          required
                        />
                      </div>
                      <div className="p-3 border-r-2">
                        <Input
                          value={formData.approvedBySignature}
                          onChange={(e) => setFormData(prev => ({ ...prev, approvedBySignature: e.target.value }))}
                          className="border-2 border-foreground rounded-none"
                          placeholder="Firma"
                        />
                      </div>
                      <div className="p-3">
                        <Input
                          type="date"
                          value={formData.approvedByDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, approvedByDate: e.target.value }))}
                          className="border-2 border-foreground rounded-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Validación de Recursos Humanos</Label>
                    <Textarea
                      value={formData.hrValidation}
                      onChange={(e) => setFormData(prev => ({ ...prev, hrValidation: e.target.value }))}
                      className="border-2 border-foreground rounded-none"
                      placeholder="Comentarios de Recursos Humanos"
                    />
                  </div>
                </div>

              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-foreground rounded-none px-8 py-3"
              >
                ENVIAR REQUISICIÓN
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default RequisitionForm;