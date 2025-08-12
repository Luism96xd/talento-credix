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
import { useRequisitionData } from '@/hooks/useRequisitionData';
import { useToast } from '@/hooks/use-toast';
import { Settings } from 'lucide-react';

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
  const [selectedLevel, setSelectedLevel] = useState('');

  const [formData, setFormData] = useState({
    // Basic Information
    country: '',
    company: '',
    requestingDepartment: '',
    requestDate: new Date().toISOString().split('T')[0],
    requestedPosition: '',
    workLocation: '',
    positionLevel: '',
    positionStep: '',
    
    // Requisition Details
    requisitionType: [] as string[],
    contractType: [] as string[],
    cargoType: [] as string[],
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
    approvedBy: '',
    approvedByPosition: '',
    hrValidation: ''
  });

  // Handle cascading selects
  useEffect(() => {
    if (selectedCountry) {
      fetchCompaniesByCountry(selectedCountry);
      setSelectedCompany('');
      setSelectedDepartment('');
      setSelectedPosition('');
      setSelectedLevel('');
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCompany) {
      fetchDepartmentsByCompany(selectedCompany);
      setSelectedDepartment('');
      setSelectedPosition('');
      setSelectedLevel('');
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (selectedDepartment) {
      fetchPositionsByDepartment(selectedDepartment);
      setSelectedPosition('');
      setSelectedLevel('');
    }
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedPosition) {
      fetchLevelsByPosition(selectedPosition);
      setSelectedLevel('');
    }
  }, [selectedPosition]);

  const handleCheckboxChange = (category: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category as keyof typeof prev].includes(value)
        ? (prev[category as keyof typeof prev] as string[]).filter((item: string) => item !== value)
        : [...(prev[category as keyof typeof prev] as string[]), value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Update form data with selected values
      const finalFormData = {
        ...formData,
        country: selectedCountry,
        company: selectedCompany,
        requestingDepartment: selectedDepartment,
        requestedPosition: selectedPosition,
        positionLevel: selectedLevel
      };

      await submitRequisition(finalFormData);
      
      toast({
        title: "Requisición enviada exitosamente",
        description: "El formulario ha sido enviado y guardado en la base de datos.",
      });

      // Reset form
      setFormData({
        country: '',
        company: '',
        requestingDepartment: '',
        requestDate: new Date().toISOString().split('T')[0],
        requestedPosition: '',
        workLocation: '',
        positionLevel: '',
        positionStep: '',
        requisitionType: [],
        contractType: [],
        cargoType: [],
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
        approvedBy: '',
        approvedByPosition: '',
        hrValidation: ''
      });
      
      setSelectedCountry('');
      setSelectedCompany('');
      setSelectedDepartment('');
      setSelectedPosition('');
      setSelectedLevel('');

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
            <img src="/Logo Mayoreo.png" alt="Infinity Logo" className="h-16 w-auto" />
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
                  <CascadingSelect
                    label="Nivel y Paso de la Posición"
                    placeholder="Seleccionar nivel"
                    options={positionLevels.map(l => ({ id: l.id, name: `${l.level} - ${l.step}` }))}
                    value={selectedLevel}
                    onValueChange={setSelectedLevel}
                    disabled={!selectedPosition}
                    required
                  />

                  <div className="space-y-2">
                    <Label htmlFor="positionStep" className="text-sm font-medium">
                      Información del Nivel *
                    </Label>
                    <Input
                      id="positionStep"
                      value={positionLevels.find(l => l.id === selectedLevel)?.level || ''}
                      className="border-2 border-foreground bg-background rounded-none"
                      placeholder="Se actualiza automáticamente"
                      disabled
                    />
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
                    <div className="space-y-2">
                      {requisitionTypes.map(type => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.requisitionType.includes(type)}
                            onCheckedChange={() => handleCheckboxChange('requisitionType', type)}
                            className="border-2 border-foreground rounded-none"
                          />
                          <Label className="text-sm">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tipo de Contrato */}
                  <div className="border border-foreground p-4 rounded-none">
                    <h3 className="font-bold mb-3 text-sm">TIPO DE CONTRATO</h3>
                    <div className="space-y-2">
                      {contractTypes.map(type => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.contractType.includes(type)}
                            onCheckedChange={() => handleCheckboxChange('contractType', type)}
                            className="border-2 border-foreground rounded-none"
                          />
                          <Label className="text-sm">{type}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tipo de Cargo */}
                  <div className="border border-foreground p-4 rounded-none">
                    <h3 className="font-bold mb-3 text-sm">TIPO DE CARGO</h3>
                    <div className="space-y-2">
                      {cargoTypes.map(type => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.cargoType.includes(type)}
                            onCheckedChange={() => handleCheckboxChange('cargoType', type)}
                            className="border-2 border-foreground rounded-none"
                          />
                          <Label className="text-sm">{type}</Label>
                        </div>
                      ))}
                    </div>
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
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Solicitado por *</Label>
                      <Input
                        value={formData.requestedBy}
                        onChange={(e) => setFormData(prev => ({ ...prev, requestedBy: e.target.value }))}
                        className="border-2 border-foreground rounded-none"
                        placeholder="Nombre completo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Cargo del Solicitante *</Label>
                      <Input
                        value={formData.requestedByPosition}
                        onChange={(e) => setFormData(prev => ({ ...prev, requestedByPosition: e.target.value }))}
                        className="border-2 border-foreground rounded-none"
                        placeholder="Cargo"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Aprobado por *</Label>
                      <Input
                        value={formData.approvedBy}
                        onChange={(e) => setFormData(prev => ({ ...prev, approvedBy: e.target.value }))}
                        className="border-2 border-foreground rounded-none"
                        placeholder="Nombre completo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Cargo del Aprobador *</Label>
                      <Input
                        value={formData.approvedByPosition}
                        onChange={(e) => setFormData(prev => ({ ...prev, approvedByPosition: e.target.value }))}
                        className="border-2 border-foreground rounded-none"
                        placeholder="Cargo"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label className="text-sm font-medium">Validación de Recursos Humanos</Label>
                  <Textarea
                    value={formData.hrValidation}
                    onChange={(e) => setFormData(prev => ({ ...prev, hrValidation: e.target.value }))}
                    className="border-2 border-foreground rounded-none"
                    placeholder="Comentarios de Recursos Humanos"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-foreground rounded-none px-8 py-3"
              >
                Enviar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default RequisitionForm;